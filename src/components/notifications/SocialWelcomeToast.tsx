"use client";

import { useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { useToast } from "@/lib/notifications";

/**
 * Reads the social sign-in flag left in sessionStorage by SocialBtn after an
 * OAuth redirect and shows a single localized welcome toast, then clears the
 * flag so it never repeats.
 */
export default function SocialWelcomeToast() {
  const { t } = useLang();
  const { success } = useToast();

  useEffect(() => {
    const provider = sessionStorage.getItem("cp:social_signin_success");
    if (!provider) return;
    sessionStorage.removeItem("cp:social_signin_success");
    success(t("notif_social_success", { provider }), undefined, {
      duration: 4000,
    });
  }, [success, t]);

  return null;
}
