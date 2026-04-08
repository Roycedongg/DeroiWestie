import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

function detectLocale(acceptLanguage: string | null): "zh" | "en" {
  if (!acceptLanguage) return "zh";

  const preferred = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const qParam = params.find((param) => param.trim().startsWith("q="));
      const q = qParam ? Number.parseFloat(qParam.split("=")[1] ?? "1") : 1;

      return { tag, q: Number.isFinite(q) ? q : 0 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    if (tag.startsWith("zh")) return "zh";
    if (tag.startsWith("en")) return "en";
  }

  return "zh";
}

export default async function RootPage() {
  const preferredLocale = (await cookies()).get("preferred-locale")?.value;
  if (preferredLocale === "zh" || preferredLocale === "en") {
    redirect(`/${preferredLocale}`);
  }

  const acceptLanguage = (await headers()).get("accept-language");
  const locale = detectLocale(acceptLanguage);

  redirect(`/${locale}`);
}
