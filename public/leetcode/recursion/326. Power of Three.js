/**
 * @param {number} n - 整數
 * @return {boolean} - 返回 n 是否是三的次方
 */
var recursionPowerOfThree = function(n) {
    // 基本條件：如果 n 小於等於 0，就不是三的次方
    if (n <= 0) return false;

    // 基本條件：如果 n 是 1，表示已經是 3 的次方（3^0 = 1）
    if (n === 1) return true;

    // 如果 n 不是 3 的倍數，則直接返回 false
    if (n % 3 !== 0) return false;

    // 遞迴：將 n 除以 3 再檢查是否是三的次方
    return recursionPowerOfThree(n / 3);
};

// 測試用例
console.log(isPowerOfFour(-3));  // 輸出：false，因為負數不能是3的次方
console.log(isPowerOfFour(0));   // 輸出：false，因為 0 不是3的次方
console.log(recursionPowerOfThree(27));  // 輸出：true，因為 27 = 3^3
console.log(recursionPowerOfThree(0));   // 輸出：false，因為 0 不是三的次方
console.log(recursionPowerOfThree(-1));  // 輸出：false，因為負數不能是三的次方
console.log(recursionPowerOfThree(9));   // 輸出：true，因為 9 = 3^2
console.log(recursionPowerOfThree(45));  // 輸出：false，因為 45 不是三的次方




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


