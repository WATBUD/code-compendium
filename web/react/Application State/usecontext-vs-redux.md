# `useContext` 與 `Redux` 的差異
`useContext` 和 `Redux` 是在 React 管理狀態的方式

### useContext [React 16.3] 引入，組件能夠訂閱 React Context


### **`useContext`**
`useContext` React Context API `Provider` 傳遞狀態：
`useReducer` React 16.8 
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
當應用中有多個狀態（如主題、認證、語言等）時，可以使用 combineReducers 將多個 Reducer 合併為一個總的 Reducer，而不需要為每個狀態分配一個獨立的 Provider。
```javascript
import { combineReducers, createStore } from 'redux';

const rootReducer = combineReducers({
    theme: themeReducer,
    auth: authReducer,
});

const store = createStore(rootReducer);

```

### Provider Hell 
combineReducers 可以將管理邏輯拆分，每個 reducer 只負責處理自己的部分，當該部分狀態改變時，只有相關的組件會重新渲染。
合併的 Context 中的任何一部分數據（如 auth）改變時，整個 AppContext.Provider 的值會更新，這會導致所有使用 useContext(AppContext) 的組件重新渲染，即使它們只需要其中的某一部分數據（如 theme）

### **`useContext`**

[優勢]:內建於 React，輕量無需額外安裝 適合小型應用少量共享狀態。
[劣勢]:狀態頻繁更新可能導致所有使用該 Context 的組件重渲染
       缺乏[結構化/擴展性]，難以處理大型、複雜的狀態管理需求              
       無法方便地進行狀態追踪或調試（不像 Redux 有 DevTools）

### **`Redux`**
| 優勢                              | 劣勢                                                                 |
|-----------------------------------|----------------------------------------------------------------------|
| 適合大型應用，支持複雜的全局狀態管理。 | 配置較為繁瑣，尤其對於小型應用來說可能過於複雜。                              |
| Redux DevTools 提供強大的調試功能。| 需要學習額外概念（如 actions, reducers, middleware）。               |
| 狀態結構清晰，支持不可變數據管理。   | boilerplate（樣板程式碼）較多，對簡單場景顯得笨重。                                |
| 支持中間件（如 Thunk, Saga）處理異步邏輯。| 外部依賴多（需額外安裝 Redux 和相關工具庫）。                          |

## 適用場景對比
| 使用場景                        | 適合使用 `useContext`                                | 適合使用 `Redux`                                      |
|--------------------------------|----------------------------------------------------|-----------------------------------------------------|
| **狀態共享規模**                | 小型應用，狀態共享簡單，且無需頻繁更新。                   | 中大型應用，需要管理多個模塊的複雜全局狀態。                 |
| **狀態更新頻率**                | 更新頻率較低，對性能要求不高。                          | 高頻更新，需要控制細粒度的狀態變更（如部分組件重渲染）。       |
| **數據流管理需求**              | 簡單的數據傳遞（主題、語言、用戶狀態）。                 | 需要明確的狀態管理流程（如數據表單、認證、應用全局設置）。      |
| **學習曲線**                    | 適合初學者，開箱即用。                               | 需要熟悉 Redux 概念，適合熟練的開發者。                    |
| **異步邏輯**                    | 適合簡單場景，如用 React 的 useState 配合處理。           | 適合處理複雜的異步操作（如 API 請求隊列、任務流程）。          |
中型應用使用`useReducer` 搭配 `useContext` 作為輕量級替代方案，結合兩者的優勢。
