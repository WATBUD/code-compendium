# 什麼是純函式 (Pure Function)?

純函式是指 **輸入相同，輸出也會相同，且不會產生副作用 (side effects)** 的函式。它有以下兩個特點：  
1. **沒有副作用**：函式不會修改外部變數、DOM、發送 HTTP 請求、或改變全域狀態等。  
2. **相同輸入，永遠回傳相同輸出**：函式的結果 **只取決於輸入參數**，不依賴其他可變的狀態。  

## 純函式範例

```javascript
function add(a, b) {
  return a + b; // 沒有修改外部變數，也沒有副作用
}
console.log(add(2, 3)); // 5
console.log(add(2, 3)); // 5 (相同輸入，輸出不變)
```

## 非純函式範例

```javascript
let total = 0;
function addToTotal(value) {
  total += value; // 修改外部變數 (有副作用)
  return total;
}
console.log(addToTotal(5)); // 5
console.log(addToTotal(5)); // 10 (相同輸入但輸出不同)
```

---

# 為什麼 React 的函式元件需要是純函式？

React 的函式元件 (Functional Components) 需要是純函式，主要有以下幾個原因：

## 1. 提升可預測性與可測試性  
- 純函式的輸入決定輸出，不依賴外部狀態，這讓元件的行為 **更可預測**，也更容易測試。  
- 例如，在測試元件時，我們只需要關心它的 `props`，不用擔心其他副作用影響測試結果。

## 2. 提升效能 (React 的 Reconciliation)  
- React 透過 **Virtual DOM** 和 **reconciliation** 來優化 UI 更新。  
- 純函式確保相同 `props` 傳入時，輸出不會變，React 就可以用 `React.memo` 或 `useMemo` 來避免不必要的重新渲染，提高效能。

## 3. 方便 Hooks 運作 (`useState`, `useEffect` 等)  
- React Hooks 依賴函式元件的純函式特性。  
- 若元件有副作用，可能會導致 **不必要的重新渲染或錯誤的狀態更新**。  
- React 允許在 `useEffect` 中處理副作用，而不是在元件內部直接執行副作用。

---

# React 中的純函式元件範例

### **純函式元件：**

```javascript
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>; // 沒有修改外部變數，也沒有副作用
}
```

### **非純函式元件 (不建議這樣做)：**

```javascript
let counter = 0;
function Counter() {
  counter++; // 修改外部變數 (有副作用)
  return <p>Count: {counter}</p>;
}
```
這樣會導致 **不一致的 UI 行為**，因為 `counter` 會隨著每次渲染而改變，而 React 可能不會正確追蹤這些變更。

---

# 結論  
React 強調函式元件應該是 **純函式**，以確保：
- 可預測性高
- 效能最佳化
- 與 Hooks 搭配良好
- 易於測試與維護

若需要執行副作用 (如修改狀態、發送 API 請求)，應該放在 `useEffect` 中，而不是在元件內部直接執行。

