/**
 * Definition for isBadVersion API.
 * @param {integer} version
 * @return {boolean} whether version is bad
 * isBadVersion API 已經定義
 */

// 假設 bad = 4，定義 isBadVersion 函數
function isBadVersion(version) {
    return version >= 4;  // 當版本 >= 4 時，回傳 true (壞版本)
}


var solution = function(isBadVersion) {
    return function(n) {
        let left = 1, right = n;
        
        while (left < right) {  // 當 left == right 時，找到第一個壞版本
            let mid = Math.floor(left + (right - left) / 2);  // 避免溢位
            if (isBadVersion(mid)) {
                right = mid;  // 壞版本可能是 mid 或更早的版本，移動 right 指針
            } else {
                left = mid + 1;  // mid 不是壞版本，往右邊找
            }
        }
        
        return left;  // left 指向第一個壞版本
    };
};
const findBadVersion = solution(isBadVersion);

console.log("findBadVersion:5", findBadVersion(5)); 
console.log("findBadVersion:1", findBadVersion(1));  







