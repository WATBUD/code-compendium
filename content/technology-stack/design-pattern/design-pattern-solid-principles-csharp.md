### 1. **S — 單一職責原則 (Single Responsibility Principle)**

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
