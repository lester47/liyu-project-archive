import Link from "next/link";
import { StaticPage } from "@/components/layout/static-page";
import highlights from "@/codex-update/highlights.json";
import { getProjectBySlug } from "@/data/projects";

export default function HighlightsPage() {
  return <StaticPage eyebrow="SIX HIGHLIGHTS" title="六大亮點" intro="從真實生活與在地文化出發，讓孩子在反覆實作與跨域整合中走向更大的舞臺。">
    <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{highlights.map((item) => <article key={item.id} className="rounded-3xl border border-line bg-surface p-7 shadow-soft"><span className="text-sm font-black text-accent">0{item.order}</span><h2 className="mt-5 text-2xl font-black text-ink">{item.title}</h2><p className="mt-3 leading-7 text-muted">{item.summary}</p><div className="mt-5 flex flex-wrap gap-2">{item.representativeProjects.map((slug) => { const project = getProjectBySlug(slug); return project ? <Link key={slug} href={`/projects/${slug}`} className="text-sm font-bold text-primary">{project.projectNumber} {project.title} →</Link> : null; })}</div></article>)}</div>
  </StaticPage>;
}
