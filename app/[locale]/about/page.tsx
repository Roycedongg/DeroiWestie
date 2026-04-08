import Link from "next/link";
import type { Metadata } from "next";
import { BOOKING_URL } from "@/lib/booking";
import { getSiteUrl } from "@/lib/site";

type Locale = "zh" | "en";

function t(locale: Locale, zh: string, en: string) {
  return locale === "zh" ? zh : en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "en" ? "en" : "zh";
  const siteUrl = getSiteUrl();

  return {
    title:
      locale === "zh"
        ? "About DeRoi Westie | Richmond / Vancouver 宠物美容"
        : "About DeRoi Westie | Pet Grooming in Richmond & Vancouver",
    description:
      locale === "zh"
        ? "了解 DeRoi Westie：我们提供 Richmond / Vancouver 宠物美容、梗犬手拔毛、全犬种洗护与造型服务，并坚持 fear-free、专业、长期护理导向。"
        : "Learn about DeRoi Westie, offering pet grooming in Richmond and Vancouver, including terrier hand stripping, all breed grooming, and fear-free professional handling.",
    alternates: {
      canonical: `${siteUrl}/${locale}/about`,
      languages: {
        "zh-CN": `${siteUrl}/zh/about`,
        en: `${siteUrl}/en/about`,
      },
    },
    keywords:
      locale === "zh"
        ? ["Richmond 宠物美容", "Vancouver 宠物美容", "梗犬手拔毛", "全犬种美容", "Fear Free 美容师"]
        : [
            "pet grooming in Richmond",
            "pet grooming Vancouver",
            "terrier hand stripping",
            "all breed grooming",
            "fear-free groomer",
          ],
  };
}

function InfoCard({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section className="rounded-[2rem] bg-white/95 px-6 py-10 shadow-soft ring-1 ring-black/5 backdrop-blur md:px-10 md:py-14">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold tracking-tight text-ink-900 md:text-3xl">{title}</h2>
        <p className="mt-5 text-sm leading-8 text-ink-700 md:text-base">{body}</p>
      </div>
    </section>
  );
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "en" ? "en" : "zh";
  const base = `/${locale}`;

  const copy = {
    eyebrow: "ABOUT",
    title: t(locale, "关于 DeRoi Westie", "About DeRoi Westie"),
    intro: t(
      locale,
      "DeRoi Westie 位于 Richmond / Vancouver, BC，提供宠物美容服务，重点包括梗犬手拔毛、全犬种洗护与造型，以及更稳定、更低压力的护理流程。",
      "DeRoi Westie is based in Richmond and Vancouver, BC, offering pet grooming that includes terrier hand stripping, all breed grooming, and a more stable, low-stress care process."
    ),
    body1Title: t(locale, "我们的重点", "What We Focus On"),
    body1: t(
      locale,
      "我们尤其擅长西高地等刚毛梗犬的毛质与轮廓管理。对这类犬种而言，手拔毛不是单次处理，而是一套长期维护系统。我们也为其他犬种提供日常洗护、修整与全剪造型服务，根据犬只毛况、生活方式和目标风格给出更合适的建议。",
      "We specialize in coat texture and silhouette management for Westies and other wire-coated terriers. For these breeds, hand stripping is not a one-time task but part of a long-term system. We also offer bath and tidy, routine maintenance, and full grooming for all breeds, with recommendations based on coat condition, lifestyle, and styling goals."
    ),
    body2Title: t(locale, "Fear-Free 与专业流程", "Fear-Free and Professional Handling"),
    body2: t(
      locale,
      "我们重视 Fear Free 理念，尽量降低犬只在美容过程中的压力。节奏、接触方式和处理顺序都会根据犬只当天状态调整。专业不只是做得漂亮，也包括让狗更愿意合作、让护理可以长期持续。",
      "We value a fear-free approach and work to reduce stress throughout the grooming process. Pace, handling style, and service flow are adjusted to each dog's condition that day. Professional grooming is not only about the final look. It is also about making the dog more comfortable and building a routine that can be maintained long term."
    ),
    body3Title: t(locale, "服务区域与适合对象", "Service Area and Who We Work With"),
    body3: t(
      locale,
      "我们主要服务 Richmond 与 Vancouver 一带的养犬家庭，既欢迎想为梗犬建立正确护理周期的主人，也欢迎需要高质量日常美容、全犬种洗护与造型服务的客户。如果你不确定应该做手拔毛、维护还是全剪，也可以先联系我们做基础评估。",
      "We primarily serve dog owners in Richmond and Vancouver. This includes terrier owners who want to build a correct grooming cycle, as well as clients looking for high-quality all breed grooming, bath and tidy, and full styling. If you are unsure whether your dog needs hand stripping, maintenance, or a full groom, start with a basic assessment."
    ),
    note: t(
      locale,
      "想先确认服务方向？可以先发照片和狗狗信息，我们会建议更合适的护理方式。",
      "Need help choosing the right service? Send photos and a few details about your dog, and we can recommend the best grooming approach."
    ),
    primary: t(locale, "查看服务", "View Services"),
    secondary: t(locale, "联系咨询", "Contact"),
    book: t(locale, "立即预约", "Book Now"),
  };

  return (
    <div className="min-h-screen bg-brand">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%)]">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold tracking-[0.28em] text-brand-200">{copy.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-brand-100/90 md:text-lg">
              {copy.intro}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              Richmond / Vancouver
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              Terrier Hand Stripping
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              All Breed Grooming
            </span>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
              Fear-Free Handling
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="space-y-6 md:space-y-8">
          <InfoCard title={copy.body1Title} body={copy.body1} />
          <InfoCard title={copy.body2Title} body={copy.body2} />
          <InfoCard title={copy.body3Title} body={copy.body3} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 md:pb-20">
        <div className="rounded-[2rem] border border-white/20 bg-white/10 px-6 py-10 text-white shadow-soft backdrop-blur md:px-10 md:py-14">
          <div className="max-w-3xl">
            <p className="text-base leading-8 text-brand-100/95 md:text-lg">{copy.note}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`${base}/services`}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-brand-900 transition hover:bg-brand-50"
            >
              {copy.primary}
            </Link>
            <Link
              href={`${base}/contact`}
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              {copy.secondary}
            </Link>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              {copy.book}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
