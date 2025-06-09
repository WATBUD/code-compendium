### MVC、MVP、MVVM 的更新流程與差異重點

#### 1. **MVC (Model-View-Controller)**
   - **更新流程**:
     1. **用戶操作** View（如點擊按鈕）。
     2. View 將操作傳遞給 Controller。
     3. Controller 更新 Model。
     4. Model 通知 View 更新（通過(Observer Pattern)或直接調用）。
     5. View 從 Model 獲取數據並重新渲染。
   - **特點**:
     - **View 和 Model 有直接聯繫**，可能導致耦合。
     - **Controller** 負責協調 View 和 Model，但邏輯複雜時容易膨脹。

### **MVC 中的 Callback 流程**
1. **View 註冊回調**：
   - View 將自己的更新方法（例如 `updateView()`）註冊到 Model 的觀察者列表中。
   - 這個過程類似於告訴 Model："當數據變化時，請調用我的 `updateView()` 方法"。

2. **Model 觸發回調**：
   - 當 Model 的數據發生變化時，Model 會遍歷觀察者列表，調用所有註冊的回調函數（例如 `updateView()`）。
   - 這個過程就是 **Model 通知 View**。

3. **View 執行回調**：
   - View 的 `updateView()` 方法被調用後，View 會主動從 Model 獲取最新數據，並重新渲染界面。

### **舉個例子**
假設我們有一個簡單的 MVC 應用，Model 是一個計數器，View 顯示計數器的值。

#### 1. View 註冊回調
```javascript
// View 註冊回調
model.addObserver(() => {
    this.updateView();
});
```

#### 2. Model 觸發回調
```javascript
// Model 的內部邏輯
class Model {
    constructor() {
        this.observers = []; // 觀察者列表
        this.count = 0;
    }

    addObserver(callback) {
        this.observers.push(callback); // 註冊回調
    }

    increment() {
        this.count++;
        this.notifyObservers(); // 數據變化，觸發回調
    }

    notifyObservers() {
        this.observers.forEach(callback => callback()); // 調用所有回調
    }
}
```

#### 3. View 執行回調
```javascript
// View 的更新邏輯
class View {
    constructor(model) {
        this.model = model;
        this.model.addObserver(() => this.updateView()); // 註冊回調
    }

    updateView() {
        const newCount = this.model.getCount(); // 主動獲取數據
        console.log(`View updated with new count: ${newCount}`);
    }
}
```

#### 2. **MVP (Model-View-Presenter)**
   - **更新流程**:
     1. **用戶操作** View。
     2. View 將操作傳遞給 Presenter。
     3. Presenter 更新 Model。
     4. Model 更新後，Presenter 從 Model 獲取數據並更新 View。
   - **特點**:
     - **View 和 Model 完全解耦**，所有交互通過 Presenter。
     - **Presenter** 負責邏輯處理，View 只負責顯示，適合測試。

#### 3. **MVVM (Model-View-ViewModel)**
   - **更新流程**:
     1. **用戶操作** View。
     2. View 通過數據綁定自動更新 ViewModel。
     3. ViewModel 更新 Model。
     4. Model 更新後，ViewModel 通過數據綁定自動更新 View。
   - **特點**:
     - **數據綁定** 是核心，View 和 ViewModel 自動同步。
     - **ViewModel** 負責邏輯和狀態管理，View 只負責顯示，適合複雜 UI。

### 主要差異
- **View 和 Model 的耦合**:
  - **MVC**: View 和 Model 有直接聯繫。
  - **MVP**: View 和 Model 完全解耦。
  - **MVVM**: 通過數據綁定實現間接聯繫。

- **Controller/Presenter/ViewModel 的角色**:
  - **MVC**: Controller 負責協調。
  - **MVP**: Presenter 負責邏輯處理。
  - **MVVM**: ViewModel 負責狀態管理和數據綁定。

- **適用場景**:
  - **MVC**: 簡單應用。
  - **MVP**: 需要測試的應用。
  - **MVVM**: 複雜 UI 和數據綁定需求的應用。

### 總結
- **MVC** 簡單但耦合度高。
- **MVP** 解耦且易測試。
- **MVVM** 適合複雜 UI，自動同步數據。