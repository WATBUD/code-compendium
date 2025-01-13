# Redux Core Concepts (Simplified)
[Action/dispatch/Reducer/useSelector/Store]

# Action: 描述狀態變更的動作，包含 type 和可選的 payload。
{ type: 'ADD_ITEM', payload: { id: 1, name: 'Item' } }
  
# Dispatch: useDispatch hook 發送 Action 到 Store。
dispatch({ type: 'ADD_ITEM', payload: { id: 1, name: 'Item' } })

# Store: 應用狀態中央管理器:
- dispatch 發送Action到 Store ，Store 會根據 Action 的 type 將它傳遞給對應的 Reducer。

# Reducer: 根據 Action 更新狀態的純函數，決定如何處理每個 Action 並返回新的狀態。
- 根據 Action 的 type，Reducer 會更新對應的狀態，ex:新增一個項目到清單。

# useSelector 獲取當前狀態，Redux Store 讀取資料並觸發組件的重新渲染。
- const items = useSelector(state => state.items);
- items = Store 狀態，當狀態變化組件會重新渲染。

# 1. Store: 中央化狀態容器
存儲所有狀態，透過 `configureStore` 創建。
```javascript
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: counterReducer,
});
```
# 2. Action: 指令物件，通常包含 type 屬性，有時候會包含其他資料 (payload)。
```javascriptincrement_counter
const increment = { type: 'increment_counter' };
const setUser = { type: 'user/set', payload: { name: 'Alice' } };
```

# 3. Reducer(純函數):傳入 Action 更新狀態。
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

# 4. Dispatch: useDispatch hook 發送 Action 到 Store。
```javascript
import { useDispatch } from 'react-redux';

const Component = () => {
  const dispatch = useDispatch();

  const incrementCounter = () => {
    dispatch({ type: 'increment_counter' });
  };

  return <button onClick={incrementCounter}>Increment</button>;
};
```

# 45. useSelector 獲取當前狀態。
```javascript
import { useSelector } from 'react-redux';
const Component = () => {
  const counter = useSelector((state) => state.counter);
  return <div>Counter: {counter}</div>;
};
```

