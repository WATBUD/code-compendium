# 生命週期是指元件存在期間，從被創建到銷毀的不同階段

React 的生命週期主要分為三個大階段：**Mounting**（掛載）、**Updating**（更新）和 **Unmounting**（卸載）。

## 1. Mounting（掛載階段）

React 元件第一次被渲染並插入到 DOM 中時，進入掛載階段。這些生命週期方法將按照以下順序調用：
- `constructor()`：構造函數，用來初始化 state 或綁定方法。
- `render()`：返回元件的 UI 結構。React 會調用這個方法來渲染元件。
- `componentDidMount()`：元件渲染插入 DOM 後，這是進行網絡請求或設置訂閱等副作用的地方。

## 2. Updating（更新階段）

元件的 [props/state] 發生變化時，React 會重新渲染元件進行差異比對（virtual DOM vs. real DOM）。
更新階段的生命週期方法按以下順序調用：
- `static getDerivedStateFromProps()`：在每次渲染之前，根據新的 props 和 state 更新元件狀態。
- `shouldComponentUpdate()`：允許開發者決定是否要進行更新。
- `render()`：重新渲染元件，生成新的 UI。
- `getSnapshotBeforeUpdate()`：在實際改變 DOM 之前，獲取一些資訊（例如滾動位置）。
- `componentDidUpdate()`：在元件更新後執行，通常用來處理 DOM 更新後的副作用。

## 3. Unmounting（卸載階段）

當元件被從 DOM 中移除時，會進入卸載階段。此時，React 會調用：
- `componentWillUnmount()`：用來清理訂閱、取消網絡請求等副作用。

## Render 與 Commit 階段

每個生命週期階段都包括 **Render** 和 **Commit** 兩個子階段：

- **Render 階段**：執行 `render()` 方法生成虛擬 DOM。會確保元件渲染為純函數沒有副作用。
為了支持並發渲染，React 可能會中斷 render 操作並稍後繼續。

- **Commit 階段**：渲染的結果應用到實際的 DOM 中更新畫面。

## 更新階段中的 Pre-Commit 階段

Pre-Commit，`getSnapshotBeforeUpdate()` 是唯一在 commit 階段之前執行的方法，可以進行實際 DOM 更新前，先抓DOM 屬性或計算數據，這對於處理動畫或滾動位置等非常有用。除非有特殊需求，這個方法通常不會經常使用。

### Mounting、Updating 和 Unmounting 是否適用於Functional Component？
Mounting、Updating 和 Unmounting 同樣存在[FunctionalComponent]。
與Class Component不同，React 提供了 **Hooks** 來實現相同的功能，不再依賴傳統生命週期方法。
[FunctionalComponent]沒有多個專用生命週期方法（例如 `componentDidMount`、`componentDidUpdate` 等）。
`useEffect()` Hook就是對應於傳統類型元件中生命週期方法（如 `componentDidMount``componentDidUpdate``componentWillUnmount`）

### Functional Component 沒有useEffect生命週期：
Mounting： 沒有 [useEffect]則無法在元件掛載後執行副作用的程式碼。你需要加入 useEffect 來模擬 componentDidMount 行為。

Updating： 沒有 [useEffect]則無法在 state 或 props 更新後執行相應的副作用或邏輯。

Unmounting：沒有 [useEffect]則無法在元件卸載時進行清理操作。 

### Functional Component中對應方式：
- **Mounting（掛載階段）**
  - Functional Component的 `useEffect()` Hook，當傳遞空陣列 `[]` 作為依賴時，相當於 `componentDidMount`，會在元件第一次渲染後執行。
    ```javascript
    useEffect(() => {
      // 這裡的代碼會在元件掛載後執行
    }, []);
    ```

- **Updating（更新階段）**
  - 當元件的 [state/props] 改變時，`useEffect()` 也會重新執行。這與 `componentDidUpdate` 類似，因為它會在更新後執行，除非傳遞空依賴陣列。

    ```javascript
    useEffect(() => {
      // 這裡的代碼會在每次更新後執行
    }, [dependency]); // 當依賴改變時，effect 會重新執行
    ```

- **Unmounting（卸載階段）**
  -  `useEffect()` 返回一個清理函數，在元件卸載時執行，相當於 `componentWillUnmount`。

    ```javascript
    useEffect(() => {
      // 設置副作用

      return () => {
        // 清理副作用，這裡的代碼會在元件卸載時執行
      };
    }, []);
    ```



