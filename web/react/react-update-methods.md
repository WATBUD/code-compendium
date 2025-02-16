# React 有幾種更新方式
1. **State** 更新（`useState` / `setState`）。
2. **Props** 更新。
3. **Context** 更新。
4. **強制更新**（`forceUpdate`）。
5. **Refs 更新**（結合其他方式觸發重渲染）。
6. **Reducer 更新**（`useReducer`）。
7. **外部觸發更新**。

## 1. **State 更新**
通過使用 `useState` 或 `this.setState`（在 class 組件中），來更新組件的狀態。

- **函數式組件**：
  ```jsx
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  ```
  React 會在執行 `setCount` 後，觸發重新渲染。

- **類組件**：
  ```jsx
  this.setState({ count: this.state.count + 1 });
  ```
  同樣會觸發重新渲染。

---

## 2. **Props 更新**
父組件的 `props` 發生變化時，子組件會更新。

- 例如：
  ```jsx
  const Parent = () => {
    const [value, setValue] = useState(0);
    return <Child propValue={value} />;
  };

  const Child = ({ propValue }) => {
    return <p>{propValue}</p>;
  };
  ```
  當父組件的 `value` 改變時，子組件 `Child` 會重新渲染。

---

## 3. **Context 更新**
使用 `React Context` 提供的共享狀態時，當 Context 值改變，所有使用該值的組件都會重新渲染。

- **示例**：
  ```jsx
  const ThemeContext = React.createContext();

  const Parent = () => {
    const [theme, setTheme] = useState("light");
    return (
      <ThemeContext.Provider value={theme}>
        <Child />
      </ThemeContext.Provider>
    );
  };

  const Child = () => {
    const theme = useContext(ThemeContext);
    return <p>Current theme: {theme}</p>;
  };
  ```
  當 `theme` 改變，`Child` 組件會更新。

---

## 4. **強制更新 (`forceUpdate`)**
在類組件中，可以通過 `forceUpdate` 方法強制觸發重新渲染，即使沒有狀態或屬性變化。

- **示例**：
  ```jsx
  class MyComponent extends React.Component {
    forceRerender = () => {
      this.forceUpdate();
    };

    render() {
      return <button onClick={this.forceRerender}>Force Update</button>;
    }
  }
  ```

> **注意**：`forceUpdate` 不推薦使用，應盡量依賴 state 和 props 驅動渲染。

---

## 5. **Refs 更新**
當 `useRef` 或 `createRef` 的值改變時，並不會自動觸發組件渲染。但你可以手動結合 state 或其他方式來更新。

- **示例**：
  ```jsx
  const MyComponent = () => {
    const myRef = useRef(0);

    const handleClick = () => {
      myRef.current += 1;
      console.log(myRef.current); // 不會觸發重渲染
    };

    return <button onClick={handleClick}>Update Ref</button>;
  };
  ```

如果需要觸發重渲染，可以同時結合 `useState`。

---

## 6. **Reducer 更新**
使用 `useReducer` 時，通過 dispatch action 更新狀態。

- **示例**：
  ```jsx
  const reducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      default:
        return state;
    }
  };

  const MyComponent = () => {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    return (
      <button onClick={() => dispatch({ type: "increment" })}>
        {state.count}
      </button>
    );
  };
  ```

---

## 7. **外部觸發更新**
通過外部的方式，比如使用 React 提供的 `unstable_batchedUpdates` 或者事件觸發。

- **事件觸發**：
  ```jsx
  const handleEvent = () => {
    setTimeout(() => {
      setState1((prev) => prev + 1);
      setState2((prev) => prev + 1);
    });
  };
  ```

- **`unstable_batchedUpdates`**：
  用於確保多個更新操作合併執行（通常不需要手動使用）。

---
