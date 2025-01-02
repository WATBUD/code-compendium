
# Cookie 安全性：HttpOnly 和 Secure

當你在網站上使用 Cookies 儲存資料時，**HttpOnly** 和 **Secure** 是兩個非常重要的安全屬性，幫助保護你的資料免受潛在的攻擊。

### 1. **HttpOnly**

- **HttpOnly(Cookies的屬性)** :
- JavaScript 只能訪問沒有 HttpOnly 屬性的 cookies，
- 告訴瀏覽器這個 Cookie **只能** 被伺服器訪問，**不能** 被 JavaScript 訪問。

#### 為什麼要使用 HttpOnly？
如果JavaScript 被黑客攻擊，攻擊者無法輕易地竊取敏感的 Cookie 資料（例如，登入認證資訊）。

#### 如何設置 HttpOnly？
這樣設置一個 HttpOnly Cookie：

```http
Set-Cookie: sessionId=abc123; HttpOnly
```
console.log(document.cookie);
這個 sessionId cookie 不會出現在 document.cookie 中。JavaScript 只能訪問沒有 HttpOnly 屬性的 cookies。

---

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
