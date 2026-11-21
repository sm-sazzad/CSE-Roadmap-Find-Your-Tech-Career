"use client";

import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { useToast } from "@/lib/notifications";

type SocialProvider = "google" | "github";

const providerLabel: Record<SocialProvider, { en: string; bn: string }> = {
  google: { en: "Google", bn: "গুগল" },
  github: { en: "GitHub", bn: "গিটহাব" },
};

const SOCIAL_SIGNIN_KEY = "cp:social_signin_success";

const SocialBtn = () => {
  const { lang, t } = useLang();
  const { error } = useToast();
  const [loading, setLoading] = useState<SocialProvider | null>(null);

  const handleSocialSignIn = async (provider: SocialProvider) => {
    setLoading(provider);
    // Remember the provider so the destination page can show a welcome toast
    // after the OAuth redirect completes.
    sessionStorage.setItem(SOCIAL_SIGNIN_KEY, t(`auth_${provider}` as "auth_google"));
    try {
      await signIn.social({
        provider,
        callbackURL: "/sector",
      });
    } catch {
      error(t("notif_social_failed", { provider: providerLabel[provider][lang] }), undefined, {
        duration: 3500,
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={() => handleSocialSignIn("google")}
        disabled={loading === "google"}
        type="button"
        className={`flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0c101c] text-xs font-mono font-medium text-zinc-300 transition cursor-pointer hover:border-[#00f5a0]/40 hover:bg-[#00f5a0]/[0.05] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className="text-base font-bold text-[#00f5a0]">G</span>
        <span>{lang === "bn" ? providerLabel.google.bn : providerLabel.google.en}</span>
      </button>

      <button
        onClick={() => handleSocialSignIn("github")}
        disabled={loading === "github"}
        type="button"
        className={`flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0c101c] text-xs font-mono font-medium text-zinc-300 transition cursor-pointer hover:border-[#00f5a0]/40 hover:bg-[#00f5a0]/[0.05] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className="text-base font-bold text-[#00d2ff]">GH</span>
        <span>{lang === "bn" ? providerLabel.github.bn : providerLabel.github.en}</span>
      </button>
    </div>
  );
};

export default SocialBtn;
