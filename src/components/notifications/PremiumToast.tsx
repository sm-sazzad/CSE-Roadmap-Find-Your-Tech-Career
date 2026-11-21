"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Info,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";

type Variant =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "loading"
  | "celebration";

interface PremiumToastProps {
  id: string | number;
  variant: Variant;
  title: string;
  description?: string;
  duration?: number;
  celebration?: boolean;
  dismiss: (id: string | number) => void;
  onDismiss?: () => void;
}

const VARIANT_ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  loading: Loader2,
  celebration: Sparkles,
} satisfies Record<Variant, typeof CheckCircle>;

const VARIANT_COLORS: Record<
  Variant,
  { text: string; border: string; badge: string; glow: string }
> = {
  success: {
    text: "text-emerald-300",
    border: "border-emerald-400/35",
    badge:
      "bg-emerald-400/15 text-emerald-300 border-emerald-400/30 shadow-[0_0_20px_rgba(52,211,153,0.18)]",
    glow: "shadow-[0_0_24px_rgba(52,211,153,0.10)]",
  },
  error: {
    text: "text-rose-300",
    border: "border-rose-500/35",
    badge:
      "bg-rose-500/15 text-rose-300 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.18)]",
    glow: "shadow-[0_0_24px_rgba(244,63,94,0.10)]",
  },
  warning: {
    text: "text-amber-300",
    border: "border-amber-500/35",
    badge:
      "bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.18)]",
    glow: "shadow-[0_0_24px_rgba(245,158,11,0.10)]",
  },
  info: {
    text: "text-violet-300",
    border: "border-violet-500/35",
    badge:
      "bg-violet-500/15 text-violet-300 border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.18)]",
    glow: "shadow-[0_0_24px_rgba(139,92,246,0.10)]",
  },
  loading: {
    text: "text-violet-300",
    border: "border-violet-500/35",
    badge:
      "bg-violet-500/15 text-violet-300 border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.18)]",
    glow: "shadow-[0_0_24px_rgba(139,92,246,0.10)]",
  },
  celebration: {
    text: "text-violet-200",
    border: "border-violet-400/45",
    badge:
      "bg-violet-400/20 text-violet-200 border-violet-400/40 shadow-[0_0_28px_rgba(139,92,246,0.25)]",
    glow: "shadow-[0_0_32px_rgba(139,92,246,0.18)]",
  },
};

export default function PremiumToast({
  id,
  variant,
  title,
  description,
  celebration = false,
  dismiss,
  onDismiss,
}: PremiumToastProps) {
  const reducedMotion = useReducedMotion();
  const Icon = VARIANT_ICONS[variant];
  const style = VARIANT_COLORS[variant];
  const isLoading = variant === "loading";
  const showCelebration = celebration || variant === "celebration";

  const handleClose = () => {
    dismiss(id);
    onDismiss?.();
  };

  return (
    <motion.div
      initial={
        reducedMotion ? { opacity: 0 } : { y: 16, opacity: 0, scale: 0.97 }
      }
      animate={{
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          damping: 24,
          stiffness: 300,
        },
      }}
      exit={{
        y: reducedMotion ? 0 : 10,
        opacity: 0,
        scale: reducedMotion ? 1 : 0.97,
        transition: { duration: reducedMotion ? 0.1 : 0.18 },
      }}
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={[
        "relative box-border w-full min-w-0 max-w-[400px]",
        "overflow-hidden rounded-2xl border",
        "bg-[#0c0a18]/95 p-4 sm:p-5",
        "text-left shadow-xl shadow-[#070710]/50 backdrop-blur-xl",
        style.border,
        style.glow,
      ].join(" ")}
    >
      <div className="flex min-w-0 items-center gap-3">
        {/* Fixed-size icon container keeps every variant aligned */}
        <div
          className={[
            "inline-flex h-10 w-10 shrink-0 items-center justify-center",
            "rounded-xl border",
            style.badge,
          ].join(" ")}
          aria-hidden="true"
        >
          <Icon
            className={[
              "h-[18px] w-[18px] shrink-0",
              isLoading && !reducedMotion ? "animate-spin" : "",
            ].join(" ")}
            strokeWidth={2}
          />
        </div>

        {/* Message content */}
        <div className="min-w-0 flex-1 pt-0.5">
          <h3
            className={`break-words text-sm font-semibold leading-5 ${style.text}`}
          >
            {title}
          </h3>

          {description && (
            <p className="mt-1 break-words text-xs leading-[1.6] text-zinc-300/90">
              {description}
            </p>
          )}
        </div>

        {/* Accessible dismiss button */}
        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={handleClose}
          className={[
            "ml-1 inline-flex h-8 w-8 shrink-0 items-center justify-center",
            "rounded-lg border border-white/10 bg-white/[0.04]",
            "text-zinc-400 transition-colors duration-200",
            "hover:border-white/20 hover:bg-white/10 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-violet-400 focus-visible:ring-offset-2",
            "focus-visible:ring-offset-[#0c0a18]",
          ].join(" ")}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Decorative celebration stays away from the message content */}
      {showCelebration && (
        <motion.div
          aria-hidden="true"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.25 }}
          className="pointer-events-none absolute bottom-2 right-12 flex items-center gap-1 opacity-70"
        >
          <Sparkles className="h-3.5 w-3.5 text-violet-300" />
          <span className="text-sm">🎉</span>
        </motion.div>
      )}
    </motion.div>
  );
}

PremiumToast.displayName = "PremiumToast";
