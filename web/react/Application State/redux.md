# Redux Core Concepts (Simplified)
[Action/dispatch/Reducer/useSelector/Store]

# Action: Object[type/可選payload]
```javascript
// 定義 Action Types 和 Payload
export const increment = { type: 'increment_counter' };
export const setUser = (name) => ({ type: 'user/set', payload: { name } });
```
# Dispatch: useDispatch hook 發送 Action 到 Store。
```javascript
import { useDispatch } from 'react-redux';

import { increment, setUser } from './actions'; // 導入 Action

const Component = () => {
  const dispatch = useDispatch();

  const incrementCounter = () => {
    dispatch(increment);//直接引用定義好的Action
    dispatch({ type: 'increment_counter' });//直接帶入Action Object
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

# useSelector 獲取當前狀態，Redux Store 讀取資料並觸發組件的重新渲染。
- const items = useSelector(state => state.items);
- items = Store 狀態，當狀態變化組件會重新渲染。
```javascript
import { useSelector } from 'react-redux';
const Component = () => {
  const counter = useSelector((state) => state.counter);
  return <div>Counter: {counter}</div>;
};
```






