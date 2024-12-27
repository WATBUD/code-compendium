/**
 * @param {number} n - 整數
 * @return {boolean} - 返回 n 是否是三的次方
 */
var isPowerOfThree = function(n) {
    // 如果 n 小於等於 0，就不是三的次方
    if (n <= 0) return false;

    // 不斷除以 3，直到 n 變為 1 或不能整除
    while (n % 3 === 0) {
        n = n / 3;
    }

    // 如果最終 n 是 1，那麼它是三的次方
    return n === 1;
};

console.log(isPowerOfThree(27));  // 輸出：true，因為 27 = 3^3
console.log(isPowerOfThree(0));   // 輸出：false，因為 0 不是三的次方
console.log(isPowerOfThree(-1));  // 輸出：false，因為負數不能是三的次方
console.log(isPowerOfThree(9));   // 輸出：true，因為 9 = 3^2
console.log(isPowerOfThree(45));  // 輸出：false，因為 45 不是三的次方
