# React Hook 順序管理與使用原則

當 React 渲染組件時，會將每個 `useState` 創建的狀態按順序儲存在一個內部管理的陣列中，這樣 React 就能夠在每次渲染時準確對應到每個狀態的值。

## 具體過程：
1. **首次渲染**：React 初始化空陣列，準備儲存各個狀態。
2. **每次 Hook**：每次呼叫 `useState` 會將對應[狀態值（`getter`）更新函數（`setter`）]放入陣列，並給每個狀態分配一個順序（索引）。
3. **順序紀錄**：順序紀錄：React 依照狀態在組件中被定義的順序來儲存它們，每次渲染時，React 會遵循固定的渲染流程來處理這些狀態。如果渲染過程中狀態的順序被打亂，React 就無法正確匹配每個狀態與其值，從而可能導致錯誤。

## 類比：
可以將這個陣列想像成一本記錄冊，每一頁對應一個 `useState` 創建的狀態。首次渲染時這本記錄冊是空的。
每次 React 渲染時，會將每個 `useState` 狀態放進這本記錄冊的不同頁面，每頁儲存著該狀態的值和更新函數。在每次後續渲染中，React 會根據這本「記錄冊」的順序，對應和更新這些狀態。

## 為什麼不能在條件式或迴圈中使用 Hook？
假設你有一個盒子，這個盒子裡放了不同的東西，每樣東西代表一個狀態（例如數字或文字）。根據這些盒子的順序來管理和更新它們的內容。每次打開盒子時，都是按照固定順序來檢查裡面的東西。

### 問題：
如果你在某些情況下才打開某些盒子（例如，某個條件成立時），你可能會忘記打開某些盒子，或改變盒子的順序，這樣 React 就無法正確追蹤每個盒子裡的東西，從而發生錯誤。

## 為什麼 React 需要確保順序一致？
在 React 中，這些「盒子」就是所謂的 Hook（例如 `useState`）。這些 Hook 用來儲存和管理我們應用中的不同狀態。每次 React 重新整理畫面時，它會按照固定的順序來處理這些狀態。如果我們改變了順序或跳過某些狀態，React 就會無法正確更新它們，從而出現錯誤。

### 例子：
如果你每次都按照「盒子 1、盒子 2」的順序來處理，React 就知道盒子 1 裡是 `number`，盒子 2 裡是 `showMore`。但如果你把某些盒子放在條件判斷或迴圈中，就像你每次都不確定會打開哪個盒子，React 就無法正確追蹤並更新它們。

## 如何正確使用 Hook？
為了讓 React 正確運行，我們需要保證：
- 每次渲染時，都按照相同的順序呼叫 Hook。不要根據條件或迴圈來決定是否使用某個 Hook。
- 所有的 Hook 都應該放在函式的頂部，這樣 React 每次重新渲染時就能確保順序一致。

### 正確範例：
```js
import { useState } from "react";

export default function MyComponent() {
  // 放在最頂部，這樣每次都能確保順序正確
  const [number, setNumber] = useState(0);
  const [showMore, setShowMore] = useState(false);

  function handleNextNumber() {
    setNumber(number + 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  return (
    <>
      <button onClick={handleNextNumber}>Next</button>
      <h3>{number + 1}</h3>
      <button onClick={handleMoreClick}>
        {showMore ? "Hide" : "Show"} details
      </button>
      {showMore && <p>Hello World!</p>}
    </>
  );
}
