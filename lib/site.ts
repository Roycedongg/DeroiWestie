export type SupportedLocale = "zh" | "en";

const fallbackSiteUrl = "https://deroiwestie.com";

function normalizeSiteUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export function getSiteUrl() {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!rawUrl) return fallbackSiteUrl;
  return normalizeSiteUrl(rawUrl);
}

export const SITE = {
  name: "DeRoi Westie",
  defaultTitle: "DeRoi Westie | Pet Grooming in Richmond, BC",
  defaultDescription:
    "DeRoi Westie offers pet grooming in Richmond, BC, including hand stripping, bath and tidy, full grooming, and Westie-focused coat care.",
  email: "deroiwestie@gmail.com",
  location: "Richmond / Vancouver, BC, Canada",
  areaServed: ["Richmond, BC", "Vancouver, BC"],
  bookingUrl:
    "https://app.squareup.com/appointments/book/lhf1g98g1x9daw/LH9X6X2DRC5N8/start",
  socialLinks: [
    "https://instagram.com/_rroyce.d",
    "https://www.xiaohongshu.com/user/profile/W502966909",
    "https://www.facebook.com/yijuan.dong.16",
  ],
};

export const LOCALES: SupportedLocale[] = ["zh", "en"];

export const LOCALE_SEGMENTS = [
  "",
  "/services",
  "/results",
  "/kennel",
  "/gallery",
  "/contact",
  "/placement",
];
