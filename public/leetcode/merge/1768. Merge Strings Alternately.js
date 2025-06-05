var mergeAlternately = function(word1, word2) {
    let result = [];  // 使用陣列來存儲結果，避免直接拼接字串（效率較低）
    let i = 0, len1 = word1.length, len2 = word2.length;

    while (i < len1 || i < len2) { // 當 i 小於任一字串長度時，繼續迴圈
        console.log("i:", i,"len1:", len1,"len2:", len2);  

        if (i < len1) result.push(word1[i]); // 如果 word1 還有字元，加入結果
        if (i < len2) result.push(word2[i]); // 如果 word2 還有字元，加入結果
        i++;
    }
    
    return result.join(''); // 用 join() 來轉換為字串，效能比直接拼接高
};

console.log(mergeAlternately("abc", "pqr"));   // "apbqcr"
console.log(mergeAlternately("ab", "pqrs"));   // "apbqrs"
console.log(mergeAlternately("abcd", "pq"));   // "apbqcd"

// ### **🕒 時間與空間複雜度**
// - **時間複雜度：** \(O(N)\)，其中 \(N\) 為 `word1` 和 `word2` 長度總和，迴圈遍歷一次。  
// - **空間複雜度：** \(O(N)\)，使用陣列存儲結果，最後轉換為字串。



