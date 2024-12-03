# Redux Core Concepts (Simplified)

# Action: 描述狀態變更的動作，包含 type 和可選的 payload。
  例：{ type: 'ADD_ITEM', payload: { id: 1, name: 'Item' } }
  
# Dispatch: 發送 Action 到 Redux 的 Store觸發更新。
- 例如：dispatch({ type: 'ADD_ITEM', payload: { id: 1, name: 'Item' } })

# Store: 應用狀態中央管理器:
- 當 Action 被 dispatch 發送到 Store 時，Store 會根據 Action 的 type 將它傳遞給對應的 Reducer。

# Reducer: 根據 Action 更新狀態的純函數，決定如何處理每個 Action 並返回新的狀態。
- 例如：根據 Action 的 type，Reducer 會更新對應的狀態，如新增一個項目到清單中。

# State Access: 使用 useSelector 獲取當前狀態，從 Redux Store 中讀取資料並觸發組件的重新渲染。
- 例如：const items = useSelector(state => state.items);
- useSelector 會返回 Store 中的狀態，並且當狀態變化時，組件會重新渲染。



# 1. Store: 中央化的狀態容器

Store 存儲應用程式的所有狀態，並且透過 `configureStore` 來創建。Store 就像應用程式的大腦，所有狀態都存放在這裡。

# 範例：
```javascript
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { /* your reducers */ },
});
```

# 2. Action: 一個物件，通常包含 type 屬性，有時候會包含其他資料 (payload)。。
```javascript
const increment = { type: 'counter/increment' };
const setUser = { type: 'user/set', payload: { name: 'Alice' } };
```


# 3. Reducer: 純函數根據 Action 更新狀態。(Reducer) 根據 (Action)更新狀態。
```javascript
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'counter/increment':
      return state + 1;
    default:
      return state;
  }
};
```

# 4. Dispatch: 使用 useDispatch hook 發送 Action 到 Store。
```javascript
import { useDispatch } from 'react-redux';

const Component = () => {
  const dispatch = useDispatch();

  const incrementCounter = () => {
    dispatch({ type: 'counter/increment' });
  };

  return <button onClick={incrementCounter}>Increment</button>;
};
```

# 45. State Access: 獲取當前的狀態。
```javascript
import { useSelector } from 'react-redux';

const Component = () => {
  const counter = useSelector((state) => state.counter);

  return <div>Counter: {counter}</div>;
};
```

