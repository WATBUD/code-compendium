React 協調算法（Reconciliation）如何進行新舊虛擬 DOM 比較：



1. **遍歷新舊列表**：
   React 會遞歸遍歷新舊虛擬 DOM 樹，對每個元素的 `key` 和元素類型進行比較。

在 React 中，**元素類型**（`element type`）指的是構成虛擬 DOM 樹中每個元素的 **組件類型** 或 **DOM 標籤名稱**。

具體來說：
1. **原生 DOM 元素的類型**：這是指元素的標籤名稱，比如 `div`、`span`、`input` 等。例如，`<div>`、`<span>` 都是 DOM 元素，React 會通過這些標籤來區分和更新元素。

2. **React 組件類型**：如果是自定義的 React 組件，則元素類型會是該組件的函數或類。例如，`<MyComponent />` 是一個 React 組件元素，元素類型會是 `MyComponent` 函數或類。

### 詳細說明：
- 如果兩個元素的 `key` 相同且 **類型** 相同（即標籤名稱或組件相同），React 會認為它們是同一個元素，從而避免重新渲染，而是更新其屬性。
- 如果 **類型不同**（即標籤或組件不同），React 會視為兩個不同的元素，並進行刪除舊元素和創建新元素的操作。


### 例子：
#### 1. 使用原生 DOM 標籤：
```jsx
<div key="1">Hello</div>  // 類型是 'div'
```

#### 2. 使用 React 組件：
```jsx
<MyComponent key="1" />  // 類型是 MyComponent

```
#### 3. 相同 key 和不同元素類型:
```jsx
// 舊的虛擬 DOM
<div key="1">Hello</div>

// 新的虛擬 DOM：key 相同，但類型從 div 換成 span
<span key="1">Hello</span>
```
雖然 `key` 和內容都一樣，但類型從 `div` 變成 `span`，React 會銷毀舊的 `<div>`（連同其子樹與狀態），再建立新的 `<span>`。
（同理，換成 `<input key="1" />` 也一樣；注意 `input` 是空元素，不能有子內容。）

在這些情況下，React 比較的 **類型** 是 `div` 或 `MyComponent`，而不是元素內的內容或其他屬性。如果 `key` 相同且類型相同，React 會重用現有的 DOM 元素並更新屬性。如果 `key` 或類型不同，React 會卸載舊元素並重新建立新元素。

### 總結：
- **原生 DOM 元素類型**：如 `div`、`span` 等 HTML 標籤。
- **React 組件類型**：如自定義的組件（例如 `<MyComponent />`）或函數／類組件。

這就是 React 如何根據元素類型和 `key` 來決定是否重用或更新元素。




2. **識別變化**：
   - **相同 `key` 且相同類型**：React 會重用舊元素，並只更新其屬性和子元素。
   - **不同 `key` 或不同類型**：React 會銷毀舊元素並創建新元素。

3. **處理新增、刪除和移動**：
   - **新增元素**：若新列表中有某個 `key` 在舊列表中不存在，React 會創建並插入新元素。
   - **刪除元素**：若舊列表中有某個 `key` 在新列表中不存在，React 會銷毀舊元素。
   - **元素移動**：若 `key` 在新舊列表中都存在，但順序不同，React 會移動該元素，而不是重新創建它。

這一過程有助於 React 高效地更新界面，減少不必要的 DOM 操作，從而提升性能。




#### 初始渲染的虛擬 DOM（舊虛擬 DOM）：
```jsx
[
  <div key="1">A</div>,
  <div key="2">B</div>,
  <div key="3">C</div>
]
```

#### 新的虛擬 DOM：
```jsx
[
  <div key="2">B</div>,
  <div key="3">C</div>,
  <div key="4">D</div>
]
```

### 具體步驟：

1. **遍歷新舊列表**：
   - React 會比較兩個列表中的元素，根據 `key` 和元素類型進行比較。
   
2. **識別變化**：
   - 比較 `key="1"` 的元素：在新列表中不存在，React 會銷毀舊的 `<div key="1">A</div>`。
   - 比較 `key="2"` 的元素：新舊列表中都存在且相同，React 會重用舊的 `<div key="2">B</div>`，並不會重渲染。
   - 比較 `key="3"` 的元素：新舊列表中都存在且相同，React 會重用舊的 `<div key="3">C</div>`，並不會重渲染。

3. **處理新增、刪除和移動**：
   - **刪除**：舊列表中的 `key="1"` 的元素被刪除。
   - **新增**：新列表中有 `key="4"` 的元素，但舊列表中沒有，React 會創建並插入 `<div key="4">D</div>`。
   - **移動**：`key="2"` 和 `key="3"` 的索引雖然改變了，但兩者的 **相對順序** 沒變（仍是 B 在 C 前），刪除 A 之後它們自然就在正確位置，React 不需要對它們做 DOM 移動。

### 最終的 DOM 更新：
- 舊的 `<div key="1">A</div>` 被刪除。
- 新的 `<div key="4">D</div>` 被創建並添加。
- `key="2"` 和 `key="3"` 的 DOM 節點被保留重用，相對順序不變，不需要移動。

### 實際代碼範例：

```jsx
import React from 'react';

class List extends React.Component {
  state = {
    items: [
      { key: '1', content: 'A' },
      { key: '2', content: 'B' },
      { key: '3', content: 'C' }
    ]
  };

  componentDidMount() {
    setTimeout(() => {
      // 模擬新資料更新，順序改變，並且加入新的元素
      this.setState({
        items: [
          { key: '2', content: 'B' },
          { key: '3', content: 'C' },
          { key: '4', content: 'D' }
        ]
      });
    }, 2000);
  }

  render() {
    return (
      <div>
        {this.state.items.map(item => (
          <div key={item.key}>{item.content}</div>
        ))}
      </div>
    );
  }
}

export default List;
```

### 結果：
- 初始渲染時顯示：
  ```
  A
  B
  C
  ```

- 2 秒後（新資料更新後）顯示：
  ```
  B
  C
  D
  ```

React 會根據 `key` 檢查新舊列表的差異，並進行以下操作：
- **刪除** `A`（因為 `key="1"` 在新列表中不存在）。
- **保留** `B` 和 `C`（重用原有 DOM 節點，相對順序不變，不需移動）。
- **新增** `D`（因為 `key="4"` 在舊列表中不存在）。