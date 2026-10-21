"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AuthButtons from "./ui/Authbutton";
import LanguageToggle from "./LanguageToggle";
import { useLang, type TKey } from "@/lib/i18n";

const links: { href: string; key: TKey }[] = [
  { href: "/", key: "nav_home" },
  { href: "/sector", key: "nav_roadmaps" },
  { href: "/about", key: "nav_about" },
];

export default function Navbar() {
  const { t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#05050a]/75 backdrop-blur-xl">
      <div
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-violet-500 via-indigo-400 to-sky-400"
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      <div className="mx-auto flex h-[72px] w-[min(1180px,calc(100%-32px))] items-center justify-between gap-3">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/20 bg-gradient-to-br from-violet-500/20 to-blue-500/10 shadow-[0_0_30px_rgba(139,92,246,0.12)] transition duration-300 group-hover:border-violet-400/40">
            <span className="text-lg text-violet-300">⌘</span>
          </div>
          <div className="text-xl font-bold tracking-tight">
            <span className="text-white">Code</span>
            <span className="text-violet-400">Path</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition hover:bg-white/[0.05] ${
                isActive(link.href) ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <div className="hidden sm:block">
            <AuthButtons />
          </div>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-zinc-300 md:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/[0.06] bg-[#05050a]/95 px-4 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-3 text-sm font-medium ${
                isActive(link.href) ? "bg-white/[0.05] text-white" : "text-zinc-400"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
          <div className="mt-2 sm:hidden">
            <AuthButtons />
          </div>
        </nav>
      )}
    </header>
  );
}
