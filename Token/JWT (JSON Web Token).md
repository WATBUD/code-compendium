# JWT (JSON Web Token) 簡介

#### 什麼是JWT？

JSON Web Token（JWT）是一種開放標準（RFC 7519），用於安全地傳輸信息。JWT 可以通過數字簽名（使用 HMAC 算法）或公鑰/私鑰對（使用 RSA 或 ECDSA 算法）進行驗證，確保了信息的完整性和可信性。

### 主要流程
前端使用者登入=>，後端產生JWT，前端接收JWT後，儲存在本機（如localStorage或sessionStorage）。 每次與後端進行互動時，
前端將JWT(token)加入HTTP請求的Header中
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjMsInVzZXJuYW1lIjoiZXhhbXBsZV91c2VyIiY
發送給後端，用於進行身份驗證和授權。

###  JWT 結構
JWT 由三個部分組成，通過點號分隔：
1. Header（頭部）：包含令牌信息，例如使用的簽名算法等。
{
  "alg": "HS256",
  "typ": "JWT"
}

常用的JWT演算法（Algorithm）
HS256（HMAC with SHA-256）：使用HMAC（Hash-based Message Authentication Code）和SHA-256演算法進行簽章。 這是最常見的JWT演算法之一，適用於對稱加密，金鑰由發送方和接收方共用。

RS256（RSA with SHA-256）：使用RSA（Rivest-Shamir-Adleman）和SHA-256演算法進行簽署。 在這種演算法中，金鑰對由公鑰和私鑰組成，公鑰用於驗證簽名，私鑰用於產生簽名。

ES256（ECDSA with SHA-256）：使用ECDSA（Elliptic Curve Digital Signature Algorithm）和SHA-256演算法進行簽署。 與RSA相比，ECDSA演算法提供了更高的效能和更短的金鑰長度，適用於資源受限的環境。

HS512、RS512、ES512：與上述演算法類似，分別使用SHA-512作為雜湊演算法的變種。 它們提供了更高的安全性，但相應地會增加計算成本和金鑰長度。

2. Payload（負載）：傳輸的信息，JWT主體內容。
{
  "user_id": 123,
  "username": "example_user",
  "role": "admin"
}

3. Signature（簽名）：由頭部、負載和密鑰組成，用於驗證 JWT 的真實性和完整性。

HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  your_secret_key
)




## JWT 使用場景

JWT 主要用於身份驗證和信息傳輸，常見的使用場景包括：

- **使用者認證**：使用者登錄後伺服器返回 JWT，客戶端將 JWT 存儲起來，在每次請求時發送 JWT 給伺服器進行驗證。
- **跨域身份驗證**：不同域之間的系統可以通過 JWT 來安全地共享使用者身份信息，而無需每次請求都進行身份驗證。
- **信息交換**：由於 JWT 包含了自包含的信息，可以用於安全地在各方之間傳輸數據。

## JWT 的優點

- **輕量級**：JWT 是一種緊湊的方式來傳輸信息，適合在網絡間傳輸。
- **自包含**：JWT 包含了所需的所有信息，無需額外的查詢數據庫。
- **可擴展**：可以添加自定義的信息到 JWT 中，以滿足不同場景的需求。

## JWT 的缺點

- **無法撤銷**：一旦 JWT 發放後，在其過期之前都是有效的，除非實現額外的撤銷機制。
- **負載限制**：由於 JWT 信息存儲在負載中，過大的負載可能會導致網絡傳輸問題。
- **不適合存儲敏感信息**：盡管可以使用加密的 JWT，但仍不建議將敏感信息直接存儲在 JWT 中。

## 結語

JWT 是一種靈活且強大的身份驗證和信息傳輸方式， Web 開發中廣泛應用能夠更好地設計和實現安全的系統。


```javascript
const jwt = require('jsonwebtoken');

// 設置JWT密鑰
const JWT_SECRET = 'your_secret_key';

// 生成JWT
function generateJWT(payload) {
    // 添加到Payload中的標準聲明
    payload.exp = Math.floor(Date.now() / 1000) + (60 * 30); // 設置過期時間為30分鐘
    // 生成JWT
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

// 驗證JWT
function validateJWT(token) {
    try {
        // 驗證JWT並返回Payload
        const payload = jwt.verify(token, JWT_SECRET);
        return payload;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // JWT過期
            return { error: 'JWT已過期' };
        } else {
            // JWT無效
            return { error: '無效的JWT' };
        }
    }
}

// 示例用法
// 示例Payload
const payload = { user_id: 123, username: 'example_user' };

// 生成JWT
const jwtToken = generateJWT(payload);
console.log('生成的JWT:', jwtToken);

// 驗證JWT
const decodedPayload = validateJWT(jwtToken);
if ('error' in decodedPayload) {
    console.log('驗證JWT失敗:', decodedPayload.error);
} else {
    console.log('驗證JWT成功，Payload:', decodedPayload);
}
