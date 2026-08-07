import Link from "next/link";
import { StaticPage } from "@/components/layout/static-page";
import families from "@/codex-update/project-families.json";
import { getProjectBySlug } from "@/data/projects";

export default function FamiliesPage() {
  return <StaticPage eyebrow="PROJECT FAMILIES" title="作品家族與迭代" intro="追蹤同一個創意如何經過測試、改良與跨年度延伸，理解作品背後真正的工程學習歷程。">
    <div className="mt-10 grid gap-6 lg:grid-cols-2">{families.map((family) => <article key={family.id} className="rounded-3xl border border-line bg-surface p-7 shadow-soft"><h2 className="text-2xl font-black text-ink">{family.title}</h2><p className="mt-3 leading-7 text-muted">{family.summary}</p><div className="mt-6 flex flex-wrap gap-2">{family.projectSlugs.map((slug, index) => { const project = getProjectBySlug(slug); return project ? <span key={slug} className="contents"><Link href={`/projects/${slug}`} className="rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">{project.projectNumber} {project.title}</Link>{index < family.projectSlugs.length - 1 && <span aria-hidden="true" className="self-center text-muted">→</span>}</span> : null; })}</div></article>)}</div>
  </StaticPage>;
}
