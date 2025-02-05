# `useEffect` 內部使用 `async` 函數的正確方式

## **問題描述**
當你在 `useEffect` 內部使用 `async` 函數時，可能會遇到 Linter 警告。例如，以下寫法是錯誤的：

```javascript
useEffect(async () => {
  const data = await fetchData();
}, [fetchData]);
```

### **為什麼會報錯？**
1. **`useEffect` 的回調函數不能是 `async`**  
   - `useEffect` **要求回調函數要返回 `undefined` 或一個清理函數**，但 `async` 函數總是返回 `Promise`。
   - 這會導致 React **無法正確處理副作用的清理邏輯**。

2. **React 不會等待 `async` 函數執行完成**
   - React **不會等待 `async` 函數內的 `await` 完成後再進行下一步**，這可能導致競態條件（Race Condition）。
   - 例如，在組件卸載之前，`fetchData()` 可能還在執行，導致內存洩漏或錯誤的狀態更新。

---

## **正確做法**

### **✅ 方法 1：在 `useEffect` 內部定義 `async` 函數並調用它**
```javascript
useEffect(() => {
  async function fetchDataAsync() {
    const data = await fetchData();
    console.log(data);
  }

  fetchDataAsync();
}, [fetchData]);
```

#### **這樣做的優勢**
1. 避免 `useEffect` 回調變成 `async` 函數，符合 React 的要求。
2. 仍然可以使用 `await` 來處理異步操作。
3. 保持代碼結構清晰，可讀性高。

---

### **✅ 方法 2：使用立即執行函數 (IIFE)**
如果不想顯式定義函數，可以使用 IIFE（立即執行函數）：

```javascript
useEffect(() => {
  (async () => {
    const data = await fetchData();
    console.log(data);
  })();
}, [fetchData]);
```

#### **優缺點**
✅ 代碼更簡潔，但可讀性稍差。

---

### **✅ 方法 3：使用 `.then()`**
如果不想使用 `async/await`，可以用 `.then()` 來處理 `Promise`：

```javascript
useEffect(() => {
  fetchData().then((data) => {
    console.log(data);
  });
}, [fetchData]);
```

#### **優缺點**
✅ 兼容舊瀏覽器，避免 `async` 問題，但 `.then()` 會讓代碼變得比較嵌套。

---

## **清理函數與 `async` 無關**

`useEffect` 的回調函數可以返回一個清理函數，例如：

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    console.log("Interval running...");
  }, 1000);

  return () => clearInterval(interval); // 清理函數
}, []);
```

如果 `useEffect` 的回調函數是 `async`，則 `return` 會變成：

```javascript
useEffect(async () => {
  const data = await fetchData();

  return () => {
    console.log("Cleanup function");
  };
}, []);
```

問題是 `useEffect` 會**直接接收到 `Promise`，而不是清理函數**，這導致 React **無法正確執行清理邏輯**。

---

## **總結**
| 方式 | 是否正確 | 優缺點 |
|------|---------|--------|
| **`useEffect(async () => { ... })`** | ❌ 錯誤 | 會返回 `Promise`，React 無法正確處理 |
| **在 `useEffect` 內定義 `async` 函數並調用它** | ✅ 正確 | 最標準寫法，符合 React 規範 |
| **使用 IIFE (`(async () => { ... })()`)** | ✅ 正確 | 代碼簡潔，但可讀性稍差 |
| **使用 `.then()`** | ✅ 正確 | 兼容舊瀏覽器，但不如 `async/await` 易讀 |

最佳選擇通常是 **在 `useEffect` 內部定義 `async` 函數並調用它**，這樣 **代碼清晰、結構良好，並符合 React 規範**。

