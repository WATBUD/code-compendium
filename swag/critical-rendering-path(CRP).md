# Critical Rendering Path (CRP)
refers to the sequence of steps the browser takes to convert HTML, CSS, and JavaScript into pixels on the user's screen. 
- (CRP 是指瀏覽器將 HTML、CSS 和 JavaScript 轉換為用戶螢幕上像素的一系列步驟。)

## Key Steps in the CRP

1. **瀏覽器解析 HTML，建立 Document Object Model (DOM) =>頁面的結構和內容**

2. **瀏覽器解析 CSS，構建 CSS Object Model (CSSOM)，用於表示每個元素的樣式**

3. **瀏覽器結合 DOM 和 CSSOM 生成渲染樹 (Render Tree)，其中僅包含可見的元素及其樣式**

4. **瀏覽器基於渲染樹計算每個元素在螢幕上的位置和大小。**

5. **瀏覽器將像素繪製到螢幕上，使內容對用戶可見。**

## Performance Impact of the CRP
- Blocking resources (e.g., CSS and JavaScript) can delay the CRP. 
(阻塞資源，例如 CSS 和 JavaScript，可能會延遲 CRP。)
- JavaScript 通常可以修改 DOM 結構，例如添加新元素或更改現有內容。
瀏覽器為了避免解析 HTML 和執行 JavaScript 時出現衝突，會暫停 DOM 的構建，等 JavaScript 執行完成後再繼續解析 HTML。
- Large or unoptimized assets increase loading time. 
(大型或未優化的資源會增加加載時間。)


## Optimizing the CRP
### 1. Minimize Critical Resources
- Reduce the number of CSS and JavaScript files. 
(減少 CSS 和 JavaScript 文件的數量。)
- Combine and minify CSS and JavaScript files. 
(合併並壓縮 CSS 和 JavaScript 文件。)
- Use Gzip or Brotli compression to reduce file sizes. 
(使用 Gzip 或 Brotli 壓縮來減少文件大小。)

### 2. Optimize JavaScript Loading
- 對腳本標籤使用 `async` 或 `defer` 屬性,控制外部 JavaScript 文件的加載和執行，從而提高性能和頁面加載速度。
### `async` 屬性
- 腳本會異步加載，HTML 文檔同時繼續解析。
- 當腳本下載完成後，會立即執行，這可能會中斷文檔解析。
- 適用於不依賴其他腳本或 DOM 的腳本（例如：分析腳本、第三方集成）。
### `defer` 屬性
- 腳本會異步加載，執行會被延遲到 HTML 文檔完全解析完成後，這樣不會阻塞頁面的渲染過程。
- `defer` 只對外部腳本有效，內部腳本（即直接寫在 `<script>` 標籤內的腳本）無法使用 `defer` 屬性。
- 多個腳本使用 `defer`，預設情況下，`defer` 按照在 HTML 中的出現順序執行腳本。

## 2. `defer` 屬性與 `async` 屬性的區別
- **`async`**：腳本下載完後會立即執行，必定會中斷 HTML 文檔的解析，直到腳本執行完畢。
- **`defer`**：腳本下載後執行被Delay，直到文檔解析完成，ex:有些腳本需要等到頁面內容完全加載後才運行，這時使用 defer 屬性就很合適。

### 使用範例
  ```html
  <script src="example.js" async></script>
  <script src="example.js" defer></script>
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

### Tools for CRP Optimization
- **Lighthouse**: (分析頁面性能並提供可操作的建議。).
- **WebPageTest**: (測量加載時間並識別瓶頸。). 
- **Chrome DevTools**: (檢查和調試渲染性能。). 


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
