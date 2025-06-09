React 更新 state 是異步的
為了提高性能，避免多次重複渲染調用 `setState` 
函數會將更新加入更新佇列，不會立即更新 `state`。
```javascript
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
    console.log(count); // 這裡的 `count` 可能不會馬上顯示更新後的值
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```
 `handleClick` 調用 `setCount` 之後，`console.log(count)` 
仍然會顯示舊 `count` 值，因為 `setState` 是異步的，不會立即更新 `state`。
需要在 state 更新後立即執行某些操作，可以使用 `useEffect` 鉤子來監聽 `state` 的變化：

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count); // 當 `count` 更新後會執行這段程式碼
  }, [count]);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

React 中連續調用 `setCount(count + 1)` 三次，這些狀態更新通常會被批處理。由於 `setState` 是異步的，
React 將更新加入佇列，並在下一個渲染循環中合併它們。因此，連續三次調用 `setCount(count + 1)` 並不會使 `count` 增加 3，而是只會增加 1。

例如，假設初始值為 `0`：

```javascript
const [count, setCount] = useState(0);s

const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};

// 初始值 count = 0
// 連續調用 setCount(count + 1), setCount(count + 1), setCount(count + 1)
```
`setCount(count + 1)` 會將 `count` 設置為 `1`，而不是 `3`，因為每次 `setCount` 調用時，`count` 都是當前的1+1。

*** solution
可以使用箭頭函數（Arrow Function）的 `setState`
當佇列中的更新是函數形式（如 prevCount => prevCount + 1）時，
React 會將當前最新的 state 值作為參數傳遞給函數

```javascript
const handleClick = () => {
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1);
};

// 初始值 count = 0
// 連續調用 setCount(prevCount => prevCount + 1), setCount(prevCount => prevCount + 1), setCount(prevCount => prevCount + 1)
// 最終 count = 3
```