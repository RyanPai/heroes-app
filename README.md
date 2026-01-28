## 執行方式

1. 安裝依賴：
   ```bash
   npm install
   ```

2. 啟動開發伺服器：
   ```bash
   npm run dev
   ```
   訪問 http://localhost:5173/ 會自動重定向到英雄列表。

3. 建置生產版本：
   ```bash
   npm run build
   ```

4. 類型檢查：
   ```bash
   npm run typecheck
   ```

```
.env                     # 本機環境變數（不提交）
.env.example             # 環境變數範例
```   

## 技術棧

- **React 19.2.3**：最新穩定版，提供 concurrent rendering。
- **React Router 7.12.0**：處理路由與 nested layout。
- **TypeScript**：類型安全。
- **Vite**：快速開發與建置工具。


## 專案架構

```
app/
├── components/          # 共用組件
│   ├── HeroList.tsx     # 英雄列表
│   ├── HeroCard.tsx     # 單個英雄卡片
│   ├── HeroInfo.tsx     # 英雄基本資訊
│   ├── HeroProfile.tsx  # 英雄個人頁面
│   ├── PageLoading.tsx  # 顯示全頁載入進度條（導航/載入中）
│   ├── ErrorFallback.tsx# 錯誤顯示
│   ├── icons/           # 共用icons
│   └── ui/              # 共用UI艿件
├── constants/           # 常數與靜態設定
│   └── hero.ts          # 英雄相關常數
├── hooks/               # 抽出的可重用邏輯 hooks
├── lib/                 # 共用工具庫
│   └── utils.ts         # 通用工具函式
├── routes/              # 路由頁面
│   ├── not-found.tsx    # 404 頁面
│   ├── home.tsx         # 首頁重定向
│   └── heroes/
│       ├── $heroId.tsx  # 英雄個人頁面
│       └── layout.tsx   # 共享 layout（英雄列表）
├── services/            # API 服務
│   ├── api.ts           # API 調用與類型定義
│   └── heroService.ts   # 英雄相關 API
├── utils/               # 頁面/業務輔助
│   └── hero.ts          # 英雄資料處理
├── root.tsx             # 應用根組件
├── routes.ts            # 路由配置
└── app.css              # 全域樣式
```

- **Application 邏輯架構**：以 React Router 的 `clientLoader` 取得資料（`/heroes` 列表與 `/heroes/:heroId` 明細/能力值），API 封裝在 `services/api.ts` + `services/heroService.ts`；UI 元件（HeroList/HeroInfo/HeroProfile）負責呈現、互動與狀態管理，其中 HeroProfile 負責點數驗證、儲存與離開提示，HeroInfo 處理圖片載入/失敗顯示。


## 設計理念

- **單一責任原則**：元件聚焦明確職責（列表、卡片、資訊、編輯表單分離），降低耦合。
- **使用者回饋**：載入中、錯誤與未儲存離開皆有提示，避免操作不確定性。
- **一致與可預期**：統一按鈕與版型，降低學習成本。
- **可維護性**：TypeScript 強化型別安全，Tailwind 簡化樣式並避免重複 CSS。
- **使用者體驗**：載入狀態、錯誤處理、響應式設計。

## 第三方 Library 理解與選擇

- **React Router**： 本專案使用 React Router 作為 SPA 路由方案，支援 nested/flat routes，符合題目規模且上手成本低。
- **Tailwind CSS**：Tailwind CSS：用於樣式管理，透過 utility class 快速組版與調整，減少撰寫/維護自訂 CSS。
- **tailwind-merge 3.4.0**：合併 Tailwind class，避免衝突。
- **clsx 2.1.1**：條件式組合 className。

## 註解原則

- 註解僅用於非直覺或需補充背景的邏輯與用途。

## 遇到的困難與解決方法

- **問題**：在 `home` 進行導頁時，`root` 的 loading 狀態沒有觸發。  
  **解法**：加入 `HydrateFallback` 顯示頂部 loading bar，確保導航時有明確回饋。

## 加分項目

- **優化圖片載入**：載入中與失敗時顯示預設圖，確保圖片可見。
- **完整性提升**：補上路由載入狀態、錯誤提示與未儲存離開提醒，避免操作中斷。
- **程式碼品質**：元件分層與 API 封裝，並透過通用 Button/工具函式提高可讀性與可維護性。
- **UX 友善**：導航時顯示 loading bar、錯誤 fallback 與一致的操作回饋。

## AI 使用說明

- 本專案使用 AI 協助整理文件內容，主要用於生成 README；
- 另請 AI 檢查並優化 `services/api.ts` 的封裝邏輯，確認是否存在風險或可改進之處。
