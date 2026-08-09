import rawProjects from "@/codex-update/projects.json";
import rawAssets from "@/codex-update/assets-manifest.json";
import type { Project, ProjectAsset, ProjectStatus, SourceProject } from "@/types/project";
import { getTopicCategories } from "@/data/topic-categories";
import { getTechnologyCategories } from "@/data/technology-categories";
import { getCompetitionCategory } from "@/data/competition-categories";

const statusLabels: Record<SourceProject["status"], ProjectStatus> = {
  completed: "成果完整",
  improving: "持續改良",
  developing: "開發中",
};

const assets = rawAssets as ProjectAsset[];

const compactAwardCompetition = (projectSlug: string, competition: string) =>
  ["move-move", "green-wheel"].includes(projectSlug) && competition === "國教署科技教育創意實作競賽"
    ? "全國賽"
    : competition;

export const projects: Project[] = (rawProjects as SourceProject[]).map((project) => ({
  ...project,
  // 專題可能跨年度持續發展，但資料庫的年度分類一律歸入起始年份，
  // 避免同一批作品同時產生「2025」與「2025－2026」兩種選項。
  year: String(project.yearStart),
  competition: project.competitions[0]?.name ?? "待補",
  competitionCategories: [...new Set(project.competitions.map((item) => getCompetitionCategory(item.name)))],
  topicCategories: getTopicCategories(project.topics),
  technologyCategories: getTechnologyCategories(project.technologies),
  statusLabel: statusLabels[project.status],
  awardLabels: project.awards.length
    ? project.awards.map((award) => `${award.year} ${compactAwardCompetition(project.slug, award.competition)}｜${award.award}${award.prizeAmountTwd ? `（新臺幣 ${award.prizeAmountTwd.toLocaleString("zh-TW")} 元）` : ""}`)
    : ["未列獎項"],
  students: project.students?.length ? project.students : ["待補（公開前須確認個資與授權）"],
  teachers: project.teachers?.length ? project.teachers : ["待補"],
  coverImage: assets.find((asset) => asset.projectSlug === project.slug && asset.type === "cover")?.fileName,
  coverDisplayRatio: assets.find((asset) => asset.projectSlug === project.slug && asset.type === "cover")?.displayRatio,
  imageAlt: assets.find((asset) => asset.projectSlug === project.slug && asset.type === "cover")?.alt ?? `${project.title}專題照片暫用視覺，正式作品照片待補`,
  gallery: assets.filter((asset) => asset.projectSlug === project.slug && (asset.type === "gallery" || asset.type === "infographic")),
  videos: assets.filter((asset) => asset.projectSlug === project.slug && asset.type === "video"),
  updatedAt: "待補",
}));

export const featuredProjects = projects.filter((project) => project.featured);

export const getProjectBySlug = (slug: string) =>
  projects.find((project) => project.slug === slug);
