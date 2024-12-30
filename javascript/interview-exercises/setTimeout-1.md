```javascript
JavaScript 是「異步/非同步」語言，因此在等待執行 function() { console.log( i ) ; } 前的這 0.1 秒內，會先執行完已經能執行的 for 迴圈。

setTimeout中的函數是在循環結束後才被調用的
for (var i = 0; i < 5; i++) {
    setTimeout(() => { 
    console.log(i); 
    }, 1000); 
} 
*a. 為什麼結果會顯示 5 顯示五次？
var 是函數作用域導致變量共享。 
let 是塊作用域每次迭代創建新的變量

for 循環是一個同步操作
當 setTimeout 的回調執行時（即事件循環進入任務隊列的時候），for 已經結束，i 的值是 5（最後一次迭代後的值）。
每個 setTimeout 回調函數引用的都是同一個 i，因此在回調執行時，i 始終是最終的值 5。


*b. 為什麼結果是⼀次顯⽰，⽽非間隔⼀秒地顯⽰？
setTimeout 是將回調函數加入到 Macrotask 隊列不會阻塞主線程，並在指定時間後執行
看起來是同時輸出，但其實是幾乎瞬間連續輸出的
回調的執行非常快，並且所有回調在同一個事件循環階段中處理（因為它們都在 Macrotask 隊列中）。
瀏覽器或 Node.js 在執行這些回調時，輸出速度足夠快，人眼無法感知到明顯的間隔，從而看起來像是「一次性」輸出。

*c. 如何修改能間隔⼀秒，每秒顯⽰的是該次的i。
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000); // 每次延遲增加 1000ms
}

可以使用IIFE（立即執行函數表達式）來創建一個新的作用域
for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 100);
  })(i);
}
