import "./globals.css";
import type { Metadata } from "next";
import { Nunito, Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"
import { SITE, getSiteUrl } from "@/lib/site";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE.defaultTitle,
    template: "%s",
  },
  description: SITE.defaultDescription,
  applicationName: SITE.name,
  keywords: [
    "pet grooming in Richmond",
    "pet grooming Richmond BC",
    "dog grooming Richmond BC",
    "hand stripping Richmond",
    "Westie grooming Richmond",
    "DeRoi Westie",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    url: getSiteUrl(),
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${nunito.variable} ${quicksand.variable} min-h-screen bg-brand text-zinc-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );


}
