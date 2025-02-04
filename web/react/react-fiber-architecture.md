
# React Fiber 是 React 16 引入的全新渲染引擎，
### 渲染過程分為三個主要階段：
1. **Render Phase**: 這個階段根據當前狀態和屬性生成 Fiber Tree。每個 Fiber 節點會處理自己的渲染邏輯和子節點。
2. **Reconciliation Phase**: 比較新舊 Fiber 樹的差異，生成需要更新的 Fiber 节点，並標記相應的操作（如新增、刪除、更新等）。
3. **Commit Phase**: 根據協調結果將修改應用到 DOM 上，並執行副作用函數（如 `useEffect`）。
### 1. **Render Phase（渲染階段）**

根據當前[狀態/屬性]，計算如何更新 UI，生成新的 Fiber 樹。這一階段不會立即對 DOM 進行操作，僅是構建 Fiber 節點並進行協調。

#### 實作流程

- 根據當前[狀態/屬性]重新計算出一個新的 Fiber Tree，這個過程在每次狀態或屬性更新時都會發生。
- 在這個階段，React 會遍歷 Fiber 樹並對比之前的渲染結果，並標記需要更新的部分。

```js
// Example: Render phase, generating a new Fiber tree
function renderFiber(fiber) {
  switch (fiber.tag) {
    case 'FunctionComponent':
      // 渲染 FunctionComponent
      const nextProps = fiber.pendingProps;
      const newState = fiber.stateNode.render(nextProps);
      fiber.memoizedProps = nextProps;
      fiber.memoizedState = newState;
      break;

    case 'HostComponent':
      // 渲染原生 DOM 元素
      const domNode = document.createElement(fiber.type);
      fiber.stateNode = domNode;
      break;

    default:
      // 其他類型的處理
      break;
  }

  // 處理子節點
  if (fiber.child) {
    renderFiber(fiber.child);
  }
}
```

### 2. **Reconciliation（協調階段）:決定哪些節點需要被更新、刪除或新增**

Reconciliation會比較新舊 Fiber 樹，根據不同差異生成更新。

#### 實作流程

- 使用 **diffing algorithm**（差異算法）來比較新舊樹的差異。
- 如果組件的 `key` 或類型有變化，會創建新的 Fiber 節點，標記為需要更新或刪除。

```js
// Example: Reconciliation phase, comparing Fiber trees
function reconcileChildren(returnFiber, currentFirstChild, newChildren) {
  let oldFiber = currentFirstChild;
  let prevSibling = null;

  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    let newFiber = createFiber(newChild);

    // Compare new child and old fiber
    if (oldFiber && oldFiber.key === newChild.key) {
      // Update existing fiber if key matches
      newFiber.effectTag = Update;
      newFiber.stateNode = oldFiber.stateNode;
    } else {
      // Create a new fiber for this child
      newFiber.effectTag = Placement;
    }

    // Link fibers
    if (prevSibling) {
      prevSibling.sibling = newFiber;
    } else {
      returnFiber.child = newFiber;
    }
    prevSibling = newFiber;

    // Move to the next old fiber
    oldFiber = oldFiber ? oldFiber.sibling : null;
  }
}
```

### 3. **Commit Phase（提交階段）:根據Reconciliation的結果，對 DOM 進行實際的更新**

這一階段會執行副作用（如 `useEffect`），並將修改的內容提交到 DOM 上。

#### 實作流程

- 根據Reconciliation（如 `effectTag`）標識實際修改 DOM。
- 根據每個 Fiber 的 `effectTag` 來決定是執行更新、刪除還是新增操作。
- 最後觸發 `useEffect` 等副作用函數。

```js
// Example: Commit phase, applying changes to DOM
function commitChanges(fiber) {
  switch (fiber.effectTag) {
    case Placement:
      // 新增元素
      if (fiber.stateNode) {
        fiber.return.stateNode.appendChild(fiber.stateNode);
      }
      break;

    case Update:
      // 更新現有元素
      if (fiber.stateNode && fiber.memoizedProps) {
        updateElement(fiber.stateNode, fiber.memoizedProps);
      }
      break;

    case Deletion:
      // 刪除元素
      if (fiber.stateNode) {
        fiber.stateNode.remove();
      }
      break;

    default:
      break;
  }

  // 提交子元素的更新
  if (fiber.child) {
    commitChanges(fiber.child);
  }
  if (fiber.sibling) {
    commitChanges(fiber.sibling);
  }
}

// Example of updating an element
function updateElement(domNode, newProps) {
  for (const key in newProps) {
    domNode[key] = newProps[key];
  }
}
```



