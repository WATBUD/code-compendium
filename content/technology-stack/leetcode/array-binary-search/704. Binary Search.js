/**
 * 使用二分搜尋法在已排序的數組中查找目標值
 * @param {number[]} nums - 已排序的數組
 * @param {number} target - 要查找的目標值
 * @return {number} 返回目標值在數組中的索引，若未找到則返回 -1
 */
function binarySearch(nums, target) {
    // 初始化左右指針：left 指向數組開始位置，right 指向數組結束位置
    let left = 0, right = nums.length - 1;

    // 當 left 小於或等於 right 時，繼續搜尋
    while (left <= right) {
        // 計算中間索引：使用 Math.floor 確保取整數
        let mid = Math.floor((left + right) / 2);

        // 如果中間元素等於目標值，則直接返回中間索引
        if (nums[mid] === target) return mid;

        // 如果中間元素小於目標值，則目標必在右側，調整左指針
        else if (nums[mid] < target) {
            left = mid + 1;
        }

        // 如果中間元素大於目標值，則目標必在左側，調整右指針
        else {
            right = mid - 1;
        }
    }

    // 如果循環結束仍未找到目標值，返回 -1 表示未找到
    return -1;
}

// 測試範例
const nums = [-1, 0, 3, 5, 9, 12];
const target = 9;
console.log("binarySearch:", binarySearch(nums, target));  // 輸出 4






