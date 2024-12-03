```js

const numbers = [1, 2, 3, 4];
const total = numbers.reduce((acc, num) => {
  return acc + num;
}, 0);

console.log(total); // 10


步驟：

初始值 acc = 0。
第一次迴圈：acc = 0 + 1 → acc = 1。
第二次迴圈：acc = 1 + 2 → acc = 3。
第三次迴圈：acc = 3 + 3 → acc = 6。
第四次迴圈：acc = 6 + 4 → acc = 10。
最後，結果是 10。