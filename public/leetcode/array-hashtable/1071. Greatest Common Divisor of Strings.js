var gcdOfStrings = function(str1, str2) {
    // 輔助函數：計算兩個數字的最大公約數（GCD）
    function gcd(a, b) {
        if (b === 0) {
            return a; // 當 b 等於 0 時，返回 a，這是歐幾里得算法的基礎情況
        }
        // 否則，繼續遞歸計算 a 和 b 的最大公約數，直到 b 等於 0
        // 我們不斷取 a 除以 b 的餘數，並交換 a 和 b 的值
        return gcd(b, a % b);
    }
    // 假設要計算 gcd(48, 18)：
    // 48 % 18 = 12，所以計算 gcd(18, 12)。
    // 18 % 12 = 6，所以計算 gcd(12, 6)。
    // 12 % 6 = 0，所以返回 6。

    // 檢查 str1 + str2 是否等於 str2 + str1
    // 這是檢查是否有公共的重複子串的必要條件
    if (str1 + str2 !== str2 + str1) {
        return ""; // 如果不相等，說明沒有公共的重複子串，返回空字串
    }

    // 計算 str1 和 str2 的長度的最大公約數
    let gcdLength = gcd(str1.length, str2.length);
    console.log("最大公約數"+gcdLength);
    // 返回 str1 從0到gcdLength的子串作為最大公共除数字符串
    return str1.substring(0, gcdLength);
};

// 測試案例
console.log(gcdOfStrings("ABCABC", "ABC")); // 輸出: "ABC"
console.log(gcdOfStrings("ABABAB", "ABAB")); // 輸出: "AB"
console.log(gcdOfStrings("LEET", "CODE")); // 輸出: ""
