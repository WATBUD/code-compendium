## 1. Web Api
- HTTP Protocol/RESTful API Basics/Status Codes and Request Methods (GET, POST, PUT, DELETE)
- HTTP Status Codes
1. **200 OK** - 請求成功，並返回請求的資料
2. **201 Created** - 請求成功，並創建了新的資源
3. **400 Bad Request** - 請求格式錯誤或缺少必要的參數
4. **401 Unauthorized** - 用戶未經授權，需進行身份驗證
5. **403 Forbidden** - 用戶被禁止訪問，無權訪問資源
6. **404 Not Found** - 請求的資源未找到
7. **500 Internal Server Error** - 伺服器發生錯誤，無法完成請求
8. **502 Bad Gateway** - 伺服器作為網關或代理，收到無效響應
9. **503 Service Unavailable** - 伺服器暫時無法處理請求，通常是過載或維護
10. **504 Gateway Timeout** - 網關或代理超時

- HTTP Request Methods
1. **GET** - 請求指定資源，並返回資料
2. **POST** - 用於提交數據給伺服器，通常創建新資源
3. **PUT** - 更新指定資源
4. **DELETE** - 刪除指定資源
5. **PATCH** - 部分更新指定資源

## 2. Databases
- SQL and NoSQL Basic CRUD operations (Create, Read, Update, Delete)

## 3. (Authentication/Authorization)
- Authentication Methods
1. **JWT (JSON Web Token)**
2. **OAuth 2.0**
3. **Basic Authentication**
4. **Multi-Factor Authentication (MFA)**
5. **OpenID Connect**

- Authorization Methods
1. **Role-Based Access Control (RBAC)**
2. **OAuth 2.0**
3. **Attribute-Based Access Control (ABAC)**
4. **Permission-Based Authorization**
5. **Access Control Lists (ACLs)**

## 4.Error Handling and Logging
1. **Breakpoints (中斷點)**
2. **Logging (日誌記錄)**
3. **Error Handling (錯誤處理)**
4. **Try-Catch (異常捕獲)**
5. **Error Codes (錯誤碼)**

## Design Patterns

1.  **Singleton Pattern** - 確保類別只有一個實例，並提供全局存取點
2.  **Factory Pattern** - 提供一個創建對象的介面，而不需要指定具體的類別
3.  **Observer Pattern** - 定義一對多的依賴關係，當一個對象狀態改變時，所有依賴它的對象都會得到通知
4.  **Strategy Pattern** - 定義一系列的算法，並將每個算法封裝起來，使它們可以互換
5.  **Decorator Pattern** - 動態地給一個對象增加額外的功能
6.  **Command Pattern** - 將請求封裝成一個對象，這樣可以用不同的請求、隊列、日誌來參數化
7.  **Adapter Pattern** - 將一個接口轉換成客戶端所需的接口，讓原本接口不兼容的類可以一起工作
8.  **State Pattern** - 允許對象在其內部狀態改變時改變其行為
9.  **Abstract Factory Pattern** - 提供一個創建一系列相關或相互依賴對象的介面，而無需指定具體類別
10. **Proxy Pattern** - 為其他對象提供一個代理對象，以控制對該對象的訪問
11. **Builder Pattern** - 將複雜對象的構建過程與表示分離，使同樣的構建過程可以創建不同的對象。





