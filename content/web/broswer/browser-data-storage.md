- If I only have the frontend without backend server support, 
- what methods can I use to store data on the client side?

| 儲存方式      | 空間限制 | 可用大小（大概） | 儲存格式 | 是否同步 | 適合用途 |
|---------------|-----------|--------------------|-----------|------------|-------------|
| `localStorage` | 有       | 約 5MB             | 字串      | ✅ 同步    | 小設定 / 登入狀態 |
| `sessionStorage` | 有    | 約 5MB             | 字串      | ✅ 同步    | 分頁內短期暫存 |
| `IndexedDB`     | 幾乎無限制 | 上 GB 級（依裝置）| 結構化資料 | ❌ 非同步  | 儲存大量資料 / 離線應用 |

### IndexedDB: 瀏覽器中存儲大量結構化資料的 API
提供非同步事務型資料庫持久保存資料。
### ✅ IndexedDB 的大小上限與裝置硬碟空間有關
- 「動態上限」依硬碟、瀏覽器、裝置決定。
- 每個瀏覽器不同根據使用者剩下空間動態調整，通常瀏覽器會允許 IndexedDB 使用「總硬碟空間的 5%～50%」。
| 瀏覽器 | 總可用空間 | 單網域最大 | 超過會？ |
|--------|------------|-------------|----------|
| Chrome | 剩餘空間的 60% | 約 2～10 GB（依硬碟大小變動） | 提示詢問使用者是否允許 |
| Firefox | 剩餘空間的 50% | 預設上限約 2GB | 自動拒絕或丟錯 |
| Safari | 約 1GB | 更保守（約 50～100MB） | 可能不提示直接拒絕 |
- IndexedDB存超過上限，**有些瀏覽器會彈出提示詢問是否允許更多空間**（像 Chrome）；
- 有些瀏覽器（如 Safari）則**直接中止**，不給提示；
- **不同裝置（桌機 vs 手機）也會有不同限制**。

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


