"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useLang } from "@/lib/i18n";
import { useToast } from "@/lib/notifications";
import Image from "next/image";

export default function AuthButtons() {
  const router = useRouter();
  const { t } = useLang();
  const { success, error, loading: showLoading, dismiss } = useToast();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    const loadingId = showLoading(t("logout"), undefined);
    try {
      await authClient.signOut();
      dismiss(loadingId);
      success(t("notif_signout_success"), undefined, { duration: 2500 });
      router.refresh();
    } catch {
      dismiss(loadingId);
      error(t("notif_signout_failed"), undefined, { duration: 2500 });
    }
  };

  const initials = (() => {
    const name = session?.user?.name || session?.user?.email || "";
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (
        parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
      ).toUpperCase();
    }
    if (name.length > 0) return name.charAt(0).toUpperCase();
    return session?.user?.email?.charAt(0).toUpperCase() || "U";
  })();

  if (isPending) {
    return <div className="h-10 w-32 animate-pulse rounded-lg bg-white/5" />;
  }

  return (
    <div className="flex items-center gap-3">
      {session ? (
        <>
          <Link
            href="/profile"
            className="hidden items-center gap-2 sm:flex rounded-lg text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User profile"}
                width={32}
                height={32}
                className="h-9 w-9 rounded-full border border-[#00f5a0]/40 object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#00f5a0]/40 bg-[#00f5a0]/15 text-xs font-mono font-bold uppercase tracking-tight text-[#00f5a0]">
                {initials}
              </div>
            )}
          </Link>

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-xl border border-white/10 bg-[#0c101c] px-4 py-2 text-xs font-semibold text-zinc-300 transition cursor-pointer hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          {/* Sign In */}
          <Link
            href="/login"
            className="hidden rounded-xl px-4 py-2 text-xs font-semibold text-zinc-300 transition hover:bg-white/5 hover:text-white sm:block"
          >
            Sign In
          </Link>

          {/* Sign Up */}
          <Link
            href="/sign-up"
            className="rounded-xl bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(0,245,160,0.3)] transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,245,160,0.45)]"
          >
            Sign Up
          </Link>
        </>
      )}

      {/* Mobile Menu */}
      <button
        type="button"
        className="ml-1 flex h-10 w-10 items-center justify-center rounded-lg border border-white/8 bg-white/3 md:hidden"
        aria-label="Open menu"
      >
        <div className="space-y-1.5">
          <span className="block h-px w-4 bg-zinc-400" />
          <span className="block h-px w-4 bg-zinc-400" />
          <span className="block h-px w-4 bg-zinc-400" />
        </div>
      </button>
    </div>
  );
}
