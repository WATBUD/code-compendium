/**
 * @param {number} n - 整數
 * @return {boolean} - 返回 n 是否是二的次方
 */
var recursionPowerOfTwo = function(n) {
    // 基本條件：如果 n 小於等於 0，就不是二的次方
    if (n <= 0) return false;

    // 基本條件：如果 n 是 1，表示已經是 2 的次方（2^0 = 1）
    if (n === 1) return true;

    // 如果 n 不是 2 的倍數，則直接返回 false
    if (n % 2 !== 0) return false;

    // 遞迴：將 n 除以 2 再檢查是否是二的次方
    return recursionPowerOfTwo(n / 2);
};

// 測試用例
console.log(recursionPowerOfTwo(-2));  // 輸出：false，因為負數不能是二的次方
console.log(recursionPowerOfTwo(0));   // 輸出：false，因為 0 不是二的次方
console.log(recursionPowerOfTwo(16));  // 輸出：true，因為 16 = 2^2
console.log(recursionPowerOfTwo(1));   // 輸出：true，因為 1 = 2^0
console.log(recursionPowerOfTwo(62));  // 輸出：true，因為 62 = 2^3
console.log(recursionPowerOfTwo(5));   // 輸出：false，因為 5 不是二的次方
console.log(recursionPowerOfTwo(20));  // 輸出：false，因為 20 不是二的次方





/**
 * @param {number} n - 整數
 * @return {boolean} - 返回 n 是否是二的次方
 */
var isPowerOfTwo = function(n) {
    // 如果 n 小於等於 0，就不是二的次方
    if (n <= 0) return false;

    // 不斷除以 2，直到 n 變為 1 或不能整除
    while (n % 2 === 0) {
        n = n / 2;
    }

    // 如果最終 n 是 1，那麼它是二的次方
    return n === 1;
};

// 測試用例
console.log(isPowerOfTwo(16));  // 輸出：true，因為 16 = 2^2
console.log(isPowerOfTwo(1));   // 輸出：true，因為 1 = 2^0
console.log(isPowerOfTwo(62));  // 輸出：true，因為 62 = 2^3
console.log(isPowerOfTwo(5));   // 輸出：false，因為 5 不是二的次方
console.log(isPowerOfTwo(20));  // 輸出：false，因為 20 不是二的次方

