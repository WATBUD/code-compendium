# JavaScript 記憶體洩漏（Memory Leak）指程式未能釋放不再需要的記憶體，導致記憶體增加影響效能與穩定性
JavaScript變數會自動管理內存並進行垃圾回收（GC），但以下情況需要特別注意：
- 變數引用了DOM元素未正確釋放內存無法回收。
- 閉包（Closures）：閉包會持有對外部作用域變數的引用，因此需要小心管理，以防止內存泄漏。 
- 全局變數：全局作用域會在應用程式的生命周期內保留增加記憶體。 
- 定時器和事件監聽器：忘記清除定時器或事件監聽器可能會導致內存泄漏，因為它們會持有對回調函數的引用。

## 1. 變數與物件未釋放
### **問題**
變數或物件被引用，即使已經不使用，但導致 GC（Garbage Collector）無法回收。

### **解決方案**
- 將變數設為 `null` 來釋放記憶體：
    ```js
    let obj = { name: "test" };
    obj = null; // 讓 GC 回收
    ```
- 使用 `WeakMap` 或 `WeakSet` 來確保物件在無法訪問時被釋放：
    ```js
    let map = new Map();
    let weakMap = new WeakMap();
    
    let key = { id: 1 };
    map.set(key, "value");
    weakMap.set(key, "value");
    
    key = null;
    
    console.log(map); // Map 仍然保留該 key，記憶體無法釋放
    console.log(weakMap); // WeakMap 內的 key 會被自動回收

    ```
## 2. 閉包（Closure）造成的記憶體洩漏
### **問題**
閉包的作用域可能導致變數無法被回收。

### **解決方案**
- 清除不必要的閉包引用，避免過度使用全域變數：
    ```js
    function createClosure() {
      let largeArray = new Array(1000000);
      return function() {
        console.log(largeArray.length);
      };
    }
    let closure = createClosure();
    closure = null; // 清除引用
    ```

---

## 3. 事件監聽器（Event Listeners）未移除
### **問題**
為 DOM 綁定的事件監聽器如果沒有移除，可能導致記憶體洩漏。

### **解決方案**
- 移除不再使用的事件監聽器：
    ```js
    function handleClick() {
      console.log("Clicked");
    }
    document.getElementById("btn").addEventListener("click", handleClick);
    document.getElementById("btn").removeEventListener("click", handleClick);
    ```
- 使用 `once: true` 讓事件監聽器執行一次後自動移除：
    ```js
    document.getElementById("btn").addEventListener("click", handleClick, { once: true });
    ```

---

## 4. 定時器（setInterval, setTimeout）未清除
### **問題**
`setInterval` 或 `setTimeout` 會持續佔用記憶體，直到被手動清除。

### **解決方案**
- 在不需要時清除 `setInterval`：
    ```js
    let timer = setInterval(() => console.log("Running..."), 1000);
    clearInterval(timer);
    ```
- 清除 `setTimeout`：
    ```js
    let timeout = setTimeout(() => console.log("Delayed execution"), 5000);
    clearTimeout(timeout);
    ```

---

## 5. DOM 元素未正確釋放
### **問題**
如果 JavaScript 仍然保留 DOM 元素的引用，而該元素已經從畫面上移除，則該元素無法被 GC 釋放。

### **解決方案**
- 設置變數為 `null`，確保 JavaScript 內部不再引用該 DOM 元素：
    ```js
    let elem = document.getElementById("myElement");
    elem.remove();
    elem = null; // 釋放記憶體
    ```

---

## 6. 使用開發者工具（DevTools）檢測記憶體洩漏
可以使用 Chrome DevTools 來監測記憶體使用狀況：
1. 打開 **DevTools** (`F12` 或 `Ctrl + Shift + I`)
2. 進入 **Memory** 分頁，使用 **Heap Snapshot** 查看未釋放的記憶體
3. 進入 **Performance** 分頁，記錄記憶體使用情況

---

## **總結**
| **問題來源** | **解決方案** |
|-------------|-------------|
| 變數與物件未釋放 | 設為 `null` 或使用 `WeakMap` |
| 閉包過度使用 | 避免不必要的閉包 |
| 事件監聽器未移除 | `removeEventListener` 或 `{ once: true }` |
| 定時器未清除 | `clearInterval` / `clearTimeout` |
| DOM 元素仍被引用 | `element = null` |
