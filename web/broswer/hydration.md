# Hydration

## **什麼是 Hydration**

**Hydration（注水/注入/水合）讓靜態 HTML「激活」，變成可動態更新的 React 應用** 
📌 一般前端（純 HTML + JS），沒有 Hydration ，HTML 本來就是靜態的，JS 直接操作 DOM 就可以讓它變動態。
📌 Hydration 指 **client生成的虛擬 DOM** 接管由 **伺服器(SSR/SSG) 生成的靜態 HTML** 
被前端框架載入 JavaScript並綁定靜態 HTML 變成動態 UI。

1️⃣ 伺服器（SSR/SSG）先生成靜態 HTML 首屏渲染。
2️⃣ 前端 React 載入 JavaScript，開始 Hydration（綁定靜態 HTML 變成動態 UI）。
3️⃣ 完成 Hydration 之後，頁面才能完全可互動。
---

## **詳細解釋**

1. **服務端渲染 (SSR)：**
   - 用戶打開一個網站時伺服器會先生成靜態的 HTML 結構，但沒有任何行為（如點擊事件、動態數據更新等）。

2. **靜態 HTML 的問題：**
   - 靜態 HTML 是「死的」，用戶與頁面的交互（例如點擊按鈕、表單提交）無法直接運行，因為瀏覽器中尚未有 JavaScript 提供這些交互功能。

3. **Hydration 的過程：**
   - 瀏覽器下載完前端 JavaScript 檔案後，JavaScript 會在客戶端重新創建一份 **虛擬 DOM**。
   - 接著，這個虛擬 DOM 會和伺服器生成的靜態 HTML 進行「對比和綁定」，確保雙方的結構一致，然後為 HTML 添加交互行為（例如事件監聽器）。

4. **結果：**
   - 經過 Hydration 後，靜態的 HTML 就變成了「活的」，可以響應用戶操作並執行動態行為。

## **Hydration 的關鍵點/優點**

- **注入虛擬 DOM：**
  Hydration 是client虛擬 DOM 與服務端渲染的 HTML 結構進行同步。
  都是將伺服器端生成的靜態 HTML 轉換成動態、可交互的組件，使得頁面能夠支持用戶交互和狀態更新

- **性能優化：**
  - SSR 提供更快首屏渲染（因為 HTML 是直接從伺服器傳回來的）。
  - Hydration 的過程只需要補充行為和狀態，而不需要重新創建整個 DOM，性能比直接在客戶端渲染更高效。

- **一致性要求：**
  客戶端的虛擬 DOM 必須與服務端渲染的 HTML 結構完全一致，否則會出現「Hydration 錯誤」，導致頁面功能無法正常運行。

- **快速首屏加載：**
- SSR 預先渲染靜態 HTML，瀏覽器快速顯示內容。

- **SEO 友好：**
- 靜態 HTML 更容易被搜索引擎抓取，對 SEO 友好。


- **常見的問題與挑戰**
- **結構不一致：**
- 如果伺服器生成的 HTML 與客戶端的虛擬 DOM 不匹配，Hydration 過程會出現錯誤，導致頁面部分功能失效。

- **性能消耗：**
- Hydration 本身是一個額外的過程，對於內容複雜的頁面，可能會導致性能下降。

## **範例說明**

### 1. **伺服器返回的 HTML：**
```html
<div id="app">
  <h1>Hello, World!</h1>
  <button>Click Me</button>
</div>
```

### 2. **客戶端執行的 Hydration：**
```jsx
const App = () => {
  const handleClick = () => alert("Hello!");
  return (
    <div>
      <h1>Hello, World!</h1>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

ReactDOM.hydrate(<App />, document.getElementById("app"));
```
### 3. **過程：**
- 伺服器返回靜態 HTML 被瀏覽器解析後呈現在用戶屏幕上。
- 客戶端下載 JavaScript 並執行 `ReactDOM.hydrate`，為 HTML 的按鈕元素綁定點擊事件。
- 點擊按鈕後，觸發 `handleClick`，完成互動。





