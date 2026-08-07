import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import siteContent from "@/codex-update/site-content.json";

export const metadata: Metadata = {
  title: { default: `${siteContent.siteName}｜${siteContent.heroTitle}`, template: `%s｜${siteContent.siteName}` },
  description: "展示、查詢、分享與保存鯉魚國小學生創意專題。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant" data-theme="forest" suppressHydrationWarning>
      <body id="top" className="min-h-screen antialiased">
        <ThemeProvider><SiteHeader /><main>{children}</main><SiteFooter /></ThemeProvider>
      </body>
    </html>
  );
}
