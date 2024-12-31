
// The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, 
//such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

// F(0) = 0, F(1) = 1
// F(n) = F(n - 1) + F(n - 2), for n > 1.
// Given n, calculate F(n).

// 使用遞迴計算 Fibonacci 數列
function fib(n) {
    // 基礎情況：如果 n 是 0 或 1，直接返回 n
    if (n === 0) return 0;
    if (n === 1) return 1;
    // 遞迴情況：F(n) = F(n-1) + F(n-2)
    return fib(n - 1) + fib(n - 2);
}
// Input: n = 2
// Output: 1
// Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
// Input: n = 3
// Output: 2
// Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
// Input: n = 4
// Output: 3
// Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
// 測試案例
console.log(fib(2)); // 輸出: 1 (F(2) = 1)
console.log(fib(3)); // 輸出: 2 (F(3) = 2)
console.log(fib(4)); // 輸出: 3 (F(4) = 3)
