# 系統分層設計

## 1. 表示層（Presentation Layer）
- **處理器/控制器（Handler/Controller）**：處理 HTTP 請求，調用業務邏輯，並返回 HTTP 響應。
  - **範例**：Spring MVC（Java）、ASP.NET Core（C#）、Express.js（Node.js）
- **視圖（View）**：用於向用戶呈現數據。
  - **範例**：React（JavaScript）、Angular（JavaScript/TypeScript）、Vue.js（JavaScript）
- **路由器（Router）**：將請求路由到相應的處理程序或控制器。
  - **範例**：Express Router（Node.js）、ASP.NET Core Routing（C#）

## 2. 業務邏輯層（Business Logic Layer）
- **服務/用例（Service/Usecase）**：封裝業務邏輯，執行應用程序的核心功能。
  - **範例**：Spring Service（Java）、NestJS Service（TypeScript）
- **外觀模式（Facade）**：為複雜的子系統提供簡單接口。
- **業務邏輯組件（Business Logic Components）**：處理具體的業務規則和流程。

## 3. 數據訪問層（Data Access Layer）
- **DAO（Data Access Object） / 倉庫（Repository）**：封裝數據訪問邏輯，與數據源交互，執行數據的 CRUD 操作。
  - **範例**：Spring Data JPA（Java）、Entity Framework（C#）
- **ORM (Object-Relational Mapping)**：對象與數據庫之間的映射。
  - **範例**：Hibernate（Java）、Entity Framework（C#）、TypeORM（TypeScript）

## 4. 持久化層（Persistence Layer）
- **實體（Entity/Model）**：表示數據庫中的表結構，對應領域對象。
  - **範例**：JPA Entities（Java）、EF Models（C#）
- **DTO (Data Transfer Object)**：用於在不同層之間傳遞數據。

## 5. 安全層（Security Layer）
- **認證服務（Authentication Service）**：處理用戶認證。
  - **範例**：Spring Security（Java）、ASP.NET Core Identity（C#）
- **授權服務（Authorization Service）**：處理用戶權限驗證。
  - **範例**：Spring Security（Java）、ASP.NET Core Authorization（C#）
- **安全過濾器（Security Filters）**：過濾器，用於攔截和驗證請求的安全性。

## 6. 通知層（Notification Layer）
- **事件發布者（Event Publisher）**：發布事件，如消息隊列。
  - **範例**：Kafka、RabbitMQ
- **事件訂閱者（Event Subscriber）**：訂閱和處理事件。
- **通知服務（Notification Service）**：發送通知，如電子郵件、短信等。

## 7. 基礎設施層（Infrastructure Layer）
- **消息傳遞（Messaging）**：處理消息傳遞。
  - **範例**：Kafka、RabbitMQ
- **日誌記錄（Logging）**：記錄日誌。
  - **範例**：Log4j（Java）、Serilog（C#）
- **緩存（Caching）**：緩存。
  - **範例**：Redis、Memcached
- **配置管理（Configuration Management）**：配置管理。
  - **範例**：Spring Cloud Config、Azure App Configuration

## 8. 外部服務集成（External Services Integration）
- **API 客戶端（API Client）**：與外部服務進行通信的客戶端。
  - **範例**：Retrofit（Java）、HttpClient（C#）
- **Web 服務（Web Service）**：提供給外部系統調用的服務。
  - **範例**：SOAP、REST API
