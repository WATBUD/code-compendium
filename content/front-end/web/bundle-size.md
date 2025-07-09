
**Bundle size** 是指 **打包後的 JavaScript 檔案大小**。  

當前端應用程式（例如 React、Vue、Angular）開發完成後，會使用打包工具（如 **webpack、Vite、Parcel、Rollup**）將所有 JavaScript 代碼、CSS、圖片等資源合併成一個或多個 **bundle**，然後部署到瀏覽器執行。  

如果 **bundle size 過大**，會導致：  
- 頁面加載變慢  
- 使用者體驗下降（特別是在行動裝置或慢速網路環境）  
- 記憶體消耗增加  

**降低 bundle size**：

1. **Tree Shaking**  
   - 利用 ES6 模組語法，讓 bundler（如 webpack、Rollup）能夠自動移除未使用的代碼。  
   - 確保只引入你需要的部分，而非整個庫。

2. **Code Splitting（代碼分割）**  
 
   | 方法 | 說明 | 適用場景 |
   |------|------|--------|
   | `import()` | 動態載入 JS 模組 | 按需載入功能，例如按鈕點擊後才載入某個函式 |
   | Webpack `splitChunks` | 自動拆分共用模組 | 適用於大型應用，減少主 bundle 的大小 |
   | React `lazy()` | 按需載入頁面組件 | 只有用戶訪問該頁面時才載入，提升效能 |

   #### **動態 `import()`（懶加載）**
   ✅ **優勢**：頁面初次載入時，不會下載 `heavyModule.js`，只有在按鈕點擊時才載入。
   當用戶觸發特定行為時，才載入對應的模組，減少初始加載大小。
   ```js
   document.getElementById("btn").addEventListener("click", async () => {
     const module = await import("./heavyModule.js");
     module.default(); // 調用模組的預設導出函式
   });
   ```
   #### **Webpack `chunk` 自動拆分**
   
   **Webpack Code Splitting** :Webpack 允許將應用程式拆分成多個「chunk」，只載入當前頁面需要的部分。
   ✅ **效果**：Webpack 會自動將 `math.js` 拆分成獨立的 chunk，不會與 `main.js` 綁在一起。
   ```js
   // main.js
   import("./math").then((math) => {
     console.log(math.add(2, 3));
   });
   ```
   **Webpack 設定（`webpack.config.js`）：**
   ```js
   module.exports = {
     mode: "production",
     output: {
       filename: "[name].[contenthash].js",
       chunkFilename: "[name].[contenthash].chunk.js", // 產生 chunk 檔案
     },
     optimization: {
       splitChunks: {
         chunks: "all", // 自動拆分共用模組
       },
     },
   };
   ```
   
   #### **React Router + Code Splitting（按需載入頁面）**
   當使用 React 時，可以搭配 `React.lazy()` 和 `Suspense`，確保只有訪問該頁面時才載入對應的程式碼。
   
   ```jsx
   import React, { Suspense, lazy } from "react";
   import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
   
   const Home = lazy(() => import("./Home"));
   const About = lazy(() => import("./About"));
   
   function App() {
     return (
       <Router>
         <Suspense fallback={<div>Loading...</div>}>
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/about" element={<About />} />
           </Routes>
         </Suspense>
       </Router>
     );
   }
   
   export default App;
   ```
   ✅ **效果**：  
   - 訪問 `/` 時，僅加載 `Home.js`。  
   - 訪問 `/about` 時，才載入 `About.js`。  
   
3. **Minification（最小化） & Compression（壓縮）**  
   - 在生產環境中啟用代碼壓縮（如使用 TerserPlugin）。  
   - 使用 gzip 或 Brotli 壓縮，減少傳輸大小。

4. **使用 **webpack、Vite、Rollup** 等打包工具時用外部資源**  
   - 將**大型第三方庫（如 React、Lodash、Moment.js）標記為 external**，通過 CDN 載入，避免打包進 bundle。
   可以顯著減少 **bundle size**，提升 **首次載入速度** 🚀。
   ## **範例：Webpack 設定 React 為 external**
   ```js
   // webpack.config.js
   module.exports = {
     externals: {
       react: "React",  // 這樣 React 不會被打包，會從 CDN 載入
       "react-dom": "ReactDOM"
     }
   };
   ```
   **👉 然後在 HTML 中透過 CDN 載入：**
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
   ```
   
   ## **適合使用 External 的第三方庫**
   建議對**不經常更新且體積較大的庫**設為 external，例如：
   - `react`, `react-dom`
   - `lodash`
   - `moment.js`（或更現代的 `date-fns`）
   - `d3`
   - `three.js`
   - `chart.js`

5. **優化依賴**  
   - 選擇[輕量庫/只引入部分模組]，減少不必要依賴。  
   - 定期檢查 package.json，移除未使用的依賴。

6. **Bundle 分析工具**  
   - 使用 webpack-bundle-analyzer 等工具分析 bundle，找出體積較大的模組，進一步優化。

7. **合理配置 Babel 與 Polyfill**  
   - 瀏覽器只有必要的 polyfill，避免打包過多不必要的轉譯代碼。
   ### **Polyfill 是什麼？**  
   **Polyfill** 是一種 JavaScript **程式碼片段（Shim）**，用來**模擬舊瀏覽器不支援的 Web API 或新語法**，確保代碼能在較舊的環境中運行。  
   
   ### **為什麼需要 Polyfill？**  
   不同的瀏覽器對新語法的支援度不同，例如：  
   - **ES6+ 語法**（如 `Promise`、`async/await`）在舊版 IE 瀏覽器中不支援。  
   - **新的 Web API**（如 `fetch()`、`IntersectionObserver`）在某些舊版瀏覽器中沒有實作。  
   
   此時，我們可以使用 **Polyfill** 來手動補充這些功能，讓舊瀏覽器也能執行現代 JavaScript 代碼。
   
   ### **常見的 Polyfill 例子**  
   
   1️⃣ **手動 Polyfill：**
   ```js
   if (!Array.prototype.includes) {
     Array.prototype.includes = function (search, start) {
       return this.indexOf(search, start) !== -1;
     };
   }
   ```
   - 如果瀏覽器不支援 `Array.prototype.includes`，就手動添加這個方法。
   
   2️⃣ **使用 `core-js` 提供的 Polyfill**  
   ```js
   import "core-js/stable"; // 讓 Babel 根據目標環境自動加載 Polyfill
   import "regenerator-runtime/runtime"; // 用於 async/await
   ```
   
   3️⃣ **使用 CDN Polyfill**
   如果你的網站需要支援 IE，直接載入 Polyfill.io：
   ```html
   <script src="https://polyfill.io/v3/polyfill.min.js"></script>
   ```
   這會自動根據使用者的瀏覽器來提供相應的 Polyfill。
   
   ### **與 Babel 的關係？**
   - **Babel** 主要用來 **轉譯** 新的 JavaScript 語法（如 `const`、`箭頭函式`）成舊的等效寫法。  
   - **Polyfill** 則是 **補充** 瀏覽器本身缺少的 API（如 `Promise`、`fetch`）。  
   
   👉 **建議使用 `@babel/preset-env` 搭配 `core-js`，只加載必要的 Polyfill**，減少 bundle size：
   ```json
   {
     "presets": [
       ["@babel/preset-env", {
         "useBuiltIns": "entry",
         "corejs": 3
       }]
     ]
   }
   ```