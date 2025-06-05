var mergeAlternately = function(word1, word2) {
    let result = ""; // 用來存儲最終的合併字串
    let i = 0;
    
    // 當兩個字串還有字母可以取時，交替合併
    while (i < word1.length || i < word2.length) {
        if (i < word1.length) {
            result += word1[i]; // 如果 word1 還有字母，加入到結果字串
            console.log(`Added from word1: ${word1[i]}`); // 記錄當前添加的字母
        }
        if (i < word2.length) {
            result += word2[i]; // 如果 word2 還有字母，加入到結果字串
            console.log(`Added from word2: ${word2[i]}`); // 記錄當前添加的字母
        }
        i++; // 移動到下一個字母
    }
    
    console.log(`Final merged string: ${result}`); // 輸出最終的合併字串
    return result; // 返回合併的結果
};

// 測試範例
mergeAlternately("abc", "pqr");

// 時間複雜度：O(max(n, m))，其中 n 和 m 分別是 word1 和 word2 的長度。需要遍歷兩個字串的每一個字符。
// 空間複雜度：O(n + m)，需要額外的空間來儲存合併的字串。
