function kidsWithCandies(candies, extraCandies) {
    // 找到目前擁有最多糖果的小孩
    let maxCandies = Math.max(...candies);
    
    // 檢查每個小孩加上額外糖果後是否能達到最多糖果
    return candies.map(candy => candy + extraCandies >= maxCandies);
}

// Example usage:
console.log(kidsWithCandies([2, 3, 5, 1, 3], 3)); 
// Output: [true, true, true, false, true]
