### 1. **S — 單一職責原則 (Single Responsibility Principle)**

> Every class should have only one reason to change.
> 每個類別應該只有一個變化的原因（也就是一項職責）。

✅ **範例：**

```go
// ❌ 不良設計：同時負責處理用戶資料與寫入檔案
type UserManager struct {
    // ...
}
func (u *UserManager) SaveUserToFile(user User) { /*...*/ }
func (u *UserManager) ValidateUser(user User) { /*...*/ }

// ✅ 良好設計：將儲存與驗證拆成兩個類別
type UserValidator struct{}
func (v *UserValidator) Validate(user User) { /*...*/ }

type UserStorage struct{}
func (s *UserStorage) SaveToFile(user User) { /*...*/ }
```

---

### 2. **O — 開放封閉原則 (Open/Closed Principle)**

> Software entities should be open for extension, but closed for modification.
> 軟體應該**對擴充開放、對修改封閉**。

✅ **範例：**

```go
// 使用接口實作不同折扣策略
type DiscountStrategy interface {
    Calculate(price float64) float64
}

type NoDiscount struct{}
func (d NoDiscount) Calculate(p float64) float64 { return p }

type BlackFridayDiscount struct{}
func (d BlackFridayDiscount) Calculate(p float64) float64 { return p * 0.7 }

func Checkout(p float64, strategy DiscountStrategy) float64 {
    return strategy.Calculate(p)
}
```

➡️ 要新增新折扣，只需新增一個 struct 而不需改動 `Checkout`。

---

### 3. **L — 里氏替換原則 (Liskov Substitution Principle)**

> Subtypes must be substitutable for their base types.
> 子類別應該可以替代父類別，並保持程式的正確性。

✅ **範例：**

```go
type Bird interface {
    Fly()
}

type Sparrow struct{}
func (s Sparrow) Fly() { fmt.Println("Sparrow flies") }

// ❌ 不應該讓不能飛的企鵝實作 Fly()
type Penguin struct{}
func (p Penguin) Fly() { panic("Penguins can't fly!") }
```

➡️ 改為拆分行為介面，讓 `FlyableBird` 與 `Bird` 分離。

---

### 4. **I — 介面隔離原則 (Interface Segregation Principle)**

> Clients should not be forced to depend on interfaces they do not use.
> 不應強迫類別依賴它不使用的接口。

✅ **範例：**

```go
// ❌ 一個大介面，強迫所有動物都實作 Fly()
type Animal interface {
    Eat()
    Fly()
}

// ✅ 分離介面
type Eater interface {
    Eat()
}
type Flyer interface {
    Fly()
}
```

➡️ 鳥類實作 `Flyer`，狗只需實作 `Eater`。

---

### 5. **D — 依賴反轉原則 (Dependency Inversion Principle)**

> High-level modules should not depend on low-level modules. Both should depend on abstractions.
> 高層模組不應依賴低層模組，兩者都應依賴抽象。

✅ **範例：**

```go
// 定義抽象
type Notifier interface {
    Send(message string)
}

// 低層模組：Email 實作
type EmailNotifier struct{}
func (e EmailNotifier) Send(msg string) { fmt.Println("Email:", msg) }

// 高層模組依賴抽象而非具體實作
type UserService struct {
    notifier Notifier
}
func (s *UserService) NotifyUser() {
    s.notifier.Send("Welcome!")
}
```

➡️ 可以輕鬆換成 `SMSNotifier`，而不用改動 `UserService`。

---

## ✅ 小結總覽（快速記憶）

| 原則縮寫 | 中文名稱   | 英文名稱                            | 記憶重點      |
| ---- | ------ | ------------------------------- | --------- |
| S    | 單一職責原則 | Single Responsibility Principle | 一個類別只做一件事 |
| O    | 開放封閉原則 | Open/Closed Principle           | 新增功能不改原始碼 |
| L    | 里氏替換原則 | Liskov Substitution Principle   | 子類能當父類用   |
| I    | 介面隔離原則 | Interface Segregation Principle | 介面要小，不要全包 |
| D    | 依賴反轉原則 | Dependency Inversion Principle  | 依賴抽象，不依實作 |

---

