# Redux Core Concepts (Simplified)
Redux 在2015由 Dan Abramov 開發基於 Flux 架構
原生 Redux [action、reducer] 使用較瑣碎有 TypeScript 在型別設定上更繁瑣，如果有一處需要修改時往往會需要動到不少的地方。
導入[ReduxToolkit] 減少創建 [store、reducer] 的 boilerplate code，
讓Redux store 狀態時需要 [immutable] 的語法變成可以用 [mutable] 的方式撰寫，所以現今使用 Redux 時通常都會同時導入 [RTK]。
透過單一資料來源（single source of truth）和不可變狀態（immutable state）來實現可預測的狀態管理
[Action/dispatch/Reducer/useSelector/Store]

# Action: Object[type/可選payload]

```javascript
// 定義 Action Types 和 Payload
export const increment = { type: 'increment_counter' };
export const setUser = (name) => ({ type: 'user/set', payload: { name } });
```

# Dispatch (分發): useDispatch hook 發送 Action 到 Store。

```javascript
import { useDispatch } from 'react-redux';
import { increment, setUser } from './actions'; // 導入 Action

const Component = () => {
  const dispatch = useDispatch();

  const incrementCounter = () => {
    dispatch(increment);//引用定義好的Action
    dispatch({ type: 'increment_counter' });//不引用直接帶入
  };
  return <button onClick={incrementCounter}>Increment</button>;
};
```
# Store: 中央管理器存儲所有狀態，接收dispatch 發送的Action:

- 根據 Action Type 傳遞給對應的 Reducer。透過 `configureStore` 創建。
```javascript
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: counterReducer,
});
```
# Reducer(純函數):傳入 Action 更新狀態，決定如何處理每個 Action 並返回新的狀態。

```javascript
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'increment_counter':
      return state + 1;
    default:
      return state;
  }
};
```

# useSelector 獲取當前狀態，從 Redux Store 中讀取資料並觸發組件的重新渲染

- `const items = useSelector(state => state.items);`
- `items` 是從 Redux Store 獲取的狀態，當該狀態發生變化時，組件會自動重新渲染。

```javascript
import { useSelector } from 'react-redux';
const Component = () => {
  const counter = useSelector((state) => state.counter);
  return <div>Counter: {counter}</div>;
};
```






