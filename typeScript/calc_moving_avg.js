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
        let sum = 0;
        // 計算當前窗口內的數值總和
        for (let j = i; j < i + window_size; j++) {
            sum += vect[j];
        }
        // 將窗口內數值的平均值加入結果陣列，並進行四捨五入
        result.push(Math.round(sum / window_size));
    }

    // 返回計算出的移動平均個數和結果陣列
    return [n, result];
}

// 測試
console.log(calc_moving_avg(4, [1, 2, 3, 4], 3));  // 應該輸出: [2, [2, 3]]
console.log(calc_moving_avg(4, [1, 2, 3, 4], 2));  // 應該輸出: [3, [2, 3, 4]]
