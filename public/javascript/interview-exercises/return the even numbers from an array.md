```js

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 使用 filter() 過濾出偶數
const evenNumbers = numbers.filter(num => num % 2 === 0);

console.log(evenNumbers);  // 輸出: [2, 4, 6, 8, 10]