
---

## **Redux State 更新流程教學（含同步 / 非同步、小範例、名詞解釋）**

---

### **1. 無非同步請求的情況（同步 Action）**

1. **使用者操作**
   使用者透過 UI 觸發事件，例如點擊按鈕。

2. **觸發事件處理器 (Event Handler)**
   該事件處理器呼叫 `dispatch` 發送一個 **同步 action** 到 Redux。

   * **Action**：一個普通的 JavaScript 物件，必須有 `type` 欄位，用來描述「發生了什麼事」。

3. **處理舊狀態與 Action（Reducer 處理）**

   * **Reducer**：純函數 `(state, action) => newState`，根據舊的 `state` 和 `action` 計算並回傳新的 `state`。

4. **更新 State**
   Redux 會用新的 `state` 覆蓋舊的 `state`。

5. **通知 UI 更新**
   當 store 內的 state 改變時，UI（React 組件）會透過 `useSelector` 或 `connect` 接收最新的 state 並重新渲染。

6. **等待下一次事件**
   流程完成，等待下一次使用者操作。

---

🍚 **小範例（同步 Action）**

```javascript
// Action
const increment = { type: 'counter/increment' };

// Reducer
function counterReducer(state = { value: 0 }, action) {
  if (action.type === 'counter/increment') {
    return { value: state.value + 1 };
  }
  return state;
}

// 使用者點擊按鈕
dispatch(increment);
```

---

### **2. 有非同步請求的情況（使用 redux-thunk）**

1. **使用者操作**
   同樣由 UI 觸發事件。

2. **觸發事件處理器 (Event Handler)**
   事件處理器呼叫 `dispatch` 發送一個 **thunk action**（不是物件，而是函數）。

   * **Thunk Action**：一個函數 `(dispatch, getState) => { ... }`，允許在內部進行非同步操作，例如 API 請求。

3. **處理非同步請求（Middleware 處理）**

   * **Middleware（中介軟體）**：在 Redux 中攔截 `dispatch` 的擴充功能。
     `redux-thunk` 是一種 middleware，可以讓 action 變成函數，並在函數內進行非同步處理。

4. **非同步請求完成後**
   當 API 回應資料後，thunk 內會再次 `dispatch` 一個**同步 action**（包含 API 結果的 payload）。

5. **處理舊狀態與 Action（Reducer 處理）**
   Reducer 收到同步 action 後，根據舊 state 和 payload 計算新 state。

6. **更新 State**

7. **通知 UI 更新**

8. **等待下一次事件**

---

🍚 **小範例（非同步 Action）**

```javascript
// Thunk Action
function fetchUser(userId) {
  return async (dispatch) => {
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    dispatch({ type: 'user/set', payload: data });
  };
}

// Reducer
function userReducer(state = {}, action) {
  if (action.type === 'user/set') {
    return { ...state, ...action.payload };
  }
  return state;
}

// 使用者點擊按鈕
dispatch(fetchUser(1));
```

---

## **名詞解釋 + 小範例**

---

### **1. Action**

一個描述「發生什麼事」的物件，必須有 `type` 屬性，可包含 `payload` 作為資料。

```javascript
{ type: 'counter/increment', payload: 1 }
```

---

### **2. Dispatch**

Redux 的方法，用來發送 action 到 store。

```javascript
dispatch({ type: 'counter/increment' });
```

---

### **3. Reducer**

純函數 `(state, action) => newState`，接收舊 state 和 action，回傳新 state。

```javascript
function counterReducer(state = { value: 0 }, action) {
  if (action.type === 'counter/increment') {
    return { value: state.value + 1 };
  }
  return state;
}
```

---

### **4. State**

應用程式的資料狀態，儲存在 Redux store。

```javascript
{ value: 0 }
```

---

### **5. Store**

Redux 儲存狀態的物件，負責管理 state 和提供 `dispatch`、`getState` 方法。

```javascript
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({ reducer: counterReducer });
```

---

### **6. Middleware**

Redux 中的擴充機制，可以在 dispatch 與 reducer 之間加入邏輯，例如日誌紀錄、非同步處理。

```javascript
const logger = store => next => action => {
  console.log('dispatching', action);
  return next(action);
};
```

---

### **7. redux-thunk**

一種 middleware，允許 action 是函數而不是物件，並在函數中進行非同步邏輯後再 dispatch 真正的同步 action。

```javascript
const fetchUser = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}`);
  const data = await res.json();
  dispatch({ type: 'user/set', payload: data });
};
```

---

### **8. Thunk Action**

由 redux-thunk 處理的函數型 action，可以執行非同步請求。

```javascript
function fetchData() {
  return async (dispatch) => {
    const res = await fetch('/api/data');
    const json = await res.json();
    dispatch({ type: 'data/set', payload: json });
  };
}
```

---

### **9. Event Handler**

React 中綁定在 UI 元素上的事件處理函數，例如 `onClick`。

```jsx
<button onClick={() => dispatch({ type: 'counter/increment' })}>
  +
</button>
```

---

