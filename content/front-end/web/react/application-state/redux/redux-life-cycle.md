# React Redux State 更新流程

## 無非同步請求的情況
1. **使用者操作**：使用者透過 UI 觸發點擊事件。
2. **觸發事件處理器**：點擊事件藉由綁定的 `event handler`，`dispatch` 某個 `action` 到 `reducer`。
3. **處理舊狀態與 action**：
   - `reducer` 會先拿取舊的 `state` 以及 `action payload`，通過計算後得到新的 `state`。
   - 更新 `state`。
4. **通知 UI 更新**：當 `state` 更新時，會通知 UI 進行重新渲染。
5. **等待下一次事件**：等待使用者觸發下一次的事件，重複步驟 1。

## 有非同步請求的情況
1. **使用者操作**：使用者透過 UI 觸發點擊事件。
2. **觸發事件處理器**：點擊事件藉由綁定的 `event handler`，`dispatch` 某個 `thunk action`。
3. **處理非同步請求**：
   - `thunk action` 通過 `middleware` 時，由 `redux-thunk` 處理非同步請求。
   - 非同步請求完成後，`redux-thunk` 會根據回應資料再 `dispatch` 一個新的 `action` 到 `reducer`。
4. **處理舊狀態與 action**：
   - `reducer` 會拿取舊的 `state` 以及新 `action payload`，通過計算後得到新的 `state`。
   - 更新 `state`。
5. **通知 UI 更新**：當 `state` 更新時，會通知 UI 進行重新渲染。
6. **等待下一次事件**：等待使用者觸發下一次的事件，重複步驟 1。

---

## 註解
- 無非同步請求時，`dispatch` 的是同步的 `action`，更新流程簡單。
- 有非同步請求時，`redux-thunk` 中介了 `dispatch` 流程，用於處理非同步邏輯。
- `thunk action` 本質是一個回呼函數，可進行額外的非同步處理。
