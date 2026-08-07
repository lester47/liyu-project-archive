export const pendingValue = "待補" as const;

export type SourceProjectStatus = "completed" | "improving" | "developing";
export type VerificationStatus = "verified" | "partial" | "pending";
export type ProjectStatus = "成果完整" | "持續改良" | "開發中" | "待補";

export interface CompetitionEntry {
  name: string;
  year: number;
  result: string;
}

export interface AwardEntry {
  competition: string;
  award: string;
  level: string;
  year: number;
  prizeAmountTwd?: number;
}

export interface SongEntry {
  title: string | null;
  verified: boolean;
}

export interface ProjectVersionEntry {
  label: string;
  title: string;
  summary: string;
  operation: string;
  technologies: string[];
  achievements: string[];
}

export interface ProjectActivityEntry {
  title: string;
  summary: string;
  operation: string;
  technologies: string[];
}

export interface ProjectDimensions {
  lengthCm: number;
  widthCm: number;
  heightCm: number;
}

export interface ProjectAsset {
  fileName: string;
  projectSlug: string;
  type: "cover" | "gallery" | "hero" | "infographic" | "video";
  alt: string;
  caption: string;
  source: string;
  verified: boolean;
  displayRatio?: "16:9" | "4:3";
}

export interface YoutubeVideo {
  youtubeId: string;
  title: string;
  description: string;
  authorizationStatus: "已確認" | "待確認";
}

export interface SourceProject {
  id: string;
  projectNumber: string;
  slug: string;
  title: string;
  alternateTitle?: string;
  englishTitle?: string;
  versionLabel?: string;
  grade?: string;
  songs?: SongEntry[];
  versions?: ProjectVersionEntry[];
  activities?: ProjectActivityEntry[];
  activitySectionTitle?: string;
  activityItemLabel?: string;
  yearStart: number;
  yearEnd?: number;
  summary: string;
  problem: string;
  concept: string;
  operation: string;
  technologies: string[];
  hardware: string[];
  materials: string[];
  topics: string[];
  competitions: CompetitionEntry[];
  awards: AwardEntry[];
  status: SourceProjectStatus;
  featured: boolean;
  familyId: string | null;
  verificationStatus: VerificationStatus;
  sourceNotes: string[];
  teamName?: string;
  teamCode?: string;
  students?: string[];
  teachers?: string[];
  dimensions?: ProjectDimensions;
  weightKg?: number;
  process?: string[];
  challenges?: string;
  learningOutcomes?: string[];
  safetyNotes?: string[];
  relatedLinks?: Array<{ label: string; url: string }>;
  youtubeVideos?: YoutubeVideo[];
}

export interface Project extends SourceProject {
  year: string;
  competition: string;
  competitionCategories: string[];
  topicCategories: import("@/data/topic-categories").TopicCategory[];
  technologyCategories: import("@/data/technology-categories").TechnologyCategory[];
  statusLabel: ProjectStatus;
  awardLabels: string[];
  students: string[];
  teachers: string[];
  coverImage?: string;
  coverDisplayRatio?: "16:9" | "4:3";
  imageAlt: string;
  gallery: ProjectAsset[];
  videos: ProjectAsset[];
  updatedAt: string;
}

export type ProjectSort = "number" | "newest" | "oldest" | "title";
