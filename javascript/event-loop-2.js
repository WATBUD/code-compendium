// # 工作流程
// 每次[事件循環](Event Loop)都會：
// 每當一個宏任務完成後，事件循環會立刻清空[微任務隊列]（Microtasks Queue）佇列，才會開始下一個
// [宏任務]（Macrotasks Queue） * setTimeout * setInterval。
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve(); 
}).then(function () {
  console.log("promise2"); 
});

console.log("script end");














//comment

// async function async1() {
//   console.log("async1 start"); // 同步任務：async1()內立即執行
//   await async2();             // 呼叫 async2()（同步執行）後，await 將下面程式碼放入微任務隊列
//   console.log("async1 end");    // 微任務：await 後續程式碼，等到所有同步程式碼與已排入的微任務執行完後再執行
// }

// async function async2() {
//   console.log("async2");        // 同步任務：async2() 內立即執行
// }

// console.log("script start");    // 同步任務：全域程式碼最先執行

// setTimeout(function () {
//   console.log("setTimeout");    // 宏任務：定時器回調，會在當前所有同步與微任務執行完後執行
// }, 0);

// async1();                       // 呼叫 async1()，立即執行其中的同步部分

// new Promise(function (resolve) {
//   console.log("promise1");      // 同步任務：Promise 執行器內立即執行
//   resolve();                    // 同步呼叫 resolve()，使 .then 回調被加入微任務隊列
// }).then(function () {
//   console.log("promise2");      // 微任務：Promise resolve 後的 .then 回調，會在同步程式碼執行完後立即執行
//   setTimeout(() => {
//     console.log(res);           // 宏任務：此 setTimeout 的回調，延遲執行
//   }, 0);
// });

// console.log("script end");      // 同步任務：全域程式碼後續執行




