# JavaScript 是單執行緒（single-threaded），
JavaScript 使用事件循環（Event Loop）來確保執行順序為：同步任務 > 微任務（Microtasks）> 宏任務（Macrotasks）。
### **Event Loop 是什麼？**  
事件循環（Event Loop）處理非同步操作。
確保程式在單執行緒（single-threaded）中能夠同時處理同步任務和非同步任務。

## **Event Loop 的運作原理**
JavaScript 的運作機制可以分為 **同步任務（Synchronous）** 和 **非同步任務（Asynchronous）**：
1. **同步任務（Synchronous）**：直接在主執行緒（Main Thread）上執行，依照程式碼的順序運行。
2. **非同步任務（Asynchronous）**：透過 **Event Loop** 推遲執行，例如：
   - `setTimeout()`
   - `setInterval()`
   - `fetch()`
   - `Promise`
   - `process.nextTick()`（Node.js）

---

## **Event Loop 的任務隊列**
Event Loop 會將 **非同步任務** 放入 **不同的任務隊列**，主要有兩類：
1. **宏任務（Macro Task）Queue**  
   - **代表:** `setTimeout`, `setInterval`, `setImmediate`（Node.js）, `I/O`, `requestAnimationFrame`
   - 宏任務會在主執行緒的同步程式碼執行完畢後，根據先進先出（FIFO）方式執行。

2. **微任務（Micro Task）Queue**  
   - **代表:** `Promise.then()`, `MutationObserver`, `process.nextTick()`（Node.js）
   - **微任務優先於宏任務執行**，並且在每個宏任務執行完後，會立即執行**所有**微任務。

---

## **完整運作流程**
1. **執行同步代碼（Call Stack）**，如果有 **非同步任務**，則交給 Web APIs 處理（如 `setTimeout`）。
2. **同步代碼執行完畢後，檢查微任務隊列（Microtask Queue）**，並執行 **所有微任務**。
3. **執行第一個宏任務（Macro Task）**，然後回到第 2 步驟（檢查微任務）。
4. **重複以上步驟，形成 Event Loop。**

---

## **範例解析**
```javascript
console.log("Script start"); 

setTimeout(() => {
  console.log("setTimeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
}).then(() => {
  console.log("Promise 2");
});

console.log("Script end");
```
### **執行順序分析**
1. **同步代碼（Call Stack）執行**
   - `console.log("Script start");` → **同步輸出** ✅
   - `console.log("Script end");` → **同步輸出** ✅

2. **遇到 `setTimeout`（宏任務）**
   - 加入 `Macrotask Queue`（等待 Event Loop 執行）

3. **遇到 `Promise.then()`（微任務）**
   - `Promise 1` 和 `Promise 2` 被加入 **Microtask Queue**。

4. **同步代碼執行完畢後，執行微任務**
   - `console.log("Promise 1");` ✅
   - `console.log("Promise 2");` ✅

5. **執行宏任務**
   - `console.log("setTimeout");` ✅

### **最終輸出**
```
Script start
Script end
Promise 1
Promise 2
setTimeout
```

---

## **重點總結**
1. **同步代碼優先執行。**
2. **遇到 `setTimeout()`，它會放入 `Macrotask Queue`，等同步代碼執行完才會執行。**
3. **遇到 `Promise.then()`，它會進入 `Microtask Queue`，並且會在同步代碼執行完後，**先執行微任務**，再執行宏任務。


