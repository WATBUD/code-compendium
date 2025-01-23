# React Referential Equality 與 `useEffect` 的無限渲染問題
**`useEffect`** 依賴陣列（dependency array），當陣列任一依賴項改變時重新執行 `useEffect` 回調函數。
如果依賴陣列中包含**物件型別（objects, arrays, or functions）**，就會涉及到 **Referential Equality（引用相等性）** 的問題。

## **什麼是 Referential Equality？**
JavaScript 中，物件（包括陣列和函式）的相等性比較依賴於它們的引用，而不是它們的內容。
```javascript
const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log(obj1 === obj2); // false，因為引用不同，即使內容相同
```
物件每次渲染重新生成，React 認為是新物件，即使內容相同。
導致 `useEffect` 誤判依賴變化，觸發回調執行。
## **案例：`useEffect` 的無限渲染問題**
```javascript
import React, { useEffect, useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  const obj = { value: count }; // 每次渲染都會創建一個新的物件

  useEffect(() => {
    console.log('useEffect triggered');
  }, [obj]); // obj 的引用每次都改變，導致 useEffect 無限觸發

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default App;
```
### **為什麼會無限觸發？**
1. 每次組件重新渲染時，`obj` 都是一個新的物件（新的引用）。
2. React 比較 `useEffect` 的依賴陣列時發現 `obj` 的引用改變（即使內容相同）。
3. 這導致 `useEffect` 的回調每次都重新執行。
4. 每次執行後又導致重新渲染，形成無限循環。
---
## **解決方法：使用 `useMemo` 或 `useCallback`**

避免依賴物件重新生成導致無限觸發，可以使用 `useMemo` 或 `useCallback` 記住物件或函數的引用，直到其真正的依賴項改變。

### **使用 `useMemo` 記住物件引用，依賴項改變時才會生成新物件**

```javascript
import React, { useEffect, useState, useMemo } from 'react';
const App = () => {
  const [count, setCount] = useState(0);
  const obj = useMemo(() => ({ value: count }), [count]); // 僅在 count 改變時創建新物件
  useEffect(() => {
    console.log('useEffect triggered');
  }, [obj]); // obj 的引用僅在 count 改變時改變
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
export default App;
```
### **使用 `useCallback` 依賴函數型別（事件處理器）**
useCallback 主要目的是[穩定函數引用]，子組件不是React.memo，父組件重渲染子組件一定重新渲染，useCallback 這情況下是多餘的。
```javascript
const Parent = () => {
  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []);

  return <ChildButton onClick={handleClick} />;
};

const ChildButton = React.memo(({ onClick }) => {
  console.log('ChildButton rendered');
  return <button onClick={onClick}>Click Me</button>;
});
```
### **依賴於函數的 useEffect 或其他 Hook**
```javascript
const Example = () => {
  const [count, setCount] = useState(0);

  const logCount = useCallback(() => {
    console.log(`Count: ${count}`);
  }, [count]);

  useEffect(() => {
    logCount();
  }, [logCount]); // 如果不用 useCallback，每次渲染都會重新執行 logCount
};
```

## **總結：防止 Re-render 的核心需要 `useMemo` 和 `useCallback`？**
兩者的主要目的是減少不必要的重新創建，從而優化 React 應用的性能：
- **`useMemo`**: 記住[純值、物件、陣列]引用，避免因[Re-render]而導致進行了[不必要重新計算]。
- **`useCallback`**: 記住[函數]引用，避免因為[Re-render]導致之函式被重新被建立。
- **`useEffect`**: 依賴陣列包含[物件/函數]，需要使用 `useMemo` 或 `useCallback`，以防止不必要[依賴變化/無限渲染]問題。