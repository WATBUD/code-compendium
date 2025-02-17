// ### **埃拉托色尼篩法（Sieve of Eratosthenes）**  
// **用來找小於 `n` 的所有質數，時間複雜度 `O(n log log n)`，比 `O(n^1.5)` 快很多。**
// ### **基本概念**
// 1. 建立一個 `isPrime` 陣列，長度為 `n`，初始值全為 `true`（假設全部是質數）。
// 2. 從 `2` 開始，把 `2` 的倍數（`4, 6, 8, ...`）全部標記為 `false`（不是質數）。
// 3. 找到下一個 `true` 的數（質數），例如 `3`，然後把 `3` 的倍數（`6, 9, 12, ...`）標記為 `false`。
// 4. 持續重複，直到 `sqrt(n)` 為止。

 var countPrimes = function(n) {
     if (n <= 2) return 0; // 沒有小於 2 的質數
     let isPrime = new Array(n).fill(true); // 假設所有數都是質數
     isPrime[0] = isPrime[1] = false; // 0 和 1 不是質數
     for (let i = 2; i * i < n; i++) { // 只需篩到 sqrt(n)
         if (isPrime[i]) {
             for (let j = i * i; j < n; j += i) { // i 的倍數全部標記為 false
                 isPrime[j] = false;
             }
         }
     }
     return isPrime.filter(Boolean).length; // 計算 true 的數量
 };
 console.log("countPrimes(10):",countPrimes(10));
 console.log("countPrimes(0):",countPrimes(0));
 console.log("countPrimes(1):",countPrimes(1));
 



// ### **時間與空間複雜度**
// - **時間複雜度：** `O(n log log n)`（比 `O(n^1.5)` 快很多）
// - **空間複雜度：** `O(n)`（因為用了 `isPrime` 陣列）

// ### **篩選過程示範（n = 10）**
// ```
// 初始值:  isPrime = [F, F, T, T, T, T, T, T, T, T]  // 0,1 不是質數
// 篩掉 2 的倍數: isPrime = [F, F, T, T, F, T, F, T, F, T]  // 4,6,8 被篩掉
// 篩掉 3 的倍數: isPrime = [F, F, T, T, F, T, F, T, F, F]  // 9 被篩掉
// 最終結果:       質數 = 2, 3, 5, 7
// ```

// ### **為什麼比 `O(n^1.5)` 快？**
// - `isPrime` 陣列的篩選只需掃一次 `O(n)`。
// - 每個數 `x` 的倍數會被標記 `1 / 2 + 1 / 3 + 1 / 5 + ... ≈ log log n` 次。
// - **總時間 `O(n log log n)`，比 `O(n^1.5)` 快很多！**
// 🚀 **適合大 `n`（如 `n = 10^7`）！** 🚀