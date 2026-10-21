"use client";

import { useLang } from "@/lib/i18n";

/** Shows the English or the Bangla text depending on the selected language. */
export default function Bi({ en, bn }: { en: string; bn: string }) {
  const { lang } = useLang();
  return <>{lang === "bn" ? bn : en}</>;
}
