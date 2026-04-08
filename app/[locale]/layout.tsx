import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { getSiteUrl } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = locale === "en" ? "en" : "zh";
  const siteUrl = getSiteUrl();

  return {
    alternates: {
      canonical: `${siteUrl}/${safeLocale}`,
      languages: {
        "zh-CN": `${siteUrl}/zh`,
        en: `${siteUrl}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const safeLocale = (locale === "en" ? "en" : "zh") as "zh" | "en";

  return (
    <>
      <Navbar locale={safeLocale} />
      <main className="min-h-[calc(100vh-120px)]">{children}</main>
      <Footer locale={safeLocale} />
    </>
  );
}
