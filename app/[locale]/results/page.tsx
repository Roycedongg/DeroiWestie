import ResultsClient from "./results-client";

export default function Page({ params }: { params: { locale: string } }) {
  const locale = params.locale === "en" ? "en" : "zh";
  return <ResultsClient locale={locale} />;
}
