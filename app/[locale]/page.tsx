import Link from "next/link";
import Image from "next/image";
import { BOOKING_URL } from "@/lib/booking";
import { knewave } from "@/app/fonts";

function Pill({
  children,
  variant = "dark",
}: {
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  const cls =
    variant === "dark"
      ? "inline-flex items-center rounded-full border border-brand-200 bg-white/15 px-3 py-1 text-xs font-semibold text-white"
      : "inline-flex items-center rounded-full border border-brand-200 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand-900";
  return <span className={cls}>{children}</span>;
}

function Card({
  title,
  desc,
  href,
  cta,
}: {
  title: string;
  desc: string;
  href: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl bg-white p-6 shadow-soft ring-1 ring-black/5 transition hover:bg-ink-50/40"
    >
      <div className="text-base font-bold text-ink-900">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-ink-600">{desc}</div>
      <div className="mt-4 text-sm font-semibold text-brand-900 group-hover:underline">
        {cta} →
      </div>
    </Link>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";
  const base = isEn ? "/en" : "/zh";

  const t = {
    subtitle: isEn
      ? "Kennel · Show · Professional Grooming"
      : "犬舍 · 赛犬 · 专业护理",

    intro: isEn ? (
      <>
        <p>
          We specialize in coat quality and silhouette management for West
          Highland White Terriers and other wire-coated terriers.
        </p>
        <p className="mt-2">
          Our services include hand-stripping, routine coat maintenance, bath &
          tidy, and full grooming.
        </p>
        <p className="mt-2">
          With years of kennel and show experience, we focus on structure,
          consistency, and long-term coat health.
        </p>
      </>
    ) : (
      <>
        <p>
          专注西高地等刚毛梗犬的毛质与轮廓管理，提供手拔毛开荒与周期维护、洗护修整及全剪造型服务。
        </p>
        <p className="mt-2">
          我们拥有多年犬舍与赛犬经验，注重结构、血统与长期护理规划，希望每一次护理都更稳定、更细腻、更舒适。
        </p>
      </>
    ),

    note: isEn
      ? "* Booking will redirect to Google Calendar for time selection and confirmation."
      : "* 预约将跳转至 Google Calendar 进行时间选择与确认",

    book: isEn ? "Book an Appointment" : "立即预约",
    services: isEn ? "View Services" : "查看服务项目",
    gallery: isEn ? "Gallery" : "犬舍画廊",

    cards: {
      services: {
        title: isEn ? "Services" : "服务项目",
        desc: isEn
          ? "Hand-stripping, routine coat maintenance, bath & tidy, full grooming, and puppy adaptation. Tap for details and frequency."
          : "手拔毛开荒与周期维护、洗护修整、全剪造型与幼犬适应。点开条目可查看包含内容与建议频率。",
        cta: isEn ? "View Services" : "查看服务",
      },
      gallery: {
        title: isEn ? "Gallery" : "犬舍画廊",
        desc: isEn
          ? "Kennel dogs only — breeding dogs, puppies, shows, and daily training moments. Click photos to zoom."
          : "只展示犬舍自家犬只：种犬、幼犬、赛场与训练日常。点击图片可放大查看细节。",
        cta: isEn ? "Enter Gallery" : "进入画廊",
      },
      contact: {
        title: isEn ? "Contact & Collaboration" : "联系与合作",
        desc: isEn
          ? "Coat checks, grooming plans, or adoption? Send photos first for a quick assessment."
          : "想确认毛况、咨询犬种护理方案、或领养幼犬？欢迎沟通。",
        cta: isEn ? "Contact" : "去联系",
      },
    },

    why: {
      focusTitle: isEn ? "Coat & Silhouette" : "刚毛毛质与轮廓",
      focusDesc: isEn
        ? "For wire-coated terriers, maintaining coat texture and silhouette is a long-term system. A stable cycle saves time and improves results."
        : "对西高地等刚毛梗犬而言，“保毛质”与“稳轮廓”是长期系统工程。周期越稳定，时间越省、效果越精细。",
      comfortTitle: isEn ? "Comfort First" : "更温和的流程",
      comfortDesc: isEn
        ? "Fear Free Certified Groomer — prioritizing comfort, communication, and low-stress handling. We adjust pace to each dog’s state."
        : "Fear Free Certified Groomer🥇，以舒适与沟通为优先：按犬只状态安排节奏，必要时可分次完成或调整方案，让体验更可持续。",
      qualityTitle: isEn ? "Consistency & Detail" : "细节与一致性",
      qualityDesc: isEn
        ? "From expression to topline and skirt layers, we pursue photo-ready details and long-term consistency."
        : "从头部表情、肩背过渡到裙摆层次，追求“照片里也站得住”的细节呈现，并保持长期一致性。",
      ctaPrimary: isEn ? "Book an Appointment" : "立即预约",
      ctaSecondary: isEn ? "Services & Pricing" : "先看服务与价格",
    },

    footer: {
      title: isEn
        ? "Want to confirm coat condition or service type first?"
        : "想先确认毛况 / 服务类型？",
      desc: isEn
        ? "Send photos + a brief description (breed/age/last grooming/target style). I’ll suggest a suitable plan and cycle."
        : "发照片 + 简单描述（犬种/年龄/上次护理时间/目标风格），我会给你建议方案与周期。",
      btn1: isEn ? "Contact" : "去联系",
      btn2: isEn ? "Book Now" : "直接预约",
    },
  };

  return (
    <div className="min-h-screen bg-brand">
      {/* HERO */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Left */}
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill variant="light">West Highland White Terrier</Pill>
                <Pill variant="light">Kennel • Show • Grooming</Pill>
                <Pill variant="light">Richmond / Vancouver</Pill>
              </div>

              <h1
                className={`${knewave.className} mt-5 text-4xl leading-[0.95] tracking-tight text-ink-900 md:text-6xl`}
              >
                Welcome to <br />DeRoi Westie
              </h1>

              <div className="mt-3 text-base font-semibold text-zinc-300 text-ink-800 md:text-xl">
                {t.subtitle}
              </div>

              <div className="mt-4 max-w-xl text-sm leading-relaxed text-ink-600 md:text-base">
                {t.intro}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  {t.book}
                </a>

                <Link
                  href={`${base}/services`}
                  className="inline-flex items-center justify-center rounded-2xl border border-ink-900/15 bg-white px-5 py-3 text-sm font-semibold text-ink-900 transition hover:bg-ink-50"
                >
                  {t.services}
                </Link>

                <Link
                  href={`${base}/gallery`}
                  className="inline-flex items-center justify-center rounded-2xl border border-ink-900/15 bg-white px-5 py-3 text-sm font-semibold text-ink-900 transition hover:bg-ink-50"
                >
                  {t.gallery}
                </Link>
              </div>

              <p className="mt-3 text-xs text-ink-500">{t.note}</p>
            </div>

            {/* Right */}
            <div className="relative md-scale:0.5">
              <div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-black/10">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/home/hero.jpg"
                    alt="DeRoi Westie"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm font-semibold text-ink-900">
                    Rollies · Westie
                  </div>
                  <div className="mt-1 text-xs text-ink-600">
                    {isEn
                      ? "Show / Training / Daily care — kennel dogs only"
                      : "Show / Training / Daily care — 记录犬舍自家犬只"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick cards */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="grid gap-4 md:grid-cols-3">
          <Card
            title={t.cards.services.title}
            desc={t.cards.services.desc}
            href={`${base}/services`}
            cta={t.cards.services.cta}
          />
          <Card
            title={t.cards.gallery.title}
            desc={t.cards.gallery.desc}
            href={`${base}/gallery`}
            cta={t.cards.gallery.cta}
          />
          <Card
            title={t.cards.contact.title}
            desc={t.cards.contact.desc}
            href={`${base}/contact`}
            cta={t.cards.contact.cta}
          />
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-black/5 backdrop-blur md:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className={`${knewave.className} text-sm font-semibold text-brand-900`}>
                Focus
              </div>
              <div
                className={`${knewave.className} mt-2 text-lg font-bold text-ink-900`}
              >
                {t.why.focusTitle}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {t.why.focusDesc}
              </p>
            </div>

            <div>
              <div className={`${knewave.className} text-sm font-semibold text-brand-900`}>
                Comfort
              </div>
              <div
                className={`${knewave.className} mt-2 text-lg font-bold text-ink-900`}
              >
                {t.why.comfortTitle}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {t.why.comfortDesc}
              </p>
            </div>

            <div>
              <div className={`${knewave.className} text-sm font-semibold text-brand-900`}>
                Quality
              </div>
              <div
                className={`${knewave.className} mt-2 text-lg font-bold text-ink-900`}
              >
                {t.why.qualityTitle}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {t.why.qualityDesc}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              {t.why.ctaPrimary}
            </a>
            <Link
              href={`${base}/services`}
              className="inline-flex items-center justify-center rounded-2xl border border-brand-200 bg-white/70 px-5 py-3 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
            >
              {t.why.ctaSecondary}
            </Link>
          </div>

          <p className="mt-3 text-xs text-ink-500">{t.note}</p>
        </div>
      </section>

      {/* FOOTER CTA strip */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-soft backdrop-blur md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-lg font-bold">{t.footer.title}</div>
              <div className="mt-1 text-sm text-brand-100/90">
                {t.footer.desc}
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href={`${base}/contact`}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
              >
                {t.footer.btn1}
              </Link>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                {t.footer.btn2}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
