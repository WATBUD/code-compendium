# `useContext` 與 `Redux` 的差異
`useContext` 和 `Redux` 是在 React 管理狀態的方式

### useContext [React 16.3] 引入，組件能夠訂閱 React Context


### **`useContext`**
`useContext`/`useReducer` 
React 版本：16.8.0
發布日期：2019 年 2 月 6 日
```javascript
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemedButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}
    >
      Toggle Theme
    </button>
  );
};

const App = () => (
  <ThemeProvider>
    <ThemedButton />
  </ThemeProvider>
);

export default App;
```

### **`Redux`**
`Redux` 通過 `store` 管理全局狀態，使用 `action` 和 `reducer` 處理狀態變化：

```javascript
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';

// Reducer
const initialState = { theme: 'light' };
const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
};

// Store
const store = createStore(themeReducer);

const ThemedButton = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
      style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}
    >
      Toggle Theme
    </button>
  );
};

const App = () => (
  <Provider store={store}>
    <ThemedButton />
  </Provider>
);

export default App;
```

### Provider Hell
1. Redux 使用單一 Provider
Redux 通常只需要一個 Provider，將全局狀態一次性注入應用程式，避免了多層嵌套的問題。
```javascript
import { Provider } from 'react-redux';
import store from './store';
const App = () => (
  <Provider store={store}>
    <MainComponent />
  </Provider>
);
```
### useContext 的 Provider Hell 問題
2. 當需要管理多個狀態（例如主題、語言、認證等）時，使用多個 Context 會導致代碼中出現深層嵌套：
```javascript
const App = () => (
  <ThemeProvider>
    <AuthProvider>
      <LanguageProvider>
        <SomeComponent />
      </LanguageProvider>
    </AuthProvider>
  </ThemeProvider>
);
```
## Reducer => combineReducers :解決 Provider Hell 的方案
- 每個 Reducer 負責管理特定狀態的一部分：
```javascript
const themeReducer = (state = 'light', action) => {
    switch (action.type) {
        case 'SET_THEME':
            return action.payload;
        default:
            return state;
    }
};

const authReducer = (state = { isLoggedIn: false }, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoggedIn: true };
        case 'LOGOUT':
            return { ...state, isLoggedIn: false };
        default:
            return state;
    }
};

```
# combineReducers
當應用中有多個狀態（如主題、認證、語言等）時，combineReducers 將多個 Reducer 合併為一個總的 Reducer，而不需要為每個狀態分配一個獨立的 Provider。
```javascript
import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
});

const store = createStore(rootReducer);

```

### Provider Hell 
combineReducers:可以將管理邏輯拆分，每個 reducer 只負責處理自己的部分，部分狀態改變時，只有相關的組件會重新渲染。
useContext:合併的Context的任何部分數據（如 auth）改變時，整個 AppContext.Provider值會更新，導致所有使用 useContext(AppContext) 的組件重新渲染，即使它們只需要其中的某一部分數據（如 theme）

### **`useContext`**

[優勢]:
React內建Api，無需額外安裝 適合小型應用少量共享狀態。
[劣勢]:
狀態頻繁更新可能導致所有使用該 Context 的組件重渲染
使用 useContext 時，如果 Context 的值更新，所有使用該 Context 的子組件都會重新渲染，即使它們實際上並不需要更新的數據
解決方案：可以通過將 Context 的值拆分為更細的粒度，或者搭配 useMemo、useReducer 等方式減少不必要的渲染。
無法方便地進行狀態追踪或調試（不像 Redux 有 DevTools）

### **`Redux`**
[優勢]:
適合大型應用，支持複雜的全局狀態管理
Redux DevTools 提供強大的調試功能
支持中間件（如 Thunk, Saga）處理異步邏輯
不可變數據（Immutable Data）。每次狀態更新時，會創建一個新的狀態樹，舊的狀態樹保持不變。
淺比較（shallow equality check）確定哪部分狀態改變，從而觸發相關組件的重渲染。
選擇性訂閱（Selective Subscription） useSelector 或 connect 會讓組件僅訂閱它需要的狀態片段，而非整個狀態樹。

[劣勢]: 
外部依賴多（需額外安裝 Redux 和相關工具庫）
boilerplate（樣板程式碼）較多，對簡單場景顯得笨重。 
需要學習額外概念（如 actions, reducers, middleware）。
配置繁瑣對於小型過於複雜

