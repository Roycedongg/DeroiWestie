"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type Locale = "zh" | "en";

function t(locale: Locale, zh: string, en: string) {
  return locale === "zh" ? zh : en;
}

type FormState = {
  name: string;
  cityCountry: string;
  email: string;
  wechat?: string;

  housingType: "apartment" | "townhouse" | "house" | "";
  ownership: "own" | "rent" | "";
  landlordAllowed: "yes" | "no" | "na" | ""; // na=not applicable
  yard: "yes" | "no" | "na" | "";

  aloneHours: "0-2" | "3-5" | "6+" | "";
  travelOften: "yes" | "no" | "";
  primaryCaregiver: string;

  hadDogBefore: "yes" | "no" | "";
  hadTerrierBefore: "yes" | "no" | "";
  knowsHandStripping: "yes" | "no" | "";
  willingGroomingPlan: "yes" | "no" | "";

  purpose: "pet" | "show" | "breeding" | "";
  acceptContract: "yes" | "no" | "";
  keepInTouch: "yes" | "no" | "";

  whyWestie: string;
  whyDeroi: string;
  anythingElse?: string;

  locale: Locale;
};

const initial = (locale: Locale): FormState => ({
  name: "",
  cityCountry: "",
  email: "",
  wechat: "",

  housingType: "",
  ownership: "",
  landlordAllowed: "",
  yard: "",

  aloneHours: "",
  travelOften: "",
  primaryCaregiver: "",

  hadDogBefore: "",
  hadTerrierBefore: "",
  knowsHandStripping: "",
  willingGroomingPlan: "",

  purpose: "",
  acceptContract: "",
  keepInTouch: "",

  whyWestie: "",
  whyDeroi: "",
  anythingElse: "",

  locale,
});

function validate(s: FormState) {
  const errors: string[] = [];
  if (!s.name.trim()) errors.push("name");
  if (!s.cityCountry.trim()) errors.push("cityCountry");
  if (!s.email.trim()) errors.push("email");
  if (!s.housingType) errors.push("housingType");
  if (!s.ownership) errors.push("ownership");
  if (!s.landlordAllowed) errors.push("landlordAllowed");
  if (!s.yard) errors.push("yard");
  if (!s.aloneHours) errors.push("aloneHours");
  if (!s.travelOften) errors.push("travelOften");
  if (!s.primaryCaregiver.trim()) errors.push("primaryCaregiver");
  if (!s.hadDogBefore) errors.push("hadDogBefore");
  if (!s.hadTerrierBefore) errors.push("hadTerrierBefore");
  if (!s.knowsHandStripping) errors.push("knowsHandStripping");
  if (!s.willingGroomingPlan) errors.push("willingGroomingPlan");
  if (!s.purpose) errors.push("purpose");
  if (!s.acceptContract) errors.push("acceptContract");
  if (!s.keepInTouch) errors.push("keepInTouch");
  if (!s.whyWestie.trim()) errors.push("whyWestie");
  if (!s.whyDeroi.trim()) errors.push("whyDeroi");
  return errors;
}

