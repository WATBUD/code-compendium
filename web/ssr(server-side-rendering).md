## 什麼是 Server-Side Rendering (SSR)？
一種網頁渲染技術，將網頁內容在伺服器端完成渲染後，再將完整的 HTML 發送給客戶端。
與傳統的 Client-Side Rendering (CSR) 形成對比，後者是在客戶端通過 JavaScript 動態生成內容。

### 1. SEO 優化
- **完整的 HTML 內容**
  - 搜尋引擎爬蟲可直接讀取完整內容
  - 更容易被搜尋引擎索引和排名
- **Meta 標籤管理**
  - 可動態生成 meta 標籤
  - 支援社交媒體分享所需的 Open Graph 標籤
- **更快的首屏載入時間（First Contentful Paint, FCP）**
  - 用戶無需等待 JavaScript 束完成下載和執行
  - 直接接收可渲染的 HTML 內容
- **降低客戶端運算負擔**
  - 減少客戶端 JavaScript 執行時間
  - 特別適合低效能裝置
- **更好的內容可見性**
  - 減少空白頁面的顯示時間
  - 提供更流暢的頁面過渡
- **更好的可訪問性**
  - 支援無 JavaScript 環境
  - 提供更好的跨裝置相容性
- **更好的緩存策略**
  - 支援伺服器端緩存
  - 減少重複運算


1. **傳統 C# 服務器端渲染（SSR）**

[瀏覽器請求] → [接收 HTML] → [直接看到內容] ↓ [下載 CSS/圖片等資源]

### 特點：
- **同步渲染**：瀏覽器接收到完整的 HTML 後，立即展示內容。
- **簡單直接**：沒有額外的 JavaScript 操作，適合靜態網站和內容不頻繁變動的網站。
- **較慢的首次加載時間**：每次請求都需要重新渲染頁面，增加服務器負擔。


2. **現代 SSR (Next.js/Nuxt.js)**
步驟 1: 瀏覽器收到 HTML
   [<button>點擊次數：0</button>]  <- 用戶已經看到內容，但按鈕不能點

步驟 2: JavaScript 下載完成，開始 Hydration
   - React/Vue 讀取 DOM
   - 比對虛擬 DOM
   - 添加事件監聽器
   - 設置內部狀態

步驟 3: Hydration 完成
   [<button onClick={...}>點擊次數：0</button>]  <- 按鈕現在可以點擊了
```
時間軸：
[瀏覽器請求] → [接收 HTML+ 預渲染內容] → [渲染預渲染內容] → [下載 JS/CSS/圖片等資源] 
→ [Hydration(加載 JavaScript 並啟動 SPA 功能)] → [頁面變得可互動]
```

3. **CSR (Client-Side Rendering) **
時間軸：
[瀏覽器請求] → [接收 HTML 框架] → [下載 JS/CSS/圖片等資源] → [JavaScript 渲染內容] → [頁面變得可互動]

初始 HTML（幾乎是空的）：
<div id="root"></div>

執行順序：
1. 瀏覽器下載這個最小的 HTML
2. 瀏覽器開始下載 JavaScript 包文件（bundle.js），其中包含 React 庫和應用程式的自定義代碼。
3. 瀏覽器下載完 JavaScript 文件後，開始執行其中的代碼，初始化 React 應用程式。
4. React 開始渲染應用程式的初始界面，將虛擬 DOM（Virtual DOM）轉換為實際的 DOM 並插入 HTML 中。
```
1. [瀏覽器請求] → 瀏覽器向服務器發出頁面請求
     ↓
2. [接收基礎 HTML] → 服務器返回基本的 HTML 結構，包含：
     - <div id="root"></div>
     - JS 檔案的引用（bundle.js）
     - CSS 檔案的引用
     ↓
3. [分析 HTML，下載資源] → 瀏覽器：
     - 解析 HTML 結構
     - 同時開始下載 JS/CSS 文件
     ↓
4. [執行 JavaScript] → 
     - 執行 React 相關代碼
     - 創建虛擬 DOM
     - 將虛擬 DOM 渲染到真實 DOM（getElementById("root")）
     ↓
5. [初始渲染完成] → 
     - 頁面已可見，但可能只有基礎結構或 loading 狀態
     
```

- CSR : 需要先下載並執行 JavaScript 才能渲染內容，因此初次渲染較慢。而現代 SSR 通過預渲染 HTML，提高了初次渲染的速度。
- SSR : 通過預渲染 HTML，提高了初次渲染的速度適合需要 SEO的網站，只是需要額外的 Hydration 過程。
- SSR : 瀏覽器請求 → 伺服器生成 HTML → 返回 HTML 給瀏覽器 → 瀏覽器渲染並活化頁面。

### 混合渲染策略
1. **靜態生成 (SSG)**
   - 構建時生成靜態頁面
   - 適合較少更新的內容

2. **增量靜態再生成 (ISR)**
   - 定期重新生成頁面 => 設置 ISR 的頁面在背景中定期檢查內容是否需要更新

3. **客戶端水合 (Hydration)**
   - 接管伺服器渲染的 HTML=>Hydration

### 優化策略
1. **緩存優化**
   - 實現頁面緩存
   - 使用 CDN 分發
   - 實現部分頁面緩存
