import Link from "next/link";
import { StaticPage } from "@/components/layout/static-page";
import resources from "@/codex-update/teacher-resources.json";
import { projects } from "@/data/projects";
import { teachingResources } from "@/data/teaching-resources";
import { competitionCategories, type CompetitionCategory } from "@/data/competition-categories";

const competitionCardStyles: Record<CompetitionCategory, { card: string; badge: string; dot: string }> = {
  "1. 索尼科學大賞": { card: "border-accent/35 bg-accent/10", badge: "bg-accent text-white", dot: "bg-accent" },
  "2. IEYI發明展／世界賽": { card: "border-secondary/45 bg-secondary/15", badge: "bg-secondary text-ink", dot: "bg-secondary" },
  "3. 科技教育實作競賽": { card: "border-primary/35 bg-primary/10", badge: "bg-primary text-white", dot: "bg-primary" },
  "4. 麥克松": { card: "border-[rgb(var(--warning)/.45)] bg-[rgb(var(--warning)/.14)]", badge: "bg-[rgb(var(--warning))] text-ink", dot: "bg-[rgb(var(--warning))]" },
  "5. 其他競賽": { card: "border-line bg-surface", badge: "bg-muted text-white", dot: "bg-muted" },
};

export default function ResourcesPage() {
  return <StaticPage eyebrow="FOR EDUCATORS" title={resources.title} intro="從生活問題、任務拆解、版本紀錄到 AI 協作，協助教師以學習教練的角色帶領專題。">
    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{resources.sections.map((section, index) => <article key={section.title} className="rounded-3xl border border-line bg-surface p-7"><span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-sm font-black text-white">{index + 1}</span><h2 className="mt-5 text-xl font-black text-ink">{section.title}</h2><p className="mt-3 leading-7 text-muted">{section.summary}</p></article>)}</div>
    <section className="mt-10 rounded-3xl bg-primary p-7 text-white sm:p-9"><h2 className="text-2xl font-black">AI 提問鷹架</h2><ol className="mt-5 grid gap-3 md:grid-cols-2">{resources.aiQuestionTemplate.map((question, index) => <li key={question} className="rounded-2xl bg-white/10 p-4"><span className="mr-2 font-black text-white/60">{index + 1}.</span>{question}</li>)}</ol></section>
    <section className="mt-14" aria-labelledby="teaching-resources-title">
      <div className="max-w-3xl">
        <p className="text-sm font-black tracking-[0.18em] text-primary">PROJECT LESSON PLANS</p>
        <h2 id="teaching-resources-title" className="mt-2 text-3xl font-black text-ink sm:text-4xl">專題教案</h2>
        <p className="mt-3 leading-7 text-muted">依專題編號整理108課綱跨領域教案與學習單，可下載Word檔案，或前往專題頁查看作品內容。</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2" aria-label="競賽類別底色說明">
        {competitionCategories.map((category) => <span key={category} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-bold text-ink"><span className={`h-2.5 w-2.5 rounded-full ${competitionCardStyles[category].dot}`} aria-hidden="true" />{category}</span>)}
      </div>
      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {teachingResources.map((resource) => {
          const project = projects.find((item) => item.projectNumber === resource.projectNumber);
          if (!project) return null;
          const category = project.competitionCategories[0] ?? "5. 其他競賽";
          const styles = competitionCardStyles[category];
          return <article key={resource.projectNumber} className={`flex min-h-64 flex-col rounded-3xl border p-6 shadow-soft ${styles.card}`}>
            <div className="flex flex-wrap items-center justify-between gap-2"><span className={`w-fit rounded-full px-3 py-1 text-sm font-black ${styles.badge}`}>No. {resource.projectNumber}</span><span className="rounded-full bg-surface/80 px-3 py-1 text-xs font-bold text-muted">{category.replace(/^\d+\.\s*/, "")}</span></div>
            <h3 className="mt-4 text-xl font-black text-ink">{project.title}</h3>
            <p className="mt-3 flex-1 leading-7 text-muted">{resource.title}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a href={resource.file} download className="grid min-h-11 place-items-center rounded-full bg-primary px-4 py-2.5 text-center text-sm font-black text-white transition hover:opacity-90">下載 Word 教案</a>
              <Link href={`/projects/${project.slug}`} className="grid min-h-11 place-items-center rounded-full border border-primary px-4 py-2.5 text-center text-sm font-black text-primary transition hover:bg-primary/10">查看專題</Link>
            </div>
          </article>;
        })}
      </div>
    </section>
  </StaticPage>;
}
