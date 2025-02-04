## **概述**
`useState` 是 React 內建的 Hook 之一，用來管理函式元件的狀態。在這裡，我們將從零開始，用純 JavaScript 實現與 React 相同的 `useState` 邏輯。

---
### **1️⃣ 建立 React-like `useState`**
**獨立的 `fiber` 結構**存放每個組件的 state。

```javascript
const React = (function () {
  // 存儲 hooks 的狀態，每次渲染時會使用相同索引來讀取對應的狀態
  let hooks = [];
  let currentHook = 0;

  function useState(initialValue) {
    const hookIndex = currentHook; // 記錄當前 hook 的索引
    hooks[hookIndex] = hooks[hookIndex] ?? initialValue; // 若已存在則使用現有值，否則使用初始值

    function setState(newValue) {
      hooks[hookIndex] = newValue; // 更新 hooks 陣列中的狀態值
      currentHook = 0; // 確保每次 render 從頭開始
      render(); // 重新渲染畫面
    }

    currentHook++; // 移動到下一個 hook
    return [hooks[hookIndex], setState]; // 返回當前狀態值與修改函式
  }

  function render() {
    currentHook = 0; // 讓下一次 render 從頭開始
    document.getElementById("app").innerHTML = ""; // 清空畫面，模擬 React 的重新渲染
    App(); // 重新執行 App 函式
  }

  return { useState, render }; // 返回 useState 和 render 方法
})();
```
✅ **這個 `useState` 的特性**：
- `hooks` 陣列存放所有 Hooks 的 state（類似 React Fiber）
- `currentHook` 記錄現在執行到哪個 `useState`
- `setState` 觸發 `render()`，讓組件重新執行

---

### **2️⃣ 建立 `App` 組件**
使用 `useState` 來管理 state，當按鈕被點擊時，數值會更新。

```javascript
function App() {
  const [count, setCount] = React.useState(0);

  const button = document.createElement("button");
  button.innerText = `Count: ${count}`;
  button.onclick = () => setCount(count + 1);

  document.getElementById("app").appendChild(button);
}
```

---

### **3️⃣ 初始化應用**
React 內部會透過 `ReactDOM.render(<App />)` 掛載組件，我們用手動方式觸發。

```javascript
window.onload = function () {
  React.render();
};
```

---

## **為什麼這跟 React 一模一樣？**
| **React**            | **我們的模擬** |
|-----------------|-------------|
| **Hooks 陣列儲存 state** | ✅ `hooks[]` |
| **useState 依照順序執行** | ✅ `currentHook++` |
| **setState 觸發重新渲染** | ✅ `render()` |
| **函式組件重新執行時，保留舊 state** | ✅ `hooks[hookIndex] ?? initialValue` |

