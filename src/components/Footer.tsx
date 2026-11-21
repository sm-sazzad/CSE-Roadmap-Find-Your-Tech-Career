"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Terminal } from "lucide-react";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { useLang, type TKey } from "@/lib/i18n";
import { useToast } from "@/lib/notifications";

type SocialLink = {
  label: string;
  href: string;
  icon: React.ElementType;
  color: string;
  hover: string;
};

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/sm-sazzad",
    icon: FaGithub,
    color: "text-zinc-400 hover:text-white",
    hover: "hover:bg-[#24292f]/20 hover:border-white/20",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sm-sazzad/",
    icon: FaLinkedin,
    color: "text-zinc-400 hover:text-white",
    hover: "hover:bg-[#0a66c2]/20 hover:border-[#0a66c2]/40",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/sazzad.hossain.5758",
    icon: FaFacebook,
    color: "text-zinc-400 hover:text-white",
    hover: "hover:bg-[#1877f2]/20 hover:border-[#1877f2]/40",
  },
  {
    label: "X",
    href: "https://x.com/sm_sazzad58",
    icon: FaXTwitter,
    color: "text-zinc-400 hover:text-white",
    hover: "hover:bg-white/10 hover:border-white/20",
  },
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=sazzadhossain5758@gmail.com",
    icon: FaEnvelope,
    color: "text-zinc-400 hover:text-white",
    hover: "hover:bg-[#ea4335]/20 hover:border-[#ea4335]/40",
  },
];

const CATEGORY_LINKS: { id: string; labelKey: TKey }[] = [
  { id: "web", labelKey: "footer_web_software" },
  { id: "ai", labelKey: "footer_ai_data" },
  { id: "infra", labelKey: "footer_cloud_systems" },
  { id: "security", labelKey: "footer_security_networks" },
];

export default function Footer() {
  const { t } = useLang();
  const router = useRouter();
  const { success, error, loading: showLoading, dismiss } = useToast();
  const { data: session } = authClient.useSession();

  const [signOutLoading, setSignOutLoading] = useState(false);

  const handleSignOut = useCallback(async () => {
    setSignOutLoading(true);
    const loadingId = showLoading(t("footer_sign_out"), undefined);
    try {
      await authClient.signOut();
      dismiss(loadingId);
      success(t("notif_signout_success"), undefined, { duration: 2500 });
      router.refresh();
    } catch {
      dismiss(loadingId);
      error(t("notif_signout_failed"), undefined, { duration: 2500 });
    } finally {
      setSignOutLoading(false);
    }
  }, [router, showLoading, dismiss, success, error, t]);

  const categoryLinks = CATEGORY_LINKS.map((c) => ({
    ...c,
    href: `/sector?category=${c.id}`,
  }));

  return (
    <footer className="border-t border-white/[0.07] bg-[#06080e]/95 backdrop-blur-2xl">
      <div className="mx-auto w-[min(1180px,calc(100%-32px))] px-6 py-12 sm:py-16">
        {/* Brand row */}
        <div className="mb-12 border-b border-white/[0.06] pb-8 sm:flex sm:items-center sm:justify-between sm:pb-12">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.1] bg-[#0d121f] shadow-[0_0_24px_rgba(0,245,160,0.15)] transition duration-300 group-hover:border-[#00f5a0]/40">
              <Terminal className="h-5 w-5 text-[#00f5a0]" />
            </div>
            <div className="text-xl font-extrabold tracking-tight font-heading">
              <span className="text-white">Code</span>
              <span className="text-[#00f5a0]">Path</span>
            </div>
          </Link>
          <p className="mt-4 text-sm leading-6 text-zinc-400 sm:mt-0 sm:max-w-lg sm:text-right">
            {t("footer_tagline")}
          </p>
        </div>

        {/* Columns grid */}
        <div className="grid gap-8 sm:gap-8 lg:grid-cols-4">
          {/* Explore */}
          <div>
            <h3 className="mb-4 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#00f5a0]">
              {t("footer_explore")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm text-zinc-400 transition hover:text-[#00f5a0]"
                >
                  {t("footer_home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/sector"
                  className="text-sm text-zinc-400 transition hover:text-[#00f5a0]"
                >
                  {t("footer_roadmaps")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-zinc-400 transition hover:text-[#00f5a0]"
                >
                  {t("footer_about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="mb-4 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#00f5a0]">
              {t("footer_learn")}
            </h3>
            <ul className="space-y-2.5">
              {categoryLinks.map((c) => (
                <li key={c.id}>
                  <Link
                    href={c.href}
                    className="text-sm text-zinc-400 transition hover:text-[#00f5a0]"
                  >
                    {t(c.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#00f5a0]">
              {t("footer_account")}
            </h3>
            <ul className="space-y-2.5">
              {session ? (
                <li>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signOutLoading}
                    className="flex w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-zinc-400 font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/[0.05] hover:text-white hover:border-[#00f5a0]/40"
                  >
                    <span>{t("footer_sign_out")}</span>
                    {signOutLoading && (
                      <span className="flex h-3 w-3 shrink-0 rounded-full border-current border-2 animate-spin" />
                    )}
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="flex w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3.5 py-2.5 text-sm text-zinc-400 font-medium transition hover:bg-white/[0.05] hover:text-white hover:border-[#00f5a0]/40"
                    >
                      <span>{t("footer_sign_in")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sign-up"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-3.5 py-2.5 text-sm text-black font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,245,160,0.25)] transition hover:shadow-[0_0_30px_rgba(0,245,160,0.4)] hover:scale-[1.02]"
                    >
                      {t("footer_sign_up")}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Follow us */}
          <div>
            <h3 className="mb-4 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#00f5a0]">
              {t("footer_follow")}
            </h3>
            <div className="flex gap-2.5">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className={`flex p-3 items-center justify-center rounded-xl border border-white/[0.07] bg-[#0c101c] text-lg transition-all duration-300 ${link.color} ${link.hover} hover:scale-105`}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-mono text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} CodePath. Open Access Learning.</p>
          <p>{t("footer_rights")}</p>
        </div>
      </div>
    </footer>
  );
}
