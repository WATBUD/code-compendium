# Critical Rendering Path (CRP)
## Critical Rendering Path (CRP)

CRP（關鍵渲染路徑）是瀏覽器將 **HTML、CSS 和 JavaScript 轉換為螢幕上像素** 步驟，影響頁面載入速度與效能。
優化 CRP 可提升 **首次內容繪製（FCP）** 和 **互動準備時間（TTI）** 🚀。

### CRP 主要步驟

1. **解析 HTML，建立 DOM（Document Object Model）**  
   - 代表頁面結構與內容。

2. **解析 CSS，構建 CSSOM（CSS Object Model）**  
   - 代表各元素的計算後樣式。

3. **合併 DOM 與 CSSOM，生成渲染樹（Render Tree）**  
   - 只包含可見元素及其樣式，忽略 `display: none`，但保留 `visibility: hidden`。

4. **計算佈局（Layout/Reflow）**  
   - 決定每個元素的確切位置與大小。

5. **繪製（Paint）與合成（Compositing）**  
   - **Paint**：將顏色、邊框、陰影等繪製到位圖。
   - **Compositing**：合成不同圖層並輸出至螢幕。

### Optimizing the CRP
# 1. Minimize Critical Resources
- 減少 CSS 和 JavaScript 文件的數量。
- 合併並壓縮 CSS 和 JavaScript 文件。
- 使用 Gzip 或 Brotli 壓縮來減少文件大小。

# 2. 避免阻塞渲染的 JS / CSS（async、defer、關鍵 CSS 內嵌、preload）
- 原因與解法已整理成案例：`web/broswer/optimization-cases/render-blocking-resources.html`。

# 3. Use Lazy Loading
- 首屏以下的圖片 / iframe 用原生 `loading="lazy"`，瀏覽器會等它快進入視窗才下載 `src`。
  ```html
  <img src="image.jpg" loading="lazy" width="800" height="450" alt="">
  ```
- 不要混用 `data-src`：`loading="lazy"` 延遲的是 `src`，`data-src` 要自己寫 JS（例如 IntersectionObserver）搬到 `src` 才會載入。
- 首屏的 LCP 圖片不要 lazy，否則會延後 LCP。

# 4. Leverage Content Delivery Networks (CDNs) 使用 CDN 提供靜態資源以降低延遲。

# CSS 改動與渲染流程

當修改某個 CSS 會觸發以下幾個動作影響頁面顯示和性能：

## 1. 重新計算佈局（Reflow/Layout）
- **何時發生**：當修改了會影響頁面佈局的 CSS 屬性時，例如修改了元素的 `width`、`height`、`margin`、`padding`、`border`、`font-size`、`position` 等。
- **觸發動作**：瀏覽器會根據新 CSS 計算每個元素的位置和大小，頁面元素較多時。重新計算佈局後頁面元素的大小和位置會被更新。

## 2. 重新繪製（Repaint）
- **何時發生**：修改的影響外觀不會影響佈局 color、background-color、visibility、box-shadow 
- **觸發動作**：重繪頁面元素外觀，比重新計算佈局要更輕量但仍有影響。

## 3. 合成（Compositing）
- **何時發生**：改變 `transform`、`opacity` 時，瀏覽器通常可以只在合成階段處理（元素常會被提升為獨立圖層，交給 GPU），不需要 Reflow/Repaint。是否真的建立獨立圖層由瀏覽器決定，`will-change` 可以提示。
- **觸發動作**：頁面中有動畫或動態效果時，特別是在 `transform` 或 `opacity` 屬性改變時。瀏覽器會利用 GPU 加速來處理這些層，從而提高渲染性能。

## 4. 影響層級（Stacking Context）變化
- **何時發生**：當修改會建立 / 移除堆疊上下文的屬性（如 `z-index` 搭配 `position`、`opacity`、`transform`）時。
- **觸發動作**：
  - **`z-index`** 只有在「有定位的元素（`position` 不是 `static`）」或「flex / grid 容器的子元素」上，且值不是 `auto` 時，才會建立新的 Stacking Context。
  - 單獨設定 `position: relative` / `absolute`（`z-index` 為 `auto`）**不會**建立 Stacking Context；`position: fixed` / `sticky` 則單獨就會建立。
  - 當 opacity 的值小於 1 時（例如 opacity: 0.9），該元素會創建一個新的 Stacking Context。這與元素是否設置 position 無關，單獨設置 opacity 即可觸發。
  - `transform` 只要值不是 `none`（scale、translate、rotate 等），該元素就會創建一個新的 Stacking Context。

## 5. 瀏覽器的渲染流程
CSS 更新時瀏覽器照以下順序進行處理：
1. **Modify CSS**：CSS 屬性被修改或新增。
2. **Reflow/Layout**：根據新的 CSS，計算每個元素尺寸和位置。
3. **Repaint**：更新元素外觀/顏色/背景。
4. **Compositing**：所有的視覺層合成一起顯示。

## 6. 性能考量
- **頻繁觸發 Reflow 或 Repaint** 當頁面中有大量 DOM 元素會影響頁面性能，每次重新計算佈局和重繪都需要消耗計算資源。

## 觸發 CSS 變動的範例：

```css
/* 會觸發重新佈局 */
div {
  width: 100px;
  height: 100px;
}

div:hover {
  width: 200px; /* 修改寬度會觸發Reflow */
}

/* 會觸發重繪 */
div {
  background-color: red; /* 修改背景顏色會觸發Repaint */
}

/* 會觸發Reflow/Repaint*/
div {
  position: absolute; /* 改變定位方式會觸發Reflow */
  z-index: 10;         /* 有定位 + z-index 不是 auto → 建立 Stacking Context，改變層級順序需要重繪 */
}

/* 會觸發合成 */
div {
  transform: translateY(50px); /* 改變 transform 會觸發Compositing */
}
```

### Tools for CRP Optimization
- **Lighthouse**: (分析頁面性能並提供可操作的建議。).
- **WebPageTest**: (測量加載時間並識別瓶頸。). 
- **Chrome DevTools**: (檢查和調試渲染性能。). 








