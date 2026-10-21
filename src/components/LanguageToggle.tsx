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
      className="relative flex items-center rounded-full border border-white/10 bg-white/4 p-1"
    >
      {options.map((option) => {
        const active = lang === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLang(option.value)}
            aria-pressed={active}
            className={`rounded-full cursor-pointer px-3 py-1 text-xs font-semibold transition duration-300 ${
              active
                ? "bg-linear-to-r from-violet-500 to-indigo-500 text-white shadow-[0_0_18px_rgba(139,92,246,0.45)]"
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
