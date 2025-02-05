
# Cookie 安全性：HttpOnly 和 Secure
使用 Cookies 儲存資料**HttpOnly** 和 **Secure** 幫助保護資料免受潛在的攻擊。

### 1. **HttpOnly**

- **HttpOnly(Cookies的屬性)** :
- JavaScript 只能訪問沒有 HttpOnly 屬性的 cookies，
- 告訴瀏覽器這個 Cookie **只能** 被伺服器訪問，**不能** 被 JavaScript 訪問。
HttpOnly 的作用：防範 XSS 攻擊
場景： 如果一個網站存在跨站腳本攻擊（XSS）漏洞，攻擊者可以注入惡意 JavaScript。

惡意 JavaScript 可能嘗試通過 document.cookie 獲取用戶的身份驗證 Token 或 Session ID。
防禦： 設置 HttpOnly 的 Cookie，惡意腳本無法讀取這些敏感 Cookie，即使網站中有 XSS 漏洞，也可以減少敏感信息被竊取的風險。

#### 如何設置 HttpOnly？
這樣設置一個 HttpOnly Cookie：
```js 
Set-Cookie: sessionId=abc123; HttpOnly
// Cookie 設置了 HttpOnly 屬性，以下代碼無法讀取
console.log(document.cookie); // 不會顯示該 Cookie 
//防止了通過惡意的 JavaScript 竊取用戶的敏感資訊 ex:身份驗證 Token 或 Session ID
```
使用開發者工具（例如 Chrome DevTools）查看網頁請求時，可以在 Network 標籤下的請求頭中看到發送的所有 Cookie，包括 HttpOnly 的 Cookie。
惡意腳本無法透過 document.cookie 或其他 JavaScript 方式存取 Cookie

### 2. **Secure**

- **Secure** 是另一個用於 Cookies 的屬性，這表示該 Cookie **只能** 在 **HTTPS** 連接中被傳輸。
- 這意味著 Cookie 在傳輸過程中不會暴露給中間人攻擊，保持了更高的安全性。

#### 為什麼要使用 Secure？
如果網站不使用 HTTPS，而使用 HTTP，攻擊者可能會劫持 Cookie。因此，
只有在 HTTPS 連接中才能使用 `Secure` 標誌，這樣可以防止 Cookie 被攔截。

#### 如何設置 Secure？
這樣設置一個 Secure Cookie：

```http
Set-Cookie: sessionId=abc123; Secure
```
這樣設置後，`sessionId` 只會在 HTTPS 連接中傳輸。

---

### 小結

- 使用 **HttpOnly** 來保護 Cookie 不被 JavaScript 訪問，減少跨站腳本攻擊（XSS）的風險。
- 使用 **Secure** 來確保 Cookie 只通過安全的 HTTPS 連接傳輸，防止 Cookie 在不安全的網絡環境中被竊取。

記住：保護好你的 Cookie，就是保護好你的網站和使用者！
