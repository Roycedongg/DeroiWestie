"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { showResults, type ShowResult, type Locale } from "@/data/results";
import { usePathname } from "next/navigation";


function t(locale: Locale, zh: string, en: string) {
  return locale === "zh" ? zh : en;
}

function formatDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${y}.${m}.${d}`;
}

function getYear(date: string) {
  return date.slice(0, 4);
}

function sortResults(a: ShowResult, b: ShowResult) {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1;
  return a.id.localeCompare(b.id);
}

function isPinnedHighlight(r: ShowResult) {
  return r.tier === "HIGHLIGHT";
}

export default function ResultsClient({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "";
  const activeLocale: Locale =
    pathname.startsWith("/en") ? "en" : pathname.startsWith("/zh") ? "zh" : locale;
  const base = `/${activeLocale}`;

  const ui = {
    eyebrow: "RESULTS",
    title: t(activeLocale, "比赛战绩", "Show Results"),
    subtitle: t(
      activeLocale,
      "高光战绩置顶，其他记录按年份归档。后面你如果要放照片/视频，我们会把每条战绩联动到 Gallery。",
      "Highlights are pinned on top, and the rest are archived by year. Later we can link each result to the Gallery with photos/videos."
    ),
    viewServices: t(activeLocale, "查看服务", "View Services"),
    goGallery: t(activeLocale, "去作品集", "Go to Gallery"),

    dogLabel: t(activeLocale, "犬只", "Dog"),
    searchLabel: t(activeLocale, "搜索", "Search"),
    searchPlaceholder: t(
      activeLocale,
      "搜索：BIS / BOG / 评审 / 地点 / 标题…",
      "Search: BIS / BOG / judge / location / title…"
    ),

    highlightTitle: t(activeLocale, "高光大赛", "Highlights"),
    normalTitle: t(activeLocale, "地方比赛", "Local Shows"),
    emptyHighlight: t(
      activeLocale,
      "暂无高光战绩（你可以在 data/results.ts 里把 tier 设为 HIGHLIGHT，或加上 BIS/BOG/BOB tag）。",
      "No highlights yet (set tier to HIGHLIGHT in data/results.ts, or add BIS/BOG/BOB tags)."
    ),
    emptyNormal: t(activeLocale, "暂无普通战绩。", "No normal results yet."),

    timelineTitle: t(activeLocale, "时间线", "Timeline"),
    emptyTimeline: t(activeLocale, "当前筛选下暂无记录。", "No records under current filters."),

    badgeHighlight: t(activeLocale, "高光", "Highlight"),
    badgeNormal: t(activeLocale, "普通", "Normal"),
    judgeLabel: t(activeLocale, "审查：", "Judge: "),

    countRecords: (total: number, hi: number) =>
      activeLocale === "zh" ? `${total} 条记录 · ${hi} 条高光` : `${total} records · ${hi} highlights`,
    countItems: (n: number) => (activeLocale === "zh" ? `${n} 条` : `${n} items`),
  };

  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt?: string }[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const [dogFilter, setDogFilter] = useState<string>("All");
  const [query, setQuery] = useState<string>("");

  const sortedAll = useMemo(() => [...showResults].sort(sortResults), []);
  const dogs = useMemo(() => {
    const set = new Set(sortedAll.map((r) => r.dogName).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [sortedAll]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sortedAll.filter((r) => {
      if (dogFilter !== "All" && r.dogName !== dogFilter) return false;
      if (!q) return true;

      const hay = [
        r.title[activeLocale],
        r.dogName,
        r.location ?? "",
        r.judge ?? "",
        ...(r.tags ?? []),
        ...(r.highlights[activeLocale] ?? []),
        ...(r.images?.map((img) => img.alt?.[activeLocale] ?? "") ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return hay.includes(q);
    });
  }, [sortedAll, dogFilter, query, activeLocale]);

  const highlights = useMemo(() => filtered.filter(isPinnedHighlight), [filtered]);
  const normal = useMemo(() => filtered.filter((r) => !isPinnedHighlight(r)), [filtered]);

  const renderResultCard = (r: ShowResult, badgeText?: string) => (
    <div key={r.id} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-zinc-500">{formatDate(r.date)}</div>
          <div className="mt-1 text-lg font-bold text-zinc-900">{r.title[activeLocale]}</div>
          <div className="mt-1 text-sm text-zinc-600">
            {r.dogName}
            {r.location ? <span className="text-zinc-400"> · </span> : null}
            {r.location ?? ""}
          </div>
        </div>

        {badgeText ? (
          <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
            {badgeText}
          </span>
        ) : null}
      </div>

      {r.images?.length ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {r.images.map((img, idx) => (
            <button
              key={img.src}
              type="button"
              onClick={() => {
                setLightboxImages(r.images!.map((x) => ({ src: x.src, alt: x.alt?.[activeLocale] })));
                setLightboxIndex(idx);
              }}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-zinc-200 focus:outline-none"
            >
              <Image
                src={img.src}
                alt={img.alt?.[activeLocale] ?? r.title[activeLocale]}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}

      {r.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {r.tags.map((tt) => (
            <span
              key={tt}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700"
            >
              {tt}
            </span>
          ))}
        </div>
      ) : null}

      <ul className="mt-4 space-y-2 text-sm text-zinc-700">
        {r.highlights[activeLocale].map((h) => (
          <li key={h} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-zinc-400" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {r.judge ? <div className="mt-4 text-xs text-zinc-500">{ui.judgeLabel}{r.judge}</div> : null}
    </div>
  );

  const groupedByYear = useMemo(() => {
    const map = new Map<string, ShowResult[]>();
    for (const r of filtered) {
      const y = getYear(r.date);
      if (!map.has(y)) map.set(y, []);
      map.get(y)!.push(r);
    }
    for (const [y, arr] of map) map.set(y, [...arr].sort(sortResults));
    return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [filtered]);

  return (
    <div className="min-h-screen bg-brand">
      <section className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-zinc-300">{ui.eyebrow}</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">{ui.title}</h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-300">{ui.subtitle}</p>
          </div>

          <div className="flex gap-2">
            <Link
              href={`${base}/services`}
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-600 font-semibold hover:bg-zinc-50"
            >
              {ui.viewServices}
            </Link>
            <Link
              href={`${base}/gallery`}
              className="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
            >
              {ui.goGallery}
            </Link>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6 grid gap-3 md:grid-cols-12">
          <div className="md:col-span-3">
            <label className="text-xs font-semibold text-zinc-300">{ui.dogLabel}</label>
            <select
              value={dogFilter}
              onChange={(e) => setDogFilter(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-900 outline-none hover:bg-zinc-50"
            >
              {dogs.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-9">
            <label className="text-xs font-semibold text-zinc-300">{ui.searchLabel}</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={ui.searchPlaceholder}
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-300"
            />
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-7">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-white">{ui.highlightTitle}</div>
            <div className="text-xs text-zinc-300">{ui.countRecords(filtered.length, highlights.length)}</div>
          </div>

          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {highlights.length === 0 ? (
              <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
                {ui.emptyHighlight}
              </div>
            ) : (
              highlights.map((r) => renderResultCard(r, ui.badgeHighlight))
            )}
          </div>
        </div>

        {/* Normal */}
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-white">{ui.normalTitle}</div>
            <div className="text-xs text-zinc-300">{ui.countItems(normal.length)}</div>
          </div>

          <div className="mt-3 grid gap-4 md:grid-cols-2">
            {normal.length === 0 ? (
              <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
                {ui.emptyNormal}
              </div>
            ) : (
              normal.map((r) => renderResultCard(r, ui.badgeNormal))
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-10">
          <div className="text-sm font-semibold text-white">{ui.timelineTitle}</div>

          {groupedByYear.length === 0 ? (
            <div className="mt-3 rounded-3xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600">
              {ui.emptyTimeline}
            </div>
          ) : (
            <div className="mt-4 space-y-8">
              {groupedByYear.map(([year, items]) => (
                <div key={year}>
                  <div className="flex items-center gap-3">
                    <div className="text-xl font-bold text-white">{year}</div>
                    <div className="h-px flex-1 bg-zinc-200/40" />
                    <div className="text-xs text-zinc-300">{ui.countItems(items.length)}</div>
                  </div>

                  <div className="mt-4 grid gap-4">
                    {items.map((r) => (
                      <div key={r.id} className="rounded-3xl border border-zinc-200 bg-white p-6">
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div>
                            <div className="text-xs font-semibold text-zinc-500">{formatDate(r.date)}</div>
                            <div className="mt-1 text-lg font-bold text-zinc-900">{r.title[activeLocale]}</div>
                            <div className="mt-1 text-sm text-zinc-600">
                              {r.dogName}
                              {r.location ? <span className="text-zinc-400"> · </span> : null}
                              {r.location ?? ""}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 md:justify-end">
                            {isPinnedHighlight(r) ? (
                              <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700">
                                {ui.badgeHighlight}
                              </span>
                            ) : null}
                            {r.tags?.length
                              ? r.tags.slice(0, 4).map((tt) => (
                                  <span
                                    key={tt}
                                    className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700"
                                  >
                                    {tt}
                                  </span>
                                ))
                              : null}
                          </div>
                        </div>

                        <ul className="mt-4 space-y-2 text-sm text-zinc-700">
                          {r.highlights[activeLocale].map((h) => (
                            <li key={h} className="flex gap-2">
                              <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-zinc-400" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>

                        {r.judge ? <div className="mt-4 text-xs text-zinc-500">{ui.judgeLabel}{r.judge}</div> : null}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox */}
        {lightboxImages ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setLightboxImages(null)}>
            <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
              <Image
                src={lightboxImages[lightboxIndex].src}
                alt={lightboxImages[lightboxIndex].alt ?? "Result image"}
                width={1600}
                height={1200}
                className="max-h-[90vh] w-auto rounded-xl object-contain"
              />

              <button
                onClick={() => setLightboxImages(null)}
                className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-sm font-semibold text-white"
              >
                ✕
              </button>

              {lightboxIndex > 0 ? (
                <button
                  onClick={() => setLightboxIndex((i) => i - 1)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 px-4 py-2 text-3xl text-white"
                >
                  ‹
                </button>
              ) : null}

              {lightboxIndex < lightboxImages.length - 1 ? (
                <button
                  onClick={() => setLightboxIndex((i) => i + 1)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 text-3xl text-white"
                >
                  ›
                </button>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
