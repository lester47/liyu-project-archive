"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import siteContent from "@/codex-update/site-content.json";

const links = [
  ["/", "首頁"], ["/about", "關於我們"], ["/projects", "專題作品"],
  ["/timeline", "創意歷程"], ["/resources", "學習資源"], ["/ai-collaboration", "AI 協作"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-surface/90 shadow-[0_4px_20px_rgb(var(--shadow)/.07)] backdrop-blur-xl">
      <div className="wide-shell flex min-h-[76px] items-center justify-between gap-3 py-3 lg:min-h-[84px]">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span aria-hidden="true" className="relative grid h-14 w-14 place-items-center rounded-full bg-secondary/20 text-2xl"><span className="-rotate-12">🌿</span></span>
          <span><strong className="block whitespace-nowrap text-lg text-ink">{siteContent.siteName}</strong><span className="text-xs text-muted">{siteContent.englishName}</span></span>
        </Link>
        <nav aria-label="主要導覽" className="hidden items-center gap-2 lg:flex">
          {links.map(([href, label]) => { const active = href === "/" ? pathname === "/" : pathname.startsWith(href); return <Link key={href} href={href} className={`relative rounded-xl border px-3.5 py-2.5 text-[15px] font-bold shadow-sm transition hover:-translate-y-0.5 hover:border-primary/35 hover:bg-secondary/20 hover:text-primary ${active ? "border-primary/30 bg-primary text-white after:absolute after:-bottom-1.5 after:left-1/2 after:h-1 after:w-7 after:-translate-x-1/2 after:rounded-full after:bg-accent" : "border-line bg-canvas/80 text-ink"}`}>{label}</Link>; })}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <Link href="/projects" aria-label="搜尋專題" className="hidden h-11 w-11 place-items-center rounded-full bg-primary text-xl text-white shadow-sm transition hover:bg-primary/90 sm:grid">⌕</Link>
          <button className="rounded-xl border border-line px-3 py-2 text-sm text-ink lg:hidden" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>
            {open ? "關閉" : "選單"}
          </button>
        </div>
      </div>
      {open && <nav id="mobile-nav" aria-label="行動版導覽" className="grid gap-2 border-t border-line bg-surface px-4 py-4 lg:hidden">{links.map(([href, label]) => { const active = href === "/" ? pathname === "/" : pathname.startsWith(href); return <Link key={href} href={href} className={`rounded-xl border px-4 py-3 font-bold ${active ? "border-primary bg-primary text-white" : "border-line bg-canvas/80 text-ink"}`} onClick={() => setOpen(false)}>{label}</Link>; })}</nav>}
    </header>
  );
}
