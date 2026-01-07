import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";

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
      <Footer locale={safeLocale} />
      <main className="min-h-[calc(100vh-120px)]">{children}</main>
    </>
  );
}
