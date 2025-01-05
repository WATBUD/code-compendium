# React Referential Equality 與 `useEffect` 的無限渲染問題

在 React 中，**`useEffect`** 的依賴陣列（dependency array）用於告訴 React，當陣列中的任一依賴項改變時，應該重新執行 `useEffect` 的回調函數。然而，如果依賴陣列中包含**物件型別（objects, arrays, or functions）**，就會涉及到 **Referential Equality（引用相等性）** 的問題。

---

## **什麼是 Referential Equality？**
JavaScript 中，物件（包括陣列和函式）的相等性比較依賴於它們的引用，而不是它們的內容。

```javascript
const obj1 = { a: 1 };
const obj2 = { a: 1 };

console.log(obj1 === obj2); // false，因為引用不同，即使內容相同
```

物件在每次渲染時被重新生成，React 會認為這是一個新的物件，即使其內容完全相同。這會導致 `useEffect` 誤判依賴發生變化，從而觸發回調執行。

---

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

為了避免依賴物件型別的重新生成導致無限觸發，可以使用 `useMemo` 或 `useCallback` 來記住物件或函數的引用，直到其真正的依賴項改變。

### **使用 `useMemo`**

`useMemo` 會記住物件的引用，只有當其依賴項改變時，才會生成新物件。

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

---

### **使用 `useCallback`**
依賴是函數型別（例如事件處理器），可以用 `useCallback`。

```javascript
import React, { useEffect, useState, useCallback } from 'react';

const App = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log(`Count is ${count}`);
  }, [count]); // 僅在 count 改變時生成新函數

  useEffect(() => {
    console.log('useEffect triggered');
  }, [handleClick]); // handleClick 的引用僅在 count 改變時改變

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Log Count</button>
    </div>
  );
};

export default App;
```
## **總結：防止 Re-render 的核心需要 `useMemo` 和 `useCallback`？**
兩者的主要目的是減少不必要的重新創建，從而優化 React 應用的性能：
- **`useMemo`**: 記住[純值、物件、陣列]引用，幫助避免重新計算不必要的值，避免依賴變化無意義渲染。
- **`useCallback`**: 記住函數引用，避免重新創建函數引用。
 `useEffect` 的依賴陣列中包含物件或函數時，應特別注意是否需要使用 `useMemo` 或 `useCallback`，以防止不必要的依賴變化和無限渲染問題。


