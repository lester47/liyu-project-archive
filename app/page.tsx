import Image from "next/image";
import Link from "next/link";
import { ProjectCard } from "@/components/projects/project-card";
import { featuredProjects } from "@/data/projects";
import highlightsData from "@/codex-update/highlights.json";
import timelineData from "@/codex-update/timeline.json";
import siteContent from "@/codex-update/site-content.json";
import { assetPath } from "@/lib/asset-path";

const highlightIcons = ["⌕", "竹", "AI", "↻", "＋", "◎"];
const highlightColors = ["bg-primary/15 text-primary", "bg-secondary/20 text-primary", "bg-accent/15 text-accent", "bg-[rgb(var(--accent)/.12)] text-accent", "bg-secondary/20 text-primary", "bg-primary/15 text-primary"];

const eraIcons = ["✦", "⚙", "⌕", "⌁", "AI"];

export default function Home() {
  return (
    <>
      <section aria-labelledby="home-hero-title" className="relative overflow-hidden border-b border-line bg-surface">
        <h1 id="home-hero-title" className="sr-only">{siteContent.heroTitle}｜{siteContent.siteName}</h1>
        <Image
          src={assetPath("/images/home-hero-forest-v2.png")}
          alt={`${siteContent.heroTitle}，兩位學生在森林裡觀察太陽能鳥屋，旁邊有松鼠與梅花鹿；${siteContent.siteName}`}
          width={2172}
          height={724}
          priority
          sizes="100vw"
          className="h-auto w-full object-contain"
        />
        <div className="border-t border-line/70 bg-surface/95 py-5 shadow-[0_-8px_24px_rgb(var(--shadow)/.06)]">
          <div className="wide-shell flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-sm font-semibold leading-6 text-muted sm:text-left sm:text-base">保存鯉魚國小 2015 年至今的學生專題與創作歷程</p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><Link href="/projects" className="button-primary px-7">探索專題作品</Link><Link href="/timeline" className="button-secondary px-7">認識創意歷程</Link></div>
          </div>
        </div>
      </section>

      <section aria-labelledby="highlights-title" className="relative overflow-hidden bg-[rgb(var(--surface))] py-20 sm:py-24">
        <div className="wide-shell"><div className="text-center"><p className="eyebrow">SIX HIGHLIGHTS</p><h2 id="highlights-title" className="mt-3 text-3xl font-black text-ink sm:text-4xl">六大亮點，從在地走向世界</h2><p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:text-lg">每一個專題，都是孩子觀察生活、整合知識並勇敢行動的故事。</p></div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-5">{highlightsData.map((item, index) => <article key={item.id} className="group rounded-3xl border border-line bg-canvas/60 p-5 text-center transition duration-300 hover:-translate-y-2 hover:border-primary/30 hover:bg-surface hover:shadow-soft sm:p-6"><div className={`mx-auto grid h-16 w-16 place-items-center rounded-full text-xl font-black transition group-hover:scale-110 ${highlightColors[index]}`}>{highlightIcons[index]}</div><h3 className="mt-5 text-base font-black leading-7 text-ink sm:text-lg">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p></article>)}</div>
        </div>
      </section>

      <section aria-labelledby="featured-title" className="relative overflow-hidden border-y border-line bg-[rgb(var(--surface-muted))] py-20 paper-texture sm:py-28">
        <span aria-hidden="true" className="absolute -left-8 top-16 rotate-12 text-9xl opacity-10">🌿</span><span aria-hidden="true" className="absolute -right-8 bottom-10 -rotate-12 text-9xl opacity-10">🎋</span>
        <div className="wide-shell relative"><div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow">🌿 FEATURED PROJECTS</p><h2 id="featured-title" className="mt-3 text-3xl font-black text-ink sm:text-4xl">精選專題作品</h2><p className="mt-3 max-w-2xl text-base leading-7 text-muted">先以確認的作品名稱建立入口；照片、年份、技術、摘要與獎項將在資料核實後補上。</p></div><Link href="/projects" className="button-primary shrink-0">查看全部作品 →</Link></div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{featuredProjects.slice(0, 8).map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        </div>
      </section>

      <section aria-labelledby="timeline-title" className="relative bg-surface py-20 paper-texture sm:py-28">
        <div className="wide-shell"><div className="text-center"><p className="eyebrow">PROJECT TIMELINE</p><h2 id="timeline-title" className="mt-3 text-3xl font-black text-ink sm:text-4xl">專題發展時間軸</h2><p className="mx-auto mt-4 max-w-2xl text-base text-muted sm:text-lg">從科學玩具到 AI 與物聯網，逐步補齊每個階段的代表作品與學習故事。</p></div>
          <div className="relative mt-14 md:grid md:grid-cols-5 md:gap-5"><div className="absolute left-[10%] right-[10%] top-8 hidden h-2 rounded-full bg-gradient-to-r from-secondary via-primary to-accent md:block" />{timelineData.map((era, index) => <article key={era.id} className="relative mb-5 grid grid-cols-[4rem_1fr] gap-5 rounded-3xl border border-line bg-canvas p-5 md:mb-0 md:block md:border-0 md:bg-transparent md:p-0 md:text-center"><div className={`relative z-10 grid h-16 w-16 place-items-center rounded-full border-4 border-surface text-base font-black text-white shadow-soft ${index === timelineData.length - 1 ? "bg-accent" : "bg-primary"}`}>{eraIcons[index]}</div><div className="md:mt-6"><p className="text-base font-black text-accent">{era.yearStart}－{era.yearEnd}</p><h3 className="mt-1 text-lg font-black leading-7 text-ink">{era.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{era.summary}</p><Link href={`/timeline#${era.id}`} className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-primary">查看階段作品 →</Link></div></article>)}</div>
        </div>
      </section>

      <section className="border-y border-line bg-[rgb(var(--surface-muted))] py-20 sm:py-24"><div className="wide-shell grid gap-7 lg:grid-cols-2"><article className="relative overflow-hidden rounded-[2rem] bg-primary p-8 text-white shadow-soft sm:p-10"><span aria-hidden="true" className="absolute -right-8 -top-8 text-9xl opacity-10">AI</span><p className="text-sm font-black tracking-[.16em] text-white/70">AI COLLABORATION</p><h2 className="mt-4 text-3xl font-black">AI 協作自主學習</h2><p className="mt-4 max-w-xl text-base leading-8 text-white/80">學習提問、查證、反思與揭露 AI 使用方式，讓科技成為負責任的思考夥伴。</p><Link href="/ai-collaboration" className="mt-7 inline-flex min-h-11 items-center rounded-full bg-surface px-6 font-black text-primary">認識協作模式 →</Link></article><article className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-8 shadow-soft sm:p-10"><span aria-hidden="true" className="absolute -right-4 -top-5 text-8xl opacity-10">📚</span><p className="eyebrow">FOR EDUCATORS</p><h2 className="mt-4 text-3xl font-black text-ink">教師專區</h2><p className="mt-4 max-w-xl text-base leading-8 text-muted">彙整教學引導、歷程記錄與成果評量工具，讓歷屆經驗成為下一堂課的養分。</p><Link href="/resources" className="button-primary mt-7">前往學習資源 →</Link></article></div></section>

      <section aria-labelledby="belief-title" className="relative overflow-hidden bg-canvas py-20 sm:py-28"><span aria-hidden="true" className="absolute bottom-0 left-0 text-9xl opacity-10">🌲</span><div className="wide-shell grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr]"><div className="rounded-[2.5rem] border border-line bg-gradient-to-br from-secondary/25 via-surface to-accent/15 p-10 text-center shadow-soft"><span aria-hidden="true" className="text-7xl">🌱</span><p className="mt-5 text-lg font-black text-primary">好奇心，是每個專題的起點</p></div><div><p className="eyebrow">OUR BELIEF</p><h2 id="belief-title" className="mt-3 text-3xl font-black text-ink sm:text-4xl">讓孩子從自己的土地出發，成為改變世界的人</h2><p className="mt-5 text-lg leading-9 text-muted">我們相信，專題不是為了得到唯一答案，而是練習看見問題、尋找證據、動手驗證並與他人分享。每一段完整保存的歷程，都能成為孩子持續學習的力量。</p><Link href="/about" className="button-secondary mt-7">認識我們的教育理念</Link></div></div></section>
    </>
  );
}
