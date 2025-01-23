
## useCallback 記錄函數的引用，避免每次渲染重新創建函數**
執行過程如下：
1. 每次渲染時，React 會**執行傳入 `useCallback` 的匿名函式並創建一個新的函式**。
2. 然後，React **將新函式的引用與之前渲染時存儲的函式引用進行比較**（依賴陣列用於判斷是否需要更新）。
3. 依賴陣列中的值沒有改變，React **回傳之前存儲的函式引用**，而不是回傳剛創建的新函式。

## 1. 使用`React.memo高階組件（Higher Order Component）` 避免不必要渲染，
- **`子元件用[memo]包住 + 父層[useCallback] 才「可能」優化子元件[Re-render]效能`**:
子組件包裝 `React.memo` ，父組件每次重新渲染都會生成新的函數，子組件誤以為傳遞的 props 改變了，導致不必要的重渲染。
對傳遞給子組件的 props 淺比較，如果 props 沒有改變，React.memo 可以跳過子組件的重新渲染。

### React.memo範例：防止子組件重渲染
```jsx
import React, { useState, useCallback } from 'react';

const Child = React.memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click me</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // 使用 useCallback，確保引用穩定

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <Child onClick={handleClick} />
    </div>
  );
}

export default Parent;
```
## 2. 函數作為 `useEffect` 依賴
如果函數每次重新創建，會導致 `useEffect` 不斷觸發。使用 `useCallback` 可以避免這個問題。
如果不使用 `useCallback`，每次渲染會創建一個新 `fetchData`，導致 `useEffect` 依賴被認為改變而重複執行。

### 範例：避免不必要的 `useEffect` 重複執行
```jsx
import React, { useState, useCallback, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const fetchData = useCallback(() => {
    console.log('Fetching data...');
    // 模擬 API 請求
  }, []); // 保持 fetchData 的引用穩定

  useEffect(() => {
    fetchData();
  }, [fetchData]); // 如果沒有 useCallback，會導致 useEffect 每次重渲染都執行

  return (
    <button onClick={() => setCount(count + 1)}>Count: {count}</button>
  );
}

export default App;
```
