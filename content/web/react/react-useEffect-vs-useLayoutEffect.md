
## `useLayoutEffect` 與 `useEffect` 的區別

1. **執行時機**：
   - `useEffect` 在畫面渲染後執行，屬於瀏覽器的閒暇時間（idle time）。
   - `useLayoutEffect` 瀏覽器完成布局和樣式計算後，還未繪製畫面之前執行，直到所有邏輯處理完畢前會阻止瀏覽器進行重繪。

2. **性能考量**：
   - `useEffect` 是非阻塞性操作，不會影響畫面的渲染。
   - `useLayoutEffect` 是阻塞性操作，會延遲畫面渲染，所以如果不是必須要在畫面更新前進行某些操作，建議避免使用。


## `useEffect` 是什麼？
需要執行具有副作用（side effect）的操作時，
例如發送 API 請求或使用第三方函式庫，應該放在 `useEffect` 中執行。，
- useEffect 只能在組件的頂層呼叫，不能放在迴圈、條件語句或巢狀函式中。
- useEffect 接受兩個參數：`setup function` 和 `dependencies`（可選）。
- `setup function`：這是要執行副作用的函式，會在組件渲染後執行。
- `dependencies`（可選）：這是一個依賴陣列，指定當某些值改變時，useEffect 會重新執行。若不提供這個參數，useEffect 會在每次渲染後執行。

## `useLayoutEffect` 是什麼？
`useLayoutEffect` 會造成性能問題因為在 `useLayoutEffect` 會阻礙瀏覽器重繪 (repaints)，在 DOM 重繪 (repaints) 之前執行。
`useEffect`，瀏覽器可以在渲染後進行 DOM 更新，從而不會阻礙畫面重繪


## `useEffect` 執行時機
- **當元件被加入時 (mount)**，`useEffect` 會被第一次執行。
- **每次元件重新渲染時**，如果 `dependencies` 的值有改變，先將舊的 props 和 state 執行 cleanup function，再帶著新的 props 和 state 執行 setup function。
- **清除函數**，會在元件生命週期結束 (unmount) 時，執行最後一次。

### 使用 `useEffect`，畫面重新渲染時都會閃爍要怎麼解？
解法：嘗試將 `useEffect` 換成使用 `useLayoutEffect`。

- **setup function**：包含如何連結外部系統的程式碼，如果需要清除邏輯，可以在 `setup function` 中回傳一個清除 function。
- **dependencies**：`dependencies` 參數是可選的陣列，可以傳入 props、state 或元件中任何使用的變數。React 會使用 `Object.is` 算法來進行比較。如果 `dependencies` 中任意一個值與前一次不同，則此 `useEffect` 會重新執行。

```javascript
import { useEffect } from "react";
import { createConnection } from "./blog.js";

function Article({ articleId }) {
  const [serverUrl, setServerUrl] = useState("https://blog.com/0");

  useEffect(() => {
    const connection = createConnection(serverUrl, articleId);
    connection.connect();

    // 回傳 cleanup function
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, articleId]);
}
```



