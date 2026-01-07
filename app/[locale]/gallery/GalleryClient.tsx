"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type GalleryCategory = "All" | "Kennel Dogs" | "Puppies" | "Shows" | "Lifestyle";

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  title?: string;
  note?: string;
  date?: string;
};

const CATEGORIES: { key: GalleryCategory; label: string }[] = [
  { key: "All", label: "全部" },
  { key: "Kennel Dogs", label: "犬舍犬只" },
  { key: "Puppies", label: "幼犬" },
  { key: "Shows", label: "赛场" },
  { key: "Lifestyle", label: "日常" },
];

function BrandButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  const cls =
    variant === "solid"
      ? "bg-brand text-white hover:bg-brand-700"
      : "border border-brand-200 bg-white/70 text-brand-800 hover:bg-brand-50";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${cls}`}
    >
      {children}
    </Link>
  );
}

export default function GalleryClient({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryCategory>("All");
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return active === "All" ? items : items.filter((x) => x.category === active);
  }, [active, items]);

  const currentIndex = useMemo(() => {
    if (!lightboxId) return -1;
    return filtered.findIndex((x) => x.id === lightboxId);
  }, [filtered, lightboxId]);

  const current = currentIndex >= 0 ? filtered[currentIndex] : null;

  const close = () => setLightboxId(null);

  const prev = () => {
    if (filtered.length === 0) return;
    const nextIndex = currentIndex <= 0 ? filtered.length - 1 : currentIndex - 1;
    setLightboxId(filtered[nextIndex].id);
  };

  const next = () => {
    if (filtered.length === 0) return;
    const nextIndex = currentIndex >= filtered.length - 1 ? 0 : currentIndex + 1;
    setLightboxId(filtered[nextIndex].id);
  };

  // ESC 关闭 / ← → 切换
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightboxId) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxId, currentIndex, filtered.length]);

  // ✅ 手机滑动手势
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const tracking = useRef(false);

  const onTouchStart = (e: React.TouchEvent) => {
    if (!current) return;
    const t = e.touches[0];
    startX.current = t.clientX;
    startY.current = t.clientY;
    tracking.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    // 不阻止滚动，让用户能上下滑页面（灯箱内一般不需要滚动，但保险）
    if (!tracking.current) return;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!tracking.current) return;
    tracking.current = false;

    const sx = startX.current;
    const sy = startY.current;
    startX.current = null;
    startY.current = null;
    if (sx == null || sy == null) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - sx;
    const dy = t.clientY - sy;

    // 阈值：横向滑动明显且大于纵向滑动才触发
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (absX < 45) return; // 太短不触发
    if (absX < absY * 1.2) return; // 主要是纵向滚动，忽略

    if (dx > 0) prev();
    else next();
  };

  return (
    <div className="min-h-screen bg-brand">
      <section className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-brand-200">GALLERY</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
              犬舍画廊
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-brand-100/90">
              这里展示犬舍自家犬只与赛场/日常记录。不展示客人美容作品图。
            </p>
          </div>

          <div className="flex gap-2">
            <BrandButton href="/services" variant="outline">
              查看服务
            </BrandButton>
            <BrandButton href="/contact" variant="solid">
              合作 / 咨询
            </BrandButton>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const isActive = c.key === active;
            return (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={[
                  "rounded-full border px-3 py-1 text-xs font-semibold transition",
                  isActive
                    ? "border-brand-200 bg-brand-50 text-brand-900"
                    : "border-brand-200/60 bg-white/10 text-white hover:bg-white/15",
                ].join(" ")}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="mt-8 rounded-3xl bg-white/90 backdrop-blur shadow-soft ring-1 ring-black/5 p-4 md:p-6">
          {filtered.length === 0 ? (
            <div className="py-16 text-center text-sm text-ink-600">
              暂无照片。把图片放到 <span className="font-semibold">public/gallery/</span> 下对应分类文件夹即可。
            </div>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {filtered.map((it) => (
                <button
                  key={it.id}
                  onClick={() => setLightboxId(it.id)}
                  className="mb-4 w-full break-inside-avoid overflow-hidden rounded-2xl border border-ink-200 bg-white text-left shadow-sm transition hover:shadow-md"
                >
                  <div className="relative aspect-[4/5] w-full bg-ink-50">
                    <Image
                      src={it.src}
                      alt={it.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  {(it.title || it.note || it.date) && (
                    <div className="p-4">
                      {it.title ? (
                        <div className="text-sm font-semibold text-ink-900">{it.title}</div>
                      ) : null}
                      {it.note ? <div className="mt-1 text-xs text-ink-600">{it.note}</div> : null}
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="text-[11px] font-semibold text-ink-500">{it.category}</div>
                        {it.date ? <div className="text-[11px] text-ink-500">{it.date}</div> : null}
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {current ? (
        <div className="fixed inset-0 z-50">
          {/* overlay */}
          <button aria-label="Close" onClick={close} className="absolute inset-0 bg-black/70" />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
            <div
              className="pointer-events-auto w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-soft"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-ink-200 px-4 py-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-ink-900">
                    {current.title ?? "Gallery"}
                  </div>
                  <div className="mt-0.5 text-xs text-ink-600">
                    {current.category}
                    {filtered.length ? ` · ${currentIndex + 1} / ${filtered.length}` : ""}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="rounded-xl border border-ink-200 px-3 py-1 text-xs font-semibold text-ink-700 hover:bg-ink-50"
                    aria-label="Prev"
                    title="上一张（←）"
                  >
                    ←
                  </button>
                  <button
                    onClick={next}
                    className="rounded-xl border border-ink-200 px-3 py-1 text-xs font-semibold text-ink-700 hover:bg-ink-50"
                    aria-label="Next"
                    title="下一张（→）"
                  >
                    →
                  </button>
                  <button
                    onClick={close}
                    className="rounded-xl border border-ink-200 px-3 py-1 text-xs font-semibold text-ink-700 hover:bg-ink-50"
                    aria-label="Close"
                    title="关闭（Esc）"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Image area (更大) */}
              <div className="relative bg-ink-50">
                <div className="relative h-[80vh] w-full">
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              {/* Caption */}
              {current.note ? (
                <div className="border-t border-ink-200 px-4 py-3 text-sm text-ink-700">
                  {current.note}
                </div>
              ) : null}

              {/* Thumbs */}
              {filtered.length > 1 ? (
                <div className="border-t border-ink-200 bg-white px-4 py-3">
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {filtered.map((it) => {
                      const activeThumb = it.id === current.id;
                      return (
                        <button
                          key={it.id}
                          onClick={() => setLightboxId(it.id)}
                          className={[
                            "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition",
                            activeThumb
                              ? "border-brand-200 ring-2 ring-brand-200"
                              : "border-ink-200 hover:border-ink-300",
                          ].join(" ")}
                          aria-label={it.title ?? it.alt}
                          title={it.title ?? it.alt}
                        >
                          <Image src={it.src} alt={it.alt} fill className="object-cover" />
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-2 text-xs text-ink-500">
                    手机左右滑动切换｜键盘 ← → 切换｜Esc 关闭
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
