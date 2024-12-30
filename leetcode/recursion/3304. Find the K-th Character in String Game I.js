/**
 * @param {number} k - 目標字符的位置，從 1 開始計算
 * @return {character} - 返回第 k 個字符
 */
/**
 * @param {number} k - 目標字符的位置，從 1 開始計算
 * @return {character} - 返回第 k 個字符
 */
var kthCharacter = function(k) {
    // 初始字串為 "a"
    let string = "a";
    
    // 定義遞歸函數，用來遞歸尋找第 k 個字符
    function findingKthCharacter() {
        // 如果目前字串長度已經大於或等於 k，則返回第 k 個字符
        if (string.length >= k) {
            return string[k - 1];  // 由於字串的索引從 0 開始，所以返回 string[k-1]
        } else {
            // 當字串長度不足 k 時，生成新的字串
            let tempString = "";
            
            // 遍歷原字串中的每個字符，將每個字符轉換為其下一個字母並附加到 tempString 中
            for (let i = 0; i < string.length; i++) {
                // 取得字符的 ASCII 編碼
                let ascii = string.charCodeAt(i);
                
                // 將 ASCII 編碼加 1，並轉換回字符
                let character = String.fromCharCode(++ascii);
                
                // 將新的字符附加到 tempString 中
                tempString += character;
            }
            
            // 將生成的新字串追加到原始字串上
            string += tempString;
            
            // 進行遞歸，繼續尋找第 k 個字符
            return findingKthCharacter();
        }
    }

    // 調用遞歸函數，開始尋找第 k 個字符
    return findingKthCharacter();
};

console.log(kthCharacter(5));  // Output: "b"
console.log(kthCharacter(10)); // Output: "c"
