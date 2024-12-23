# ES 模組（ECMAScript 模組）和 CommonJS 模組是 JavaScript 中兩種不同的模組系統，它們有一些重要的差異：

# ECMAScript 模組
- package.json文件加入  "type": "module",

# CommonJS 模組
- 對於 CommonJS 模組，在 package.json 文件中不需要額外的設置。因為 CommonJS 是 Node.js 默認的模組系統

語法差異：

ES 模組： 使用 import 和 export 關鍵字來導入和導出模組。
CommonJS 模組： 使用 require() 函數來導入模組，使用 module.exports 或 exports 物件來導出模組。
加載時機：

ES 模組： 靜態加載，模組在程式碼解析階段就會被加載，無法在執行時動態導入模組。
CommonJS 模組： 動態加載，可以在程式碼的任何位置使用 require() 來動態加載模組。
作用域：

ES 模組： 模組中的變數預設是區域作用域，不會污染全域作用域。
CommonJS 模組： 模組中的變數預設是模組作用域，但可以通過 global 物件來暴露到全域作用域。
導出方式：

ES 模組： 可以導出多個值，使用 export 關鍵字來導出變數、函數、類等。
CommonJS 模組： 一次只能導出一個值，通常使用 module.exports 導出單個物件或者使用 exports 物件來導出多個值。
循環依賴處理：

ES 模組： 支援循環依賴，但只能導出空物件或空函數。
CommonJS 模組： 支援循環依賴，可以導出未完整的物件，但在導入時可能會得到未初始化的值。
加載速度：

ES 模組： 由於靜態加載的特性，加載速度更快，因為瀏覽器或 Node.js 可以在程式碼執行之前進行優化。
CommonJS 模組： 動態加載導致加載速度相對較慢，因為需要在執行時解析和加載模組。

總的來說，ES 模組是 ECMAScript 標準的一部分，
具有更先進的特性和更好的性能，
而 CommonJS 模組是 Node.js 早期採用的模組系統，
在 Node.js 中仍然很常見，但是在瀏覽器端逐漸被 ES 模組取代。