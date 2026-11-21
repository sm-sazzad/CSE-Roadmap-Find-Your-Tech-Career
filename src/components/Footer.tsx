"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
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
    hover: "hover:bg-[#24292f]/10 hover:border-[#24292f]/30",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sm-sazzad/",
    icon: FaLinkedin,
    color: "text-zinc-400 hover:text-white",
    hover: "hover:bg-[#0a66c2]/10 hover:border-[#0a66c2]/30",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/sazzad.hossain.5758",
    icon: FaFacebook,
    color: "text-zinc-400 hover:text-white",
    hover: "hover:bg-[#1877f2]/10 hover:border-[#1877f2]/30",
  },
  // {
  //   label: "Instagram",
  //   href: "https://www.instagram.com/sazzad_hossain5758/",
  //   icon: FaInstagram,
  //   color: "text-zinc-400 hover:text-white",
  //   hover:
  //     "hover:bg-gradient-to-tr hover:from-[#f58529]/10 hover:via-[#dd2a7b]/10 hover:to-[#8134af]/10 hover:border-[#8134af]/30",
  // },
  {
    label: "X",
    href: "https://x.com/sm_sazzad58",
    icon: FaXTwitter,
    color: "text-zinc-400 hover:text-white",
    hover: "hover:bg-black/10 hover:border-black/30",
  },
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=sazzadhossain5758@gmail.com",
    icon: FaEnvelope,
    color: "text-zinc-400 hover:text-white",
    hover: "hover:bg-[#ea4335]/10 hover:border-[#ea4335]/30",
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
    <footer className="border-t border-white/[0.06] bg-[#05050a]/75 backdrop-blur-xl">
      <div className="mx-auto w-[min(1180px,calc(100%-32px))] px-6 py-12 sm:py-16">
        {/* Brand row */}
        <div className="mb-12 border-b border-white/[0.06] pb-8 sm:flex sm:items-center sm:justify-between sm:pb-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/20 to-blue-500/10 shadow-[0_0_30px_rgba(139,92,246,0.12)]">
              <span className="text-lg text-violet-300">⌘</span>
            </div>
            <div className="text-xl font-bold tracking-tight">
              <span className="text-white">Code</span>
              <span className="text-violet-400">Path</span>
            </div>
          </Link>
          <p className="mt-4 text-sm leading-6 text-zinc-500 sm:mt-0 sm:max-w-lg sm:text-right">
            {t("footer_tagline")}
          </p>
        </div>

        {/* Columns grid */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-4">
          {/* Explore */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              {t("footer_explore")}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm text-zinc-400 transition hover:text-violet-300 hover:border-violet-400/40 border-b border-transparent"
                >
                  {t("footer_home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/sector"
                  className="text-sm text-zinc-400 transition hover:text-violet-300 hover:border-violet-400/40 border-b border-transparent"
                >
                  {t("footer_roadmaps")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-zinc-400 transition hover:text-violet-300 hover:border-violet-400/40 border-b border-transparent"
                >
                  {t("footer_about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              {t("footer_learn")}
            </h3>
            <ul className="space-y-2.5">
              {categoryLinks.map((c) => (
                <li key={c.id}>
                  <Link
                    href={c.href}
                    className="text-sm text-zinc-400 transition hover:text-violet-300 hover:border-violet-400/40 border-b border-transparent"
                  >
                    {t(c.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
              {t("footer_account")}
            </h3>
            <ul className="space-y-2.5">
              {session ? (
                <li>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={signOutLoading}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-zinc-400 font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/[0.05] hover:text-white hover:border-violet-400/40`}
                  >
                    <span>{t("footer_sign_out")}</span>
                    {signOutLoading && (
                      <span className="flex h-3 w-3 shrink-0 rounded-full border-current border-2 animate-spin">
                        <span className="sr-only">Loading</span>
                      </span>
                    )}
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="flex w-full items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-zinc-400 font-medium transition hover:bg-white/[0.05] hover:text-white hover:border-violet-400/40"
                    >
                      <span>{t("footer_sign_in")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sign-up"
                      className="flex w-full items-center justify-between gap-2 rounded-lg border border-violet-500/30 bg-linear-to-r from-violet-600/90 to-indigo-600/90 px-3 py-2 text-sm text-white font-semibold shadow-[0_0_25px_rgba(139,92,246,0.15)] transition hover:border-violet-400/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
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
            <h3 className="mb-4 text-xs font-semibold uppercase text-violet-400">
              {t("footer_follow")}
            </h3>
            <div className="flex gap-3 sm:gap-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    tabIndex={0}
                    className={`flex p-3 items-center justify-center rounded-xl border text-lg transition-all duration-300 ${link.color} ${link.hover} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400`}
                  >
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} CodePath
          </p>
          <p className="text-xs text-zinc-600">{t("footer_rights")}</p>
        </div>
      </div>
    </footer>
  );
}
