# JavaScript 是單執行緒（single-threaded），
事件循環 (Event Loop) 確保執行順序為：同步任務 > 微任務 (Microtasks) > 宏任務 (Macrotasks)

# 微任務 (Microtasks) (異步(asynchronous))
Microtasks 上下文結束後立即執行的任務，通常>Macrotasks。
例子：
* Promise/.then
* MutationObserver
* queueMicrotask
* await 的行為會將後續的程式碼（即 .then() 回調）放入 Microtasks（微任務）隊列中


# 宏任務 (Macrotasks) (異步(asynchronous))
Macrotasks 等待主線程空閒後執行
例子：
* setTimeout
* setInterval
* I/O 操作
* setImmediate（Node.js 特有）

# 工作流程
每次[事件循環](Event Loop)都會：
清空[微任務隊列]（Microtasks Queue）。
執行下個[宏任務]（Macrotasks Queue）。


