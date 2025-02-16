在 React 的 `useEffect` 內，`dependency array`（依賴陣列）用來決定 **何時重新執行 Effect**，React 會根據 **引用相等性 (reference equality)** 來判斷是否變更。以下是一些常見情況的解析：

---

## **1. 原始類型（Primitive types）**
### ✅ **數字、字串、布林值比較值本身**
當 `useEffect` 的 `dependency array` 內是原始類型，React 會根據值的變化來決定是否重新執行 Effect。

```jsx
useEffect(() => {
  console.log("Count changed!");
}, [count]); // count 是 number，只有當 count 改變時才會重新執行
```
✅ 這種情況是**值相等性 (value equality)**，React 會直接比較 `count` 的值是否變更。

---

## **2. 物件、陣列、函式（Reference types）**
### ⚠ **物件、陣列、函式比較記憶體位址**
React 會檢查物件的 **引用相等性 (reference equality)**，而不是物件內容，因此以下狀況會導致 Effect 重新執行：

```jsx
const obj = { value: 1 };

useEffect(() => {
  console.log("Object changed!");
}, [obj]); 
```
### 🚨 這樣會每次重新執行，因為：
```jsx
{ value: 1 } !== { value: 1 } // 兩個不同記憶體位址
```
➡ **解決方案**：使用 `useState` 或 `useMemo` 來維持相同的引用：
```jsx
const obj = useMemo(() => ({ value: 1 }), []);
useEffect(() => {
  console.log("Object changed!");
}, [obj]); // 只有當 obj 內容真的改變時才會重新執行
```

---

## **3. 陣列**
```jsx
const arr = [1, 2, 3];

useEffect(() => {
  console.log("Array changed!");
}, [arr]);
```
**問題**：每次 render 時，`arr` 都是新的記憶體位址，所以 `useEffect` 每次都會執行。

✅ **解決方案**
```jsx
const arr = useMemo(() => [1, 2, 3], []);
useEffect(() => {
  console.log("Array changed!");
}, [arr]); // 只有當 arr 內容真的變時才執行
```

---

## **4. 函式**
如果 `dependency array` 內包含函式，因為每次 `render` 都會重新創建函式，所以 `useEffect` 也會一直觸發：
```jsx
const handleClick = () => {
  console.log("Clicked!");
};

useEffect(() => {
  console.log("Function changed!");
}, [handleClick]);
```
➡ **解決方案**：使用 `useCallback` 讓函式保持相同的記憶體位址：
```jsx
const handleClick = useCallback(() => {
  console.log("Clicked!");
}, []);

useEffect(() => {
  console.log("Function changed!");
}, [handleClick]); // 這樣 handleClick 不變時，Effect 不會重新執行
```

---

## **總結**
| **類型** | **比較方式** | **問題** | **解決方案** |
|----------|------------|----------|--------------|
| 數字、字串、布林 | **值相等性** | 沒問題 | - |
| 物件 | **引用相等性** | 每次 render 都不同 | `useMemo` |
| 陣列 | **引用相等性** | 每次 render 都不同 | `useMemo` |
| 函式 | **引用相等性** | 每次 render 都不同 | `useCallback` |

這樣的方式可以確保 `useEffect` **只在真正需要時執行**，避免不必要的重渲染！🚀