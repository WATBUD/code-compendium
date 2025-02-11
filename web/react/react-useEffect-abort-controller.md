# React useEffect 與 AbortController 完整指南

## 目錄
- [什麼是 AbortController?](#什麼是-abortcontroller)
- [基本用法](#基本用法)
- [在 React 中使用](#在-react-中使用)
- [最佳實踐](#最佳實踐)
- [常見問題與解決方案](#常見問題與解決方案)

## 什麼是 AbortController?

AbortController 是瀏覽器原生提供的 Web API，用於取消尚未完成的異步操作，例如：
- 網路請求 (fetch)
- DOM 事件監聽
- WebSocket 連接
- 自定義的異步操作

它的主要優點是：
- 原生支援，無需額外安裝
- 使用簡單直觀
- 可以同時取消多個操作
- 與現代前端框架完美整合

## 基本用法

以下是 AbortController 的基本使用方式：

```javascript
// 1. 創建控制器
const controller = new AbortController();
const signal = controller.signal;

// 2. 使用 signal 發起請求
fetch('https://api.example.com/data', {
  signal: signal  // 將 signal 傳給 fetch
})
.then(response => response.json())
.catch(err => {
  if (err.name === 'AbortError') {
    console.log('請求已被取消');
  } else {
    console.error('其他錯誤:', err);
  }
});

// 3. 需要時取消請求
controller.abort();
```

## 在 React 中使用

### 基礎組件示例

```javascript
import { useEffect } from 'react';

function DataFetcher() {
  useEffect(() => {
    // 創建新的 controller 實例
    const controller = new AbortController();

    async function fetchData() {
      try {
        const response = await fetch('https://api.example.com/data', {
          signal: controller.signal
        });
        
        const data = await response.json();
        // 處理數據...
        
      } catch (error) {
        if (error.name === 'AbortError') {
          // 優雅處理取消的情況
          console.log('請求已被取消');
          return;
        }
        // 處理其他錯誤
        console.error('請求錯誤:', error);
      }
    }

    fetchData();

    // 清理函數
    return () => {
      controller.abort();
    };
  }, []); // 空依賴陣列

  return <div>資料載入中...</div>;
}
```

### 自定義 Hook 版本

```javascript
function useDataFetcher(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, {
          signal: controller.signal
        });
        
        const result = await response.json();
        setData(result);
        
      } catch (error) {
        if (error.name === 'AbortError') {
          return; // 忽略已取消的請求
        }
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, error, loading };
}
```

## 最佳實踐

1. **始終在 useEffect 清理函數中調用 abort()**
```javascript
useEffect(() => {
  const controller = new AbortController();
  // ... 發起請求 ...
  return () => controller.abort();
}, []);
```

2. **正確處理錯誤情況**
```javascript
try {
  // ... 發起請求 ...
} catch (error) {
  if (error.name === 'AbortError') {
    // 處理取消情況
    return;
  }
  // 處理其他錯誤
}
```

3. **避免在已取消的請求上更新狀態**
```javascript
let isMounted = true;

try {
  const data = await fetchData();
  if (isMounted) {
    setData(data);
  }
} finally {
  isMounted = false;
}
```

## 常見問題與解決方案

### Q: 為什麼需要取消請求？
A: 在以下情況需要取消請求：
- 組件卸載時避免記憶體洩漏
- 用戶快速切換頁面時取消不必要的請求
- 實現搜索防抖時取消過時的請求

### Q: AbortController 可以重複使用嗎？
A: 不可以。一旦調用 `abort()`，就需要創建新的實例。

### Q: 如何處理多個請求？
A: 每個請求都需要新的 AbortController 實例：
```javascript
const controllers = new Map();

// 發起請求
function startRequest(id) {
  const controller = new AbortController();
  controllers.set(id, controller);
  
  fetch(url, { signal: controller.signal });
}

// 取消特定請求
function cancelRequest(id) {
  const controller = controllers.get(id);
  if (controller) {
    controller.abort();
    controllers.delete(id);
  }
}
```

---

記住：AbortController 是現代瀏覽器的標準功能，但如果需要支援舊版瀏覽器，請考慮使用 polyfill。