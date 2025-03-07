- If I only have the frontend without backend server support, 
- what methods can I use to store data on the client side?

# IndexedDB: 瀏覽器中存儲大量結構化資料的 API
提供一個非同步、事務型的資料庫系統，在用戶計算機上持久保存資料。

# localStorage：瀏覽器本地存儲方案大小限制（通常5 MB），保存「長期需要資料」，關掉瀏覽器再開啟，資料還會保留。適合儲存像是用戶設定或登入狀態等。

# sessionStorage：瀏覽器本地存儲方案大小限制（通常5 MB），保存「短期需要的資料」，重新整理網頁資料還在，關閉瀏覽器分頁後，資料會消失。適合用於臨時的工作資料。

# 全域變數：同一個頁面或應用程式內，共享資料。只在這個頁面有效，關閉頁面就不存在。

# Cookie：JavaScript [設置/讀取] 隨每個 HTTP 請求一同發送，有大小限制（通常為 4 KB）和安全性問題。
Cookie 的類型：
- 會話 Cookie（Session Cookie）：沒有設定過期時間，僅在瀏覽器開啟期間有效。當您關閉瀏覽器時，會話 Cookie 會被刪除。
- 持久性 Cookie（Persistent Cookie）： 設定了過期時間或最大存活時間，會在指定的時間後自動刪除。即使您關閉瀏覽器，持久性 Cookie 仍會保留，直到達到設定的過期時間。

安全性問題:
# 跨站腳本攻擊（XSS）
HttpOnly 標誌：設置為 HttpOnly 的 Cookie 只能由伺服器訪問，無法被 JavaScript 訪問，減少 XSS 攻擊的風險。
# 跨站請求偽造（CSRF）： 攻擊者利用使用者在已登入網站的Cookie，攻擊者網站發送偽造請求目標網站執行操作
- 瀏覽器會在同一瀏覽器實例的所有標籤頁中共享相同域名下的 Cookie。
- 在一個標籤頁上登入了某個網站，網站的 Cookie 在同一瀏覽器的其他標籤頁中也可用。攻擊者無需知道您是否已登入目標網站，只要您在瀏覽器中已登入，攻擊者即可利用這一點發起 CSRF 攻擊

限制跨站請求攜帶 Cookie，從而減少 CSRF 攻擊的風險。
SameSite 屬性的值：
Strict：僅在同源請求中發送 Cookie，即只有當請求的來源與 Cookie 所屬的網站相同時，才會攜帶該 Cookie。
Lax：允許在某些情況下跨站請求攜帶 Cookie，例如從外部網站點擊鏈接導航到您的網站時。
None：允許所有跨站請求攜帶 Cookie，但必須同時設定 Secure 屬性，確保 Cookie 僅在 HTTPS 協議下傳輸。
```javascript
// 設定一個名為 "username" 的 Cookie，值為 "JohnDoe"，啟用 SameSite 屬性
document.cookie = "username=JohnDoe;path=/; SameSite=Strict";
```

# 傳輸過程中的數據洩漏：
Cookie 在 HTTP 請求中傳輸，使用未加密的 HTTP 協議，攻擊者可以利用（MITM）攔截 Cookie 竊取敏感信息。
設置 Secure 確保 Cookie 僅在 HTTPS 中傳輸。
```javascript
// 設定一個名為 "username" 的 Cookie，值為 "JohnDoe"，
// 並設定有效期為 7 天，路徑為網站根目錄，並啟用 Secure 屬性
document.cookie = "username=JohnDoe; expires=" + new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString() + "; path=/; Secure";
// 設定一個名為 "sessionToken" 的 Cookie，值為 "encryptedToken"，
// 並同時設定 HttpOnly 和 Secure 屬性
document.cookie = "sessionToken=encryptedToken; HttpOnly; Secure; path=/";
```
