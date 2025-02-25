放在 `Authorization` Header 而不是 Cookie 的主要原因包括：

### 1️⃣ **跨域問題（CORS）**
- `Cookie` 受限於瀏覽器的同源策略，跨域請求時默認不會自動攜帶 `Cookie`，必須手動設置 `withCredentials`。
- `Authorization` Header 則不受這種限制，適用於 REST API、GraphQL 等。

### 2️⃣ **靜態資源請求**
- `Cookie` 會自動附加到所有請求（包括圖片、CSS、JS），可能會造成不必要的流量負擔。
- `Authorization` Header 只會在 API 請求時帶上，減少不必要的認證傳輸。

### 3️⃣ **安全性**
- `Cookie` 可能受 **CSRF**（跨站請求偽造）攻擊影響，攻擊者可以利用 `Cookie` 的自動傳輸來發送惡意請求。
- `Authorization` Token 方式需要開發者手動在 `Header` 裡加入 Token，有效降低 CSRF 風險。

### 4️⃣ **可擴展性**
- 使用 `Bearer Token`（JWT、OAuth2）時，前端可以存儲在 `localStorage`、`sessionStorage` 或 `memory`，而不是依賴 `HttpOnly Cookie`。
- 適用於 **無狀態（stateless）API**，尤其是微服務架構，服務之間可以透過 Token 認證，而不需要共享 `Session`。

### 5️⃣ **移動端適配**
- `Cookie` 在移動端應用（React Native、Flutter）上管理較麻煩，部分原生 WebView 可能不支持 `HttpOnly` Cookie。
- `Authorization` Token 可以直接存儲在應用內（如 AsyncStorage），並在 API 請求時加上 Header，更靈活。

---

### 🔥 **什麼時候適合用 Cookie？**
如果你的應用是 **傳統的 Web 應用（如 SSR 框架：Next.js、Rails、Django）**，且需要自動管理登入狀態，使用 `HttpOnly Secure Cookie` 會更安全，避免 Token 被 XSS 竊取。

但如果你的應用是 **SPA（React、Vue）+ REST API / GraphQL**，或者是 **行動裝置 App（React Native、Flutter）**，用 `Authorization` Header 會更靈活。







**手機應用本身並非「沒有 Cookie」，而是無法像瀏覽器那樣自動管理和使用 Cookie。**  

### 📌 **1. 手機應用無法直接存取瀏覽器 Cookie**
- 在 **行動瀏覽器**（如 Chrome、Safari）中，Cookie 會自動儲存並在同網域請求時自動攜帶。
- **但原生應用（如 React Native / Flutter / Swift / Kotlin）無法直接存取瀏覽器的 Cookie**，也無法像網頁那樣 **透過 `document.cookie` 讀寫**。

🔹 **瀏覽器（Web）**
```javascript
document.cookie = "token=abc123; Secure; HttpOnly";
console.log(document.cookie); // ✅ 瀏覽器可讀取
```
🔹 **手機應用（React Native / Swift / Kotlin）**
```javascript
console.log(document.cookie); // ❌ `document` 未定義
```
➡ **無法直接存取 Cookie，需要手動管理 Token！**

---

### 📌 **2. 手機應用如何存取 Cookie？**
如果 API 回應 Set-Cookie，手機應用 **預設不會儲存 Cookie**，但可以透過 **特定方式處理：**

✅ **(1) 使用 `credentials: "include"` 強制攜帶 Cookie**
```javascript
fetch("https://api.example.com/user", {
  method: "GET",
  credentials: "include", // 🌟 手機 Fetch API 需要額外設定
});
```
🔹 **但 React Native 的 `fetch` 預設不支援 `credentials: "include"`**，可能需要額外庫 (`react-native-cookies`)。

✅ **(2) 手動儲存 Token（推薦方式）**
- 由於 `Cookie` 無法自動管理，**大部分手機應用改用 `Authorization: Bearer Token` 來存取 API**，然後儲存在 `AsyncStorage` 或 `SecureStore`。

📌 **React Native 儲存 Token**
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = async (token) => {
  await AsyncStorage.setItem("authToken", token);
};

const fetchWithToken = async () => {
  const token = await AsyncStorage.getItem("authToken");
  fetch("https://api.example.com/user", {
    headers: { "Authorization": `Bearer ${token}` }
  });
};
```
➡ 這樣比 `Cookie` 更可靠，適合 **行動端應用**！

---

### 📌 **3. 為什麼行動端不適合使用 Cookie？**
| 問題 | 原因 |
|------|------|
| ❌ **無法直接存取 `document.cookie`** | 手機應用沒有 `document` |
| ❌ **Fetch API 預設不攜帶 Cookie** | 需要 `credentials: "include"`，但行動端不一定支援 |
| ❌ **無法共享瀏覽器的 Cookie** | 手機應用和行動瀏覽器的存儲是獨立的 |
| ✅ **推薦使用 Token** | `AsyncStorage` 或 `SecureStore` 可手動管理 Token |

---

## 🚀 **結論**
- **手機並不是「沒有 Cookie」，只是原生應用無法自動管理 Cookie**，不像瀏覽器那樣運作。
- **行動端應用（如 React Native）推薦使用 `Authorization: Bearer Token`，而非 Cookie，因為更易管理且不受 CSRF 影響。**
- **如果一定要用 Cookie，需要額外處理，如 `credentials: "include"` 或 `react-native-cookies`。**

👉 **API 認證最佳實踐：行動端用 `Authorization Header`，Web 用 `Cookie`（加 `HttpOnly`）。**