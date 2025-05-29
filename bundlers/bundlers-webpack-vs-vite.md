## ✅ Vite vs Webpack 差異與原理

---

### 🔹 1. 現代瀏覽器支援 ESM，為什麼仍需要打包工具？（+ Chunks 是什麼）

**Q: Modern browsers support ESM, so why do we still need bundlers? What are chunks?**

> **繁體答覆：**
> 雖然現代瀏覽器原生支援 ES Modules（`import/export`），但實務開發中仍需處理許多額外問題：

* 支援舊瀏覽器
* 模組數量過多會導致大量 HTTP 請求
* 需要轉譯（如 TypeScript、JSX）與壓縮

所以仍需透過打包工具整合模組成「chunks」（打包後的程式區塊），以優化載入速度與效能。

**Chunks 是什麼？**
Chunks 是打包後的輸出檔案單位，可能包含主程式碼（entry chunk）、共用模組（shared chunk）或延遲載入的模組（lazy chunk）。

> **English:**
> Even though modern browsers support native ESM, bundlers are still needed to:

* Support legacy browsers
* Reduce excessive HTTP requests for many modules
* Transpile TS/JSX and minify code

**Chunks** are output files created by bundlers, like entry chunks (main code), shared chunks (common modules), and lazy chunks (for dynamic imports). Bundling reduces load time and improves performance.

---

### 🔹 2. Webpack 是什麼？優缺點？

**Q: What is Webpack? Pros and cons?**

> **繁體答覆：**
> Webpack 是模組打包器，支援 CJS/ESM/CSS 等格式，也能處理圖片、字型等資源。
> 優點：功能齊全、可擴充性高。
> 缺點：設定繁瑣、初始打包與 HMR 較慢，對初學者不友善。

> **English:**
> Webpack is a bundler that supports multiple module formats (CJS/ESM/CSS) and assets like images.
> Pros: rich features and extensibility.
> Cons: complex config, slower startup and HMR, not beginner-friendly.

---

### 🔹 3. Vite 是什麼？為什麼更快？

**Q: What is Vite? Why is it faster than Webpack?**

> **繁體答覆：**
> Vite 採用原生 ESM 搭配 esbuild，只在開發時**即時編譯瀏覽器請求的模組**，不需全量打包。這種按需編譯讓啟動與 HMR 快速且輕量。

> **English:**
> Vite uses native ESM and esbuild. It only compiles modules when the browser requests them (on-demand), making startup and HMR extremely fast.

---

### 🔹 4. 預打包是什麼？Webpack 沒有嗎？

**Q: What is pre-bundling in Vite? Doesn’t Webpack bundle too?**

> **繁體答覆：**
> Vite 的預打包是針對 `node_modules` 套件，使用 esbuild 將它們轉為原生 ESM 並快取，避免每次開發都重新編譯。
> Webpack 雖也打包，但每次都需從頭處理依賴，速度慢、成本高。

> **English:**
> Vite pre-bundles dependencies (like React) using `esbuild` into ESM and caches them.
> Webpack re-bundles everything each time, leading to slower builds.

---

### 🔹 5. 開發 vs 正式：Vite 用什麼？Webpack 呢？

**Q: What’s the difference between dev and prod build in Vite vs Webpack?**

| 項目       | Webpack             | Vite                         |
| -------- | ------------------- | ---------------------------- |
| 開發模式     | Babel + Webpack 打全包 | esbuild + ESM 即時加載           |
| 正式打包     | Webpack             | 使用 Rollup 打包，支援 Tree-shaking |
| 預打包      | 無（每次都全包）            | 有，只對第三方套件做一次性處理              |
| Chunk 處理 | chunk 管理彈性高但手動      | Rollup 自動分割，產出小巧             |

> **結論：**
> Vite 開發快、正式包輕，Rollup 支援靜態分析與 Tree-shaking，產出更小、效能更高。

---
