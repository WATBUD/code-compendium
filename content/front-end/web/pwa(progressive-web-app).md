### 什麼是 Progressive Web App (PWA)？
一種利用現代 Web 技術打造、體驗接近原生 App 的網頁應用程式。使用者可以將其「安裝」到桌面或手機主畫面，支援離線使用、推播通知等原生功能，但本質上仍是一個網站。

### **核心特性**
- **漸進式（Progressive）**：在任何瀏覽器都能運作，並在支援的瀏覽器上漸進增強功能。
- **可安裝（Installable）**：可加入主畫面，擁有獨立圖示與啟動畫面，不需經過 App Store。
- **離線可用（Offline）**：透過 Service Worker 快取資源，斷網時仍能開啟。
- **響應式（Responsive）**：適配手機、平板、桌機各種螢幕尺寸。
- **安全（Secure）**：必須透過 HTTPS 提供服務。
- **可連結（Linkable）**：透過 URL 分享，無需安裝。

### **三大核心技術**

#### 1. Web App Manifest（`manifest.json`）
描述 App 的中繼資料，讓瀏覽器知道如何「安裝」這個網站。
```json
{
  "name": "My PWA App",
  "short_name": "MyApp",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```
在 HTML 中引入：
```html
<link rel="manifest" href="/manifest.json" />
```
- **`display`**：`standalone`（隱藏瀏覽器 UI，像原生 App）、`fullscreen`、`minimal-ui`、`browser`。
- **`start_url`**：從主畫面圖示啟動時開啟的頁面。

#### 2. Service Worker
運行在瀏覽器背景、獨立於網頁的 JavaScript，是 PWA 離線能力與推播的核心。可攔截網路請求並回傳快取內容。
```js
// 註冊 Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}
```
```js
// sw.js — 安裝時預先快取資源
const CACHE_NAME = "v1";
const ASSETS = ["/", "/index.html", "/styles.css", "/app.js"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 攔截請求：快取優先，找不到再走網路
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
```
- **生命週期**：`install`（安裝、預快取）→ `activate`（啟用、清舊快取）→ `fetch`（攔截請求）。
- **注意**：Service Worker 只能在 HTTPS 或 `localhost` 下運作。

#### 3. HTTPS
基於安全考量（Service Worker 權限強大，可攔截所有請求），PWA 必須透過 HTTPS 提供，`localhost` 開發環境例外。

### **常見快取策略（Caching Strategies）**
- **Cache First（快取優先）**：先找快取，沒有再打網路。適合靜態資源（CSS、JS、圖片）。
- **Network First（網路優先）**：先打網路，失敗才用快取。適合即時性內容（API 資料）。
- **Stale-While-Revalidate**：先回傳快取，同時背景更新快取。兼顧速度與新鮮度。
- **Network Only / Cache Only**：只走網路 / 只走快取。

### **推播通知（Push Notification）**
透過 Service Worker + Push API + Notification API 實現，即使網頁未開啟也能收到通知。
```js
// 請求通知權限
const permission = await Notification.requestPermission();
if (permission === "granted") {
  // 訂閱推播服務...
}
```

### **PWA vs 原生 App**
| 面向 | PWA | 原生 App |
| --- | --- | --- |
| 安裝方式 | 瀏覽器加入主畫面 | App Store / Play 商店 |
| 更新 | 部署即更新，無需審核 | 需送審、使用者手動更新 |
| 開發成本 | 一套程式碼跨平台 | 各平台分別開發 |
| 硬體權限 | 有限（持續增加中） | 完整 |
| 效能 | 良好 | 最佳 |

### **常用工具**
- **Workbox**：Google 出的 Service Worker 函式庫,簡化快取策略撰寫。
- **Lighthouse**：Chrome DevTools 內建，可稽核 PWA 是否合規並評分。
- **Vite PWA Plugin / next-pwa**：框架整合外掛,自動產生 Service Worker 與 manifest。
