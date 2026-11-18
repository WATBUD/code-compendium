`useMemo` 和 `React.memo` 都是 React 中的性能優化工具，但它們的用途和作用範圍不同：

### **1. `useMemo`**
- **用途**：用來記憶計算結果，避免不必要的重新計算。
- **適用場景**：
  - 當計算結果較複雜且耗時時，使用 `useMemo` 來記住計算結果。
  - 依賴的 state 或 props 沒變時，返回之前的計算結果。
- **示例**：
  ```jsx
  import { useMemo } from "react";

  function ExpensiveComponent({ items, keyword }) {
    const filtered = useMemo(() => {
      console.log("過濾大量資料...");
      return items.filter((item) => item.name.includes(keyword));
    }, [items, keyword]);

    return <div>符合筆數: {filtered.length}</div>;
  }
  ```
  **解釋**：只有當 `items` 或 `keyword` 變更時，`filtered` 才會重新計算，否則會返回上次的計算結果。
  > ⚠️ 注意：像 `num * num` 這種極輕量的計算不值得用 `useMemo`，比對依賴陣列與保存快取的成本可能比直接計算還高。只有在計算真的耗時（如大量資料過濾、排序），或需要維持物件/陣列的引用穩定（例如傳給 `React.memo` 子組件、作為 `useEffect` 依賴）時才使用。

---

### **2. `React.memo`**
- **用途**：用來記憶整個組件的渲染結果，避免不必要的重新渲染。
- **適用場景**：
  - 當子組件的 props 沒變時，不需要重新渲染該組件。
  - 適合高性能應用場景，減少 UI 更新的開銷。
- **示例**：
  ```jsx
  import React from "react";

  const ChildComponent = React.memo(({ text }) => {
    console.log("子組件渲染");
    return <div>{text}</div>;
  });

  function Parent({ text }) {
    return <ChildComponent text={text} />;
  }
  ```
  **解釋**：如果 `text` 沒有變更，`ChildComponent` 不會重新渲染。

---

### **`useMemo` vs `React.memo` 差異**
| **對比點**  | **useMemo**  | **React.memo**  |
|------------|-------------|----------------|
| **主要用途** | 記住計算結果，避免不必要的計算 | 記住組件渲染結果，避免不必要的重新渲染 |
| **使用範圍** | 用於函數內部的變數 | 用於整個組件 |
| **避免的問題** | 重複運算 | 重複渲染 |
| **依賴變數** | 透過 `dependencies` 來決定是否重新計算 | 透過 `props` 變更來決定是否重新渲染 |

