// 當事件迴圈執行時，會先處理宏任務（macrotask），例如 setTimeout、setInterval、I/O 操作。

// 宏任務執行完後，才會開始處理微任務（microtask），例如 Promise.then、MutationObserver。

async function asyncA() { 
  console.log('async 1')  // 屬於初始宏任務（script 執行）
  await asyncB()          // 建立一個 Promise，等待其解析
  console.log('async 2')  // 微任務：await 之後的代碼
} 

async function asyncB() { 
  console.log('async 3')  // 屬於初始宏任務（script 執行）
  new Promise((resolve, reject) => { 
    console.log('promise 7')  // 屬於初始宏任務（script 執行）
    resolve()                 // 將 Promise 狀態設為 resolved
  }).then(() => { 
    console.log('promise 8')  // 微任務：Promise.then 回調
  }).finally(() => { 
    console.log('promise 9')  // 微任務：Promise.finally 回調
  }) 
  console.log('async 4')  // 屬於初始宏任務（script 執行）
}

asyncA()  // 啟動整個非同步流程

// 執行順序：
// --- 第一個宏任務（script 執行）開始 ---
// 1. console.log('async 1')
// 2. asyncB() 開始執行
// 3. console.log('async 3')
// 4. 創建新 Promise 並執行其回調函數
// 5. console.log('promise 7')
// 6. resolve() 將 Promise 狀態設為已解析
// 7. console.log('async 4')
// --- 第一個宏任務結束，開始處理微任務隊列 ---
// 8. 執行 .then() 回調: console.log('promise 8')
// 9. 執行 await 之後的代碼: console.log('async 2')
// 10. 執行 .finally() 回調: console.log('promise 9')
// --- 所有微任務處理完畢，事件循環繼續 ---