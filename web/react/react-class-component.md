# React.Component 內建生命周期方法

**`React.Component`** 提供了多個內建的生命周期方法，這些方法涵蓋了組件的整個生命週期，從初始化到卸載，以及錯誤處理。以下是 **`React.Component`** 的所有主要生命周期方法，按執行階段分組：

## 1. 初始化階段 (Mounting)
   - **`constructor(props)`**  
     用來初始化狀態和綁定事件處理函數，這是組件創建時調用的第一個方法。
     ```javascript
     constructor(props) { super(props); }
     ```

   - **`static getDerivedStateFromProps(nextProps, nextState)`**  
     在每次渲染之前調用，用來根據 props 更新 state。是純函數，不能直接修改 `this`，需要返回新的 state。
     ```javascript
     static getDerivedStateFromProps(nextProps, nextState) { return null; }
     ```

   - **`render()`**  
     必須實現的方法，返回組件的 JSX 內容，是組件渲染的核心。
     ```javascript
     render() { return <div>My Component</div>; }
     ```

   - **`componentDidMount()`**  
     當組件渲染並且成功被添加到 DOM 後調用，通常用來發送 API 請求或執行一些副作用操作。
     ```javascript
     componentDidMount() { console.log('Mounted'); }
     ```

## 2. 更新階段 (Updating)
   - **`static getDerivedStateFromProps(nextProps, nextState)`**  
     如上所述，這個方法每次組件更新時都會被調用。

   - **`shouldComponentUpdate(nextProps, nextState)`**  
     用來控制組件是否需要重新渲染，根據新的 `props` 或 `state` 來決定是否更新。
     ```javascript
     shouldComponentUpdate(nextProps, nextState) { return true; }
     ```

   - **`render()`**  
     同上，`render` 方法會在每次更新時被調用。

   - **`getSnapshotBeforeUpdate(prevProps, prevState)`**  
     在 DOM 更新之前調用，可以用來捕獲一些渲染過程中的信息（例如，滾動位置）。
     ```javascript
     getSnapshotBeforeUpdate(prevProps, prevState) { return null; }
     ```

   - **`componentDidUpdate(prevProps, prevState, snapshot)`**  
     組件更新後調用，通常用來執行與 DOM 更新相關的副作用操作。
     ```javascript
     componentDidUpdate(prevProps, prevState, snapshot) { console.log('Updated'); }
     ```

## 3. 卸載階段 (Unmounting)
   - **`componentWillUnmount()`**  
     當組件從 DOM 中移除之前調用，用來清理訂閱、計時器等資源。
     ```javascript
     componentWillUnmount() { console.log('Unmounting'); }
     ```

## 4. 錯誤邊界 (Error Boundaries)
   - **`static getDerivedStateFromError(error)`**  
     如果組件樹中某個地方拋出錯誤，這個方法會被調用，並且可以根據錯誤狀況更新組件的狀態。
     ```javascript
     static getDerivedStateFromError(error) { return { hasError: true }; }
     ```

   - **`componentDidCatch(error, info)`**  
     如果組件樹中的錯誤沒有被捕捉，這個方法會被調用，並且可以用來記錄錯誤或顯示錯誤信息。
     ```javascript
     componentDidCatch(error, info) { console.log(error); }
     ```

---