## Rollup 大型專案記憶體爆掉原因解析

### Why Rollup Eats Up Memory When Bundling Large Projects

---

### 🔍 原因一：Rollup 必須「一次性解析整個模組圖」

**Reason 1: Rollup Must Parse the Entire Module Graph At Once**

Rollup 採用 **靜態分析（Static Analysis）**，會一次性展開並處理整個模組依賴樹。
Rollup uses **static analysis** to build and process the entire module dependency graph in one go.

* 它會把整個依賴樹「一次展開、一次處理」。
  It expands and processes the entire dependency tree in one shot.
* 與 Webpack 採用「遞迴 + plugin 鉤子式處理」不同，Rollup 是把所有模組一次讀入記憶體。
  Unlike Webpack’s recursive plugin-hook based processing, Rollup loads all modules into memory at once.
* 如果有大量第三方套件與跨檔案引用，Rollup 記憶體用量瞬間暴增。
  When many third-party packages and cross-file imports exist, Rollup’s memory usage spikes immediately.

📌 **效應 Effect:** 巨量檔案導致記憶體瞬間爆掉 → `JavaScript heap out of memory`

---

### 🔍 原因二：Rollup 的 tree-shaking 精度很高，但代價很大

**Reason 2: Rollup’s Tree-Shaking Is Highly Precise but Memory Intensive**

Rollup 追求極致的 tree-shaking，深入追蹤每個變數、函式是否被使用：
Rollup strives for perfect tree-shaking, tracking usage of every function and variable:

* 每個函式、變數的使用狀態都被詳細記錄與分析。
  The usage state of every function and variable is meticulously recorded.
* ES Module 裡未使用的 import 會被完全剔除。
  Unused imports in ES Modules are fully eliminated.
* 包含未執行的邏輯、try-catch 裡的代碼都會被分析是否能刪除。
  Even unreachable code blocks, like those in try-catch, are analyzed for removal.

📌 **效應 Effect:** 巨型專案中，高密度的圖形分析導致記憶體壓力極大。

---

### 🔍 原因三：Rollup 模組合併策略保守（不易分包）

**Reason 3: Rollup’s Module Merging Strategy Is Conservative and Less Flexible**

Rollup 對 chunk 拆分策略較保守，缺少 Webpack 那樣靈活的分包插件：
Rollup adopts a conservative chunk splitting strategy, lacking the flexibility of Webpack’s SplitChunksPlugin:

* 多個懶加載模組共享依賴時，Rollup 可能會重複打包相同程式碼。
  Shared dependencies across dynamic imports may be duplicated rather than factored out.
* 對 monorepo 這種大量 shared lib 的架構很不友善。
  This is problematic for monorepos with many shared libraries.

📌 **效應 Effect:** 記憶體不只重，輸出檔案可能也更大，且有重複依賴。

---

### 🔍 原因四：Node.js 預設記憶體限制不夠

**Reason 4: Default Node.js Memory Limit Is Too Low**

Node.js 預設最大 heap 約 1.5GB，巨型應用易碰上限制。
Node.js default max heap size (\~1.5GB) is insufficient for large builds.

* 出現錯誤範例：
  Typical error:

  ```bash
  FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
  ```
* 臨時解法：提高 Node.js 記憶體限制
  Temporary fix: increase Node.js memory limit:

  ```bash
  node --max-old-space-size=4096 node_modules/vite/bin/vite.js build
  ```
* 但這只是治標，根本原因仍是 Rollup 記憶體使用本質問題。
  This is only a workaround; the root cause is Rollup’s inherent memory usage behavior.

---

### ✅ 小結 Summary

> Rollup 為了極致的 tree-shaking 與精準打包，一次性建構整個模組圖並全部裝進記憶體分析。這對中小型專案優秀，但大型 monorepo 或大量 import 專案容易爆掉記憶體。這也是 Webpack 在企業大型專案中依然有優勢的原因，因為它採用 plugin 鉤子遞進分析，更適合支撐龐大專案的打包流程。

> Rollup builds the entire module graph at once for precise tree-shaking and bundling. This works well for small to medium projects, but large monorepos or projects with numerous imports face memory exhaustion. This explains why Webpack remains favored in big enterprise projects due to its plugin-hook incremental analysis, which better supports massive builds.

