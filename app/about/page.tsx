import Image from "next/image";
import { StaticPage } from "@/components/layout/static-page";
import content from "@/codex-update/site-content.json";
import { assetPath } from "@/lib/asset-path";

export default function AboutPage() {
  return <StaticPage eyebrow="ABOUT US" title="關於我們" intro={`${content.siteName}希望保存鯉魚國小學生的探究與實作歷程，讓過去的經驗成為未來學習的養分。`}>
    <section className="mt-10 grid gap-5 lg:grid-cols-3">{content.brandStatements.map((statement) => <blockquote key={statement} className="rounded-3xl border border-line bg-surface p-7 text-xl font-black leading-8 text-ink">{statement}</blockquote>)}</section>
    <p className="mt-10 rounded-3xl bg-primary p-8 text-center text-3xl font-black text-white">「{content.motto}」</p>
    <section aria-labelledby="development-banner-title" className="mt-12 overflow-hidden rounded-3xl border border-line bg-surface shadow-soft">
      <div className="p-6 sm:p-8">
        <p className="eyebrow">2015－2026 PROJECT JOURNEY</p>
        <h2 id="development-banner-title" className="mt-2 text-2xl font-black text-ink sm:text-3xl">十多年創意發展軌跡</h2>
        <p className="mt-3 text-sm font-bold text-primary sm:hidden">← 左右滑動，看見 2015–2026 的創意發展軌跡 →</p>
      </div>
      <div className="max-w-full overflow-x-auto overscroll-x-contain border-y border-line bg-[rgb(var(--surface-muted))]" tabIndex={0} aria-label="可左右滑動查看完整發展軌跡">
        <Image
          src={assetPath("/images/about/竹林裡的AI奇蹟_發展軌跡.png")}
          alt="鯉魚國小 2015 至 2026 創意專題發展軌跡，從電機與機電整合、文化科技到 AI 與國際舞台"
          width={2172}
          height={724}
          sizes="(max-width: 639px) 900px, 100vw"
          className="h-auto w-full min-w-[900px] max-w-none object-contain sm:min-w-0"
        />
      </div>
      <p className="p-6 leading-8 text-muted sm:px-8">從感測器與機電實作出發，走向文化科技、AI、物聯網與國際舞台，每一個階段，都來自孩子對真實生活問題的觀察與持續迭代。</p>
    </section>
    <section id="podcast" aria-labelledby="podcast-title" className="scroll-mt-28 mt-12 overflow-hidden rounded-3xl border border-line bg-surface shadow-soft">
      <div className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent px-4 py-2 text-sm font-black text-white">🎧 AI Podcast</span>
            <span className="text-sm font-bold text-muted">鯉魚國小創意教育故事</span>
          </div>
          <h2 id="podcast-title" className="mt-5 text-3xl font-black text-ink sm:text-4xl">竹林裡的 AI 奇蹟</h2>
          <p className="mt-3 text-xl font-bold leading-8 text-primary">15 分鐘，聽見鯉魚國小十多年來的創意教育旅程</p>
          <div className="mt-6 space-y-4 leading-8 text-muted">
            <p>一所位在南投竹山的偏鄉小學，如何從竹子、LED 與感測器開始，逐步走向 AI、物聯網、影像辨識與國際舞台？</p>
            <p>這段 Podcast 從《神奇魔法石》、《鯉魚炫光》、《搖頭晃腦》，一路談到《樹洞》、《猴不來》等作品，帶你聽見鯉魚國小十多年來，孩子如何從自己的土地出發，用科技回應真實世界的問題。</p>
            <p>這不只是一段作品介紹，更是一段關於教育、創造、失敗、迭代與成長的故事。</p>
          </div>
        </div>
        <div className="rounded-3xl bg-[rgb(var(--surface-muted))] p-6 sm:p-8">
          <div className="text-center" aria-hidden="true">
            <span className="inline-grid h-20 w-20 place-items-center rounded-full bg-primary text-4xl text-white shadow-soft">♫</span>
          </div>
          <audio controls preload="metadata" className="mt-7 block w-full" aria-label="播放 Podcast：竹林裡的 AI 奇蹟">
            <source src={assetPath("/audio/about/竹林裡的AI奇蹟_96kbps.mp3")} type="audio/mpeg" />
            您的瀏覽器不支援音訊播放。
          </audio>
          <p className="mt-5 border-l-4 border-accent pl-4 text-sm leading-6 text-muted">本節目由 NotebookLM 根據《鯉魚創意專題誌》內容整理生成。</p>
        </div>
      </div>
    </section>
    <section className="mt-10 rounded-3xl border border-line bg-surface p-8"><h2 className="text-2xl font-black text-ink">資料使用原則</h2><p className="mt-4 max-w-3xl leading-8 text-muted">本站正式公開前，應逐筆確認內容正確性、個人資料使用範圍、學生與監護人影像授權，以及作品素材的著作權狀態。部分確認或待確認資料會清楚標示。</p></section>
  </StaticPage>;
}
