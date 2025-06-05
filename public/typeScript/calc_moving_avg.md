這段 TypeScript 程式碼用於計算給定數列的移動平均數。移動平均數是一種統計方法，用來平滑數據，以便更容易觀察數據趨勢。以下是你提供的程式碼的詳細解釋和註解：

```typescript
function calc_moving_avg(size: number, vect: number[], window_size: number): [number, number[]] {
    // 當 window_size 為 0 時，直接返回輸入數列
    if (window_size === 0) {
        return [size, [...vect]];
    }

    let result: number[] = [];
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
```

### 解釋
1. **函數定義**: `calc_moving_avg` 函數接受三個參數：
   - `size`：數列的長度
   - `vect`：整數陣列
   - `window_size`：移動平均的窗口大小

2. **窗口為零的處理**：如果 `window_size` 為零，函數直接返回原始數列的副本。

3. **計算移動平均個數**：`n` 表示可以計算出多少個移動平均，計算公式為 `size - window_size + 1`。

4. **計算每個窗口內的平均值**：
   - 使用雙層循環，外層循環遍歷數列，內層循環計算當前窗口內的總和。
   - 將每個窗口內的平均值（進行四捨五入）添加到結果陣列中。

5. **返回結果**：函數返回計算出的移動平均個數和包含移動平均結果的陣列。

希望這個解釋和註解對你有幫助！如果有更多問題，請告訴我。