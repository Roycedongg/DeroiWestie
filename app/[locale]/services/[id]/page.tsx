import Link from "next/link";
import { notFound } from "next/navigation";
import { services, type Locale } from "@/data/services";

function formatMoneyCAD(n: number) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(n);
}

function minutesToText(min: number, locale: Locale) {
  if (locale === "zh") {
    if (min < 60) return `${min} 分钟`;
    const h = Math.floor(min / 60);
    const m = min % 60;
    return m ? `${h} 小时 ${m} 分钟` : `${h} 小时`;
  }

  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm text-ink-700">
      {items.map((d) => (
        <li key={d} className="flex gap-2">
          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-ink-300" />
          <span className="leading-relaxed">{d}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: rawLocale, id } = await params;
  const locale: Locale = rawLocale === "en" ? "en" : "zh";
  const base = `/${locale}`;

  const item = services.find((s) => s.id === id);
  if (!item) return notFound();

  const ui = {
    back: locale === "zh" ? "← 返回服务列表" : "← Back to services",
    includes: locale === "zh" ? "包含内容" : "What's included",
    recommendedFor: locale === "zh" ? "适合谁" : "Recommended for",
    notRecommendedFor: locale === "zh" ? "不适合谁" : "Not recommended for",
    freq: locale === "zh" ? "建议周期" : "Recommended frequency",
    freqHint:
      locale === "zh"
        ? "* 具体以毛量、生活环境与造型需求调整。"
        : "* Adjusted based on coat volume, lifestyle, and style goals.",
    notes: locale === "zh" ? "注意事项" : "Notes",
    book: locale === "zh" ? "预约（稍后接）" : "Book (coming soon)",
    consult: locale === "zh" ? "发照片咨询" : "Contact with photos",
    priceNote:
      locale === "zh"
        ? "* 价格/时长为参考，可能因体型、毛量、打结程度与配合度调整。"
        : "* Price/duration are estimates and may vary by size, coat volume, matting, and cooperation.",
  };

  // ✅ i18n fields
  const title = item.title[locale];
  const subtitle = item.subtitle?.[locale];
  const shortDesc = item.shortDesc[locale];

  const details = item.details?.[locale];
  const recommendedFor = item.recommendedFor?.[locale];
  const notRecommendedFor = item.notRecommendedFor?.[locale];
  const recommendedFrequency = item.recommendedFrequency?.[locale];
  const notes = item.notes?.[locale];

  return (
    <section className="mx-auto min-h-screen bg-brand px-4 py-14">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white/90 shadow-soft ring-1 ring-black/5 backdrop-blur">
        {/* simple hero */}
        <div className="h-48 bg-ink-50" />

        <div className="p-6 md:p-8">
          <Link href={`${base}/services`} className="text-sm font-semibold text-brand-800 hover:text-brand-900">
            {ui.back}
          </Link>

          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <h1 className="text-3xl font-bold tracking-tight text-ink-900">{title}</h1>
              {subtitle ? <p className="mt-2 text-sm text-ink-600">{subtitle}</p> : null}
            </div>

            <div className="rounded-2xl border border-ink-200 bg-white px-5 py-4 text-right">
              <div className="text-xl font-bold text-ink-900">{formatMoneyCAD(item.priceCAD)}</div>
              <div className="text-sm text-ink-500">{minutesToText(item.durationMin, locale)}</div>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-ink-700">{shortDesc}</p>

          {/* Includes */}
          {details?.length ? (
            <>
              <div className="mt-7 text-sm font-semibold text-ink-900">{ui.includes}</div>
              <BulletList items={details} />
            </>
          ) : null}

          {/* Recommended / Not recommended / Frequency */}
          {!!(recommendedFor?.length || notRecommendedFor?.length || recommendedFrequency) ? (
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {recommendedFor?.length ? (
                <div className="rounded-2xl border border-ink-200 bg-ink-50 p-5">
                  <div className="text-sm font-semibold text-ink-900">{ui.recommendedFor}</div>
                  <BulletList items={recommendedFor} />
                </div>
              ) : null}

              {notRecommendedFor?.length ? (
                <div className="rounded-2xl border border-ink-200 bg-ink-50 p-5">
                  <div className="text-sm font-semibold text-ink-900">{ui.notRecommendedFor}</div>
                  <BulletList items={notRecommendedFor} />
                </div>
              ) : null}

              {recommendedFrequency ? (
                <div className="rounded-2xl border border-ink-200 bg-ink-50 p-5">
                  <div className="text-sm font-semibold text-ink-900">{ui.freq}</div>
                  <p className="mt-3 text-sm text-ink-700">{recommendedFrequency}</p>
                  <p className="mt-2 text-xs text-ink-500">{ui.freqHint}</p>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Notes */}
          {notes?.length ? (
            <div className="mt-7 rounded-2xl border border-ink-200 bg-white p-5">
              <div className="text-sm font-semibold text-ink-900">{ui.notes}</div>
              <BulletList items={notes} />
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-2 md:flex-row">
            <Link
              href="#"
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {ui.book}
            </Link>
            <Link
              href={`${base}/contact`}
              className="inline-flex flex-1 items-center justify-center rounded-2xl border border-brand-200 bg-white/70 px-5 py-3 text-sm font-semibold text-brand-800 hover:bg-brand-50"
            >
              {ui.consult}
            </Link>
          </div>

          <p className="mt-4 text-xs text-ink-500">{ui.priceNote}</p>
        </div>
      </div>
    </section>
  );
}
