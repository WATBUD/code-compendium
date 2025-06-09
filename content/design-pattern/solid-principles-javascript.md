### 1. **S — 單一職責原則 (Single Responsibility Principle)**

> ✅ Every module/class/function should have one reason to change.
> ✅ 每個模組/類別/函式只應該有一個職責與變化原因。

```js
// ❌ 壞設計：UserManager 同時負責驗證與儲存
class UserManager {
  validate(user) { /* ... */ }
  save(user) { /* ... */ }
}

// ✅ 好設計：將職責拆開
class UserValidator {
  validate(user) { /* ... */ }
}

class UserStorage {
  save(user) { /* ... */ }
}
```

---

### 2. **O — 開放封閉原則 (Open/Closed Principle)**

> ✅ Software should be open for extension, but closed for modification.
> ✅ 軟體應該「可擴充、但不可修改」。

```js
// 折扣策略基礎接口
class DiscountStrategy {
  apply(price) {
    return price;
  }
}

class BlackFridayDiscount extends DiscountStrategy {
  apply(price) {
    return price * 0.7;
  }
}

class Checkout {
  getTotal(price, discountStrategy) {
    return discountStrategy.apply(price);
  }
}

const checkout = new Checkout();
console.log(checkout.getTotal(100, new BlackFridayDiscount())); // 70
```

➡️ 想新增折扣策略，只需新增類別，無需改 `Checkout`。

---

### 3. **L — 里氏替換原則 (Liskov Substitution Principle)**

> ✅ Subtypes should be substitutable for their base types.
> ✅ 子類別應該可以完全取代父類別使用。

```js
class Bird {
  fly() {
    console.log("Flying");
  }
}

class Sparrow extends Bird {
  fly() {
    console.log("Sparrow flying");
  }
}

// ❌ 企鵝不能飛，但繼承 Bird
class Penguin extends Bird {
  fly() {
    throw new Error("Penguins can't fly");
  }
}

// ✅ 解法：用行為接口
class Penguin {
  swim() {
    console.log("Penguin swimming");
  }
}
```

---

### 4. **I — 介面隔離原則 (Interface Segregation Principle)**

> ✅ Clients should not be forced to depend on methods they don’t use.
> ✅ 不該強迫客戶端依賴它們用不到的方法。

```js
// ❌ 一個大介面強迫所有動物都能飛
class Animal {
  eat() {}
  fly() {}
}

// ✅ 分開小介面（模擬）
class Eater {
  eat() {}
}

class Flyer {
  fly() {}
}

class Dog extends Eater {
  eat() { console.log("Dog eats"); }
}

class Bird extends Eater {
  eat() { console.log("Bird eats"); }
  fly() { console.log("Bird flies"); }
}
```

---

### 5. **D — 依賴反轉原則 (Dependency Inversion Principle)**

> ✅ High-level modules should depend on abstractions, not concretes.
> ✅ 高階模組應依賴抽象而不是實作。

```js
// 抽象通知介面
class Notifier {
  send(message) {}
}

class EmailNotifier extends Notifier {
  send(message) {
    console.log("Email sent: " + message);
  }
}

class UserService {
  constructor(notifier) {
    this.notifier = notifier;
  }

  notifyUser() {
    this.notifier.send("Welcome!");
  }
}

const notifier = new EmailNotifier();
const service = new UserService(notifier);
service.notifyUser(); // Email sent: Welcome!
```

➡️ 若換成 SMS，只需改注入的 notifier 實作。

---

## ✅ 總整理（中英對照）

| 原則縮寫 | 中文名稱   | 英文名稱                            | 說明一句話          |
| ---- | ------ | ------------------------------- | -------------- |
| S    | 單一職責原則 | Single Responsibility Principle | 一個類別只應有一個職責    |
| O    | 開放封閉原則 | Open/Closed Principle           | 可擴充但不可修改原有程式   |
| L    | 里氏替換原則 | Liskov Substitution Principle   | 子類可安全地取代父類     |
| I    | 介面隔離原則 | Interface Segregation Principle | 不應強迫實作不需要的方法   |
| D    | 依賴反轉原則 | Dependency Inversion Principle  | 高層模組依賴抽象而非具體實作 |

---

