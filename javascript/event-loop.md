# JavaScript 是單執行緒（single-threaded），事件循環 (Event Loop) 確保執行順序為：同步任務 > 微任務 (Microtasks) > 宏任務 (Macrotasks)

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

``` javascript
console.log("begins"); //1

setTimeout(() => {
  console.log("setTimeout 1"); //3
  Promise.resolve().then(() => {
    console.log("promise 1"); //4
  });
}, 0);

new Promise(function (resolve, reject) { //屬於同步=>因為 new Promise() 建構函數內的程式碼在同步程式碼階段立即執行，微任務會是 then()、catch()、finally() 的回調
  console.log("promise 2"); //2
  setTimeout(function () {
    console.log("setTimeout 2"); //5 
    resolve("resolve 1"); //call then("resolve 1")
  }, 0);
}).then((res) => {
  console.log("dot then 1");//6
  setTimeout(() => {
    console.log(res);//7
  }, 0);
});
//OutPut:
begins 1(同步程式碼)
promise 2 (來自 new Promise() 的同步程式碼)
setTimeout 3 (來自第一個 setTimeout，在Macrotasks隊列)
promise 4 (來自 Promise.resolve().then()，在Microtask隊列)
setTimeout 5 (來自第二個 setTimeout，在Macrotasks隊列)
dot then 6 (來自 then，在Microtask隊列)
resolve 7 (來自第二個 setTimeout 裡的回調，印出 resolve 1)

async function async1() {
  console.log("async1 start"); //2
  await async2();//3 await 將後續程式碼放入 Microtask 
  console.log("async1 end");//7 Microtask
}

async function async2() {
  console.log("async2"); //3
}

console.log("script start"); //1

setTimeout(function () {
  console.log("setTimeout");//8 Macrotasks
}, 0);

async1(); //2

new Promise(function (resolve) {
  console.log("promise1");//4 Microtask
  resolve(); // 將 `.then` 回調加入微任務隊列 同步代碼執行完成後，事件循環會檢查微任務隊列
}).then(function () {
  console.log("promise2"); //6 Microtask
});

console.log("script end");//5 // 同步代碼

Promise 的 .then() 回調先於 await 的後續程式碼執行，因為 .then() 回調是立即排入微任務，而 await 會讓 async1() 後續程式碼排入微任務，這些回調的處理是有順序的。
//OutPut:
script start        // 1
async1 start        // 2
async2              // 3
promise1            // 4
script end          // 5
promise2            // 6
async1 end          // 7
setTimeout          // 8
