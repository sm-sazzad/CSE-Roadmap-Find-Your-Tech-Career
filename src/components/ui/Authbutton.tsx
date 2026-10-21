"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function AuthButtons() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  if (isPending) {
    return <div className="h-10 w-32 animate-pulse rounded-lg bg-white/5" />;
  }

  return (
    <div className="flex items-center gap-3">
      {session ? (
        <>
          {/* User name */}
          {/* User Profile */}
          <div className="hidden items-center gap-3 sm:flex">
            {session?.user?.image ? (
              <Image
                src={session?.user?.image}
                alt={session.user.name || "User"}
                width={100}
                height={100}
                className="h-9 w-9 rounded-full border border-violet-500/30 object-cover"
              />
            ) : (
              // <div className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-sm font-semibold uppercase text-violet-300">
              //   {(session?.user?.name || session?.user?.email || "U").charAt(0)}
              // </div>
              <span className="max-w-36 truncate text-sm font-medium text-zinc-300">
                {session?.user?.name || session?.user?.email || "Guest"}
              </span>
            )}
          </div>

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg border border-white/10 bg-white/3 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          {/* Sign In */}
          <Link
            href="/login"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white sm:block"
          >
            Sign In
          </Link>

          {/* Sign Up */}
          <Link
            href="/sign-up"
            className="rounded-lg border border-violet-500/30 bg-linear-to-r from-violet-600/90 to-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_25px_rgba(139,92,246,0.15)] transition duration-300 hover:border-violet-400/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
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
