// ### **埃拉托色尼篩法（Sieve of Eratosthenes）**  
// **用來找小於 `n` 的所有質數，時間複雜度 `O(n log log n)`，比 `O(n^1.5)` 快很多。**
// ### **基本概念**
// 1. 建立一個 `isPrime` 陣列，長度為 `n`，初始值全為 `true`（假設全部是質數）。
// 2. 從 `2` 開始，把 `2` 的倍數（`4, 6, 8, ...`）全部標記為 `false`（不是質數）。
// 3. 找到下一個 `true` 的數（質數），例如 `3`，然後把 `3` 的倍數（`6, 9, 12, ...`）標記為 `false`。
// 4. 持續重複，直到 `sqrt(n)` 為止。
//為什麼只檢查到 sqrt(n)
//假設 n 不是質數，那麼它一定可以寫成兩個數的乘積：
//假設 n=36，如果它不是質數，則可能的因數對有
//(1,36),(2,18),(3,12),(4,9),(6,6)
//我們發現，當 a>6 時，b 一定會比 6 小。換句話說，如果 n 不是質數，它的最小因數一定小於等於sqrt(n)
//因為如果n 不是質數，必定有一個因數 ≤ sqrt(n)
//程式碼中的條件 i * i < n 等價於 i < sqrt(n)。
//減少計算次數，讓程式更快，從O(n)優化成O(sqrt(n))
 var countPrimes = function(n) {
     if (n <= 2) return 0; // 沒有小於 2 的質數
     let isPrimeArr = new Array(n).fill(true); // 假設所有數都是質數
     console.log("isPrimeArr:",isPrimeArr);
     isPrimeArr[0] = isPrimeArr[1] = false; // 0 和 1 不是質數

     for (let i = 2; i * i < n; i++) { // 只需篩到 sqrt(n)
        console.log("i",i,"i * i",i * i);

         if (isPrimeArr[i]) {
             for (let j = i * i; j < n; j += i) { // 如果 i 是質數（isPrimeArr[i] === true），則 i 的所有倍數都不是質數，應該標記為 false。
                console.log("j",j,"n",n);
                 isPrimeArr[j] = false;
                 console.log("isPrimeArr[j]",isPrimeArr[j]);
             }
   
         }
     }
     return isPrimeArr.filter(Boolean).length; // 計算 true 的數量
 };
 console.log("countPrimes(10):",countPrimes(10));
 console.log("countPrimes(0):",countPrimes(0));
 console.log("countPrimes(1):",countPrimes(1));
 



// ### **時間與空間複雜度**
// 時間複雜度：厄拉多塞篩法對每個質數 p 標記其所有倍數 n / p 次 總計約為 n * (1 / 2 + 1 / 3 + 1 / 5 + 1 / 7 + ...) 這與調和級數的質數部分相關 可證明其增長速率為 O(n log log n) 
//O(n log log n)（比 O(n) 快很多，但比 O(√n) 慢）
// 空間複雜度：isPrimeArr 陣列存了 n 個 boolean 值，所以 空間複雜度是 O(n)。
// ### **篩選過程示範（n = 10）**
// ```
// 初始值:  isPrime = [F, F, T, T, T, T, T, T, T, T]  // 0,1 不是質數
// 篩掉 2 的倍數: isPrime = [F, F, T, T, F, T, F, T, F, T]  // 4,6,8 被篩掉
// 篩掉 3 的倍數: isPrime = [F, F, T, T, F, T, F, T, F, F]  // 9 被篩掉
// 最終結果:       質數 = 2, 3, 5, 7
// ```

