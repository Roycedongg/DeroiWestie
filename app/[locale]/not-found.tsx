"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function getLocaleFromPathname(pathname: string) {
  // pathname like: /zh/gallery  /en  /zh
  const seg = (pathname || "/").split("/").filter(Boolean)[0];
  if (!seg) return "en";
  return seg;
}

export default function NotFound() {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    try {
      const loc = getLocaleFromPathname(window.location.pathname);
      setLocale(loc);
    } catch {
      // keep default "en"
    }
  }, []);

  const isZh = useMemo(() => locale.startsWith("zh"), [locale]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold">
        {isZh ? "页面不存在" : "Page Not Found"}
      </h1>

      <p className="mt-4 text-base opacity-80">
        {isZh
          ? "你访问的页面不存在，可能链接已更改或被删除。"
          : "The page you’re looking for doesn’t exist. It may have been moved or deleted."}
      </p>

      <div className="mt-8 flex gap-3">
        <Link
          href={`/${locale}`}
          className="rounded-xl px-4 py-2 text-sm font-medium ring-1 ring-white/15 hover:bg-white/10"
        >
          {isZh ? "返回首页" : "Back to Home"}
        </Link>

        <Link
          href={`/${locale}/gallery`}
          className="rounded-xl px-4 py-2 text-sm font-medium ring-1 ring-white/15 hover:bg-white/10"
        >
          {isZh ? "去相册" : "Go to Gallery"}
        </Link>
      </div>
    </main>
  );
}
