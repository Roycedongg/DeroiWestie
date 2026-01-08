"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type Locale = "zh" | "en";

const NAV = [
  { href: "/", zh: "首页", en: "Home" },
  { href: "/services", zh: "服务", en: "Services" },
  { href: "/results", zh: "战绩", en: "Results" },
    { href: "/kennel", zh: "犬舍", en: "Kennel" },
  { href: "/gallery", zh: "作品集", en: "Gallery" },
  { href: "/contact", zh: "联系", en: "Contact" },
];

export default function Navbar({ locale }: { locale?: Locale }) {
  const pathname = usePathname() || "/zh";

  // 从 URL 判断语言（最稳）
  const detectedLocale: Locale =
    pathname.startsWith("/en") ? "en" : pathname.startsWith("/zh") ? "zh" : "zh";

  const activeLocale: Locale = locale ?? detectedLocale;
  const isEn = activeLocale === "en";

  // 语言切换：保留当前路径
  const rest = pathname.replace(/^\/(zh|en)(?=\/|$)/, "");
  const zhHref = `/zh${rest || ""}`;
  const enHref = `/en${rest || ""}`;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link href={`/${activeLocale}`} className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl border border-zinc-800 bg-zinc-900" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-white">DeRoi Westie</div>
            <div className="text-[11px] text-zinc-400">Kennel & Grooming Studio</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={`/${activeLocale}${item.href}`}
              className="text-sm font-medium text-zinc-200 hover:text-white"
            >
              {isEn ? item.en : item.zh}
            </Link>
          ))}
        </nav>

        {/* Language switch */}
        <div className="flex items-center gap-2">
          <Link
            href={zhHref}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              activeLocale === "zh"
                ? "bg-white text-zinc-900"
                : "border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            ZH
          </Link>
          <Link
            href={enHref}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              activeLocale === "en"
                ? "bg-white text-zinc-900"
                : "border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            EN
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="border-t border-zinc-800 bg-zinc-950 md:hidden">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={`/${activeLocale}${item.href}`}
              className="whitespace-nowrap rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-200 hover:bg-zinc-800"
            >
              {isEn ? item.en : item.zh}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
