"use client";

import { useLang, type Lang } from "@/lib/i18n";

const options: { value: Lang; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "bn", label: "বাংলা" },
];

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div
      role="group"
      aria-label="Language"
      className="relative flex items-center rounded-full border border-white/10 bg-[#090d18]/80 p-1 backdrop-blur-md"
    >
      {options.map((option) => {
        const active = lang === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLang(option.value)}
            aria-pressed={active}
            className={`rounded-full cursor-pointer px-3 py-1 text-xs font-bold transition-all duration-300 ${
              active
                ? "bg-gradient-to-r from-[#00f5a0] to-[#00d2ff] text-black shadow-[0_0_18px_rgba(0,245,160,0.4)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
