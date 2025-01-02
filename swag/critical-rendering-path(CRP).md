# Critical Rendering Path (CRP)
- CRP 是指瀏覽器將 HTML、CSS 和 JavaScript 轉換為用戶螢幕上像素的一系列步驟。

## Key Steps in the CRP
1. **瀏覽器解析 HTML，建立 Document Object Model (DOM) =>頁面的結構和內容**
2. **瀏覽器解析 CSS，構建 CSS Object Model (CSSOM)，用於表示每個元素的樣式**
3. **瀏覽器結合 DOM 和 CSSOM 生成渲染樹 (Render Tree)，其中僅包含可見的元素及其樣式**
4. **瀏覽器基於渲染樹計算每個元素在螢幕上的位置和大小。**
5. **瀏覽器將像素繪製到螢幕上，使內容對用戶可見。**

## Performance Impact of the CRP
- Blocking resources 阻塞資源，例如 CSS 和 JavaScript，可能會延遲 CRP。
- JavaScript 可以修改 DOM 結構，EX:新元素或更改現有內容。瀏覽器為了避免解析 HTML 和執行 JavaScript 時出現衝突，會暫停 DOM 的構建，等 JavaScript 執行完成後再繼續解析 HTML。
- 大型或未優化的資源會增加加載時間。


## Optimizing the CRP
### 1. Minimize Critical Resources
- 減少 CSS 和 JavaScript 文件的數量。
- 合併並壓縮 CSS 和 JavaScript 文件。
- 使用 Gzip 或 Brotli 壓縮來減少文件大小。

### 2. Optimize JavaScript Loading
- <script> 使用 `async` 或 `defer` 屬性,控制外部 JavaScript 文件加載執行，提高性能和頁面加載速度。

### `async(異步)` 屬性
<script src="example.js" async> </script>
- 異步加載，HTML同時繼續解析。
- 下載完成後立即執行中斷HTML解析。
- 適用於不依賴其他腳本或 DOM 的腳本（例如：分析腳本、第三方集成）。

### `defer(延遲)` 屬性
<script src="example.js" defer> </script>

- <script> 異步加載，不會阻塞頁面的渲染過程，延遲到 HTML完全解析後執行。
- 內部腳本（`<script defer>`）無法延遲內部腳本執行 `defer`。
<script defer>
  console.log('這段代碼會立即執行，defer 無效');
</script>
- 多個腳本使用 `defer`，預設情況下，`defer` 按照在 HTML 中的出現順序執行腳本。


## 2. `defer` 屬性與 `async` 屬性的區別
- **`async`**：<script> 下載完後會立即執行，中斷 HTML 解析，直到腳本執行完畢。
- **`defer`**：<script> 下載後執行Delay，直到文檔解析完成，ex:需要等到頁面內容完全加載後才運行，這時使用 defer。

### 使用範例
  ```html
  <script src="example.js" async></script>
  ```

### 3. Prioritize Critical CSS
- 將關鍵 CSS 直接內嵌於 HTML 中。

  ```html
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
  </style>
  ```

### 4. Use Lazy Loading
- 僅在需要時加載非關鍵資源(loading="lazy")。
  ```html
  <img src="placeholder.jpg" data-src="image.jpg" loading="lazy">
  ```

### 5. Leverage Content Delivery Networks (CDNs) 使用 CDN 提供靜態資源以降低延遲。

### Example: Optimizing CRP with Asynchronous Script Loading
主要部分：非阻塞的 JavaScript 加載
script 負責動態加載外部 JavaScript 文件。
loadScriptAsync 函數：創建一個新的 <script> 標籤並將其 src 設置為提供的 src 參數，並將 async 屬性設置為 true，使得腳本異步加載。
頁面可以繼續渲染，不被 JavaScript 文件的加載和執行所阻塞。

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

當修改某個 CSS 時，會觸發以下幾個可能的動作，這些動作會影響頁面顯示和性能：

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
1. **修改 CSS**：CSS 屬性被修改或新增。
2. **重新計算佈局**：根據新的 CSS，計算每個元素尺寸和位置。
3. **重新繪製**：更新元素外觀/顏色/背景。
4. **合成**：所有的視覺層合成一起顯示。

## 6. 性能考量
- **頻繁觸發 Reflow 或 Repaint** 會影響頁面性能，在大頁面或動態頁面中。因為每次重新計算佈局和重繪都需要消耗計算資源，特別是當頁面中有大量 DOM 元素時。

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








