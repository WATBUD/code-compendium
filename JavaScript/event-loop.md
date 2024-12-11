# 微任務 (Microtasks)
Microtasks 上下文結束後立即執行的任務，通常>Macrotasks。
例子：
* Promise/.then
* MutationObserver
* queueMicrotask

# 宏任務 (Macrotasks)
Macrotasks 一組較大的任務，等待主線程空閒後執行。
例子：
* setTimeout
* setInterval
* I/O 操作
* setImmediate（Node.js 特有）

工作流程（Event Loop）
每次事件循環都會：
清空微任務隊列（Microtasks Queue）。
執行下一個宏任務（Macrotasks Queue）。


``` javascript
console.log("begins"); //1

setTimeout(() => {
  console.log("setTimeout 1"); //3
  Promise.resolve().then(() => {
    console.log("promise 1"); //4
  });
}, 0);

new Promise(function (resolve, reject) {
  console.log("promise 2"); //2
  setTimeout(function () {
    console.log("setTimeout 2"); //5 
    resolve("resolve 1"); //作用是將 Promise 的 .then() 回調加入 Microtask 隊列 
  }, 0);
}).then((res) => {
  console.log("dot then 1");
  setTimeout(() => {
    console.log(res);
  }, 0);
});
//OutPut:
begins
promise 2
setTimeout 1
promise 1
setTimeout 2
dot then 1
resolve 1

# JavaScript 是單執行緒，事件循環 (Event Loop) 確保執行順序為：同步任務 > 微任務 (Microtasks) > 宏任務 (Macrotasks)
async function async1() {
  console.log("async1 start"); //2
  await async2();//start 3 同步執行 async2()，await 將後續程式碼放入 Microtask 
  console.log("async1 end");//放到Microtask
}

async function async2() {
  console.log("async2"); //3
}

console.log("script start"); //1

setTimeout(function () {
  console.log("setTimeout");//7 Macrotasks
}, 0);

async1(); //start 2

new Promise(function (resolve) {
  console.log("promise1");//4 立即執行，同步代碼
  resolve(); // 將 `.then` 回調加入微任務隊列 同步代碼執行完成後，事件循環會檢查微任務隊列
}).then(function () {
  console.log("promise2"); //6 Microtask
});

console.log("script end");//5 // 同步代碼
//OutPut:
script start
async1 start
async2
promise1
script end
async1 end
promise2
setTimeout
