# Cache-Control Header 註解

## **什麼是 Cache-Control？**
`Cache-Control` 是一個 HTTP 標頭，定義[客戶端/伺服器]之間的快取策略。控制資源是否可以被快取、快取的時間長短，以及在什麼條件下快取。

### **常見的 Cache-Control 指令**
| 指令              | 描述                                                                    |
|------------------|-------------------------------------------------------------------------|
| `public`         | 資源可以客戶端和中介快取共用。                                           |
| `private`        | 資源僅供單一用戶使用，不能被共享快取存儲。                                    |
| `no-store`       | 禁止任何形式的快取，[客戶端/代理伺服器]無法存儲該資源。                           |
| `no-cache`       | 必須在使用快取資源之前與伺服器重新驗證。                                     |
| `max-age=<秒數>` | 指定資源在多少秒內被視為新鮮的最大時間。                                      |
| `must-revalidate`| 強制快取在使用資源之前，必須與原伺服器重新驗證。                                |

---

## **Cache-Control 與 ETag 的區別**
- **Cache-Control**: 定義快取策略（快取多長時間或是否允許快取）。
- **ETag**: 資源版本的唯一標識，用於檢查快取資源是否仍然有效。

---
## **使用範例**
### **Node.js 範例**
```javascript
const express = require('express');
const app = express();

app.get('/example', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600');
  res.send('這是一個快取的回應！');
});

app.listen(3000, () => console.log('伺服器運行於 port 3000'));
```

當網頁被cache 時如何去更新網頁的內容
Last-Modified 和 eTag同時用 優先順序
ETag 優先於 Last-Modified
### **Fetch API 範例**
```javascript
fetch('/example', {
  method: 'GET',
  cache: 'no-cache', // 指定不使用快取
})
  .then(response => response.text())
  .then(data => console.log(data));
```

### **Service Worker 範例**
```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('my-cache').then(cache => {
      return cache.match(event.request).then(response => {
        return (
          response ||
          fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          })
        );
      });
    }),
  );
});
```

---

## **可能的問題**

### **基本理論**
1. **什麼是 `Cache-Control` 標頭？它的功能是什麼？**
   - 它定義了客戶端與伺服器之間的快取策略。
   - 範例：`Cache-Control: max-age=3600` 允許資源快取 3600 秒。

2. **什麼時候應該使用 `no-cache`？**
   - 當您希望客戶端在使用快取資源之前，必須與伺服器重新驗證時。

3. **`no-store` 的作用是什麼？**
   - 禁止資源被任何形式的快取存儲。

4. **`public` 和 `private` 有什麼區別？**
   - `Cache-Control: public`:可以被客戶端（使用者瀏覽器）和中介快取（CDN/代理伺服器）共同緩存。可以被多個使用者共享，不限於單一使用者。
   - `Cache-Control: private`: 僅能被最終用戶的瀏覽器快取。
   - 客戶端快取：該資源可以在使用者的瀏覽器中進行快取。當用戶再次訪問該資源時，瀏覽器會從本地快取中讀取資料，而不是重新向伺服器發送請求。
   - 中介快取（代理伺服器、CDN等）：該資源將不會被任何中介快取所緩存。即使請求經過代理伺服器或 CDN，這些中介快取不會保存該資源的副本。



### **進階情境**
1. **如何確保圖片具有長時間的快取，但仍可在需要時更新？**
   - 使用 `Cache-Control: max-age=31536000` 進行長時間快取（1 年）。
   - 將版本號添加到文件名中（例如，`/images/logo-v2.png`）。

2. **如何完全禁用資源的快取？**
   - 使用 `Cache-Control: no-store`。

3. **`max-age` 與 `must-revalidate` 有何不同？**
   - `max-age`: 定義資源被視為新鮮的時間。
   - `must-revalidate`: 確保快取在過期後重新驗證資源。

---

## **實際應用場景**
### 靜態資源（如 CSS、JS）：
```http
Cache-Control: public, max-age=31536000, immutable
```
- 快取 1 年，並標記為 immutable（不可變），避免重新驗證。

### 動態內容：
```http
Cache-Control: no-cache, must-revalidate
```
- 總是向伺服器重新驗證內容。

### 含敏感數據的 API：
```http
Cache-Control: private, no-store
```
- 防止快取敏感數據。
