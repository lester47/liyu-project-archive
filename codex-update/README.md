# Codex 更新資料包

此資料包用於更新「鯉魚創意專題誌」網站。

## 檔案

- `projects.json`：歷年專題主資料
- `timeline.json`：專題發展階段
- `highlights.json`：六大亮點
- `project-families.json`：作品家族與迭代關係
- `site-content.json`：網站固定文案
- `teacher-resources.json`：教師資源內容
- `ai-learning.md`：AI協作專題模式
- `themes.ts`：主題名稱與預設值
- `website-requirements.md`：更新與內容規則

## Codex 建議指令

請讀取 `codex-update` 資料夾內所有檔案，更新目前網站。

要求：
1. 專題資料以 `projects.json` 為主。
2. 年度時間軸以 `timeline.json` 為主。
3. 六大亮點以 `highlights.json` 為主。
4. AI協作頁以 `ai-learning.md` 為主。
5. 主題設定以 `themes.ts` 為主。
6. 不得自行杜撰缺漏資料。
7. 缺少內容顯示「待補」或隱藏欄位。
8. 全站使用繁體中文。
9. 更新完成後執行 lint 與 build。
10. 回報資料匯入、欄位對應與錯誤情況。

## 注意

目前部分早期專題的硬體、操作流程、材料及完整學生資料仍待補充。
