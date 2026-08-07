import { StaticPage } from "@/components/layout/static-page";
import content from "@/codex-update/site-content.json";

export default function AboutPage() {
  return <StaticPage eyebrow="ABOUT US" title="關於我們" intro={`${content.siteName}希望保存鯉魚國小學生的探究與實作歷程，讓過去的經驗成為未來學習的養分。`}>
    <section className="mt-10 grid gap-5 lg:grid-cols-3">{content.brandStatements.map((statement) => <blockquote key={statement} className="rounded-3xl border border-line bg-surface p-7 text-xl font-black leading-8 text-ink">{statement}</blockquote>)}</section>
    <p className="mt-10 rounded-3xl bg-primary p-8 text-center text-3xl font-black text-white">「{content.motto}」</p>
    <section className="mt-10 rounded-3xl border border-line bg-surface p-8"><h2 className="text-2xl font-black text-ink">資料使用原則</h2><p className="mt-4 max-w-3xl leading-8 text-muted">本站正式公開前，應逐筆確認內容正確性、個人資料使用範圍、學生與監護人影像授權，以及作品素材的著作權狀態。部分確認或待確認資料會清楚標示。</p></section>
  </StaticPage>;
}
