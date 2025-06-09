### 1. **S — 單一職責原則 (Single Responsibility Principle)**

> Every class should have only one reason to change.
> 每個類別應該只有一個變化的原因。

✅ **C# 範例：**

```csharp
// ❌ 不良設計：一個類別同時處理驗證與儲存
public class UserManager {
    public void SaveToFile(User user) { /*...*/ }
    public bool ValidateUser(User user) { /*...*/ }
}

// ✅ 良好設計：分開兩個職責
public class UserValidator {
    public bool Validate(User user) { /*...*/ }
}

public class UserStorage {
    public void SaveToFile(User user) { /*...*/ }
}
```

---

### 2. **O — 開放封閉原則 (Open/Closed Principle)**

> Software should be open for extension, but closed for modification.
> 軟體應該**對擴充開放，對修改封閉**。

✅ **C# 範例：**

```csharp
// 折扣策略抽象
public interface IDiscountStrategy {
    double ApplyDiscount(double price);
}

public class NoDiscount : IDiscountStrategy {
    public double ApplyDiscount(double price) => price;
}

public class BlackFridayDiscount : IDiscountStrategy {
    public double ApplyDiscount(double price) => price * 0.7;
}

public class Checkout {
    public double CalculateFinalPrice(double price, IDiscountStrategy strategy) {
        return strategy.ApplyDiscount(price);
    }
}
```

➡️ 新增折扣只需實作 `IDiscountStrategy`，無須修改 `Checkout`。

---

### 3. **L — 里氏替換原則 (Liskov Substitution Principle)**

> Subtypes must be substitutable for their base types.
> 子類別應可替代父類別而不影響功能。

✅ **C# 範例：**

```csharp
public class Bird {
    public virtual void Fly() { Console.WriteLine("Flying"); }
}

public class Sparrow : Bird {
    public override void Fly() { Console.WriteLine("Sparrow flying"); }
}

// ❌ 企鵝不能飛，卻繼承了 Bird 並實作 Fly()
public class Penguin : Bird {
    public override void Fly() {
        throw new NotImplementedException("Penguins can't fly!");
    }
}
```

➡️ 改為行為接口拆分 `IFlyable`，企鵝不實作該接口。

---

### 4. **I — 介面隔離原則 (Interface Segregation Principle)**

> Clients should not be forced to depend on methods they do not use.
> 不應強迫類別實作它不需要的接口。

✅ **C# 範例：**

```csharp
// ❌ 大介面，強迫所有動物都飛
public interface IAnimal {
    void Eat();
    void Fly();
}

// ✅ 分離為小介面
public interface IEater {
    void Eat();
}

public interface IFlyer {
    void Fly();
}

public class Dog : IEater {
    public void Eat() { Console.WriteLine("Dog eats"); }
}

public class Bird : IEater, IFlyer {
    public void Eat() { Console.WriteLine("Bird eats"); }
    public void Fly() { Console.WriteLine("Bird flies"); }
}
```

---

### 5. **D — 依賴反轉原則 (Dependency Inversion Principle)**

> High-level modules should not depend on low-level modules. Both should depend on abstractions.
> 高層模組不應依賴低層模組，兩者都應依賴抽象。

✅ **C# 範例：**

```csharp
public interface INotifier {
    void Send(string message);
}

public class EmailNotifier : INotifier {
    public void Send(string message) {
        Console.WriteLine("Email sent: " + message);
    }
}

public class UserService {
    private readonly INotifier _notifier;

    public UserService(INotifier notifier) {
        _notifier = notifier;
    }

    public void NotifyUser() {
        _notifier.Send("Welcome!");
    }
}
```

➡️ 可輕易替換為 `SmsNotifier`，而無需改 `UserService`。

---

## ✅ 總結總覽表

| 原則縮寫 | 中文名稱   | 英文名稱                            | 面試提示      |
| ---- | ------ | ------------------------------- | --------- |
| S    | 單一職責原則 | Single Responsibility Principle | 一個類別只做一件事 |
| O    | 開放封閉原則 | Open/Closed Principle           | 擴充功能不改程式碼 |
| L    | 里氏替換原則 | Liskov Substitution Principle   | 子類能正確替代父類 |
| I    | 介面隔離原則 | Interface Segregation Principle | 拆小介面，不濫用  |
| D    | 依賴反轉原則 | Dependency Inversion Principle  | 依賴抽象不依賴實作 |

---