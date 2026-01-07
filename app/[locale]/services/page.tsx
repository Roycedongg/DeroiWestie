import Image from "next/image";
import Link from "next/link";
import { services, serviceCategories, type Locale } from "@/data/services";
import { BOOKING_URL } from "@/lib/booking";

function formatMoneyCAD(n: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(n);
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

function BulletList({
  items,
  limit,
  showMoreHint,
  locale,
}: {
  items?: string[];
  limit?: number;
  showMoreHint?: boolean;
  locale: Locale;
}) {
  if (!items?.length) return null;

  const shown = typeof limit === "number" ? items.slice(0, limit) : items;
  const rest = typeof limit === "number" ? items.length - shown.length : 0;

  return (
    <div>
      <ul className="mt-3 space-y-2 text-sm text-ink-700">
        {shown.map((d) => (
          <li key={d} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-ink-300" />
            <span className="leading-relaxed">{d}</span>
          </li>
        ))}
      </ul>

      {showMoreHint && rest > 0 && (
        <div className="mt-2 text-xs text-ink-500">
          {locale === "zh" ? `+${rest} 项（展开查看更多）` : `+${rest} items (expand to view all)`}
        </div>
      )}
    </div>
  );
}

function ChipList({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((t) => (
        <span
          key={t}
          className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-900"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "en" ? "en" : "zh";
  const base = `/${locale}`;

  const ui = {
    eyebrow: locale === "zh" ? "服务" : "SERVICES",
    title: locale === "zh" ? "服务项目" : "Services",
    subtitle:
      locale === "zh"
        ? "点击条目展开查看完整内容。价格与时长可能因毛量、打结与配合度调整。"
        : "Click an item to expand full details. Price and duration may vary based on coat volume, matting, and cooperation.",
    consult: locale === "zh" ? "先咨询" : "Contact first",
    book: locale === "zh" ? "立即预约" : "Book now",
    includes: locale === "zh" ? "包含内容" : "What's included",
    toggleHint: locale === "zh" ? "点击展开 / 收起" : "Click to expand / collapse",
    recommendedFor: locale === "zh" ? "适合" : "Recommended for",
    notRecommendedFor: locale === "zh" ? "不建议" : "Not recommended for",
    freqLabel: locale === "zh" ? "建议频率：" : "Recommended frequency: ",
    notes: locale === "zh" ? "备注" : "Notes",
    bookingNote:
      locale === "zh"
        ? "* 预约将跳转至 Google Calendar 进行时间选择与确认"
        : "* Booking will redirect to Google Calendar for time selection and confirmation",
    priceNote:
      locale === "zh"
        ? "* 价格与时长为参考，可能因体型、毛量、打结程度与配合度调整"
        : "* Price and duration are estimates and may vary by size, coat volume, matting, and cooperation",
  };

  return (
    <div className="min-h-screen bg-brand">
      <section className="mx-auto max-w-5xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-brand-200">
              {ui.eyebrow}
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
              {ui.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-brand-100/90">
              {ui.subtitle}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center rounded-2xl border border-brand-200 bg-white/70 px-4 py-2.5 text-sm font-semibold text-brand-800 hover:bg-brand-50"
            >
              {ui.consult}
            </Link>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              {ui.book}
            </a>
          </div>
        </div>

        {/* Groups */}
        <div className="mt-8 space-y-6">
          {serviceCategories.map((cat) => {
            const items = services.filter((s) => s.category === cat.key);
            if (!items.length) return null;

            const catLabel = cat.label[locale];
            const catDesc = cat.desc?.[locale];
            const catTips = cat.tips?.[locale];

            return (
              <div
                key={cat.key}
                className="rounded-3xl bg-white/90 backdrop-blur shadow-soft ring-1 ring-black/5"
              >
                {/* Group header */}
                <div className="p-6 md:p-7">
                  <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                      <div className="text-lg font-bold text-ink-900">
                        {catLabel}
                      </div>
                      {catDesc && (
                        <div className="mt-1 text-sm text-ink-600">{catDesc}</div>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-ink-500">
                      {locale === "zh" ? `${items.length} 项` : `${items.length} items`}
                    </div>
                  </div>

                  {!!catTips?.length && <ChipList items={catTips} />}
                </div>

                {/* Items */}
                <div className="border-t border-ink-200/70">
                  {items.map((s, idx) => {
                    const title = s.title[locale];
                    const subtitle = s.subtitle?.[locale];
                    const shortDesc = s.shortDesc?.[locale];

                    const details = s.details?.[locale];
                    const recommendedFor = s.recommendedFor?.[locale];
                    const notRecommendedFor = s.notRecommendedFor?.[locale];
                    const notes = s.notes?.[locale];
                    const recommendedFrequency = s.recommendedFrequency?.[locale];

                    return (
                      <details
                        key={s.id}
                        className={idx === 0 ? "" : "border-t border-ink-200/70"}
                      >
                        <summary className="cursor-pointer list-none px-6 py-4 md:px-7">
                          <div className="flex items-start justify-between gap-4">
                            {/* Left */}
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-ink-900">
                                {title}
                              </div>
                              <div className="mt-1 text-sm text-ink-600">
                                {subtitle ?? shortDesc ?? ""}
                              </div>

                              {!!details?.length && (
                                <div className="pointer-events-none mt-5">
                                  <div className="text-sm font-semibold text-ink-900">
                                    {ui.includes}
                                  </div>
                                  <BulletList
                                    items={details}
                                    limit={3}
                                    showMoreHint
                                    locale={locale}
                                  />
                                </div>
                              )}

                              <div className="mt-3 text-xs font-semibold text-ink-500">
                                {ui.toggleHint}
                              </div>
                            </div>

                            {/* Right */}
                            <div className="shrink-0">
                              <div className="flex items-start gap-3">
                                {s.thumb && (
                                  <div className="relative h-44 w-44 overflow-hidden rounded-xl border border-ink-200 bg-ink-50">
                                    <Image
                                      src={s.thumb}
                                      alt={title}
                                      fill
                                      sizes="176px"
                                      className="object-cover"
                                    />
                                  </div>
                                )}

                                <div className="text-right">
                                  <div className="text-sm font-bold text-ink-900">
                                    {formatMoneyCAD(s.priceCAD)}
                                  </div>
                                  <div className="text-xs text-ink-500">
                                    {minutesToText(s.durationMin, locale)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </summary>

                        {/* Expanded */}
                        <div className="px-6 pb-6 md:px-7">
                          {!!recommendedFor?.length && (
                            <>
                              <div className="mt-5 text-sm font-semibold text-ink-900">
                                {ui.recommendedFor}
                              </div>
                              <ChipList items={recommendedFor} />
                            </>
                          )}

                          {!!notRecommendedFor?.length && (
                            <>
                              <div className="mt-5 text-sm font-semibold text-ink-900">
                                {ui.notRecommendedFor}
                              </div>
                              <ChipList items={notRecommendedFor} />
                            </>
                          )}

                          {!!recommendedFrequency && (
                            <div className="mt-5 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-ink-700">
                              <span className="font-semibold text-brand-900">
                                {ui.freqLabel}
                              </span>
                              {recommendedFrequency}
                            </div>
                          )}

                          {!!notes?.length && (
                            <>
                              <div className="mt-5 text-sm font-semibold text-ink-900">
                                {ui.notes}
                              </div>
                              <BulletList items={notes} locale={locale} />
                            </>
                          )}

                          {/* Booking */}
                          <div className="mt-6 flex flex-col gap-2 md:flex-row">
                            <a
                              href={BOOKING_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-700"
                            >
                              {ui.book}
                            </a>

                            <Link
                              href={`${base}/contact`}
                              className="inline-flex flex-1 items-center justify-center rounded-2xl border border-brand-200 bg-white/70 px-5 py-3 text-sm font-semibold text-brand-800 hover:bg-brand-50"
                            >
                              {ui.consult}
                            </Link>
                          </div>

                          <p className="mt-2 text-xs text-ink-500">{ui.bookingNote}</p>
                          <p className="mt-2 text-xs text-ink-500">{ui.priceNote}</p>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
