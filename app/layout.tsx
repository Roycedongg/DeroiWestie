import "./globals.css";
import { Nunito, Quicksand } from "next/font/google";
import { Analytics } from "@vercel/analytics/next"

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen bg-brand text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );


}
