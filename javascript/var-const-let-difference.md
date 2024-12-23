```javascript
- 「 var 」 與 「 let / const 」 

ES6 後，從 var 到 let / const
var 是函式作用域，let / const 是區塊作用域
var 與 let ，for 迴圈的綁定（bind）差異
var 的提升與 let / const 不同
var 允許重複宣告，let / const 會出錯


var 與 let / const ，主要有幾項差異：

作用域 (scope) 不同
for 迴圈的綁定 (bind) 差異
變量提升 (hoisting) 不同
重複宣告的差異

var 屬於函式作用域，let/const屬於區域作用域，後者能避免更多情況下的同名變數與提取變數衝突、區塊內變數污染到全域的情況，且讓 for loop 使用更直覺方便。
var 會自動提升變數，let/const 嚴謹，能避免忘記宣告變數或因無宣告讓變數污染到全域的情況。
var 能重複宣告同名變數，let/const 不能重複宣告同名變數，後者能避免些開發上的錯誤情況。

/// 「var」 不受區塊限制，區塊外變數存取成功。///

{
  var corgiDogName = '吐司';
}

console.log(corgiDogName);
//吐司

///「let」會受區塊限制，區塊外變數存取失敗。///
{
  let corgiDogName = '吐司';
}
console.log(corgiDogName);
//ReferenceError: corgiName is not defined

/// 「var」 受函式限制，函式外變數存取失敗。///

function callCorgi() {
  var corgiDogName = '吐司';
}

console.log(corgiDogName);
//ReferenceError: corgiDogName is not defined


JavaScript 是「異步/非同步」語言，因此在等待執行 function() { console.log( i ) ; } 前的這 0.1 秒內，會先執行完已經能執行的 for 迴圈。

setTimeout中的函數是在循環結束後才被調用的
. for (var i = 0; i < 5; i++) {
 setTimeout(() => { 
 console.log(i); 
 }, 1000); 
} 
a. 為什麼結果會顯⽰5顯⽰五次？
b. 為什麼結果是⼀次顯⽰，⽽非間隔⼀秒地顯⽰？
c. 如何修改能間隔⼀秒，每秒顯⽰的是該次的i。


可以使用IIFE（立即執行函數表達式）來創建一個新的作用域
for (var i = 0; i < 3; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 100);
  })(i);
}
