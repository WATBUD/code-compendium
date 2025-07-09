CORS（Cross-Origin Resource Sharing，跨來源資源共享）是一種 **瀏覽器安全機制**，用於控制網頁應用程式如何請求來自不同來源（Origin）的資源。它是由瀏覽器強制執行的，目的是防止惡意網站未經授權存取其他網站的資源。

---

### 1. **什麼是「來源」（Origin）？**
來源（Origin）是由以下三個部分組成的：
- **協議（Protocol）**：例如 `http` 或 `https`。
- **網域（Domain）**：例如 `example.com`。
- **埠號（Port）**：例如 `80` 或 `443`（如果未指定，則使用預設埠號）。

如果兩個 URL 的協議、網域或埠號有任何一個不同，它們就被視為 **不同的來源**。

例如：
- `https://example.com` 和 `http://example.com` 是不同來源（協議不同）。
- `https://example.com` 和 `https://api.example.com` 是不同來源（網域不同）。
- `https://example.com` 和 `https://example.com:8080` 是不同來源（埠號不同）。

---

### 2. **為什麼需要 CORS？**
瀏覽器有一個稱為 **同源政策（Same-Origin Policy）** 的安全機制，它限制網頁應用程式只能存取與自己同源的資源。這是為了防止惡意網站從其他網站竊取資料。

然而，現代網頁應用程式通常需要從不同來源的伺服器請求資源（例如 API 資料）。CORS 就是為了解決這個問題，它允許伺服器明確指定哪些來源可以存取其資源。

---

### 3. **CORS 的工作原理**
當瀏覽器發起一個 **跨來源請求（Cross-Origin Request）** 時，會先發送一個 **預檢請求（Preflight Request）**（如果是複雜請求），檢查伺服器是否允許該請求。伺服器會通過 HTTP 標頭（Headers）來回應瀏覽器，告訴它是否允許該請求。

#### 關鍵的 HTTP 標頭：
- **`Origin`**（由瀏覽器發送）：
  表示請求的來源。
  ```
  Origin: https://example.com
  ```

- **`Access-Control-Allow-Origin`**（由伺服器發送）：
  指定哪些來源被允許存取資源。
  ```
  Access-Control-Allow-Origin: https://example.com
  ```
  如果伺服器允許所有來源，可以設置為：
  ```
  Access-Control-Allow-Origin: *
  ```

- **`Access-Control-Allow-Methods`**（由伺服器發送）：
  指定允許的 HTTP 方法（例如 `GET`、`POST` 等）。
  ```
  Access-Control-Allow-Methods: GET, POST, PUT
  ```

- **`Access-Control-Allow-Headers`**（由伺服器發送）：
  指定允許的 HTTP 標頭。
  ```
  Access-Control-Allow-Headers: Content-Type, Authorization
  ```

---

### 4. **CORS 的請求類型**
CORS 請求分為兩種：
1. **簡單請求（Simple Request）**：
   - 使用 `GET`、`POST` 或 `HEAD` 方法。
   - 只包含特定的標頭（例如 `Accept`、`Content-Type` 等）。
   - 不發送預檢請求，直接發送實際請求。

2. **預檢請求（Preflight Request）**：
   - 使用 `PUT`、`DELETE` 或其他非簡單方法。
   - 包含自定義標頭或 `Content-Type` 為 `application/json`。
   - 瀏覽器會先發送一個 `OPTIONS` 請求（預檢請求），確認伺服器是否允許實際請求。

---

### 5. **CORS 的常見問題**
- **CORS 錯誤**：
  如果伺服器未正確設置 `Access-Control-Allow-Origin`，瀏覽器會阻止請求，並在控制台顯示 CORS 錯誤。
  ```
  Access to XMLHttpRequest at 'https://api.example.com' from origin 'https://example.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
  ```

- **解決方法**：
  - 在伺服器端設置正確的 CORS 標頭。
  - 使用代理伺服器（Proxy Server）來繞過 CORS 限制。
  - 如果是開發環境，可以暫時禁用瀏覽器的 CORS 檢查（不建議用於生產環境）。

---

### 6. **CORS 的實際範例**
假設你有一個前端應用程式運行在 `https://example.com`，並需要從 `https://api.example.com` 請求資料。

#### 伺服器端設置（例如 Node.js + Express）：
```javascript
const express = require('express');
const app = express();

// 允許特定來源存取
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://example.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/data', (req, res) => {
    res.json({ message: 'Hello, CORS!' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

#### 前端請求：
```javascript
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
```

---

### 7. **總結**
- CORS 是一種瀏覽器安全機制，用於控制跨來源資源的存取。
- 伺服器通過 HTTP 標頭來指定哪些來源被允許存取資源。
- 如果 CORS 設置不正確，瀏覽器會阻止請求並顯示錯誤。
- 在開發中，正確配置 CORS 是確保前端應用程式能夠順利存取 API 的關鍵。

希望這能幫助你理解 CORS！如果有其他問題，歡迎隨時問我！ 😊