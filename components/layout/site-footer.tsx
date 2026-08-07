import Link from "next/link";
import siteContent from "@/codex-update/site-content.json";

const swatches = [
  ["森林綠", "bg-primary"],
  ["葉片綠", "bg-secondary"],
  ["大地棕", "bg-accent"],
  ["暖米白", "bg-canvas"],
  ["紙張白", "bg-surface"],
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-primary text-white">
      <span aria-hidden="true" className="absolute -bottom-8 -left-5 text-[10rem] opacity-[.06]">🌿</span>
      <span aria-hidden="true" className="absolute -right-6 top-3 text-9xl opacity-[.06]">🐟</span>
      <div className="wide-shell relative grid gap-10 py-14 md:grid-cols-2 xl:grid-cols-[1.25fr_.7fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-4">
            <span aria-hidden="true" className="grid h-16 w-16 place-items-center rounded-full bg-white/12 text-3xl">🌿</span>
            <div>
              <p className="text-xl font-black">鯉魚國民小學</p>
              <p className="text-sm text-white/65">Liyu Elementary School</p>
            </div>
          </div>
          <p className="mt-5 text-lg font-black">{siteContent.siteName}</p>
          <p className="mt-2 max-w-sm text-sm leading-7 text-white/75">{siteContent.heroTitle}，{siteContent.heroSubtitle}</p>
        </div>
        <div>
          <h2 className="font-black">快速連結</h2>
          <nav aria-label="頁尾快速連結" className="mt-4 grid gap-2 text-sm text-white/75">
            <Link href="/about">關於我們</Link>
            <Link href="/projects">專題作品</Link>
            <Link href="/families">作品家族</Link>
            <Link href="/timeline">創意歷程</Link>
            <Link href="/resources">學習資源</Link>
            <Link href="/ai-collaboration">AI 協作模式</Link>
          </nav>
        </div>
        <div>
          <h2 className="font-black">聯絡與相關網站</h2>
          <div className="mt-4 space-y-2 text-sm leading-6 text-white/75">
            <p>學校地址：南投縣竹山鎮鯉行路92號</p>
            <p>聯絡電話：049-2644984</p>
            <p>
              學校官方網站：
              <a
                href="https://liwps.ntct.edu.tw/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/40 underline-offset-4 transition hover:text-white"
              >
                liwps.ntct.edu.tw
              </a>
            </p>
          </div>
        </div>
        <div>
          <h2 className="font-black">主題色彩參考</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {swatches.map(([label, color]) => (
              <div key={label} className="text-center">
                <span className={`block h-9 w-9 rounded-lg border border-white/25 ${color}`} />
                <span className="mt-1 block text-[10px] text-white/60">{label}</span>
              </div>
            ))}
          </div>
          <Link href="#top" className="mt-7 inline-flex min-h-11 items-center rounded-full border border-white/30 px-5 text-sm font-black transition hover:bg-white/10">
            ↑ 返回頂端
          </Link>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="wide-shell flex flex-col gap-2 py-5 text-xs leading-5 text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} 鯉魚國民小學｜鯉魚創意專題誌</p>
          <p>隱私與授權：學生個資、影像與作品須經授權後公開｜最後更新：2026-08-05</p>
        </div>
      </div>
    </footer>
  );
}
