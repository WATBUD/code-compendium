function calc_moving_avg(size, vect, window_size) {
    // 當 window_size 為 0 時，直接返回輸入數列
    if (window_size === 0) {
        return [size, [...vect]];
    }

    let result = [];
    // 計算可以形成多少個移動平均
    let n = size - window_size + 1;

    // 遍歷數列，計算每個窗口內的平均值
    for (let i = 0; i < n; i++) {
        console.log("n",n,"i",i); 
        let sum = 0;
        // 計算當前窗口內的數值總和
        for (let j = i; j < i + window_size; j++) {
            console.log("j",j);
            sum += vect[j];
        }
        console.log("sum",sum); 
        // 將窗口內數值的平均值加入結果陣列，並進行四捨五入
        result.push(Math.round(sum / window_size));
    }

    // 返回計算出的移動平均個數和結果陣列
    return [n, result];
}

// 測試
console.log(calc_moving_avg(4, [1, 2, 3, 4], 3));  // 應該輸出: [2, [2, 3]]
const a_4=calc_moving_avg(4, [1, 2, 3, 4], 4);
console.log(a_4);  

// console.log(calc_moving_avg(4, [1, 2, 3, 4], 2));  // 應該輸出: [3, [2, 3, 4]]

// 1. **`size`**:
//    - 這是一個整數，表示輸入數列的長度。
//    - 例如，在測試調用中，`4` 是 `size`，表示數列的長度為 4。

// 2. **`vect`**: "vector" 翻譯為「向量」或「數列」
//    - 這是一個整數數列，是我們希望計算移動平均的數據。
//    - 例如，在測試調用中，`[1, 2, 3, 4]` 是 `vect`，表示我們的數據數列。

// 3. **`window_size`**:
//    - 這是一個整數，表示移動平均的窗口大小。即每次計算平均值時所考慮的元素個數。
//    - 例如，在測試調用中，`3` 和 `2` 是 `window_size`，分別表示每次計算平均值時考慮 3 個和 2 個元素。

