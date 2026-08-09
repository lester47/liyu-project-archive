import { readFile } from "node:fs/promises";
import path from "node:path";
import { StaticPage } from "@/components/layout/static-page";

type MarkdownBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "quote"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

const collaborationFlow = [
  "遇到問題",
  "描述問題",
  "詢問 AI",
  "理解建議",
  "實際修改",
  "測試結果",
  "發現新問題",
  "再次迭代",
];

const learningPoints = [
  {
    title: "問題定義",
    description: "學生必須先理解「現在卡住的是哪一個問題」，才能有效詢問 AI。",
  },
  {
    title: "專案脈絡",
    description: "AI 不知道學生之前做過什麼，因此學生必須能說明目前專案狀態與既有成果。",
  },
  {
    title: "驗證能力",
    description: "AI 的建議不能直接照單全收，必須透過實際操作確認是否正確。",
  },
  {
    title: "除錯與迭代",
    description: "錯誤不是專題失敗，而是重新理解系統與調整方法的重要機會。",
  },
];

const imagePlaceholders = [
  "學生操作 AI 工具",
  "MakeCode 專案畫面",
  "實體測試紀錄",
];

function parseMarkdown(source: string): MarkdownBlock[] {
  const lines = source.replace(/\r/g, "").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line) { index += 1; continue; }
    if (line.startsWith("#")) {
      const marker = line.match(/^#+/)?.[0] ?? "#";
      blocks.push({ type: "heading", level: marker.length, text: line.slice(marker.length).trim() });
      index += 1; continue;
    }
    if (line.startsWith(">")) {
      blocks.push({ type: "quote", text: line.slice(1).trim() });
      index += 1; continue;
    }
    const unordered = line.match(/^[-*]\s+(.+)/);
    const ordered = line.match(/^\d+\.\s+(.+)/);
    if (unordered || ordered) {
      const items: string[] = [];
      const isOrdered = Boolean(ordered);
      while (index < lines.length) {
        const current = lines[index].trim();
        const match = isOrdered ? current.match(/^\d+\.\s+(.+)/) : current.match(/^[-*]\s+(.+)/);
        if (!match) break;
        items.push(match[1]); index += 1;
      }
      blocks.push({ type: "list", ordered: isOrdered, items });
      continue;
    }
    const paragraph = [line]; index += 1;
    while (index < lines.length && lines[index].trim() && !/^(#|>|[-*]\s|\d+\.\s)/.test(lines[index].trim())) {
      paragraph.push(lines[index].trim()); index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }
  return blocks;
}

export default async function AiCollaborationPage() {
  const markdownPath = path.join(process.cwd(), "codex-update", "ai-learning.md");
  const markdown = await readFile(markdownPath, "utf8");
  const blocks = parseMarkdown(markdown);
  const titleBlock = blocks.find(
    (block): block is Extract<MarkdownBlock, { type: "heading" }> =>
      block.type === "heading" && block.level === 1,
  );
  const pageTitle = titleBlock?.text ?? "AI 協作專題模式";

  return <StaticPage eyebrow="AI COLLABORATION" title={pageTitle} intro="AI 是學習助手與開發伙伴；學生仍需理解、實作、測試並驗證每一項建議。">
    <article className="mt-10 space-y-6 rounded-3xl border border-line bg-surface p-7 shadow-soft sm:p-10">
      {blocks.map((block, index) => {
        if (block.type === "heading" && block.level === 1) return null;
        if (block.type === "heading") return <h2 key={index} className="pt-4 text-2xl font-black text-ink">{block.text}</h2>;
        if (block.type === "quote") return <blockquote key={index} className="rounded-2xl border-l-4 border-accent bg-[rgb(var(--surface-muted))] p-5 font-bold text-ink">{block.text}</blockquote>;
        if (block.type === "paragraph") return <p key={index} className="text-base leading-8 text-muted">{block.text}</p>;
        const List = block.ordered ? "ol" : "ul";
        return <List key={index} className={`grid gap-3 md:grid-cols-2 ${block.ordered ? "list-decimal" : "list-disc"}`}>{block.items.map((item) => <li key={item} className="ml-5 rounded-xl bg-primary/5 p-4 leading-7 text-ink">{item}</li>)}</List>;
      })}
    </article>

    <section className="mt-16" aria-labelledby="practice-case-title">
      <div className="max-w-4xl">
        <p className="text-sm font-black tracking-[0.18em] text-primary">PRACTICE CASE</p>
        <h2 id="practice-case-title" className="mt-2 text-3xl font-black text-ink sm:text-4xl">AI 協作實踐案例</h2>
        <p className="mt-4 text-xl font-bold leading-8 text-accent">從「老師帶著做」，走向「學生自己帶著 AI 解決問題」</p>
        <div className="mt-6 space-y-4 leading-8 text-muted">
          <p>目前我們正以實際學生專題，觀察 AI 如何進入創意專題的學習歷程。</p>
          <p>AI 並不是直接產出作品，而是在學生遇到問題時，協助他們理解問題、拆解任務、尋找可能的方法，再透過實際操作與測試驗證結果。</p>
          <p>在這個過程中，教師仍然負責學習方向、觀念釐清、進度、安全與成果驗證；學生則必須真正操作、判斷、修改與測試。</p>
        </div>
      </div>

      <article className="mt-8 overflow-hidden rounded-3xl border border-line bg-surface shadow-soft">
        <header className="border-b border-line bg-[rgb(var(--surface-muted))] p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary px-4 py-2 text-sm font-black text-white">正在實踐與發展中</span>
            <span className="text-sm font-bold text-muted">micro:bit・動作資料・AI 工具</span>
          </div>
          <h3 className="mt-5 text-2xl font-black text-ink sm:text-3xl">🎾 匹克球智慧教練｜學生逐步自主開發</h3>
          <div className="mt-4 max-w-4xl space-y-3 leading-8 text-muted">
            <p>學生利用 micro:bit、動作資料與 AI 工具，開發「匹克球智慧教練」，希望協助初學者練習正拍抽球，並逐步辨識常見動作錯誤。</p>
            <p>暑假期間，學生在教師遠距與實體指導下，開始嘗試將 Codex 等 AI 工具納入專題開發流程。</p>
          </div>
        </header>

        <div className="space-y-12 p-7 sm:p-10">
          <section aria-labelledby="real-learning-event">
            <h4 id="real-learning-event" className="text-2xl font-black text-ink">一次真實的 AI 協作學習歷程</h4>
            <div className="mt-5 space-y-4 leading-8 text-muted">
              <p>在一次開發過程中，學生原本應該繼續使用先前已完成的 MakeCode 專案與訓練模型，但實際操作時卻另外開啟了一個全新的空白 MakeCode 專案。</p>
              <p>接著，當學生準備重新匯入模型時，又誤將尚未訓練完成的 JSON 樣本資料，當成可以直接使用的模型檔案，而不是匯入已經完成訓練、可以繼續開發的 HEX 專案。</p>
              <p>經過幾次嘗試後，學生才逐漸理解：</p>
            </div>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                "「訓練資料」與「已完成的專案」並不是同一件事。",
                "JSON 樣本資料不能直接取代已訓練並整合程式的 HEX 專案。",
                "使用 AI 前，必須先清楚告訴 AI：目前專案做到哪裡、已經有哪些成果、現在真正要修改的是什麼。",
                "AI 可以提出方法，但使用者仍必須確認專案狀態與檔案是否正確。",
              ].map((item) => <li key={item} className="rounded-2xl bg-primary/5 p-5 leading-7 text-ink">{item}</li>)}
            </ul>
            <p className="mt-5 leading-8 text-muted">教師在此過程中並沒有直接替學生完成，而是持續要求學生重新確認問題、找到正確專案，並理解每一個操作步驟。</p>
          </section>

          <section aria-labelledby="teacher-questions">
            <h4 id="teacher-questions" className="text-2xl font-black text-ink">教師在過程中反覆追問</h4>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {["現在真正要解決的問題是什麼？", "原來已經完成的成果在哪裡？", "AI 建議的方法，真的可以在現在這個專案中執行嗎？"].map((question) =>
                <blockquote key={question} className="flex min-h-32 items-center rounded-2xl border-l-4 border-accent bg-[rgb(var(--surface-muted))] p-6 text-lg font-black leading-8 text-ink">「{question}」</blockquote>
              )}
            </div>
          </section>

          <section aria-labelledby="collaboration-flow-title">
            <h4 id="collaboration-flow-title" className="text-2xl font-black text-ink">AI 協作流程</h4>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {collaborationFlow.map((step, index) => <li key={step} className="relative flex min-h-20 items-center rounded-2xl border border-line bg-surface px-5 py-4 font-black text-ink">
                <span className="mr-3 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm text-white">{index + 1}</span>
                {step}
                {index < collaborationFlow.length - 1 && <span className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 text-accent sm:hidden" aria-hidden="true">↓</span>}
              </li>)}
            </ol>
          </section>

          <section aria-labelledby="learning-points-title">
            <h4 id="learning-points-title" className="text-2xl font-black text-ink">這個案例真正學到的，不只是程式</h4>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {learningPoints.map((point, index) => <article key={point.title} className="rounded-2xl border border-line bg-primary/5 p-6">
                <p className="text-sm font-black text-accent">0{index + 1}</p>
                <h5 className="mt-2 text-xl font-black text-ink">{point.title}</h5>
                <p className="mt-3 leading-7 text-muted">{point.description}</p>
              </article>)}
            </div>
          </section>

          <section aria-labelledby="case-images-title">
            <h4 id="case-images-title" className="text-2xl font-black text-ink">實踐紀錄</h4>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {imagePlaceholders.map((label) => <div key={label} className="grid aspect-[4/3] place-items-center rounded-2xl border border-dashed border-line bg-[rgb(var(--surface-muted))] p-6 text-center font-bold text-muted" role="img" aria-label={`${label}，照片待補`}>
                <span><span className="mb-3 block text-3xl" aria-hidden="true">▧</span>{label}<span className="mt-2 block text-sm font-normal">照片待補</span></span>
              </div>)}
            </div>
          </section>

          <blockquote className="rounded-3xl border-l-4 border-accent bg-[rgb(var(--surface-muted))] p-7 sm:p-9">
            <p className="text-2xl font-black leading-10 text-ink">真正重要的，不是學生會不會問 AI，而是他能不能判斷 AI 說得對不對。</p>
            <p className="mt-4 leading-8 text-muted">AI 可以提供很多答案，但學生必須學會判斷哪一個答案，才適合自己正在解決的問題。</p>
          </blockquote>
        </div>
      </article>
    </section>
  </StaticPage>;
}
