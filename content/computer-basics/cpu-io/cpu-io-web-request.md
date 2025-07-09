
## ✅ 網路請求處理流程總覽：CPU 與 I/O 分工（中英對照）

| 流程階段<br>**Stage** | 動作<br>**Action**                                             | 類別<br>**Type**                     | CPU 使用<br>**CPU Use**          | I/O 使用<br>**I/O Use**                 | 說明<br>**Explanation**                                 |
| ----------------- | ------------------------------------------------------------ | ---------------------------------- | ------------------------------ | ------------------------------------- | ----------------------------------------------------- |
| 1️⃣               | 建立 TCP 連線（含 TLS）<br>**Establish TCP connection (incl. TLS)** | I/O 密集<br>I/O Bound                | 🔸 少量運算<br>Low                 | ✅ 網路傳輸<br>Network                     | 三次握手；HTTPS 時含 TLS 加密開銷<br>TCP handshake, optional TLS |
| 2️⃣               | 讀取 HTTP Request<br>**Read HTTP Request**                     | I/O 密集<br>I/O Bound                | 🔸 幾乎不吃<br>Minimal             | ✅ 從 socket 讀資料<br>From socket         | 資料尚未進入邏輯處理層<br>Waiting on incoming request            |
| 3️⃣               | 解析 HTTP 請求<br>**Parse HTTP Request**                         | CPU 密集<br>CPU Bound                | ✅ 字串解析<br>String parsing       | ❌                                     | 解析 headers、URL、body 等結構<br>Parse headers, URL, body   |
| 4️⃣               | 驗證資料格式<br>**Validate Input Format**                          | CPU 密集<br>CPU Bound                | ✅ 中低運算<br>Medium               | ❌                                     | email、必填欄位等驗證<br>Check format, required fields        |
| 5️⃣               | 身份驗證與授權<br>**Authentication & Authorization**                | CPU 密集（含 I/O）<br>CPU Bound (+ I/O) | ✅ 中～高運算<br>Medium to High      | ✅ 查詢帳號/Token<br>May access DB         | JWT 驗證、OAuth 授權<br>Verify identity, permissions       |
| 6️⃣               | 執行商業邏輯<br>**Execute Business Logic**                         | CPU 密集<br>CPU Bound                | ✅ 視複雜度而定<br>Depends on logic   | ✅ 可能涉及資料庫、緩存<br>Optional I/O          | 價格計算、優惠判斷等<br>Discounts, rules, checks                |
| 7️⃣               | 查詢資料庫<br>**Query Database**                                  | I/O 密集<br>I/O Bound                | 🔸 幾乎不吃<br>Minimal             | ✅ 讀寫 DB<br>DB access                  | 最常見的阻塞來源<br>Common bottleneck                         |
| 8️⃣               | 呼叫外部 API<br>**Call External API (optional)**                 | I/O 密集<br>I/O Bound                | 🔸 幾乎不吃<br>Minimal             | ✅ 等待 HTTP 回應<br>HTTP request/response | 串接金流、物流等第三方系統<br>Payments, logistics, etc.            |
| 9️⃣               | 組裝回應（序列化）<br>**Prepare Response (Serialization)**            | CPU 密集<br>CPU Bound                | ✅ JSON/XML 編碼<br>Serialization | ❌                                     | 結構化資料轉為可傳送格式<br>Convert object to response            |
| 🔟                | 回傳 Response<br>**Send Response**                             | I/O 密集<br>I/O Bound                | 🔸 幾乎不吃<br>Minimal             | ✅ 傳輸給 client<br>Send to client        | 最後一步，資料寫入 socket<br>Write back to socket              |

---

## 🎯 重點整理｜Key Summary

### ✅ CPU 密集階段（CPU-Bound Phases）

* 請求解析（headers, URL parsing）
* 驗證邏輯與授權（e.g., JWT 解碼）
* 商業邏輯（訂單計算、狀態處理）
* 回應序列化（JSON、XML 轉換）

### ✅ I/O 密集階段（I/O-Bound Phases）

* 網路等待（接收/回應資料）
* 查詢資料庫（SQL/NoSQL）
* 呼叫外部服務（API、Email）

### ✅ 混合型任務（Mixed: I/O + CPU）

* **搶票系統 Ticketing System**：

  * 高併發網路請求（socket I/O）
  * 驗證身分與資格（計算）
  * 查詢座位與交易資料（DB I/O）

---

## 🧠 技術選型建議｜Tech Stack Recommendations

| 類型<br>**Task Type** | 特性<br>**Features**                 | 建議語言 / 架構<br>**Recommended Languages / Frameworks**       |
| ------------------- | ---------------------------------- | --------------------------------------------------------- |
| I/O 密集<br>I/O Bound | 大量網路或資料庫等待<br>Lots of I/O waiting  | ✅ Node.js（事件迴圈）<br>✅ Go（goroutines）<br>✅ Python (asyncio) |
| CPU 密集<br>CPU Bound | 資料加解密、壓縮、重運算<br>Heavy CPU tasks    | ✅ Go、✅ Rust、✅ C++、✅ Java                                  |
| 混合型<br>Mixed Load   | 同時有高併發與計算需求<br>Concurrency + logic | ✅ Go（擅長並發＋穩定）<br>Node.js（輕負載處理）                           |

---
