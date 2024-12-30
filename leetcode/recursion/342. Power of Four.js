/**
 * @param {number} n - 整數
 * @return {boolean} - 返回 n 是否是四的次方
 */
var recursionPowerOfFour = function(n) {
    // 基本條件：如果 n 小於等於 0，就不是四的次方
    if (n <= 0) return false;

    // 基本條件：如果 n 是 1，表示已經是 4 的次方（4^0 = 1）
    if (n === 1) return true;

    // 如果 n 不是 4 的倍數，則直接返回 false
    if (n % 4 !== 0) return false;

    // 遞迴：將 n 除以 4 再檢查是否是四的次方
    return recursionPowerOfFour(n / 4);
};

// 測試用例
console.log(isPowerOfFour(-4));  // 輸出：false，因為負數不能是四的次方
console.log(isPowerOfFour(0));   // 輸出：false，因為 0 不是四的次方
console.log(recursionPowerOfFour(16));  // 輸出：true，因為 16 = 4^2
console.log(recursionPowerOfFour(1));   // 輸出：true，因為 1 = 4^0
console.log(recursionPowerOfFour(64));  // 輸出：true，因為 64 = 4^3
console.log(recursionPowerOfFour(5));   // 輸出：false，因為 5 不是四的次方
console.log(recursionPowerOfFour(20));  // 輸出：false，因為 20 不是四的次方





/**
 * @param {number} n - 整數
 * @return {boolean} - 返回 n 是否是四的次方
 */
var isPowerOfFour = function(n) {
    // 如果 n 小於等於 0，就不是四的次方
    if (n <= 0) return false;

    // 不斷除以 4，直到 n 變為 1 或不能整除
    while (n % 4 === 0) {
        n = n / 4;
    }

    // 如果最終 n 是 1，那麼它是四的次方
    return n === 1;
};

// 測試用例
console.log(isPowerOfFour(16));  // 輸出：true，因為 16 = 4^2
console.log(isPowerOfFour(1));   // 輸出：true，因為 1 = 4^0
console.log(isPowerOfFour(64));  // 輸出：true，因為 64 = 4^3
console.log(isPowerOfFour(5));   // 輸出：false，因為 5 不是四的次方
console.log(isPowerOfFour(20));  // 輸出：false，因為 20 不是四的次方

