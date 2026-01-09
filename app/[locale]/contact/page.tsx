"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOOKING_URL } from "@/lib/booking";

type Locale = "zh" | "en";

const CONTACT = {
  brandName: "DeRoi Westie",
  email: "deroiwestie@gmail.com",
  wechat: "502966909",
  instagram: "https://instagram.com/_rroyce.d",
  xhs: "https://www.xiaohongshu.com/user/profile/W502966909",
  facebook: "https://www.facebook.com/yijuan.dong.16",
  location: "Richmond / Vancouver, BC",
};

function t(locale: Locale, zh: string, en: string) {
  return locale === "zh" ? zh : en;
}

function Card({
  title,
  value,
  hint,
  actions,
}: {
  title: string;
  value: string;
  hint?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-black/5 backdrop-blur">
      <div className="text-sm font-semibold text-ink-900">{title}</div>
      <div className="mt-2 break-all text-sm text-ink-700">{value}</div>
      {hint ? <div className="mt-2 text-xs text-ink-500">{hint}</div> : null}
      {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

function BrandLinkButton({
  href,
  children,
  variant = "solid",
  external,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  external?: boolean;
  className?: string;
}) {
  const cls =
    variant === "solid"
      ? "bg-brand text-white hover:bg-brand-700"
      : "border border-brand-200 bg-white/70 text-brand-800 hover:bg-brand-50";

  const common = `inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${cls} ${className ?? ""}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={common}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={common}>
      {children}
    </Link>
  );
}

export default function ContactPage() {
  const pathname = usePathname() || "/zh";
  const locale: Locale = pathname.startsWith("/en") ? "en" : "zh";
  const base = `/${locale}`;

  const [name, setName] = useState("");
  const [contact, setContact] = useState(""); // phone / wechat / email
  const [dogBreed, setDogBreed] = useState("");
  const [dogAge, setDogAge] = useState("");
  const [service, setService] = useState<string>(t(locale, "咨询/方案建议", "Consultation / Plan"));
  const [message, setMessage] = useState("");

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(
      locale === "zh"
        ? `[${CONTACT.brandName}] 联系/咨询`
        : `[${CONTACT.brandName}] Contact / Inquiry`
    );

    const lines =
      locale === "zh"
        ? [
            `姓名: ${name || "-"}`,
            `联系方式: ${contact || "-"}`,
            `犬种: ${dogBreed || "-"}`,
            `年龄: ${dogAge || "-"}`,
            `想做的服务: ${service || "-"}`,
            "",
            "说明:",
            message || "-",
            "",
            `地区: ${CONTACT.location}`,
          ]
        : [
            `Name: ${name || "-"}`,
            `Contact: ${contact || "-"}`,
            `Dog breed: ${dogBreed || "-"}`,
            `Dog age: ${dogAge || "-"}`,
            `Service: ${service || "-"}`,
            "",
            "Message:",
            message || "-",
            "",
            `Location: ${CONTACT.location}`,
          ];

    const body = encodeURIComponent(lines.join("\n"));
    return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  }, [locale, name, contact, dogBreed, dogAge, service, message]);

  const canSubmit = CONTACT.email && CONTACT.email !== "your@email.com";

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      alert(t(locale, "已复制 ✅", "Copied ✅"));
    } catch {
      alert(t(locale, "复制失败（可能浏览器限制），你可以手动复制。", "Copy failed (browser restriction). Please copy manually."));
    }
  }

  return (
    <div className="min-h-screen bg-brand">
      <section className="mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-brand-200">CONTACT</p>
            <h1 className="font-heading mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
              {t(locale, "联系与咨询", "Contact & Inquiry")}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-brand-100/90">
              {t(
                locale,
                "想确认毛况 / 选择服务 / 了解幼犬计划？欢迎先发照片与简单信息。我们主要展示犬舍自家犬只，不展示客人美容作品图。",
                "Want to confirm coat condition, choose a service, or ask about puppies? Send photos and a brief note first. We mainly showcase kennel dogs and do not display client grooming photos."
              )}
            </p>
            <p className="mt-3 text-sm text-brand-100/90">
              {t(locale, "对幼犬或未来领养感兴趣？", "Interested in a puppy or future adoption?")}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <BrandLinkButton href={`${base}/services`} variant="outline">
              {t(locale, "查看服务", "View services")}
            </BrandLinkButton>
            <BrandLinkButton href={`${base}/gallery`} variant="outline">
              {t(locale, "犬舍画廊", "Kennel gallery")}
            </BrandLinkButton>
            <BrandLinkButton href={`${base}/placement`} variant="outline">
              {t(locale, "申请领养", "Apply for Adoption")}
            </BrandLinkButton>
            <BrandLinkButton href={BOOKING_URL} variant="outline" external>
              {t(locale, "立即预约", "Book now")}
            </BrandLinkButton>
          </div>
        </div>

        {/* Main */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Left: Contact cards */}
          <div className="space-y-6 lg:col-span-1">
            <Card
              title="Email"
              value={CONTACT.email}
              hint={t(
                locale,
                "建议：附上狗狗近照（头部/背线/四肢）和最近一次护理时间，方便判断方案。",
                "Tip: attach recent photos (head/topline/legs) and last grooming date for a better assessment."
              )}
              actions={
                <>
                  <button
                    onClick={() => copy(CONTACT.email)}
                    className="rounded-2xl border border-brand-200 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
                  >
                    {t(locale, "复制邮箱", "Copy email")}
                  </button>
                  {canSubmit ? (
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="rounded-2xl bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
                    >
                      {t(locale, "打开邮件", "Open email")}
                    </a>
                  ) : (
                    <span className="text-xs text-ink-500">
                      {t(locale, "* 先把 CONTACT.email 改成你的真实邮箱", "* Please set CONTACT.email to your real email first")}
                    </span>
                  )}
                </>
              }
            />

            {CONTACT.wechat ? (
              <Card
                title="WeChat"
                value={CONTACT.wechat}
                hint={t(
                  locale,
                  "加微信请备注：犬种 + 想做的服务（开荒/循环/洗护/全剪/幼犬适应）",
                  "When adding WeChat, please note: breed + service (hand stripping / maintenance / bath / full groom / puppy intro)."
                )}
                actions={
                  <button
                    onClick={() => copy(CONTACT.wechat)}
                    className="rounded-2xl border border-brand-200 bg-white/70 px-4 py-2 text-sm font-semibold text-brand-800 transition hover:bg-brand-50"
                  >
                    {t(locale, "复制微信号", "Copy WeChat ID")}
                  </button>
                }
              />
            ) : null}

            <Card
              title="Location"
              value={CONTACT.location}
              hint={t(
                locale,
                "具体地址与到店方式可在确认预约后发送。",
                "Exact address and arrival details will be shared after booking confirmation."
              )}
            />

            <div className="rounded-3xl bg-white/10 p-6 text-white ring-1 ring-white/15 backdrop-blur">
              <div className="font-heading text-lg font-bold">{t(locale, "快速入口", "Quick access")}</div>
              <div className="mt-2 text-sm text-brand-100/90">
                {t(
                  locale,
                  "你也可以直接走预约链接，先占一个时间段，再在备注里补充信息。",
                  "You can also book first to secure a time slot, then add details in the booking notes."
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <BrandLinkButton href={BOOKING_URL} variant="solid" external>
                  {t(locale, "立即预约", "Book now")}
                </BrandLinkButton>
                {CONTACT.instagram ? (
                  <BrandLinkButton href={CONTACT.instagram} variant="outline" external>
                    Instagram
                  </BrandLinkButton>
                ) : null}
                {CONTACT.xhs ? (
                  <BrandLinkButton href={CONTACT.xhs} variant="outline" external>
                    {t(locale, "小红书", "Xiaohongshu")}
                  </BrandLinkButton>
                ) : null}
                {CONTACT.facebook ? (
                  <BrandLinkButton href={CONTACT.facebook} variant="outline" external>
                    Facebook
                  </BrandLinkButton>
                ) : null}
              </div>
              <p className="mt-3 text-xs text-brand-100/80">
                {t(
                  locale,
                  "* 预约将跳转至 Google Calendar 进行时间选择与确认",
                  "* Booking will redirect to Google Calendar for time selection and confirmation"
                )}
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-white/90 p-6 shadow-soft ring-1 ring-black/5 backdrop-blur md:p-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="font-heading text-xl font-bold text-ink-900">
                    {t(locale, "发送咨询信息", "Send an inquiry")}
                  </div>
                  <div className="mt-1 text-sm text-ink-600">
                    {t(
                      locale,
                      "填完后点击「生成邮件并发送」，会自动打开你的邮箱应用。",
                      'After filling, click "Generate email & send" to open your mail app.'
                    )}
                  </div>
                </div>

                <div className="text-xs font-semibold text-ink-500">
                  {t(
                    locale,
                    "建议包含：犬种 / 年龄 / 毛况 / 上次护理时间 / 目标风格",
                    "Recommended: breed / age / coat condition / last grooming date / target style"
                  )}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <div className="text-xs font-semibold text-ink-700">{t(locale, "你的名字", "Your name")}</div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t(locale, "例如：Royce", "e.g., Royce")}
                    className="mt-2 w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none ring-brand-200 focus:ring-2"
                  />
                </label>

                <label className="block">
                  <div className="text-xs font-semibold text-ink-700">
                    {t(locale, "联系方式（微信/电话/邮箱）", "Contact (WeChat/phone/email)")}
                  </div>
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t(locale, "例如：WeChat: xxxx / 604-xxx-xxxx", "e.g., WeChat: xxxx / 604-xxx-xxxx")}
                    className="mt-2 w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none ring-brand-200 focus:ring-2"
                  />
                </label>

                <label className="block">
                  <div className="text-xs font-semibold text-ink-700">{t(locale, "犬种", "Breed")}</div>
                  <input
                    value={dogBreed}
                    onChange={(e) => setDogBreed(e.target.value)}
                    placeholder={t(locale, "例如：Westie / Poodle / Doodle...", "e.g., Westie / Poodle / Doodle...")}
                    className="mt-2 w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none ring-brand-200 focus:ring-2"
                  />
                </label>

                <label className="block">
                  <div className="text-xs font-semibold text-ink-700">{t(locale, "年龄", "Age")}</div>
                  <input
                    value={dogAge}
                    onChange={(e) => setDogAge(e.target.value)}
                    placeholder={t(locale, "例如：5 months / 2 years", "e.g., 5 months / 2 years")}
                    className="mt-2 w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none ring-brand-200 focus:ring-2"
                  />
                </label>

                <label className="block md:col-span-2">
                  <div className="text-xs font-semibold text-ink-700">{t(locale, "你想做的服务", "Service you want")}</div>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none ring-brand-200 focus:ring-2"
                  >
                    <option>{t(locale, "咨询/方案建议", "Consultation / Plan")}</option>
                    <option>{t(locale, "手拔毛/开荒", "Hand stripping (first/reset)")}</option>
                    <option>{t(locale, "循环/维护", "Maintenance (cycle)")}</option>
                    <option>{t(locale, "Full Grooming（全剪造型）", "Full Grooming")}</option>
                    <option>{t(locale, "洗护 + 局部修整", "Bath & tidy")}</option>
                    <option>{t(locale, "幼犬适应", "Puppy intro")}</option>
                    <option>{t(locale, "加项", "Add-ons")}</option>
                    <option>{t(locale, "领养幼犬", "Puppy inquiry")}</option>
                  </select>
                </label>

                <label className="block md:col-span-2">
                  <div className="text-xs font-semibold text-ink-700">{t(locale, "补充说明", "Additional notes")}</div>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t(
                      locale,
                      "例如：毛最近有打结、想留长/想清爽、上次护理时间、是否怕吹风/剪指甲等…",
                      "e.g., matting level, desired length/style, last grooming date, sensitivity to dryer/nails, etc."
                    )}
                    rows={6}
                    className="mt-2 w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none ring-brand-200 focus:ring-2"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="text-xs text-ink-500">
                  {t(
                    locale,
                    "* 提示：照片请直接在邮件/微信里发送（头部、背线、四肢、整体各一张最理想）",
                    "* Tip: send photos directly in email/WeChat (ideal: head, topline, legs, full-body)."
                  )}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <a
                    href={canSubmit ? mailto : undefined}
                    onClick={(e) => {
                      if (!canSubmit) e.preventDefault();
                    }}
                    className={[
                      "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition whitespace-nowrap",
                      canSubmit ? "bg-brand text-white hover:bg-brand-700" : "cursor-not-allowed bg-ink-200 text-ink-500",
                    ].join(" ")}
                  >
                    {t(locale, "生成邮件并发送", "Generate email & send")}
                  </a>

                  <BrandLinkButton href={BOOKING_URL} variant="outline" external className="whitespace-nowrap">
                    {t(locale, "或直接预约", "Or book directly")}
                  </BrandLinkButton>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-ink-700">
                <span className="font-semibold text-brand-900">{t(locale, "预约说明：", "Booking note: ")}</span>
                {t(
                  locale,
                  "预约将跳转至 Google Calendar 进行时间选择与确认。价格与时长可能因毛量、打结与配合度调整。",
                  "Booking will redirect to Google Calendar for time selection and confirmation. Price and duration may vary by coat volume, matting, and cooperation."
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
