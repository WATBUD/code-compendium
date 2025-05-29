
# Pre-bundling（預打包）比較 / Comparison of Pre-bundling

| 特性 / Feature       | Webpack                                                             | Turbopack                                                                           | Vite                                                                                     |
| ------------------ | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 預打包定義 / Definition | 將專案及依賴一次打包成bundle / Bundles entire project and dependencies at once | 精細依賴追蹤，動態局部重打包 / Fine-grained dependency tracking with dynamic incremental bundling | 啟動時一次性打包第三方依賴 / Pre-bundles third-party dependencies once at startup                     |
| 預打包時間點 / Timing    | 編譯時整包打包 / Bundling during build time                                | 增量智能重打包 / Incremental smart rebundling                                              | 啟動時依賴預打包 / Dependency pre-bundling at startup                                            |
| 預打包內容 / Contents   | 專案源碼 + 依賴 / Project source + dependencies                           | 受影響的模組與依賴 / Affected modules and dependencies                                       | 只有第三方依賴 / Only third-party dependencies (node\_modules)                                  |
| 預打包目的 / Purpose    | 優化載入效能 / Optimize loading performance                               | 快速重編譯，減少重複打包 / Fast recompilation, reduce redundant bundling                        | 加速啟動，減少多次解析依賴 / Speed up startup and avoid repeated dependency parsing                   |
| 重複打包次數 / Frequency | 每次編譯可能重新打包 / May re-bundle on every build                           | 僅在依賴或代碼變更時重打包 / Re-bundles only on dependency or code changes                       | 依賴變更時重打包，應用代碼改動不影響 / Re-bundles on dependency change only, app code changes don't affect |

---

## 詳細說明 / Detailed Explanation

### Webpack 預打包 (Webpack Pre-bundling)

* **中文**：Webpack 不專門做預打包，整個專案和依賴會在每次編譯時被打包成bundle。
* **English**: Webpack does not do dedicated pre-bundling; the entire project and dependencies are bundled together on each build.
* **範例 / Example**：

  * 中文：修改 `src/index.js`，Webpack 會重新打包所有依賴和代碼。
  * English: Modifying `src/index.js` triggers Webpack to re-bundle all dependencies and source code.
* **優缺點 / Pros and Cons**：

  * 中文：優點是兼容性好，缺點是編譯較慢。
  * English: Pros are good compatibility; cons are slower builds.

---

### Turbopack 預打包 (Turbopack Pre-bundling)

* **中文**：Turbopack 根據依賴影響範圍智能追蹤，只重編譯變動部分和受影響模組。
* **English**: Turbopack performs fine-grained dependency tracking and only recompiles changed and affected modules.
* **範例 / Example**：

  * 中文：修改一個函數，只重新編譯該模組及直接相關模組，不重新打包整個依賴。
  * English: Modifying a function only recompiles its module and directly related modules without rebundling the entire dependency tree.
* **優缺點 / Pros and Cons**：

  * 中文：優點是超快編譯和減少重複工作，缺點是生態仍在發展。
  * English: Pros are extremely fast builds and less redundant work; cons are ecosystem still evolving.

---

### Vite 預打包 (Vite Pre-bundling)

* **中文**：Vite 使用 esbuild 在啟動時快速預打包所有第三方依賴，應用代碼由瀏覽器原生 ES 模組直接載入。
* **English**: Vite uses esbuild to quickly pre-bundle all third-party dependencies at startup, while application code is loaded directly as native ES modules by the browser.
* **範例 / Example**：

  * 中文：首次啟動時，React 等依賴被打包一次，改動應用程式代碼不影響已打包依賴。
  * English: On first startup, dependencies like React are bundled once; application code changes do not affect the pre-bundled dependencies.
* **優缺點 / Pros and Cons**：

  * 中文：啟動超快，改動響應快，缺點是生產打包交由 Rollup 完成。
  * English: Super fast startup and responsive updates; production bundling is handled by Rollup.

---

## 簡單結論 / Summary

| 工具 / Tool | 預打包對象 / What is Pre-bundled      | 預打包時機 / When Pre-bundled      | 優勢 / Advantages                                             |
| --------- | -------------------------------- | ----------------------------- | ----------------------------------------------------------- |
| Webpack   | 專案與依賴 / Project and dependencies | 編譯時 / At build time           | 完整，兼容性佳 / Complete, good compatibility                      |
| Turbopack | 精細依賴和代碼區塊 / Fine-grained modules | 增量式智能 / Incremental and smart | 極速，減少冗餘 / Very fast, less redundant work                    |
| Vite      | 第三方依賴 / Third-party dependencies | 啟動時 / At startup              | 極速啟動，依賴一次打包 / Super fast startup, dependencies bundled once |
