# AGENTS.md - 呼吸治療臨床知識庫 (RT Knowledge Base) 開發規範

## 1. 專案目的 (Project Purpose)
本專案是一個專注於「呼吸治療（Respiratory Therapy）」的模組化臨床知識庫，內容涵蓋機械通氣（Mechanical Ventilation）、重症加護照護（ICU）、呼吸器脫離（Weaning）、肺部復原（Pulmonary Rehabilitation）以及呼吸治療儀器設備管理。
本架構採用「介面與內容分離」設計，讓 AI 助理能依據標準化規則，持續擴充高品質、格式統一的臨床筆記，而不破壞網頁結構。

## 2. 網頁整體風格 (Design & Aesthetics)
- **視覺風格**：專業醫療科技風（Clinical Clean Light/Slate Mode），強調高對比、易讀性與資訊層次，適合臨床人員快速查閱。
- **色彩規範**：
  - 頁面背景：`#f8fafc`（醫療冷白灰）
  - 卡片與側邊欄背景：`#ffffff`（純白，搭配細微陰影）
  - 主強調色：`#0284c7`（醫療專業藍）
  - 次要輔助色：`#0d9488`（生理監測青綠）
  - 臨床警示框：`#fef2f2` 背景搭配 `#dc2626` 邊框（用於標註禁忌症或高風險參數）
- **版面配置**：響應式設計（RWD），上方為分類篩選導覽列，主體為 3 欄式知識卡片網格，點擊卡片開啟閱讀視窗。

## 3. 檔案結構與命名規則 (File Structure & Naming)
- `index.html`：主入口頁面，包含標題區、臨床分類篩選器、搜尋框、知識卡片網格，以及 Markdown 文章閱讀彈窗（Modal）。
- `style.css`：全域樣式表，嚴禁在 HTML 中使用行內樣式（Inline Styles）。
- `app.js`：負責非同步讀取 `posts/index.json`、處理分類篩選與關鍵字搜尋，並透過 `marked.js` 動態渲染 `.md` 內容。
- `posts/`：所有臨床知識文章必須存放於此資料夾。
  - **命名規範**：一律使用小寫英文、數字與連字號（kebab-case），格式為 `YYYY-MM-DD-clinical-topic.md`（例如：`2026-11-16-ventilator-weaning-protocol.md`）。
  - `posts/index.json`：所有文章的註冊索引清單。

## 4. 新增內容的標準格式 (Clinical Content Schema)
每篇新增的 Markdown 檔案必須嚴格遵守以下結構：
1. **一級標題 (`# 標題`)**：明確的臨床主題名稱。
2. **核心摘要 (`> 臨床重點：...`)**：50 字以內概述適應症或核心概念。
3. **標準段落 (`##`)**：視主題包含「適應症與評估」、「參數設定 / 操作步驟」、「臨床注意事項 / 禁忌症」。
4. **數據與參數表格**：凡涉及呼吸器設定（如 Vt, PEEP, FiO2, RR）或血氣分析（ABG）標準值，優先使用 Markdown 表格呈現。

## 5. AI 修改或新增內容時的嚴格規則 (Rules for AI Agents)
當使用者要求「新增一篇呼吸治療筆記/規範/設備教學」時，AI 必須依序執行以下三個步驟，**嚴禁修改 `index.html` 與 `style.css` 的版面架構**：
1. **建立內容檔**：在 `posts/` 目錄下建立符合命名規範的 `.md` 檔案，並套用第 4 點的標準格式撰寫專業內容。
2. **註冊索引檔**：打開 `posts/index.json`，在陣列最上方新增一筆 JSON 物件，且 `category` 必須屬於以下四個標準分類之一：`機械通氣`、`呼吸器脫離`、`肺部復原`、`儀器與耗材`：
   ```json
   {
     "id": "rt-編號",
     "title": "臨床主題標題",
     "date": "YYYY-MM-DD",
     "category": "標準分類名稱",
     "summary": "50字以內臨床重點摘要",
     "file": "posts/你的檔名.md"
   }