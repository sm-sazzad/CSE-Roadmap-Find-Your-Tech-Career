"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useSession } from "@/lib/auth-client";
import { useLang, type TKey } from "@/lib/i18n";
import { useToast } from "@/lib/notifications";

const DEBOUNCE_MS = 600;
const MAX_RETRIES = 3;
const RETRY_BASE_MS = 1000;

type ProgressState = {
  [slug: string]: {
    completedSteps: number[];
    checks: string[];
    stepCount: number;
    loading: boolean;
    error: string | null;
  };
};

type ProgressContextType = {
  progress: ProgressState;
  setStepCompleted: (slug: string, stepIndex: number, completed: boolean) => void;
  setCheck: (slug: string, checkId: string, checked: boolean) => void;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

function getLocalKey(slug: string, email: string | null): string {
  const scope = email ? `user:${email}` : "anonymous";
  return `cp-progress:${scope}:${slug}`;
}

function getChecksKey(slug: string, email: string | null): string {
  const scope = email ? `user:${email}` : "anonymous";
  return `cp-checks:${scope}:${slug}`;
}

function writeLocal(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota errors
  }
}

function clearAllLocal(email: string | null): void {
  if (typeof window === "undefined") return;
  const prefixes = [
    `cp-progress:${email ? `user:${email}` : "anonymous"}:`,
    `cp-checks:${email ? `user:${email}` : "anonymous"}:`,
    "roadmap-progress-",
    "roadmap-checks-",
  ];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    if (prefixes.some((p) => key.startsWith(p))) {
      localStorage.removeItem(key);
      i--;
    }
  }
}

