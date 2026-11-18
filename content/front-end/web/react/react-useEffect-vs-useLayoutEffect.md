
## `useLayoutEffect` 與 `useEffect` 的區別

1. **執行時機**：
   - `useEffect` 在 React 把變更寫入 DOM（commit）之後排程執行，**通常在瀏覽器繪製畫面之後**；它不是等瀏覽器「閒暇時間（idle time）」才跑。由使用者操作（例如點擊）觸發的更新，React 18 起可能在繪製前就同步執行完 effect，所以不能依賴它一定在繪製後或繪製前。
   - `useLayoutEffect` 在 DOM 更新完成、瀏覽器還沒繪製之前執行，會阻止瀏覽器繪製直到裡面的邏輯（以及它觸發的 setState 重新渲染）處理完畢。

2. **性能考量**：
   - `useEffect` 不阻塞繪製，畫面可以先顯示。
   - `useLayoutEffect` 會阻塞繪製、延遲畫面出現，所以如果不是必須在畫面繪製前完成的操作（例如量測 DOM 再調整位置），建議避免使用。


## `useEffect` 是什麼？
需要執行具有副作用（side effect）的操作時，
例如發送 API 請求或使用第三方函式庫，應該放在 `useEffect` 中執行。
- useEffect 只能在組件的頂層呼叫，不能放在迴圈、條件語句或巢狀函式中。
- useEffect 接受兩個參數：`setup function` 和 `dependencies`（可選）。
- `setup function`：這是要執行副作用的函式，會在組件渲染後執行。
- `dependencies`（可選）：這是一個依賴陣列，指定當某些值改變時，useEffect 會重新執行。若不提供這個參數，useEffect 會在每次渲染後執行。

## `useLayoutEffect` 是什麼？
`useLayoutEffect` 在瀏覽器繪製 (paint) 之前執行，會阻礙繪製，用太多或做太重的事會造成卡頓。
`useEffect` 則讓瀏覽器先把 DOM 更新畫出來，不會阻礙繪製。


## `useEffect` 執行時機
- **當元件被加入時 (mount)**，`useEffect` 會被第一次執行。
- **每次元件重新渲染時**，如果 `dependencies` 的值有改變，先用舊的 props 和 state 執行 cleanup function，再帶著新的 props 和 state 執行 setup function。
- **清除函數**，會在元件生命週期結束 (unmount) 時，執行最後一次。

> 「useEffect 量測 DOM 後 setState，畫面閃一下」的問題與 `useLayoutEffect` 解法，已移到優化案例：`optimization-cases/react-useeffect-flicker-uselayouteffect.html`。

### `useEffect` 的參數
- **setup function**：包含如何連結外部系統的程式碼，如果需要清除邏輯，可以在 `setup function` 中回傳一個清除 function。
- **dependencies**：`dependencies` 參數是可選的陣列，可以傳入 props、state 或元件中任何使用的變數。React 會使用 `Object.is` 算法來進行比較。如果 `dependencies` 中任意一個值與前一次不同，則此 `useEffect` 會重新執行。

```javascript
import { useEffect, useState } from "react";
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
