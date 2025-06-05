// 如果不使用 `Map`，可以改用 **物件（Object）** 來模擬哈希表，或者用 **雙層迴圈暴力解**。  

// ---

// ### **🚀 方法 1：使用 Object（類似哈希表，時間複雜度 O(n)）**
function twoSum(nums, target) {
    const obj = {}; // 用 JavaScript Object 來模擬哈希表
    for (let i = 0; i < nums.length; i++) {
        let complement = target - nums[i]; // 計算補數
        console.log("complement:", complement);
        console.log("obj[complement]:", obj[complement]);
        if (complement in obj) { // 用 `in` 來檢查 key 是否存在
            return [obj[complement], i]; // 找到答案，返回索引
        }
        obj[nums[i]] = i; // 儲存數字及其索引
    }
}
// ✅ **運行效率**：時間複雜度 **O(n)**，和 `Map` 的解法類似。  

// ✅ **適用場景**：當 `Map` 不可用時，使用 `Object` 也能達到類似的效果。

// ---

// ### **🚀 方法 2：暴力解法（雙層迴圈，時間複雜度 O(n²)）**
// 如果完全**不用哈希表**，那就只能用**暴力解**（兩層迴圈）。  

function twoSumFor2(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j]; // 找到匹配的索引並返回
            }
        }
    }
}
// ✅ **適用場景**：當 `Map` 或 `Object` 不能用時，但這種解法**效率較低**（O(n²)），不建議在大數據量下使用。

// ---

// ### **📝 結論**
// | 方法 | 使用哈希表（Map） | 使用 Object | 雙層迴圈暴力解 |
// |------|----------------|-------------|----------------|
// | **時間複雜度** | **O(n)** | **O(n)** | **O(n²)** |
// | **是否額外使用記憶體** | 是 | 是 | 否 |
// | **優點** | 查找快 | 查找快 | 不用額外記憶體 |
// | **缺點** | 需 `Map` | 可能有 `hasOwnProperty` 問題 | 效率慢 |

// 最佳解還是用 **Map 或 Object**，**暴力解只適用於極小數據集**。💡

console.log(twoSum([2,7,11,15], 9)+"\n"); 
console.log(twoSum([3,2,4], 6)+"\n"); 
console.log(twoSum([3,3], 6)+"\n"); 

