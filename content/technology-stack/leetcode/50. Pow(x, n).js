/**
 * @param {number} x - 基數
 * @param {number} n - 指數
 * @return {number} - x 的 n 次方
 */
var myPow = function(x, n) {
    // 處理 n 為 0 的情況
    if (n === 0) return 1;  // 任意數的 0 次方都是 1

    // 如果 n 是負數，則將 x 變為 1/x，並將 n 變為正數
    if (n < 0) {
        x = 1 / x;
        n = -n;  // 把 n 變成正數
    }

    let result = 1;  // 結果初始化為 1

    // 快速冪的核心思想：二分法
    while (n > 0) {
        // 如果 n 是奇數，則將當前的 x 乘到結果中
        if (n % 2 === 1) {
            result *= x;
        }
        // x 自己自乘一次，相當於平方 x
        x *= x;
        // n 右移一位，相當於 n 除以 2
        n = Math.floor(n / 2);
    }

    return result;
};



console.log(myPow(2.00000, 10));  // 輸出：1024.00000
console.log(myPow(2.10000, 3));   // 輸出：9.26100
console.log(myPow(2.00000, -2));  // 輸出：0.25000
