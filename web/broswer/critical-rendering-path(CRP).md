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

# 2. Optimize JavaScript Loading
當瀏覽器遇到 **同步 JavaScript（未使用 `async` 或 `defer` 屬性）** 時，會 **暫停 DOM 解析，先執行 JavaScript**，待執行完畢後再繼續解析 HTML。這是因為 JavaScript 可能會改變 DOM 結構，例如：

- `document.write()` 可能直接修改頁面內容。
- `appendChild()` 或 `innerHTML` 可能新增或改變元素。

為了確保 JavaScript 執行後的 DOM 是最新的，瀏覽器會先執行 JavaScript，再繼續處理 HTML。

#### `async` 與 `defer` 的影響

JavaScript 標籤的 [**`async`** /**`defer`**] (可以[JavaScript/HTML] **異步下載**)：
- `defer` 屬性與 `async` 屬性的區別:
- **`async`**：<script> 異步下載完後會立即執行，中斷 HTML 解析，直到腳本執行完畢。
- **`defer`**：<script> 異步下載後會等 **HTML 完全解析完**，不會影響 CRP。
使用 **`defer`** 可讓 JavaScript 不影響 CRP，使頁面更快可見並提升效能。 🚀

# `async(異步)` 屬性
  ```html
  <script src="example.js" async></script>
  ```
- 異步加載，HTML同時繼續解析。
- 下載完成後立即執行中斷HTML解析。
- 適用於不依賴其他腳本或 DOM 的腳本（例如：分析腳本、第三方集成）。

# `defer(延遲)` 屬性
  ```html
  <script src="example.js" defer>
        console.log('這段代碼會立即執行，defer 無效');
  </script>

  ```
- **異步加載**：`defer` 使腳本異步加載，並且不會阻塞頁面的渲染過程，延遲到 HTML 完全解析後才執行。
- **內部腳本**：在內部腳本中使用 `<script defer>` 是無效的，因為這些腳本會立即執行，不會被延遲。
  
# 3. Prioritize Critical CSS
- 將關鍵 CSS 直接內嵌於 HTML 中。

  ```html
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
  </style>
  ```

# 4. Use Lazy Loading
- 僅在需要時加載非關鍵資源(loading="lazy")。
  ```html
  <img src="placeholder.jpg" data-src="image.jpg" loading="lazy">
  ```

# 5. Leverage Content Delivery Networks (CDNs) 使用 CDN 提供靜態資源以降低延遲。

# Example: Optimizing CRP with Asynchronous Script Loading

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CRP Optimization</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Optimized Critical Rendering Path</h1>
  <p>Example of non-blocking JavaScript loading.</p>

  <script>
    // 優化CRP：非同步載入JavaScript，以避免阻塞渲染過程
    function loadScriptAsync(src) {
      const script = document.createElement('script');//動態創建 <script> 
      script.src = src;
      script.async = true; // 設置為異步載入，腳本不會阻塞頁面其餘渲染
      document.body.appendChild(script); // 將腳本元素添加到DOM中
    }

    //在頁面內容加載後，非同步載入腳本
    loadScriptAsync('example.js');
  </script>
</body>
</html>
```

# CSS 改動與渲染流程

當修改某個 CSS 會觸發以下幾個動作影響頁面顯示和性能：

## 1. 重新計算佈局（Reflow/Layout）
- **何時發生**：當修改了會影響頁面佈局的 CSS 屬性時，例如修改了元素的 `width`、`height`、`margin`、`padding`、`border`、`font-size`、`position` 等。
- **觸發動作**：瀏覽器會根據新 CSS 計算每個元素的位置和大小，頁面元素較多時。重新計算佈局後頁面元素的大小和位置會被更新。

## 2. 重新繪製（Repaint）
- **何時發生**：修改的影響外觀不會影響佈局 color、background-color、visibility、box-shadow 
- **觸發動作**：重繪頁面元素外觀，比重新計算佈局要更輕量但仍有影響。

## 3. 合成（Compositing）
- **何時發生**：硬件加速的屬性（transform、opacity），會將這些元素放入單獨的圖層。利用 GPU 來處理不需要Reflow/Repaint。
- **觸發動作**：頁面中有動畫或動態效果時，特別是在 `transform` 或 `opacity` 屬性改變時。瀏覽器會利用 GPU 加速來處理這些層，從而提高渲染性能。

## 4. 影響層級（Stacking Context）變化
- **何時發生**：當修改影響堆疊上下文的屬性（如 `position`、`z-index`）或觸發合成層的屬性（如 `opacity`、`transform`）時。
- **觸發動作**：
  - **`position` 和 `z-index`** 都會觸發新Stacking Context，影響元素在堆疊上下文中的順序，但不會直接觸發重新Compositing。
  - 當 opacity 的值小於 1 時（例如 opacity: 0.9），該元素會創建一個新的 Stacking Context。這與元素是否設置 position 無關，單獨設置 opacity 即可觸發。
  - 無論 transform 的值為何（scale, translate, rotate），只要設置了 transform，該元素就會創建一個新的 Stacking Context。

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
  position: absolute; /* 改變位置屬性會觸發Reflow */
  z-index: 10;         /* 改變層級會影響合成 */
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








