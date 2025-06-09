**Hydration 是讓靜態 HTML 變成可互動的 React 元件**。
**接管伺服器渲染的內容，讓 React 能夠管理 UI 的狀態與事件**。  
1. **Hydration 不是用來「注入數據」，而是讓 React 接管伺服器渲染的 HTML，讓頁面變成可互動的 SPA。**
2. **SSR (`getServerSideProps`) 頁面 Hydration 時，不會重新請求 API，數據已經包含在 HTML 內。**
3. **Hydration 只影響「互動性」，但不影響 SEO，因為 HTML 內容已經存在。**
4. **避免 Hydration 問題的方法**：
   - 確保伺服器與客戶端輸出一致
   - Lazy Hydration 或使用 React Server Components（未來支援）

## **📌 Hydration 的概念**
當 Next.js 使用 **SSR (`getServerSideProps`) 或 SSG (`getStaticProps`)** 時，伺服器會先產生 HTML，然後發送給瀏覽器。但這些 HTML 本身是**靜態的**，沒有 React 的事件處理與狀態管理。  

### **Hydration 的運作流程**
1. **伺服器渲染 (SSR / SSG)**：伺服器先產生完整的 HTML，傳送給瀏覽器。  
2. **瀏覽器解析 HTML**：使用者可以立即看到內容，但這時候按鈕、輸入框等 React 組件是**沒有互動功能的**。  
3. **React Hydration**：
   - React 下載並解析 JS 檔案（bundle）。
   - React 重新構建 Virtual DOM，並「接管」伺服器渲染的 HTML。
   - 元件的 `useState`、`useEffect`、`onClick` 等互動行為開始生效。  

👉 Hydration 的關鍵點是：**React 不會重新渲染整個頁面，而是接管現有的 DOM**，並讓其變成可互動的 SPA（單頁應用程式）。  

## **📌 Hydration 不是注入資料**
雖然 React 會「接手」頁面，但 Hydration **並不會改變 `getServerSideProps` 或 `getStaticProps` 傳遞的數據**。伺服器提供的 `props` 會在 Hydration 前就已經包含在 HTML 內，因此 Hydration **不會重新執行 `getServerSideProps`**，也不會再次請求 API。  

✅ **Hydration 不會影響 `getServerSideProps` 的數據**，只負責讓 React 接管 UI。  
✅ **如果 Hydration 失敗，頁面仍然可以顯示內容（但無法互動）**，因為 HTML 早已渲染完成。  

---

## **📌 Hydration vs. 客戶端渲染**
| **技術**          | **HTML 內容** | **互動性** | **資料取得方式** |
|------------------|--------------|------------|----------------|
| **SSR (`getServerSideProps`)** | 頁面初始載入時就包含數據 | Hydration 後可互動 | 伺服器取得數據，直接嵌入 HTML |
| **SSG (`getStaticProps`)** | 頁面初始載入時就包含數據 | Hydration 後可互動 | 構建時取得數據，靜態 HTML |
| **CSR (`useEffect`)** | 初始 HTML 幾乎空白 | Hydration + API 請求後才可互動 | 瀏覽器執行 API 請求，填充 UI |

---

## **📌 Hydration 可能的問題**
1. **畫面閃爍 (Content mismatch)**
   - 如果伺服器產生的 HTML 和客戶端 Hydration 結果不同，React 會拋出警告，如：
     ```
     Warning: Text content did not match. Server: "Hello" Client: "你好"
     ```
   - 這通常發生在：
     - 伺服器和客戶端使用不同的 `Date()` 格式
     - 客戶端 `useEffect` 在 Hydration 後改變內容
     - 翻譯、隨機數等會導致不同輸出的變數
   - **解決方案**：確保伺服器端和客戶端的輸出一致。

2. **Hydration 太慢**
   - 如果頁面太複雜（太多互動元件），Hydration 可能會拖慢首次可互動時間（TTI, Time to Interactive）。
   - **解決方案**：
     - **Lazy Hydration**：使用 `useEffect` 讓不影響核心內容的元件稍後才初始化。
     - **部分 Hydration（Partial Hydration）**：Next.js 目前還不支援，但 React Server Components 可以減少不必要的 Hydration。

---


