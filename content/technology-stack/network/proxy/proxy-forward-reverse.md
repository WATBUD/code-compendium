
---

## ✅ 正向代理（Forward Proxy）

### 🔹 定義 | Definition

正向代理是一個位於用戶端與目標伺服器之間的中介伺服器。用戶端透過它來間接存取外部資源，目標伺服器不知道實際用戶的 IP。

> A forward proxy is an intermediary server between the client and the destination server. It forwards client requests to the target, hiding the client’s identity.

### 🔹 功能 | Features

* 用戶端匿名（例如翻牆）
* 過濾、監控（企業封鎖某些網站）
* 快取提升效能（Proxy Cache）

### 🔹 示意圖 | Diagram

```
Client ──▶ Forward Proxy ──▶ Internet ──▶ Target Server
```

---

## ✅ 反向代理（Reverse Proxy）

### 🔹 定義 | Definition

反向代理位於多台後端伺服器前面，對外表現為一台伺服器，負責將用戶請求轉發給內部的真正伺服器。使用者不會知道後端架構。

> A reverse proxy sits in front of one or more backend servers and handles requests on their behalf. It can distribute traffic, cache responses, and enforce security.

### 🔹 功能 | Features

* **負載平衡**（分發到多台 backend）
* **SSL 終止**（只由 proxy 處理 HTTPS）
* **快取與壓縮**（提高效能）
* **路由與路徑轉發**（依 path 轉發給不同服務）

### 🔹 Path 控制範例 | Path-Based Routing Example

```nginx
location /api/ {
    proxy_pass http://api-server;
}
location /static/ {
    proxy_pass http://static-server;
}
```

### 🔹 示意圖 | Diagram

```
Client ──▶ Reverse Proxy ──▶ (Path-Based Routing) ──▶ Backend Server(s)
                   └── /api/ → API Server
                   └── /static/ → Static Server
```

---

## 📌 差異總結 | Summary of Differences

| 特性 / Feature | 正向代理 Forward Proxy | 反向代理 Reverse Proxy     |
| ------------ | ------------------ | ---------------------- |
| 面對對象         | 用戶端（Client）        | 後端伺服器（Backend Servers） |
| 用戶是否知道目標伺服器  | 是（指定目標網站）          | 否（只看到 Proxy 端）         |
| 伺服器是否知道用戶端   | 否（用戶 IP 被代理）       | 是（用戶直接連 proxy）         |
| 常見用途         | 翻牆、匿名、安全管控         | 負載平衡、SSL 終止、反 DDOS     |
| 路由與轉發控制      | 少見                 | 常見（可控制不同 path）         |

## 正向代理（Forward Proxy）用戶 IP 隱藏

* **用戶端**先將請求發給正向代理伺服器。
* 正向代理伺服器代替用戶端向目標伺服器發送請求。
* **目標伺服器只看到正向代理的 IP，無法直接看到用戶端真實 IP。**

## 反向代理（Reverse Proxy）用戶 IP 傳遞

* **用戶端**直接對反向代理發送請求。
* 反向代理轉發給後端伺服器時，通常會**在 HTTP 標頭中帶上用戶端的原始 IP（如 `X-Forwarded-For`）**。
* 後端伺服器可從這些標頭讀取用戶的真實 IP。
* 因此，**後端伺服器是「知道」用戶真實 IP 的**。

---

### 小結

| 代理類型 | 目標伺服器是否知道用戶真實 IP？ |
| ---- | ----------------- |
| 正向代理 | 否，目標只看到代理 IP      |
| 反向代理 | 是，透過標頭傳遞用戶真實 IP   |

---




