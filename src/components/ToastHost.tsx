"use client";

import { Toaster } from "sonner";

/**
 * Single global notification host. Mounted exactly once in RootLayout so
 * toasts persist across client-side navigation. Configured once here — no
 * other file renders a Toaster, preventing duplicate containers.
 */
export default function ToastHost() {
  return (
    <Toaster
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        duration: 4000,
        closeButton: true,
      }}
    />
  );
}
