# ES6 語法常見考題與解答

## 內存管理

### 考題
如何在JavaScript中管理內存？

### 解答
- JavaScript 使用自動垃圾回收（Garbage Collection）來管理內存。
- 使用 `let` 和 `const` 來聲明變數，確保變數在適當的作用域內被釋放。
- 盡量避免全局變數，以減少內存泄漏的風險。
- 不需要使用對象或數據時，設置其引用為 `null`，以便垃圾回收器能夠回收內存。

## 緩存（Caching）

### 考題
如何在JavaScript應用中實現緩存？

### 解答
- 可以使用瀏覽器的 `localStorage` 或 `sessionStorage` 來存儲數據，以減少重複的網絡請求。
- 使用 Service Workers 來實現更高效的緩存策略，離線瀏覽等功能。
- 在應用中實現內存緩存（例如使用一個對象來存儲最近的查詢結果），減少頻繁的計算或重複請求。

## 通信（Communication）

### 考題
如何在JavaScript中實現不同組件或頁面間的通信？

### 解答
- 使用事件驅動模型，例如透過 `EventEmitter` 在 Node.js 中進行組件通信。
- 在瀏覽器中，可以使用 `window.postMessage` 在不同的頁面或 iframe 之間進行通信。
- 使用 WebSocket 來實現實時雙向通信，例如在實時聊天應用中。
- 使用第三方庫如 Redux 來管理應用狀態和組件間的通信。
