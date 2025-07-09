`cookie`、`localStorage` 和 `sessionStorage` 都是瀏覽器用來存儲資料的方式，但它們有不同的特性和適用場景。以下是它們的主要差異：  

|  特性  | **Cookie** | **localStorage** | **sessionStorage** |
|--------|-----------|------------------|--------------------|
| **存儲大小** | ~4KB (每個 domain) | 約 5MB | 約 5MB |
| **存儲時間** | 可設置到期時間 | **永久**，除非手動刪除 | **僅在當前 session**，關閉瀏覽器後刪除 |
| **是否與伺服器通信** | ✅ **每次請求都會自動發送** | ❌ 不會 | ❌ 不會 |
| **適用場景** | 用於存放小量數據，例如 session ID、用戶身份驗證 | 適合存儲較大的資料，例如使用者設定、Token | 適合短期資料，例如表單填寫狀態 |
| **跨頁面可存取性** | ✅ **同一 domain 下的所有頁面都可存取** | ✅ **同一 domain 下的所有頁面可存取** | ❌ **只在同一個標籤頁 (tab) 可存取** |
| **可存儲的數據類型** | **只能存字串** (需手動轉換 JSON) | **只能存字串** (需手動轉換 JSON) | **只能存字串** (需手動轉換 JSON) |

---

## **詳細比較**
### **1. Cookie**
📌 **特性**
- 主要用於 **伺服器與用戶端之間的數據交換**（例如身份驗證 Token、Session ID）。
- **每次 HTTP 請求** 都會自動攜帶 `cookie`，因此請求過多時會影響效能。
- 可設置 `HttpOnly` 來防止 JavaScript 存取，提高安全性。
- 透過 `Secure` 標誌確保只在 HTTPS 下傳輸，並可使用 `SameSite` 限制跨站請求。

📌 **用法**
```js
document.cookie = "username=ray; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/";
console.log(document.cookie); // 讀取所有 cookie
```

---

### **2. localStorage**
📌 **特性**
- **不會隨著請求發送**，適合存儲較大的資料，例如使用者設定、Token。
- 除非手動刪除，否則數據會**永久存儲**在瀏覽器中（即使重新整理或關閉瀏覽器）。
- **同一 domain 下的所有頁面** 都可以存取。

📌 **用法**
```js
localStorage.setItem("username", "ray");  // 設置
console.log(localStorage.getItem("username")); // 讀取
localStorage.removeItem("username");  // 刪除單個項目
localStorage.clear();  // 清空所有 localStorage
```

---

### **3. sessionStorage**
📌 **特性**
- 與 `localStorage` 類似，但資料**只在當前標籤頁 (tab) 有效**。
- **關閉標籤頁或瀏覽器後，數據就會刪除**（但重新整理頁面不會影響）。
- 適合存儲短期數據，如表單填寫狀態、頁面間的臨時交互。

📌 **用法**
```js
sessionStorage.setItem("sessionData", "temporary");
console.log(sessionStorage.getItem("sessionData")); // 讀取
sessionStorage.removeItem("sessionData");  // 刪除單個項目
sessionStorage.clear();  // 清空所有 sessionStorage
```

---

## **何時使用哪一種？**
| **使用情境** | **建議存儲方式** |
|--------------|----------------|
| **存放 Token，避免每次請求都攜帶** | `localStorage` ✅ |
| **存放使用者 Session ID，需要在伺服器端驗證** | `cookie` ✅ |
| **存放表單填寫狀態或臨時資料** | `sessionStorage` ✅ |
| **存放偏好設定（例如暗色模式、語言選擇）** | `localStorage` ✅ |
| **需要在多個頁面之間共享數據** | `localStorage` 或 `cookie` |

---

## **安全性考量**
1. **Cookie**  
   - 可設置 `HttpOnly` 防止 JavaScript 存取，避免 XSS 攻擊。  
   - 可設置 `Secure` 限制 HTTPS 傳輸，避免中間人攻擊 (MITM)。  

2. **localStorage / sessionStorage**  
   - **不會自動發送**，但容易受 XSS 攻擊影響，因此不應存放敏感資料（如密碼、Token）。  
   - 若存放 Token，應加上 **防篡改機制**（如 JWT 簽章驗證）。  

---

## **總結**
| **比較項目**  | **Cookie** | **localStorage** | **sessionStorage** |
|--------------|-----------|------------------|--------------------|
| **存儲大小** | 4KB | 5MB | 5MB |
| **存儲時間** | 可設置過期時間 | 永久 | 會話結束後刪除 |
| **隨 HTTP 請求發送** | ✅ 是 | ❌ 否 | ❌ 否 |
| **適用場景** | 用戶身份驗證、Session ID | 偏好設定、Token 存儲 | 表單填寫狀態、臨時交互 |

📌 **簡單來說：**  
- `cookie` 適合存放 **小型、需要與伺服器同步的資料**（如 Session ID）。  
- `localStorage` 適合存放 **長期有效、無需發送到伺服器的大型數據**（如 Token、使用者設定）。  
- `sessionStorage` 適合存放 **短期存取、與當前標籤頁相關的臨時數據**（如表單輸入）。  

🚀 **如果是存放 Token，建議使用 `localStorage`，但務必確保安全性（如使用 HTTPS 和 SameSite 設定）。**