export default function PlacementPage() {
  const pathname = usePathname() || "/zh";
  const locale: Locale = pathname.startsWith("/en") ? "en" : "zh";
  const ui = useMemo(
    () => ({
      eyebrow: t(locale, "幼犬领养", "PUPPY ADOPTION"),
      title: t(locale, "幼犬领养申请", "Puppy Adoption Application"),
      subtitle: t(
        locale,
        "DeRoi Westie 是一个以品质、健康与长期责任为核心的小型犬舍。我们并不按照“先到先得”的方式安排领养。提交此表格不代表一定会有幼犬可供领养。",
        "DeRoi Westie is a small, quality-focused kennel. Puppy adoption is not first-come, first-served. Submitting this form does not guarantee availability."
      ),
      submit: t(locale, "提交申请", "Submit Application"),
      sending: t(locale, "正在提交…", "Submitting…"),
      sent: t(locale, "已提交！我们会尽快与你联系。", "Submitted! We’ll get back to you soon."),
      failed: t(locale, "提交失败，请稍后再试。", "Submission failed. Please try again."),
      required: t(locale, "必填", "Required"),
    }),
    [locale]
  );

  const [state, setState] = useState<FormState>(() => initial(locale));
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setState((s) => ({ ...s, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(false);

    const missing = validate(state);
    if (missing.length) {
      const map: Record<string, boolean> = {};
      missing.forEach((k) => (map[k] = true));
      setFieldErrors(map);
      setErr(t(locale, "请先填写所有必填项。", "Please fill in all required fields."));
      return;
    }
    setFieldErrors({});

    setBusy(true);
    try {
      const res = await fetch("/api/placement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...state, locale }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Request failed");
      setOk(true);
      setShowToast(true);
      window.setTimeout(() => setShowToast(false), 3200);
      setState(initial(locale));
    } catch (e: any) {
      setErr(e?.message ? String(e.message) : ui.failed);
    } finally {
      setBusy(false);
    }
  }

  const inputBase =
    "mt-2 w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-300";
  const labelBase = "text-xs font-semibold text-zinc-300";
  const card = "rounded-3xl border border-zinc-200 bg-white p-6 md:p-8";

  const warn = (key: string) =>
    fieldErrors[key] ? "border-red-300 focus:border-red-400" : "border-zinc-200 focus:border-zinc-300";

  return (
    <div className="min-h-screen bg-brand">
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-wide text-zinc-300">{ui.eyebrow}</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">{ui.title}</h1>
          <p className="mt-2 text-sm text-zinc-300">{ui.subtitle}</p>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-6">
          {/* Section 1 */}
          <div className={card}>
            <div className="text-sm font-semibold text-zinc-900">{t(locale, "基本信息", "Basic Info")}</div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-zinc-700">
                  {t(locale, "姓名", "Full Name")} <span className="text-red-500">*</span>
                </label>
                <input
                  value={state.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={`${inputBase} ${warn("name")}`}
                  placeholder={t(locale, "例如：Royce Dong", "e.g., Royce Dong")}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700">
                  {t(locale, "城市 / 国家", "City & Country")} <span className="text-red-500">*</span>
                </label>
                <input
                  value={state.cityCountry}
                  onChange={(e) => set("cityCountry", e.target.value)}
                  className={`${inputBase} ${warn("cityCountry")}`}
                  placeholder={t(locale, "例如：Vancouver, Canada", "e.g., Vancouver, Canada")}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  value={state.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={`${inputBase} ${warn("email")}`}
                  placeholder="name@example.com"
                  type="email"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700">{t(locale, "微信 / WhatsApp（选填）", "WeChat / WhatsApp (optional)")}</label>
                <input
                  value={state.wechat ?? ""}
                  onChange={(e) => set("wechat", e.target.value)}
                  className={inputBase}
                  placeholder={t(locale, "例如：微信号", "e.g., your handle")}
                />
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className={card}>
            <div className="text-sm font-semibold text-zinc-900">{t(locale, "居住与环境", "Home & Environment")}</div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-zinc-700">
                  {t(locale, "居住类型", "Housing Type")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={state.housingType}
                  onChange={(e) => set("housingType", e.target.value as any)}
                  className={`${inputBase} ${warn("housingType")}`}
                >
                  <option value="">{t(locale, "请选择", "Select")}</option>
                  <option value="apartment">{t(locale, "公寓", "Apartment")}</option>
                  <option value="townhouse">{t(locale, "联排", "Townhouse")}</option>
                  <option value="house">{t(locale, "独立屋", "Detached House")}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700">
                  {t(locale, "自有或租赁", "Ownership")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={state.ownership}
                  onChange={(e) => set("ownership", e.target.value as any)}
                  className={`${inputBase} ${warn("ownership")}`}
                >
                  <option value="">{t(locale, "请选择", "Select")}</option>
                  <option value="own">{t(locale, "自有", "Own")}</option>
                  <option value="rent">{t(locale, "租赁", "Rent")}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700">
                  {t(locale, "如租房，房东允许养犬吗？", "If renting, is a dog allowed?")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={state.landlordAllowed}
                  onChange={(e) => set("landlordAllowed", e.target.value as any)}
                  className={`${inputBase} ${warn("landlordAllowed")}`}
                >
                  <option value="">{t(locale, "请选择", "Select")}</option>
                  <option value="yes">{t(locale, "允许", "Yes")}</option>
                  <option value="no">{t(locale, "不允许", "No")}</option>
                  <option value="na">{t(locale, "不适用（自有）", "N/A (own)")}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700">
                  {t(locale, "是否有院子？", "Do you have a yard?")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={state.yard}
                  onChange={(e) => set("yard", e.target.value as any)}
                  className={`${inputBase} ${warn("yard")}`}
                >
                  <option value="">{t(locale, "请选择", "Select")}</option>
                  <option value="yes">{t(locale, "有", "Yes")}</option>
                  <option value="no">{t(locale, "没有", "No")}</option>
                  <option value="na">{t(locale, "不适用", "N/A")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className={card}>
            <div className="text-sm font-semibold text-zinc-900">{t(locale, "时间与照顾", "Time & Care")}</div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-zinc-700">
                  {t(locale, "每日独处时间", "Hours alone per day")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={state.aloneHours}
                  onChange={(e) => set("aloneHours", e.target.value as any)}
                  className={`${inputBase} ${warn("aloneHours")}`}
                >
                  <option value="">{t(locale, "请选择", "Select")}</option>
                  <option value="0-2">0–2</option>
                  <option value="3-5">3–5</option>
                  <option value="6+">6+</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700">
                  {t(locale, "是否经常出差", "Do you travel often?")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={state.travelOften}
                  onChange={(e) => set("travelOften", e.target.value as any)}
                  className={`${inputBase} ${warn("travelOften")}`}
                >
                  <option value="">{t(locale, "请选择", "Select")}</option>
                  <option value="yes">{t(locale, "是", "Yes")}</option>
                  <option value="no">{t(locale, "否", "No")}</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-zinc-700">
                  {t(locale, "主要照顾者是谁？", "Who will be the primary caregiver?")} <span className="text-red-500">*</span>
                </label>
                <input
                  value={state.primaryCaregiver}
                  onChange={(e) => set("primaryCaregiver", e.target.value)}
                  className={`${inputBase} ${warn("primaryCaregiver")}`}
                  placeholder={t(locale, "例如：我本人 / 我和伴侣共同", "e.g., myself / me and my partner")}
                />
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className={card}>
            <div className="text-sm font-semibold text-zinc-900">{t(locale, "经验与护理认知", "Experience & Grooming")}</div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {[
                ["hadDogBefore", t(locale, "是否养过犬？", "Have you owned a dog before?")],
                ["hadTerrierBefore", t(locale, "是否养过梗犬？", "Have you owned a terrier before?")],
                ["knowsHandStripping", t(locale, "是否了解手拔毛护理？", "Do you understand hand-stripping?")],
                ["willingGroomingPlan", t(locale, "是否愿意遵循护理周期建议？", "Will you follow a grooming/coat plan?")],
              ].map(([key, label]) => (
                <div key={key as string}>
                  <label className="text-xs font-semibold text-zinc-700">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={(state as any)[key]}
                    onChange={(e) => set(key as any, e.target.value as any)}
                    className={`${inputBase} ${warn(key as string)}`}
                  >
                    <option value="">{t(locale, "请选择", "Select")}</option>
                    <option value="yes">{t(locale, "是", "Yes")}</option>
                    <option value="no">{t(locale, "否", "No")}</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5 */}
          <div className={card}>
            <div className="text-sm font-semibold text-zinc-900">{t(locale, "领养目的与条款", "Purpose & Terms")}</div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-zinc-700">
                  {t(locale, "期望领养类型", "Looking for")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={state.purpose}
                  onChange={(e) => set("purpose", e.target.value as any)}
                  className={`${inputBase} ${warn("purpose")}`}
                >
                  <option value="">{t(locale, "请选择", "Select")}</option>
                  <option value="pet">{t(locale, "家庭伴侣犬（Pet）", "Pet home")}</option>
                  <option value="show">{t(locale, "展示/赛犬（Show）", "Show prospect")}</option>
                  <option value="breeding">{t(locale, "繁育（Breeding）", "Breeding")}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700">
                  {t(locale, "是否接受合同条款", "Do you accept a contract?")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={state.acceptContract}
                  onChange={(e) => set("acceptContract", e.target.value as any)}
                  className={`${inputBase} ${warn("acceptContract")}`}
                >
                  <option value="">{t(locale, "请选择", "Select")}</option>
                  <option value="yes">{t(locale, "是", "Yes")}</option>
                  <option value="no">{t(locale, "否", "No")}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700">
                  {t(locale, "是否愿意长期保持联系/回访", "Will you keep in touch for updates?")} <span className="text-red-500">*</span>
                </label>
                <select
                  value={state.keepInTouch}
                  onChange={(e) => set("keepInTouch", e.target.value as any)}
                  className={`${inputBase} ${warn("keepInTouch")}`}
                >
                  <option value="">{t(locale, "请选择", "Select")}</option>
                  <option value="yes">{t(locale, "愿意", "Yes")}</option>
                  <option value="no">{t(locale, "不愿意", "No")}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 6 */}
          <div className={card}>
            <div className="text-sm font-semibold text-zinc-900">{t(locale, "补充说明", "Open Questions")}</div>

            <div className="mt-4 grid gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-700">
                  {t(locale, "为什么选择西高地？", "Why a Westie?")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={state.whyWestie}
                  onChange={(e) => set("whyWestie", e.target.value)}
                  className={`${inputBase} ${warn("whyWestie")} min-h-[110px]`}
                  placeholder={t(locale, "请简单说明你喜欢西高地的原因。", "Tell us why you chose the Westie breed.")}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700">
                  {t(locale, "为什么选择 DeRoi Westie？", "Why DeRoi Westie?")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={state.whyDeroi}
                  onChange={(e) => set("whyDeroi", e.target.value)}
                  className={`${inputBase} ${warn("whyDeroi")} min-h-[110px]`}
                  placeholder={t(locale, "你对犬舍/犬只的期待是什么？", "What are you looking for in a kennel and a dog?")}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-700">
                  {t(locale, "还有什么希望我们了解的？（选填）", "Anything else? (optional)")}
                </label>
                <textarea
                  value={state.anythingElse ?? ""}
                  onChange={(e) => set("anythingElse", e.target.value)}
                  className={`${inputBase} min-h-[110px]`}
                  placeholder={t(locale, "例如：过敏、家里宠物、偏好性格等。", "Allergies, other pets, preferences, etc.")}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-zinc-200">
              {err ? <span className="text-red-200">{err}</span> : null}
            </div>

            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 disabled:opacity-60"
            >
              {busy ? ui.sending : ui.submit}
            </button>
          </div>
        </form>
      </section>
      {showToast ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800 shadow-soft">
            {ui.sent}
          </div>
        </div>
      ) : null}
    </div>
  );
}
