"use client";

import { toast } from "sonner";
import PremiumToast from "@/components/notifications/PremiumToast";

export type ToastVariant = "success" | "error" | "warning" | "info" | "loading";

export interface ToastShowOptions {
  duration?: number;
  celebration?: boolean;
}

export interface UseToast {
  show: (
    variant: ToastVariant,
    title: string,
    description?: string,
    options?: ToastShowOptions
  ) => string | number;
  success: (title: string, description?: string, options?: ToastShowOptions) => string | number;
  error: (title: string, description?: string, options?: ToastShowOptions) => string | number;
  warning: (title: string, description?: string, options?: ToastShowOptions) => string | number;
  info: (title: string, description?: string, options?: ToastShowOptions) => string | number;
  loading: (title: string, description?: string, options?: ToastShowOptions) => string | number;
  dismiss: (id?: string | number) => void;
  promise: typeof toast.promise;
}

/**
 * Centralized, reusable notification API. All UI flows call this hook rather
 * than importing sonner directly, keeping library-specific code in one place.
 * Every toast renders through the custom PremiumToast component so none of
 * them look like a default sonner installation.
 */
export function useToast(): UseToast {

  const show = (
    variant: ToastVariant,
    title: string,
    description?: string,
    options: ToastShowOptions = {}
  ): string | number => {
    const { celebration = false, duration = 4000 } = options;
    return toast.custom(
      (id) => (
        <PremiumToast
          id={id}
          variant={variant}
          title={title}
          description={description}
          duration={duration}
          celebration={celebration}
          dismiss={(toastId) => toast.dismiss(toastId)}
        />
      ),
      { duration }
    );
  };

  const success = (title: string, description?: string, options?: ToastShowOptions) =>
    show("success", title, description, options);

  const error = (title: string, description?: string, options?: ToastShowOptions) =>
    show("error", title, description, options);

  const warning = (title: string, description?: string, options?: ToastShowOptions) =>
    show("warning", title, description, options);

  const info = (title: string, description?: string, options?: ToastShowOptions) =>
    show("info", title, description, options);

  const loading = (title: string, description?: string, options?: ToastShowOptions) =>
    show("loading", title, description, { ...options, duration: options?.duration ?? 0 });

  return {
    show,
    success,
    error,
    warning,
    info,
    loading,
    dismiss: toast.dismiss,
    promise: toast.promise,
  };
}
