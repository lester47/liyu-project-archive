import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types/project";

type AwardKind = "champion" | "runner-up" | "gold" | "silver" | "bronze";

const awardIconStyles: Record<AwardKind, { label: string; symbol: string }> = {
  champion: { label: "冠軍", symbol: "🏆" },
  "runner-up": { label: "亞軍", symbol: "🏅" },
  gold: { label: "金牌或金獎", symbol: "🥇" },
  silver: { label: "銀牌或銀獎", symbol: "🥈" },
  bronze: { label: "銅牌或銅獎", symbol: "🥉" },
};

function getAwardKind(label: string): AwardKind | null {
  if (label.includes("冠軍")) return "champion";
  if (label.includes("亞軍")) return "runner-up";
  if (/金牌|金獎|金質獎|縣賽第一(?:名)?/.test(label)) return "gold";
  if (/銀牌|銀獎|銀質獎/.test(label)) return "silver";
  if (/銅牌|銅獎|銅質獎/.test(label)) return "bronze";
  return null;
}

function AwardIcon({ kind }: { kind: AwardKind }) {
  const icon = awardIconStyles[kind];
  return <span role="img" aria-label={icon.label} title={icon.label} className="inline-grid h-6 w-6 shrink-0 place-items-center text-[21px] leading-none">{icon.symbol}</span>;
}

export function ProjectCard({ project }: { project: Project }) {
  const awardKinds = [...new Set(project.awardLabels.map(getAwardKind).filter((kind): kind is AwardKind => kind !== null))];

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.4rem] border border-line bg-surface shadow-[6px_8px_0_rgb(var(--primary)/.18),10px_16px_30px_rgb(var(--shadow)/.5)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[7px_10px_0_rgb(var(--primary)/.22),12px_22px_38px_rgb(var(--shadow)/.6)]">
      <div role={!project.coverImage ? "img" : undefined} aria-label={!project.coverImage ? project.imageAlt : undefined} className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/25 via-secondary/25 to-accent/30">
        {project.coverImage ? <><Image src={project.coverImage} alt={project.imageAlt} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" /><span className="absolute bottom-4 left-4 right-4 truncate text-lg font-black text-white drop-shadow">{project.projectNumber} {project.title}</span></> : <><div className="absolute -right-6 -top-8 h-32 w-32 rounded-full border-[18px] border-white/20 transition duration-500 group-hover:scale-110" /><div className="absolute bottom-0 left-0 h-2/3 w-full bg-gradient-to-t from-primary/40 to-transparent" /><span aria-hidden="true" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-black text-white/75">{project.title.slice(0, 1)}</span><span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-xs font-bold text-primary shadow-sm">暫用圖片｜照片待補</span><span className="absolute bottom-4 left-4 right-4 truncate text-lg font-black text-white drop-shadow">{project.projectNumber} {project.title}</span></>}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 text-sm text-muted"><span>年度：{project.year}</span><span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{project.statusLabel}</span></div>
        <h2 className="mt-4 text-xl font-black text-ink"><span className="mr-2 text-accent">{project.projectNumber}</span>{project.title}</h2>
        <p className="mt-2 line-clamp-2 min-h-14 flex-1 text-base leading-7 text-muted">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">{project.technologies.slice(0, 3).map((item) => <span key={item} className="rounded-lg bg-canvas px-2.5 py-1.5 text-xs font-semibold text-muted">技術：{item}</span>)}</div>
        <div className="-mx-5 -mb-5 mt-4 border-t border-primary/30 bg-primary/30 px-5 pb-5 pt-4 sm:-mx-6 sm:-mb-6 sm:px-6 sm:pb-6">
          <div className="flex min-h-12 items-start gap-2">
            <p className="line-clamp-2 min-w-0 flex-1 text-sm leading-6 text-muted">
              獎項：{project.awardLabels.join("、")}
            </p>
            {awardKinds.length > 0 && <span className="inline-flex shrink-0 gap-1 pt-0.5">{awardKinds.map((kind) => <AwardIcon key={kind} kind={kind} />)}</span>}
          </div>
          <Link href={`/projects/${project.slug}`} className="mt-4 inline-flex min-h-11 items-center font-bold text-primary">查看詳情 <span className="ml-2 transition group-hover:translate-x-1" aria-hidden="true">→</span></Link>
        </div>
      </div>
    </article>
  );
}
