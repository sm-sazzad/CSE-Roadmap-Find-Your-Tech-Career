import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#05050a]/75 backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] w-[min(1180px,calc(100%-40px))] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/20 to-blue-500/10 shadow-[0_0_30px_rgba(139,92,246,0.12)] transition duration-300 group-hover:border-violet-400/40 group-hover:shadow-[0_0_35px_rgba(139,92,246,0.2)]">
            <span className="text-lg text-violet-300">⌘</span>
          </div>

          <div className="text-xl font-bold tracking-tight">
            <span className="text-white">Code</span>
            <span className="text-violet-400">Path</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-2 md:flex">
          <Link
            href="/"
            className="rounded-lg px-4 py-2 text-sm font-medium text-white transition hover:bg-white/[0.04]"
          >
            Home
          </Link>

          <Link
            href="/sector"
            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            Roadmaps
          </Link>

          <Link
            href="/about"
            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
          >
            About
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Sign In */}
          <Link
            href="/signin"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.05] hover:text-white sm:block"
          >
            Sign In
          </Link>

          {/* Sign Up */}
          <Link
            href="/signup"
            className="rounded-lg border border-violet-500/30 bg-gradient-to-r from-violet-600/90 to-indigo-600/90 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_25px_rgba(139,92,246,0.15)] transition duration-300 hover:border-violet-400/50 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
          >
            Sign Up
          </Link>

          {/* Mobile Menu */}
          <button
            type="button"
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] md:hidden"
            aria-label="Open menu"
          >
            <div className="space-y-1.5">
              <span className="block h-px w-4 bg-zinc-400" />
              <span className="block h-px w-4 bg-zinc-400" />
              <span className="block h-px w-4 bg-zinc-400" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
