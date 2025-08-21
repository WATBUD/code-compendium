---

# 🌐 CSP 教學文件（Content Security Policy）

> **目標 / Goal**：清楚理解 CSP 是什麼、如何運作，以及前端/後端的角色
> Understand what CSP is, how it works, and the roles of frontend/backend.

---

## 1️⃣ CSP 是什麼？ / What is CSP?

**CSP = Content Security Policy（內容安全政策 / Content Security Policy）**
它是一種 **瀏覽器安全機制 / browser security mechanism**，用來告訴瀏覽器：

- 哪些來源的資源可以載入（script、style、iframe、圖片…）
  / Which sources are allowed to load resources (script, style, iframe, images…)
- 哪些操作是允許的、哪些是禁止的
  / Which actions are allowed or blocked

**目標 / Goal**：防止 **XSS（跨站腳本攻擊 / Cross-site scripting）、點擊劫持 / Clickjacking、資料外洩 / Data leakage**

---

## 2️⃣ CSP 的運作方式 / How CSP Works

### 2.1 由伺服器帶給瀏覽器 / Delivered by Server

```http
Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.google.com; frame-ancestors 'none';
```

- `default-src 'self'` → 預設只允許本站資源 / Default: only allow own resources
- `script-src` → 允許載入指定來源的 JS / Allow JS from specified sources
- `frame-ancestors 'none'` → 不允許任何網頁 iframe 嵌入 / Do not allow any page to embed via iframe

瀏覽器收到 header 後 **強制執行規則 / Browser enforces the rules**

---

### 2.2 用 `<meta>` 標籤定義（僅限自己頁面）

/ Using `<meta>` tag (only effective for own page)

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'" />
```

- 只對 **自己這個 HTML 頁面生效 / Only effective for this HTML page**
- 對 iframe 指向其他域名的頁面 **無效 / Ineffective for iframe from other domains**

---

## 3️⃣ 常見 CSP 指令 / Common CSP Directives

| 指令 Directive    | 中文用途 / Purpose                                     | 範例 / Example                               |
| ----------------- | ------------------------------------------------------ | -------------------------------------------- |
| `default-src`     | 預設允許的資源來源 / Default sources                   | `default-src 'self'`                         |
| `script-src`      | JS 來源 / JS sources                                   | `script-src 'self' https://cdn.example.com`  |
| `style-src`       | CSS 來源 / CSS sources                                 | `style-src 'self' 'unsafe-inline'`           |
| `img-src`         | 圖片來源 / Image sources                               | `img-src * data:`                            |
| `frame-ancestors` | 哪些網站可以 `<iframe>` 嵌入 / Which sites can embed   | `frame-ancestors 'self' https://example.com` |
| `connect-src`     | fetch/XHR/websocket 來源 / Fetch/XHR/WebSocket sources | `connect-src 'self' wss://example.com`       |

---

## 4️⃣ 前端 vs 後端角色 / Frontend vs Backend

| 角色 Role       | 中文說明 / Responsibility                                                                            |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| 後端 / Server   | 回傳 CSP header → 指定規則給瀏覽器 / Send CSP header to browser                                      |
| 前端 / Frontend | 可用 `<meta>` 補充，但 **無法覆蓋後端的 header / Can supplement but cannot override backend header** |

> 這就是為什麼你在 Shopify 前端改 `<meta>` CSP **無效 / ineffective**，瀏覽器只會看 Shopify server 回傳的 header

---

## 5️⃣ 小結 / Summary

- CSP 是 **瀏覽器安全政策 / Browser security policy**，由伺服器控制，前端只能補充
- `frame-ancestors` 控制 **哪些網域可以 iframe 嵌入頁面 / Which domains can embed via iframe**
- 要允許 iframe Shopify → **官方修改 header（Shopify Plus 支援 / Shopify Plus supports official header modification）**

---
