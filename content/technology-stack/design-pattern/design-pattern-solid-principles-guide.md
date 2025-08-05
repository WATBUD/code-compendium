## ✅ 總結總覽表

| 原則縮寫 | 中文名稱   | 英文名稱                            | 面試提示      |
| ---- | ------ | ------------------------------- | --------- |
| S    | 單一職責原則 | Single Responsibility Principle | 一個類別只做一件事 |
| O    | 開放封閉原則 | Open/Closed Principle           | 擴充功能不改程式碼 |
| L    | 里氏替換原則 | Liskov Substitution Principle   | 子類能正確替代父類 |
| I    | 介面隔離原則 | Interface Segregation Principle | 拆小介面，不濫用  |
| D    | 依賴反轉原則 | Dependency Inversion Principle  | 依賴抽象不依賴實作 |

---

### 1. **S — 單一職責原則 (Single Responsibility Principle)**

> Every class should have only one reason to change.
> 每個類別應該只有一個變化的原因（也就是一項職責）。

### 2. **O — 開放封閉原則 (Open/Closed Principle)**

> ✅ Software should be open for extension, but closed for modification.
> ✅ 軟體應該「可擴充、但不可修改」。

### 3. **L — 里氏替換原則 (Liskov Substitution Principle)**

> ✅ Subtypes should be substitutable for their base types.
> ✅ 子類別應該可以完全取代父類別使用。

> ✅ Don’t force a subclass to inherit behaviors it can’t fulfill.
> ✅ 不應強迫子類別繼承它無法正確實作的行為。

### 4. **I — 介面隔離原則 (Interface Segregation Principle)**

> ✅ Clients should not be forced to depend on methods they don’t use.
> ✅ 不該強迫客戶端依賴它們用不到的方法。

### 5. **D — 依賴反轉原則 (Dependency Inversion Principle)**

> ✅ High-level modules should depend on abstractions, not concretes.
> ✅ 高階模組應依賴抽象而不是實作。