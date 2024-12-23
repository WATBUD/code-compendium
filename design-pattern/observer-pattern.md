# Observer Pattern 教學

## 1. **概念介紹**
Observer Pattern 是一種行為型設計模式，主要用於一對多的依賴關係。當一個物件的狀態發生變化時，所有依賴於它的物件都會得到通知並自動更新。
- 這種模式適合用於事件驅動的系統(GUI 元件、訂閱/發布系統)，
- ex: MobX/Redux  是基於 Observer Pattern 的狀態管理庫
### 結構
1. **Subject（主題）**: 它是被觀察的對象，當狀態發生變化時，會通知所有的觀察者。
2. **Observer（觀察者）**: 這些是依賴於 Subject 的對象，當 Subject 發生變化時，它們會被通知並進行相應的處理。
3. **ConcreteSubject（具體主題）**: 實現 Subject 接口並維護觀察者列表。
4. **ConcreteObserver（具體觀察者）**: 實現 Observer 接口，並對狀態變更作出反應。

## 2. **範例：簡單的觀察者模式（JavaScript）**

以下是一個簡單的 JavaScript 範例，演示如何使用 Observer Pattern。

### 範例代碼

```javascript
// Subject: 主題
class Subject {
    constructor() {
        this.observers = [];
    }

    // 添加觀察者
    addObserver(observer) {
        this.observers.push(observer);
    }

    // 移除觀察者
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // 通知所有觀察者
    notify() {
        this.observers.forEach(observer => observer.update(this));
    }
}

// ConcreteSubject: 具體主題
class ConcreteSubject extends Subject {
    constructor(state) {
        super();
        this.state = state;
    }

    // 設置狀態並通知觀察者
    setState(state) {
        this.state = state;
        this.notify();
    }

    getState() {
        return this.state;
    }
}

// Observer: 觀察者
class Observer {
    update(subject) {
        console.log(`Observer notified: state is ${subject.getState()}`);
    }
}

// 範例使用
const subject = new ConcreteSubject("initial state");

const observer1 = new Observer();
const observer2 = new Observer();

// 註冊觀察者
subject.addObserver(observer1);
subject.addObserver(observer2);

// 更新主題狀態，觀察者將會收到通知
subject.setState("new state");

// 移除觀察者
subject.removeObserver(observer1);

// 更新主題狀態，僅觀察者2會收到通知
subject.setState("another new state");
