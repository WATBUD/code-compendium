## 防抖（Debounce）與節流（Throttle）

### 1. 防抖（Debounce）
防抖是一種控制函式執行頻率的技術，確保函式在**最後一次觸發後**的一段時間內才會執行。若在等待時間內再次觸發，計時器會重新計時。

#### **應用場景**
- **輸入框搜尋建議（Autocomplete）**
  - 使用者輸入時，每次按鍵都會觸發請求，但我們希望等使用者**停止輸入後**再發送請求，減少不必要的 API 請求。
- **調整視窗大小（resize）事件**
  - 頻繁改變視窗大小會觸發大量 `resize` 事件，導致計算負擔過重。我們可以等用戶**停止調整視窗後**再執行計算。
- **表單驗證**
  - 當使用者輸入內容時，即時驗證但避免重複請求。

#### **程式碼示例（JavaScript 防抖）**
```javascript
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// 使用範例
const handleSearch = debounce((query) => {
  console.log("搜尋請求:", query);
}, 500);

document.getElementById("searchInput").addEventListener("input", (event) => {
  handleSearch(event.target.value);
});
```

---

### 2. 節流（Throttle）
節流是指**確保某個函式在指定的時間內只執行一次**，即使它在該時間段內被多次觸發。

#### **應用場景**
- **按鈕點擊事件**
  - 防止使用者在短時間內連續點擊按鈕，導致多次提交請求（例如購物車下單）。
- **滑鼠滾動（scroll）事件**
  - 避免頻繁觸發滾動監聽函式，例如載入無限滾動內容。
- **鍵盤長按事件**
  - 在鍵盤長按時，每隔一段時間執行一次函式，而不是每次都執行。

#### **程式碼示例（JavaScript 節流）**
```javascript
function throttle(func, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// 使用範例
const handleScroll = throttle(() => {
  console.log("滾動事件觸發");
}, 1000);

window.addEventListener("scroll", handleScroll);
```

---

### **防抖 vs 節流**
|  | **防抖（Debounce）** | **節流（Throttle）** |
|---|---|---|
| **執行時機** | 最後一次觸發後的延遲時間內沒有再觸發才執行 | 固定時間內最多執行一次 |
| **適用場景** | 使用者輸入、調整視窗大小等 | 滾動、點擊、拖動等高頻事件 |
| **關鍵概念** | 只在停止觸發後才執行 | 限制函式執行頻率 |

---

### **總結**
- **防抖（Debounce）** 適合用於**使用者輸入類事件**，確保函式只在最後一次觸發後執行。
- **節流（Throttle）** 適合用於**滾動、拖動、點擊等高頻事件**，確保函式在固定時間內最多執行一次，提升效能。

