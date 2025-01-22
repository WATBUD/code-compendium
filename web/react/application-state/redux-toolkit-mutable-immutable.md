# Redux Toolkit [Immutable/Mutable]

使用 Redux Toolkit (RTK) `createSlice` 管理狀態和 reducers，

利用了 [Immer](https://immerjs.github.io/immer/) 來處理狀態，

使得可以 **mutable 的語法** 操作更新邏輯，而實際上仍保持狀態的 **immutable** 特性。

## Redux Toolkit Mutable 寫法

```javascript
import { createSlice, configureStore } from '@reduxjs/toolkit';

// 定義初始狀態
const initialState = {
  count: 0,
};

// 使用 createSlice 定義 slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      // 直接修改 state 是允許的，Immer 自動處理 immutable 的更新
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
    reset(state) {
      state.count = 0;
    },
  },
});

// 導出 actions
export const { increment, decrement, reset } = counterSlice.actions;

// 配置 store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

export default store;
```

### 更新狀態時的代碼
```javascript
store.dispatch(increment()); // state.count -> 1
store.dispatch(decrement()); // state.count -> 0
store.dispatch(reset());     // state.count -> 0
```

雖然看似「mutable」的方式直接更新了 `state.count`，但實際上 RTK 和 Immer 自動幫助我們處理了immutable，避免直接修改原始狀態。

---

## 傳統 Redux Immutable 
```javascript
import { createStore } from 'redux';

// 定義初始狀態
const initialState = {
  count: 0,
};

// 定義 reducer
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      // 返回新的狀態（不可直接修改原始狀態）
      return {
        ...state,
        count: state.count + 1,
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      };
    case 'RESET':
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
}

// 創建 store
const store = createStore(counterReducer);

// 定義 actions
const increment = { type: 'INCREMENT' };
const decrement = { type: 'DECREMENT' };
const reset = { type: 'RESET' };

// 更新狀態
store.dispatch(increment); // state.count -> 1
store.dispatch(decrement); // state.count -> 0
store.dispatch(reset);     // state.count -> 0
```

傳統 Redux 中，我們需要通過 **返回新的狀態**（使用展開運算符 `...`）來確保狀態的不可變性，這常常會導致再以上的代碼繁長。

---

## 比較

| 特性                         | 傳統 Redux                             | Redux Toolkit (RTK)                |
|------------------------------|---------------------------------------|-----------------------------------|
| 狀態更新                     | 必須保持 immutable                   | 可以直接修改（Immer 會處理）        |
| boilerplate code (樣板代碼)   | 較多，需要手動定義 actions 和 reducers | 較少，使用 `createSlice` 簡化流程   |
| 語法                         | 較繁長，需展開狀態                   | 簡潔，修改狀態更直親               |

Redux Toolkit 的優勢在於提升開發效率，同時保持 Redux 的核心特性，特別適合大型應用開發。

