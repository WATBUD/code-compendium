
// XOR（異或）運算在二進制位元層面進行。讓我們來一步一步看一下 0 XOR 4 的計算過程：

// 二進制表示
// 首先，我們需要將數字轉換成二進制形式：

// 數字 0 的二進制表示： 0000F

// 數字 4 的二進制表示： 0100

// XOR 運算規則
// 根據 XOR 的真值表，每個位元的運算規則如下：

// 0 XOR 0 = 0

// 0 XOR 1 = 1

// 1 XOR 0 = 1

// 1 XOR 1 = 0

//所以 1 xor 1=> 0001 xor 0001 =0000

// 定義節點結構
var singleNumber = function(nums) {
    //xor 異或運算符 001=>1 1=>0
    //xor 異或運算符 001  0 1=>1
    let result=0;
    for(let i=0;i <nums.length; i++){
        result ^=nums[i];//XOR
    }
    return result
};

// - **時間複雜度：**  
//   - `for` 迴圈遍歷 `nums` 一次，總共執行 `n` 次 XOR 運算，因此時間複雜度為 **O(n)**。

// - **空間複雜度：**  
//   - 只使用了一個變數 `result`，沒有額外的儲存空間，因此空間複雜度為 **O(1)**。

var singleNumberReduce = function(nums) {
    return nums.reduce((acc, num) => acc ^ num, 0);
};

// - **時間複雜度：**  
//   - `reduce` 方法會對 `nums` 進行一次遍歷，每個元素執行 XOR 運算，因此時間複雜度仍然是 **O(n)**。

// - **空間複雜度：**  
//   - `reduce` 只使用了一個累加器 `acc`，不需要額外的儲存空間，因此空間複雜度為 **O(1)**。




console.log("singleNumber:", singleNumber([4,1,2,1,2]));

console.log("singleNumberReduce:", singleNumberReduce([4,1,2,1,2]));

