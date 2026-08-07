import Link from "next/link";
import { StaticPage } from "@/components/layout/static-page";
import timeline from "@/codex-update/timeline.json";
import { getProjectBySlug } from "@/data/projects";

export default function TimelinePage() {
  return <StaticPage eyebrow="TIMELINE" title="年度時間軸" intro="從科學玩具、體感機電、真實問題，到 AI 與物聯網，沿著發展階段看見鯉魚專題教育的累積與轉變。">
    <div className="relative mt-12 space-y-8 before:absolute before:bottom-4 before:left-7 before:top-4 before:w-1 before:bg-secondary/35 md:before:left-1/2">
      {timeline.map((stage, index) => <section id={stage.id} key={stage.id} className={`relative grid gap-6 md:grid-cols-2 ${index % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
        <span className="absolute left-2 top-7 z-10 grid h-12 w-12 place-items-center rounded-full border-4 border-surface bg-primary font-black text-white md:left-1/2 md:-translate-x-1/2">{index + 1}</span>
        <div className={`${index % 2 ? "md:pl-12" : "ml-16 md:ml-0 md:pr-12"}`}>
          <div className="overflow-hidden rounded-3xl border border-primary/20 bg-surface shadow-soft">
            <div className="bg-primary px-6 py-5 text-white">
              <p className="font-black text-white/75">{stage.yearStart}－{stage.yearEnd}</p>
              <h2 className="mt-2 text-2xl font-black">{stage.title}</h2>
            </div>
            <div className="border-t border-white/10 bg-surface px-6 py-5">
              <p className="leading-7 text-muted">{stage.summary}</p>
            </div>
          </div>
        </div>
        <div className={`${index % 2 ? "ml-16 md:ml-0 md:pr-12" : "ml-16 md:ml-0 md:pl-12"}`}>
          <div className="rounded-3xl border border-primary/20 bg-primary/20 p-6 shadow-soft">
            <h3 className="font-black text-ink">代表作品</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {stage.representativeProjects.map((slug) => {
                const project = getProjectBySlug(slug);
                return project ? <Link key={slug} href={`/projects/${slug}`} className="rounded-full border border-primary/25 bg-surface px-3 py-2 text-sm font-bold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-soft">{project.projectNumber} {project.title}</Link> : null;
              })}
            </div>
          </div>
        </div>
      </section>)}
    </div>
  </StaticPage>;
}
