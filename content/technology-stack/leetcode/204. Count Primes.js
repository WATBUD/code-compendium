// 質數（Prime Numbers）是指在大於1的自然數中，除了1和它本身之外，沒有其他正整數因數的數。例如，2、3、5、7、11等都是質數。
// **檢查是否有其他因數**：
//    ```javascript
//    for (let i = 2; i * i <= num; i++) {
//        if (num % i === 0) {
//            return false;
//        }
//    }
//    ```
// - 使用一個從2開始的迴圈，迴圈變量 `i` 遍歷從2到 `√num` 的所有數。
// - `i * i <= num` 是因為，如果一個數 `num` 有因數，那麼這些因數中至少有一個會小於或等於 `√num`。這樣可以減少迴圈次數，提高效率。
// - 在每次迴圈中，檢查 `num` 是否能被 `i` 整除（`num % i === 0`）。如果能夠整除，則說明 `num` 有其他因數，不是質數，返回 `false`。

var countPrimes = function (n) {
    function isPrime(num) {
        if (num < 2) {
            return false; // 小於2的數都不是質數
        }
        console.log(`isPrime:`,`num:`,num); 
        for (let i = 2; i * i <= num; i++) {
            console.log(`num:`,num,` i:`,i,` i * i:`,i * i,`=> ${num} % ${i}`,num % i);
            if (num % i === 0) {
                return false; // 如果num能被i整除，則num不是質數
            }
        }
        return true; // 如果沒有找到任何因數，則num是質數
    }
    let primeList = [];
    for (let i = 0; i < n; i++) {
        if (isPrime(i)) {
            primeList.push(i)
        }
    }
    console.log("primeList",primeList);

    return primeList.length;
};
// Test the function
console.log("countPrimes(10):",countPrimes(10));
// console.log("countPrimes(0):",countPrimes(0));
// console.log("countPrimes(1):",countPrimes(1));



// ### **時間與空間複雜度分析**
// ```js
// var countPrimes = function (n) {
//     function isPrime(num) {
//         if (num < 2) return false;
//         for (let i = 2; i * i <= num; i++) {
//             if (num % i === 0) return false;
//         }
//         return true;
//     }

//     let primeList = [];
//     for (let i = 0; i < n; i++) {
//         if (isPrime(i)) {
//             primeList.push(i);
//         }
//     }

//     return primeList.length;
// };
// ```

// ---

// ### **時間複雜度（Time Complexity）**
// 1. **判斷某個數 `num` 是否為質數** (`isPrime(num)`)：
//    - 內部 `for` 迴圈的範圍是 `i * i ≤ num`，所以最多執行 `O(√num)`

// 2. **外部迴圈跑 `n` 次**：**最終時間複雜度：**  O(n^1.5)
//    - 這是一個**非常慢**的時間複雜度，尤其當 `n` 很大時。

// ### **空間複雜度（Space Complexity）**
// - **`primeList` 陣列儲存所有質數**：
//   - 最壞情況（假設 `n` 很大），**質數的個數約為 `n / log(n)`**（質數定理）。
//   - 這樣 `primeList` 需要 `O(n / log(n))` 的空間。
// - **最終空間複雜度：O(n)

// ---

// ### **優化建議**
// 你的方法時間複雜度過高，對於 `n` 很大時會很慢。  
// 更好的解法是使用**埃拉托色尼篩法（Sieve of Eratosthenes）**，可以把時間複雜度降到 `O(n log log n)`，空間 `O(n)`。

