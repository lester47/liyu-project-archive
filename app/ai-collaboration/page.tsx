import { readFile } from "node:fs/promises";
import path from "node:path";
import { StaticPage } from "@/components/layout/static-page";

type MarkdownBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "quote"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; ordered: boolean; items: string[] };

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
  </StaticPage>;
}
