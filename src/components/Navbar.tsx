"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Terminal, Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#06080e]/85 backdrop-blur-2xl">
      {/* Top Reading Velocity Indicator */}
      <div
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[#00f5a0] via-[#00d2ff] to-[#38bdf8] shadow-[0_0_10px_rgba(0,245,160,0.5)]"
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      <div className="mx-auto flex h-[72px] w-[min(1180px,calc(100%-32px))] items-center justify-between gap-3">
        {/* Brand Monogram */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.1] bg-[#0d121f] shadow-[0_0_24px_rgba(0,245,160,0.15)] transition duration-300 group-hover:border-[#00f5a0]/40 group-hover:shadow-[0_0_30px_rgba(0,245,160,0.3)]">
            <Terminal className="h-5 w-5 text-[#00f5a0]" />
          </div>
          <div className="text-xl font-extrabold tracking-tight font-heading">
            <span className="text-white">Code</span>
            <span className="text-[#00f5a0]">Path</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition duration-200 ${
                  active
                    ? "text-white bg-white/[0.05]"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                {t(link.key)}
                {active && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#00f5a0] shadow-[0_0_8px_#00f5a0]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
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
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0d121f] text-zinc-300 transition hover:border-white/20 hover:text-white md:hidden cursor-pointer"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav className="border-t border-white/[0.07] bg-[#070912]/95 px-5 py-4 backdrop-blur-2xl md:hidden">
          <div className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                  isActive(link.href)
                    ? "bg-[#00f5a0]/10 text-[#00f5a0] font-semibold"
                    : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
          <div className="mt-4 border-t border-white/[0.06] pt-3 sm:hidden">
            <AuthButtons />
          </div>
        </nav>
      )}
    </header>
  );
}
