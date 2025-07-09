`rel` 屬性是 `<link>` 標籤的一個重要屬性，用來指定當前文檔與被鏈接資源之間的關係。以下是 `rel` 屬性的一些常見值及其介紹：

1. **stylesheet**
   - 用途：將 CSS 樣式表與文檔關聯。
   - 示例：`<link rel="stylesheet" href="styles.css">`

2. **preload**
   - 用途：提前加載資源（如樣式表、腳本、字體等），以便後續使用。
   - 提前請求：在 HTML 解析的同時，預載資源就會被立即請求，這樣可以並行下載資源，減少等待時間。
   - 高優先級：瀏覽器會將預載資源視為高優先級，確保它們能夠快速下載。
   - 減少延遲：由於資源提前下載完畢，當頁面需要這些資源時，它們已經在瀏覽器的緩存中，可以立即使用。
   - 示例：`<link rel="preload" href="styles.css" as="style">`

3. **prefetch**
   - 用途：告訴瀏覽器將來可能會使用的資源，提前進行加載。
   - 示例：`<link rel="prefetch" href="next-page.html">`

4. **preconnect**
   - 用途：告訴瀏覽器提前建立與特定網域的網絡連接。
   - 示例：`<link rel="preconnect" href="https://example.com">`

5. **dns-prefetch**
   - 用途：提前解析特定網域的 DNS，以縮短後續資源請求的延遲。
   - 示例：`<link rel="dns-prefetch" href="//example.com">`

6. **prerender**
   - 用途：告訴瀏覽器預渲染指定的頁面，以便用戶可能訪問時能快速呈現。
   - 示例：`<link rel="prerender" href="next-page.html">`

7. **canonical**
   - 用途：告訴搜尋引擎當前頁面的正規（canonical）URL，以避免重複內容問題。
   - 示例：`<link rel="canonical" href="https://example.com/page">`

8. **alternate**
   - 用途：提供文檔的替代版本，例如不同語言的版本或摘要。
   - 示例：`<link rel="alternate" href="rss-feed.xml" type="application/rss+xml" title="RSS">`

9. **author**
   - 用途：指定文檔的作者。
   - 示例：`<link rel="author" href="author-profile.html">`

10. **icon**
    - 用途：指定網站的圖標（favicon）。
    - 示例：`<link rel="icon" href="favicon.ico" type="image/x-icon">`
