### 1. **S — 單一職責原則 (Single Responsibility Principle)**

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


