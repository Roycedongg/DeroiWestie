import Image from "next/image";
import type { Metadata } from "next";
import { kennelDogs, type Locale, type KennelDog } from "@/data/kennelDogs";

type Params = { locale: Locale };

export const metadata: Metadata = {
  title: "DeRoi Westie | Kennel",
  description: "DeRoi Westie kennel dogs — studs & brood bitches.",
};

function getText(locale: Locale) {
  return locale === "zh"
    ? {
        title: "犬舍种公 / 种母",
        subtitle:
          "我们更关注结构、性格与毛质的稳定性。每一只犬只都以健康与品质为第一优先。",
        studs: "种公",
        bitches: "种母",
        pedigree: "血统 / 父母奖项",
        titles: "自身奖项",
      }
    : {
        title: "Studs & Brood Bitches",
        subtitle:
          "We prioritize structure, temperament, and consistent harsh coat quality—health and quality come first.",
        studs: "Studs",
        bitches: "Brood Bitches",
        pedigree: "Pedigree (Sire & Dam)",
        titles: "Titles & Achievements",
      };
}

function Section({
  locale,
  label,
  dogs,
}: {
  locale: Locale;
  label: string;
  dogs: KennelDog[];
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg md:text-xl font-semibold tracking-tight text-white">
        {label}
      </h2>

      <div className="space-y-6">
        {dogs.map((dog) => (
          <article
            key={dog.id}
            className="rounded-2xl border border-black/5 bg-white p-5 md:p-6"
          >
            <div className="flex flex-col md:flex-row gap-5 md:gap-8">
              {/* Left: text */}
              <div className="md:flex-1 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg text-zinc-600 font-semibold leading-snug">
                    {dog.name[locale]}
                  </h3>

                  {dog.callName?.[locale] && (
                    <p className="text-sm text-neutral-600">
                      {locale === "zh" ? "昵称：" : "Call name: "}
                      <span className="font-medium text-neutral-900">
                        {dog.callName[locale]}
                      </span>
                    </p>
                  )}

                  {dog.highlight?.[locale] && (
                    <p className="text-sm leading-relaxed text-neutral-700">
                      {dog.highlight[locale]}
                    </p>
                  )}
                </div>

                <div className="grid gap-5">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-neutral-900">
                      {locale === "zh"
                        ? "血统 / 父母奖项"
                        : "Pedigree (Sire & Dam)"}
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed text-neutral-700">
                      {dog.pedigree[locale].map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-neutral-900">
                      {locale === "zh"
                        ? "自身奖项"
                        : "Titles & Achievements"}
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed text-neutral-700">
                      {dog.titles[locale].map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right: photo (bigger) */}
              <div className="w-full md:w-[420px] shrink-0">
                <div className="relative h-72 md:h-[620px] w-full overflow-hidden rounded-2xl border border-black/5 bg-neutral-50">
                  <Image
                    src={dog.image.src}
                    alt={dog.image.alt[locale]}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default async function KennelPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "en" ? "en" : "zh";
  const t = getText(locale);

  const studs = kennelDogs.filter((d) => d.sex === "male");
  const bitches = kennelDogs.filter((d) => d.sex === "female");

  return (
    <div className="bg-brand">
      <main className="mx-auto max-w-6xl px-4 py-10 md:py-14 space-y-12">
        <header className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
            {t.title}
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-white/80">
            {t.subtitle}
          </p>
        </header>

<Section locale={locale} label={t.bitches} dogs={bitches} />
<Section locale={locale} label={t.studs} dogs={studs} />

      </main>
    </div>
  );
}
