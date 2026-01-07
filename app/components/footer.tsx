"use client";

import Link from "next/link";

export default function Footer({ locale }: { locale: "zh" | "en" }) {
  const isEn = locale === "en";

  return (
    <footer className="mt-20 border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="text-sm font-semibold text-white">
              DeRoi Westie
            </div>
            <p className="mt-2 text-xs leading-relaxed">
              {isEn
                ? "West Highland White Terrier kennel & grooming studio based in Vancouver, BC."
                : "位于温哥华的西高地白梗犬舍与专业美容工作室。"}
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="text-sm font-semibold text-white">
              {isEn ? "Navigation" : "网站导航"}
            </div>
            <ul className="mt-3 space-y-2 text-xs">
              <li><Link href={`/${locale}/services`} className="hover:text-white">Services</Link></li>
              <li><Link href={`/${locale}/results`} className="hover:text-white">Results</Link></li>
              <li><Link href={`/${locale}/gallery`} className="hover:text-white">Gallery</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="text-sm font-semibold text-white">
              {isEn ? "Notes" : "说明"}
            </div>
            <p className="mt-3 text-xs leading-relaxed">
              {isEn
                ? "All content © DeRoi Westie. Photos and text may not be reused without permission."
                : "本站内容与图片均归 DeRoi Westie 所有，未经允许不得转载。"}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} DeRoi Westie · Vancouver, BC
        </div>
      </div>
    </footer>
  );
}
