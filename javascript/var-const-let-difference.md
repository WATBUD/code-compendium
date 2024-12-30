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

var (函式作用域)，let/const(區域作用域)，let/const能避免同名變數與提取變數衝突、區塊變數污染全域的情況，且讓 for loop 使用更直覺方便。
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


