
---

# Domain-Driven Design (DDD) 領域驅動設計簡介

DDD 是一種軟體開發方法論，
**以「業務領域」為核心**，將複雜的業務規則建模成清晰且可維護的程式碼結構，
促進開發團隊與業務專家的緊密合作，強調用共同語言（Ubiquitous Language）來溝通需求。

---

# ✅ DDD 典型專案資料夾結構（精煉版）

```
/project-root
├── cmd/                      # 程式入口 (main.go 等)
├── internal/                 # 核心業務程式碼
│   ├── domain/               # 領域層：純業務邏輯與模型
│   │   ├── entity/           # 實體 (Entity)
│   │   ├── valueobject/      # 值物件 (Value Object)
│   │   ├── service/          # 領域服務 (Domain Service)
│   │   ├── repository/       # 倉儲介面 (Repository Interface)
│   │   └── factory/          # 工廠 (Factory)
│   ├── application/          # 應用層：業務用例、調用 domain
│   ├── infrastructure/       # 技術實作，如資料庫、外部 API
│   │   ├── persistence/      # 倉儲實作 (Repository Implementation)
│   │   └── external/         # 第三方系統整合
│   └── interfaces/           # 外部介面，如 HTTP/gRPC Handler
│       ├── http/
│       └── grpc/
├── pkg/                      # 可重用通用函式庫（非業務邏輯）
└── configs/                  # 配置檔案
```

---

# 📌 層級角色重點

| 層級                 | 主要內容及責任                          |
| ------------------ | -------------------------------- |
| **domain**         | 純粹領域模型與業務規則，與技術無關，保持獨立性          |
| **application**    | 聚合業務流程，調用 domain 層完成用例           |
| **infrastructure** | 技術細節實作，實現 domain 層定義的介面          |
| **interfaces**     | 接收並回應外部請求（HTTP、gRPC、CLI等），作為系統入口 |

---

# 🧠 設計原則提醒

* **domain 層不得依賴其他層，確保核心業務純粹**
* **application 層串接 domain，負責業務流程控制**
* **infrastructure 層實作技術細節，與 domain 解耦**
* **interfaces 層是系統對外的橋樑**

---