export function ProgressProvider({
  children,
}: {
  children: ReactNode;
}): React.ReactNode {
  const { data: session } = useSession();
  const { t } = useLang();
  const { success, error, dismiss } = useToast();
  const email = session?.user?.email ?? null;

  const [progress, setProgress] = useState<ProgressState>({});
  const debounceRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const pendingWritesRef = useRef<Map<string, () => void>>(new Map());
  const abortControllersRef = useRef<Map<string, AbortController>>(new Map());
  const mountedRef = useRef(true);
  const lastEmailRef = useRef(email);
  const activeStepToastsRef = useRef<Map<string, string | number>>(new Map());
  const failedSaveSlugsRef = useRef<Set<string>>(new Set());
  const celebratedSlugsRef = useRef<Set<string>>(new Set());

  const errorMsg = useCallback((key: string): string => {
    return t(key as TKey);
  }, [t]);

  useEffect(() => {
    if (lastEmailRef.current !== null && lastEmailRef.current !== email) {
      clearAllLocal(lastEmailRef.current);
      setProgress({});
    }
    lastEmailRef.current = email;
  }, [email]);

  useEffect(() => {
    if (!email) return;
    let cancelled = false;
    fetch(`/api/progress`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data?.progress) {
          setProgress((prev) => {
            const merged = { ...prev };
            for (const [slugKey, rawRec] of Object.entries(data.progress)) {
              const rec = rawRec as {
                completedSteps?: unknown;
                checks?: unknown;
                stepCount?: unknown;
              };
              merged[slugKey] = {
                completedSteps: Array.isArray(rec.completedSteps) ? rec.completedSteps : [],
                checks: Array.isArray(rec.checks) ? rec.checks : [],
                stepCount: typeof rec.stepCount === "number" ? rec.stepCount : 0,
                loading: false,
                error: null,
              };
            }
            return merged;
          });
        }
      })
      .catch(() => {
        // Ignore load errors; local cache / optimistic writes handle offline.
      });
    return () => {
      cancelled = true;
    };
  }, [email]);

  useEffect(() => {
    mountedRef.current = true;
    const debounceRefs = debounceRef.current;
    const abortRefs = abortControllersRef.current;
    return () => {
      mountedRef.current = false;
      for (const [, timeout] of debounceRefs) {
        clearTimeout(timeout);
      }
      for (const [, controller] of abortRefs) {
        controller.abort();
      }
    };
  }, []);

  const saveToServerRef = useRef<(
    slug: string,
    record: { completedSteps: number[]; checks: string[]; stepCount: number },
    retryCount?: number
  ) => Promise<void>>(() => Promise.resolve());

  const saveToServer = useCallback(
    async (
      slug: string,
      record: { completedSteps: number[]; checks: string[]; stepCount: number },
      retryCount = 0
    ): Promise<void> => {
      if (!email) return;

      const controller = new AbortController();
      abortControllersRef.current.set(slug, controller);

      try {
        const response = await fetch(`/api/progress/${encodeURIComponent(slug)}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            completedSteps: record.completedSteps,
            checks: record.checks,
            stepCount: record.stepCount,
          }),
          signal: controller.signal,
        });

        if (!mountedRef.current) return;

        if (response.status === 401 || response.status === 403) {
          failedSaveSlugsRef.current.add(slug);
          error(errorMsg("progress_save_failed"), undefined, {
            duration: 4000,
          });
          return;
        }

        if (!response.ok) {
          if (retryCount < MAX_RETRIES && (response.status === 408 || response.status >= 500)) {
            await new Promise((r) => setTimeout(r, RETRY_BASE_MS * 2 ** retryCount));
            return saveToServerRef.current(slug, record, retryCount + 1);
          }
          failedSaveSlugsRef.current.add(slug);
          error(errorMsg("progress_save_failed"), undefined, {
            duration: 4000,
          });
          return;
        }

        writeLocal(getLocalKey(slug, email), {
          ...record,
          updatedAt: new Date().toISOString(),
        });
        writeLocal(getChecksKey(slug, email), record.checks);

        setProgress((prev) => ({
          ...prev,
          [slug]: {
            ...prev[slug],
            completedSteps: record.completedSteps,
            checks: record.checks,
            stepCount: record.stepCount,
            loading: false,
            error: null,
          },
        }));

        const wasFailed = failedSaveSlugsRef.current.delete(slug);
        if (wasFailed) {
          success(t("notif_progress_recovered"), undefined, { duration: 4000 });
        }
      } catch (err) {
        if (!mountedRef.current) return;
        if (err instanceof Error && err.name === "AbortError") return;

        if (retryCount < MAX_RETRIES) {
          await new Promise((r) => setTimeout(r, RETRY_BASE_MS * 2 ** retryCount));
          return saveToServerRef.current(slug, record, retryCount + 1);
        }

        failedSaveSlugsRef.current.add(slug);
        error(errorMsg("network_error"), undefined, {
          duration: 4000,
        });
      } finally {
        abortControllersRef.current.delete(slug);
        pendingWritesRef.current.delete(slug);
      }
    },
    [email, errorMsg, error, success, t]
  );

  useEffect(() => {
    saveToServerRef.current = saveToServer;
  }, [saveToServer]);

  const debouncedSave = useCallback(
    (slug: string, record: { completedSteps: number[]; checks: string[]; stepCount: number }) => {
      const existing = debounceRef.current.get(slug);
      if (existing) clearTimeout(existing);

      pendingWritesRef.current.set(slug, () => saveToServerRef.current(slug, record));

      const timeout = setTimeout(() => {
        const writeFn = pendingWritesRef.current.get(slug);
        if (writeFn && mountedRef.current) {
          writeFn();
        }
        debounceRef.current.delete(slug);
        pendingWritesRef.current.delete(slug);
      }, DEBOUNCE_MS);

      debounceRef.current.set(slug, timeout);
    },
    []
  );

  const setStepCompleted = useCallback(
    (slug: string, stepIndex: number, completed: boolean) => {
      let shouldCelebrate = false;
      let stepToastKey: string | null = null;

      setProgress((prev) => {
        const current =
          prev[slug] ?? {
            completedSteps: [],
            checks: [],
            stepCount: 0,
            loading: false,
            error: null,
          };

        const steps = completed
          ? [...new Set([...current.completedSteps, stepIndex])]
          : current.completedSteps.filter((i) => i !== stepIndex);

        const next = {
          ...current,
          completedSteps: steps,
          stepCount: current.stepCount || 0,
        };

        const optimistic = {
          ...prev,
          [slug]: {
            ...next,
            loading: true,
          },
        };

        if (completed) {
          const currentPct =
            current.stepCount > 0
              ? Math.round((current.completedSteps.length / current.stepCount) * 100)
              : 0;
          const nextPct =
            current.stepCount > 0 ? Math.round((steps.length / current.stepCount) * 100) : 0;

          if (
            currentPct < 100 &&
            nextPct === 100 &&
            current.stepCount > 0 &&
            !celebratedSlugsRef.current.has(slug)
          ) {
            shouldCelebrate = true;
            celebratedSlugsRef.current.add(slug);
          }

          stepToastKey = `${slug}:${stepIndex}`;
        } else {
          celebratedSlugsRef.current.delete(slug);
        }

        writeLocal(getLocalKey(slug, email), {
          completedSteps: steps,
          stepCount: next.stepCount,
          updatedAt: new Date().toISOString(),
        });

        debouncedSave(slug, {
          completedSteps: steps,
          checks: next.checks,
          stepCount: next.stepCount,
        });

        return optimistic;
      });

      if (shouldCelebrate) {
        success(t("prog_done"), undefined, { duration: 6000, celebration: true });
      }

      if (stepToastKey) {
        const prevId = activeStepToastsRef.current.get(stepToastKey);
        if (prevId) dismiss(prevId);
        const id = success(t("notif_step_complete"), undefined, { duration: 2500 });
        activeStepToastsRef.current.set(stepToastKey, id);
      }
    },
    [email, debouncedSave, success, dismiss, t]
  );

  const setCheck = useCallback(
    (slug: string, checkId: string, checked: boolean) => {
      setProgress((prev) => {
        const current =
          prev[slug] ?? {
            completedSteps: [],
            checks: [],
            stepCount: 0,
            loading: false,
            error: null,
          };

        const checks = checked
          ? [...new Set([...current.checks, checkId])]
          : current.checks.filter((id) => id !== checkId);

        const next = {
          ...current,
          checks,
        };

        const optimistic = {
          ...prev,
          [slug]: {
            ...next,
            loading: true,
          },
        };

        writeLocal(getChecksKey(slug, email), checks);
        writeLocal(getLocalKey(slug, email), {
          completedSteps: next.completedSteps,
          stepCount: next.stepCount,
          updatedAt: new Date().toISOString(),
        });

        debouncedSave(slug, {
          completedSteps: next.completedSteps,
          checks,
          stepCount: next.stepCount,
        });

        return optimistic;
      });
    },
    [email, debouncedSave]
  );

  const value = useMemo(
    () => ({
      progress,
      setStepCompleted,
      setCheck,
    }),
    [progress, setStepCompleted, setCheck]
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress(slug: string, stepCountOverride?: number) {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used inside <ProgressProvider>");
  }

  const record = ctx.progress[slug];
  const completedSteps = record?.completedSteps ?? [];
  const checks = record?.checks ?? [];
  const stepCount = stepCountOverride ?? record?.stepCount ?? 0;
  const loading = record?.loading ?? false;

  const isStepCompleted = (index: number) => completedSteps.includes(index);
  const isCheckChecked = (id: string) => checks.includes(id);

  const pct = stepCount > 0 ? Math.round((completedSteps.length / stepCount) * 100) : 0;

  return {
    completedSteps,
    checks,
    stepCount,
    loading,
    isStepCompleted,
    isCheckChecked,
    percentage: pct,
    setStepCompleted: (index: number, completed: boolean) =>
      ctx.setStepCompleted(slug, index, completed),
    setCheck: (id: string, checked: boolean) => ctx.setCheck(slug, id, checked),
  };
}
