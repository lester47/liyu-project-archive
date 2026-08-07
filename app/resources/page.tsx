import { StaticPage } from "@/components/layout/static-page";
import resources from "@/codex-update/teacher-resources.json";

export default function ResourcesPage() {
  return <StaticPage eyebrow="FOR EDUCATORS" title={resources.title} intro="從生活問題、任務拆解、版本紀錄到 AI 協作，協助教師以學習教練的角色帶領專題。">
    <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{resources.sections.map((section, index) => <article key={section.title} className="rounded-3xl border border-line bg-surface p-7"><span className="grid h-11 w-11 place-items-center rounded-full bg-primary text-sm font-black text-white">{index + 1}</span><h2 className="mt-5 text-xl font-black text-ink">{section.title}</h2><p className="mt-3 leading-7 text-muted">{section.summary}</p></article>)}</div>
    <section className="mt-10 rounded-3xl bg-primary p-7 text-white sm:p-9"><h2 className="text-2xl font-black">AI 提問鷹架</h2><ol className="mt-5 grid gap-3 md:grid-cols-2">{resources.aiQuestionTemplate.map((question, index) => <li key={question} className="rounded-2xl bg-white/10 p-4"><span className="mr-2 font-black text-white/60">{index + 1}.</span>{question}</li>)}</ol></section>
  </StaticPage>;
}
