/**
 * @param {number} n
 * @return {number}
 */
var countGoodNumbers = function(n) {
    //由於 n 可能非常大（最大可達 10^15），所以結果可能非常大。在這種情況下，我們需要對結果進行取模操作，通常選擇一個大質數 10^9 + 7
    const MOD = 1000000007;

    // 記錄已計算過的結果（備忘錄），避免重複計算
    const memo = new Map();

    // 遞歸輔助函數，通過索引來計算可能的結果
    function helper(index) {
        // 基本情況：當索引等於 n 時，表示已經處理完所有字符，返回 1
        if (index === n) return 1;
        
        // 如果當前索引的結果已經計算過，則直接返回記錄中的結果
        if (memo.has(index)) return memo.get(index);

        let result = 0;

        // 當索引是偶數（0、2、4...），可以選擇的數字為 0, 2, 4, 6, 8（共 5 種）
        if (index % 2 === 0) {
            result = (result + 5 * helper(index + 1)) % MOD;
        } 
        // 當索引是奇數（1、3、5...），可以選擇的數字為 2, 3, 5, 7（共 4 種）
        else {
            result = (result + 4 * helper(index + 1)) % MOD;
        }

        // 將當前索引的計算結果保存到備忘錄中
        memo.set(index, result);
        
        return result;
    }

    // 從索引 0 開始計算
    return helper(0);
};

console.log(countGoodNumbers(1));  
console.log(countGoodNumbers(4));
console.log(countGoodNumbers(50));
