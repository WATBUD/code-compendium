# 控制反轉（Inversion of Control, IoC）
- 控制反轉（IoC）是一種設計原則，將



# 控制反轉（Inversion of Control，IoC）是一種設計原則，減少系統組件耦合。IoC 有多種實現方式，程式控制權從內部轉移到外部，更好管理依賴關係。依賴注入（DI）是最常見的一種方式。有以下幾種：
1. 依賴注入（Dependency Injection，DI）
依賴注入是 IoC 最常見的實現方式。它通過將依賴項從外部注入到物件中來實現控制反轉。依賴注入有三種主要方式：
構造函數注入（Constructor Injection）：通過構造函數將依賴項注入到物件中。
屬性注入（Property Injection）：通過設置物件的屬性將依賴項注入到物件中。
方法注入（Method Injection）：通過調用方法時將依賴項注入到物件中。
2. 服務定位器（Service Locator）
服務定位器模式提供了一個全局的查找器來查找和返回所需的依賴項。與依賴注入不同，服務定位器模式通常由物件主動請求依賴項，而不是被動接收依賴項。
```javascript
class ServiceLocator {
  constructor() {
    this.services = {};
  }

  // 註冊服務
  register(serviceName, serviceInstance) {
    this.services[serviceName] = serviceInstance;
  }

  // 獲取服務
  get(serviceName) {
    if (this.services[serviceName]) {
      return this.services[serviceName];
    } else {
      throw new Error(`Service '${serviceName}' not found.`);
    }
  }
}

```


3. 事件驅動架構（Event-Driven Architecture）
在事件驅動架構中，物件之間通過事件進行通信，物件不需要直接依賴其他物件，而是通過事件來通知其他物件執行某些操作。這樣可以實現控制反轉，因為物件不再需要知道誰會響應事件，只需要觸發事件即可。
```javascript 
class EventBus {
  constructor() {
    this.listeners = {};
  }

  // 訂閱事件
  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  // 發佈事件
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(listener => listener(data));
    }
  }

  // 移除訂閱
  off(event, listener) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(l => l !== listener);
    }
  }
}
```
4. 工廠模式（Factory Pattern）
工廠模式是一種創建型設計模式，它通過工廠方法來創建物件，將物件創建的控制權從物件內部轉移到工廠方法中。這樣可以實現控制反轉，因為物件不再需要自己創建依賴項，而是由工廠方法來創建。
```javascript
class Dog {
  speak() {
    console.log("Woof! Woof!");
  }
}

class Cat {
  speak() {
    console.log("Meow! Meow!");
  }
}

class Bird {
  speak() {
    console.log("Tweet! Tweet!");
  }
}
```