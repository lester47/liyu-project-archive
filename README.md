# 鯉魚創意專題誌

以 Next.js App Router、TypeScript 與 Tailwind CSS 製作的繁體中文學生專題網站。網站用於展示、查詢、分享與保存鯉魚國小 2015 年至今的學生專題。目前已匯入 `codex-update-v1` 資料包中的 33 筆歷年專題；內容依 `verificationStatus` 區分為已確認、部分確認與待確認。

## 安裝

請先安裝 Node.js 20.9 或更新版本，接著在專案目錄執行：

```bash
npm install
```

## 執行

```bash
npm run dev
```

開啟終端機顯示的本機網址（通常是 `http://localhost:3000`）。正式建置可執行 `npm run build`，再以 `npm start` 啟動。

## 新增專題

1. 開啟 `codex-update/projects.json`。
2. 新資料須符合 `types/project.ts` 的 `SourceProject` 型別；網站會在 `data/projects.ts` 將來源資料轉成顯示格式。
3. `id` 與 `slug` 必須唯一，`slug` 建議使用小寫英數與連字號。
4. 同一作品參加不同競賽時，請分別加入 `competitions` 與 `awards`。
5. `verificationStatus` 使用 `verified`、`partial` 或 `pending`。
6. 若資料尚未確認，請填「待補」或保留空陣列，不得推測專題名稱、學生姓名、獎項或技術。
7. 公開前逐筆確認個資、影像授權、內容與獎項正確性。

其他固定內容位於 `codex-update/`：時間軸、六大亮點、作品家族、教師資源、AI 協作與網站文案皆由該處資料驅動。

## 新增圖片

1. 將圖片放入 `public/images/projects/`（可自行建立資料夾）。
2. 在專題資料的 `coverImage` 填入 `/images/projects/檔名.jpg`。
3. 在 `imageAlt` 填寫能表達圖片資訊的繁體中文替代文字，勿只寫「圖片」。
4. 專題卡片與詳細頁目前使用安全的預留圖；正式接圖時可改用 Next.js `Image` 元件讀取 `coverImage`。
5. 上傳學生照片或作品影像前，必須確認公開授權。

## 修改色系

四套主題的 CSS Variables 位於 `app/globals.css`：`sunny`（暖陽）、`ocean`（海洋）、`forest`（森林）、`starlight`（星空）。預設為 `forest`。可修改各主題的 RGB 數字；元件應持續使用 Tailwind 語意色彩（如 `bg-primary`、`text-ink`），避免在元件內大量寫死色碼。

## 部署到 Vercel

1. 將專案推送到 GitHub、GitLab 或 Bitbucket。
2. 登入 Vercel，選擇「Add New Project」並匯入專案。
3. Framework Preset 選擇 Next.js；一般情況不需修改建置設定。
4. 按下 Deploy。此版本沒有資料庫、登入或必要環境變數。

也可安裝 Vercel CLI 後執行 `vercel`。公開前請先完成正式資料與授權檢核。
