import Navbar from "@/app/components/Navbar";

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
    </>
  );
}
