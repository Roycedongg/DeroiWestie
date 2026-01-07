import Navbar from "@/app/components/Navbar";

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale;
  const safeLocale = (locale === "en" ? "en" : "zh") as "zh" | "en";

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="min-h-[calc(100vh-120px)]">{children}</main>
    </div>
  );
}
