import { headers } from "next/headers";
import { redirect } from "next/navigation";

function detectLocale(acceptLanguage: string | null): "zh" | "en" {
  if (!acceptLanguage) return "zh";

  const normalized = acceptLanguage.toLowerCase();
  return normalized.includes("zh") ? "zh" : "en";
}

export default async function RootPage() {
  const acceptLanguage = (await headers()).get("accept-language");
  const locale = detectLocale(acceptLanguage);

  redirect(`/${locale}`);
}
