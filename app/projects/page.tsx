import { Suspense } from "react";
import type { Metadata } from "next";
import { ProjectBrowser } from "@/components/projects/project-browser";
import { projects } from "@/data/projects";
import Link from "next/link";

export const metadata: Metadata = { title: "專題資料庫" };

export default function ProjectsPage() {
  return <section className="page-shell py-12 sm:py-16"><p className="eyebrow">PROJECT ARCHIVE</p><h1 className="page-title mt-3">專題資料庫</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-muted">共收錄 {projects.length} 筆專題。依關鍵字、年度、競賽、技術、議題與整理狀態，找到想看的學習故事；篩選網址可直接分享。</p><Link href="/families" className="mt-5 inline-flex min-h-11 items-center font-bold text-primary">查看作品家族與迭代關係 →</Link><Suspense fallback={<div className="mt-8 h-48 animate-pulse rounded-3xl bg-surface" />}><ProjectBrowser projects={projects} /></Suspense></section>;
}
