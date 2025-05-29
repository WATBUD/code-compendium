# Turbopack vs Webpack vs Vite 核心比較

### 1. **依賴追蹤粒度 (Dependency Granularity)**

* **Webpack**：模組（檔案）級
  → 任何改動會重編譯整個模組及其依賴
* **Turbopack**：函數或程式碼區塊級
  → 只重編譯受影響程式碼，效率最高
* **Vite**：模組級，但使用原生 ES 模組熱更新（HMR）
  → 改動即時反映，快速開發體驗

> Webpack tracks at file/module level, recompiles entire modules.
> Turbopack tracks at function/block level, recompiles minimal code.
> Vite leverages native ES modules for module-level hot reload.

---

### 2. **快取機制 (Caching)**

* **Webpack**：基於模組檔案快取
* **Turbopack**：智能快取，結合細粒度依賴追蹤，精準更新
* **Vite**：開發模式下基於瀏覽器快取與原生模組緩存，生產模式使用 Rollup 打包快取

> Webpack caches whole modules.
> Turbopack caches at fine granularity for minimal rebuild.
> Vite caches in browser (dev) and uses Rollup caching (prod).

---

### 3. **效能與架構 (Performance & Architecture)**

* **Webpack**：單線程，JavaScript 實現
* **Turbopack**：Rust 實現，多線程並行，編譯快
* **Vite**：開發時利用原生 ES modules，打包時用 Rollup，啟動快且簡潔

> Webpack is JS-based and single-threaded.
> Turbopack is Rust-based with native multi-threading.
> Vite uses native ES modules for dev speed, Rollup for production bundling.

---

### 4. **Vite 的重新編譯（熱模組替換 HMR）說明**

* Vite 會重新編譯，但方式與傳統工具不同，尤其在開發模式下：

  * **開發模式（HMR）下**：

    * Vite 直接提供瀏覽器原生 ES 模組。
    * 當修改 `A.js` 中的函數 `bar()` 時：

      * 不會重新編譯整個 `A.js` 文件。
      * 只讓瀏覽器模組圖中 `A.js` 模組失效並重新載入。
    * Vite 會發送熱模組替換（HMR）更新通知，瀏覽器收到後重新評估 `A.js`。
    * 依賴於 `A.js` 的模組如 `B.js` 或 `C.js` 會根據需要在瀏覽器重新評估，但不會被完整重編譯。
  * **生產模式**：

    * 使用 Rollup 完整打包並編譯整個專案。

* **重點**：Vite 的「重新編譯」其實更像是「模組重載」和「重新評估」，速度快且粒度細，避免大規模重建。

---

### 5. **簡易範例說明 (Example)**

```js
// 修改 A.js 裡的函數 bar()

// Webpack：重編譯整個 A.js 和依賴 B.js、C.js
// Turbopack：只重編譯 bar() 的程式碼區塊，B.js、C.js 不動
// Vite (開發模式)：熱模組替換，瀏覽器重新載入 A.js，B.js、C.js 視需要重新評估
// Vite (生產模式)：整包重建
```

---

### 6. **總結表 (Summary Table)**

| 特性     | Webpack   | Turbopack   | Vite                             |
| ------ | --------- | ----------- | -------------------------------- |
| 依賴追蹤粒度 | 模組（檔案）級   | 函數/程式碼區塊級   | 模組（檔案）級                          |
| 快取範圍   | 整模組快取     | 智能快取，細粒度更新  | 瀏覽器快取（開發），Rollup快取（生產）           |
| 執行效能   | 單線程、較慢    | Rust 多線程、高效 | 原生 ES 模組（開發），Rollup 打包（生產）       |
| 重新編譯方式 | 模組整體重編譯   | 精準小區塊重編譯    | 開發模式：模組重載＋瀏覽器重新評估<br>生產模式：整包打包重建 |
| 適用場景   | 傳統打包、兼容性強 | 大型專案、快速迭代   | 快速開發體驗、小中型專案                     |

