// # 工作流程
// 每次[事件循環](Event Loop)都會：
// 每當一個宏任務完成後，事件循環會立刻清空[微任務隊列]（Microtasks Queue）佇列，才會開始下一個
// [宏任務]（Macrotasks Queue） * setTimeout * setInterval。

console.log("begins");

setTimeout(() => {
  console.log("setTimeout 1");
  Promise.resolve().then(() => {
    console.log("promise 1");
  });
}, 0);

new Promise(function (resolve, reject) {
  console.log("promise 2");
  setTimeout(function () {
    console.log("setTimeout 2");
    resolve("resolve 1");  
  }, 0);
}).then((res) => {
  console.log("dot then 1");
  setTimeout(() => {
    console.log(res);
  }, 0);
});
// OutPut:
// "begins"(同步程式碼)
// "promise 2" (來自 new Promise() 的同步程式碼)
// "setTimeout 1" (來自第一個 setTimeout，在Macrotasks隊列)
// "promise 1" (來自 Promise.resolve().then()，在Microtask隊列)
// "setTimeout 2" (來自第二個 setTimeout，在Macrotasks隊列)
// "dot then 1" (來自 then，在Microtask隊列)
// 'resolve 1" (來自第二個 setTimeout 裡的回調，印出 resolve 1) //.then 回調會被加入微任務隊列


//comment

// console.log("begins");                     // 同步任務：立即執行

// setTimeout(() => {                         // 宏任務：定時器任務 (0 毫秒延遲)
//   console.log("setTimeout 1");              // 宏任務內的同步執行
//   Promise.resolve().then(() => {           // 微任務：在當前宏任務結束後立即執行
//     console.log("promise 1");               // 微任務內的同步執行
//   });
// }, 0);

// new Promise(function (resolve, reject) {   // 同步任務：Promise 建構式執行器 (立即執行)
//   console.log("promise 2");                 // 同步任務：立即執行
//   setTimeout(function () {                  // 宏任務：定時器任務 (0 毫秒延遲)
//     console.log("setTimeout 2");            // 宏任務內的同步執行
//     resolve("resolve 1");                   // 同步執行：改變 Promise 狀態，觸發 .then 微任務
//   }, 0);
// }).then((res) => {                          // 微任務：Promise resolve 後的 .then 回調被加入微任務隊列
//   console.log("dot then 1");                // 微任務內的同步執行
//   setTimeout(() => {                        // 宏任務：定時器任務 (0 毫秒延遲)
//     console.log(res);                       // 宏任務內的同步執行
//   }, 0);
// });




