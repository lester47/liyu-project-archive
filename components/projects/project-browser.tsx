"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project, ProjectSort } from "@/types/project";
import { topicCategories } from "@/data/topic-categories";
import { technologyCategories } from "@/data/technology-categories";

type FilterKey = "q" | "year" | "competition" | "technology" | "topic" | "status" | "sort";

const unique = (items: string[]) => [...new Set(items)].sort((a, b) => b.localeCompare(a, "zh-Hant"));

export function ProjectBrowser({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const value = (key: FilterKey) => searchParams.get(key) ?? "";

  const options = useMemo(() => ({
    years: unique(projects.map((item) => item.year)),
    competitions: unique(projects.flatMap((item) => item.competitionCategories)),
    technologies: [...technologyCategories],
    topics: [...topicCategories],
    statuses: unique(projects.map((item) => item.statusLabel)),
  }), [projects]);

  const filtered = useMemo(() => {
    const q = value("q").trim().toLocaleLowerCase("zh-Hant");
    const result = projects.filter((project) => {
      const searchable = [project.projectNumber, project.title, project.summary, project.competition, ...project.competitionCategories, ...project.technologies, ...project.technologyCategories, ...project.topics, ...project.topicCategories].join(" ").toLocaleLowerCase("zh-Hant");
      return (!q || searchable.includes(q)) &&
        (!value("year") || project.year === value("year")) &&
        (!value("competition") || project.competitionCategories.includes(value("competition"))) &&
        (!value("technology") || project.technologyCategories.includes(value("technology") as (typeof project.technologyCategories)[number])) &&
        (!value("topic") || project.topicCategories.includes(value("topic") as (typeof project.topicCategories)[number])) &&
        (!value("status") || project.statusLabel === value("status"));
    });
    return result.sort((a, b) => {
      const sort = (value("sort") || "number") as ProjectSort;
      if (sort === "number") return a.projectNumber.localeCompare(b.projectNumber, "en", { numeric: true });
      if (sort === "title") return a.title.localeCompare(b.title, "zh-Hant");
      const direction = sort === "oldest" ? 1 : -1;
      return a.year.localeCompare(b.year, "zh-Hant") * direction;
    });
  // URL 查詢參數是此列表的狀態來源。
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, searchParams]);

  const establishedProjects = filtered.filter((project) => project.status !== "developing");
  const developingProjects = filtered.filter((project) => project.status === "developing");

  function update(key: FilterKey, nextValue: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextValue) params.set(key, nextValue); else params.delete(key);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  const selectClass = "min-h-11 rounded-xl border border-line px-3 text-sm text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <div className="mt-8">
      <div className="rounded-3xl border border-line bg-surface p-4 shadow-soft sm:p-5">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="xl:col-span-2"><span className="sr-only">關鍵字搜尋</span><input type="search" value={value("q")} onChange={(event) => update("q", event.target.value)} placeholder="搜尋名稱、摘要、技術或議題…" className="min-h-11 w-full rounded-xl border border-line bg-primary/10 px-4 text-ink transition-colors placeholder:text-muted focus:border-primary focus:bg-primary/15 focus:outline-none focus:ring-2 focus:ring-primary/20" /></label>
          <Filter label="年度" value={value("year")} items={options.years} onChange={(v) => update("year", v)} className={`${selectClass} bg-secondary/20`} />
          <Filter label="競賽" value={value("competition")} items={options.competitions} onChange={(v) => update("competition", v)} className={`${selectClass} bg-accent/15`} />
          <Filter label="技術" value={value("technology")} items={options.technologies} onChange={(v) => update("technology", v)} className={`${selectClass} bg-primary/15`} />
          <Filter label="議題" value={value("topic")} items={options.topics} onChange={(v) => update("topic", v)} className={`${selectClass} bg-secondary/30`} />
          <Filter label="狀態" value={value("status")} items={options.statuses} onChange={(v) => update("status", v)} className={`${selectClass} bg-accent/25`} />
          <label><span className="sr-only">排序</span><select value={value("sort") || "number"} onChange={(event) => update("sort", event.target.value)} className={`${selectClass} w-full bg-primary/25`}><option value="number">編號：01到34</option><option value="newest">年份：新到舊</option><option value="oldest">年份：舊到新</option><option value="title">名稱排序</option></select></label>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4"><p aria-live="polite" className="text-sm text-muted">找到 {filtered.length} 筆專題</p><button type="button" onClick={() => router.replace(pathname, { scroll: false })} className="text-sm font-bold text-primary">清除全部篩選</button></div>
      </div>
      {filtered.length ? <>
        {establishedProjects.length > 0 && <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{establishedProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>}
        {developingProjects.length > 0 && <section className="mt-14" aria-labelledby="developing-projects-title">
          <div className="flex items-center gap-4"><div className="h-px flex-1 bg-accent/55" /><div className="rounded-full border border-accent/35 bg-accent/15 px-5 py-2 text-center"><h2 id="developing-projects-title" className="font-black text-ink">尚在開發中的專題</h2><p className="mt-0.5 text-xs font-semibold text-muted">以下作品仍在設計、測試與持續改良中</p></div><div className="h-px flex-1 bg-accent/55" /></div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{developingProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        </section>}
      </> : <div className="mt-8 rounded-3xl border border-dashed border-line py-16 text-center"><p className="text-xl font-bold text-ink">找不到符合條件的專題</p><p className="mt-2 text-muted">試著減少篩選條件或使用其他關鍵字。</p></div>}
    </div>
  );
}

function Filter({ label, value, items, onChange, className }: { label: string; value: string; items: string[]; onChange: (value: string) => void; className: string }) {
  return <label><span className="sr-only">{label}篩選</span><select value={value} onChange={(event) => onChange(event.target.value)} className={`${className} w-full`}><option value="">所有{label}</option>{items.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>;
}
