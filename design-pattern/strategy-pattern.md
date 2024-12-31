# 策略模式 (Strategy Pattern) - 簡易教學

## 什麼是策略模式？

**策略模式** 
- 是一種行為型設計模式，定義一系列的算法（或策略），將每個算法封裝起來，使它們可以互換。
- 這樣可以在運行時動態選擇使用哪個算法，從而提高程式的靈活性和可擴展性。

### 主要要點：
- 策略模式的核心概念確實是基於「繼承」和「取代」的概念來實現的。
- 具體來說，策略模式會透過繼承來定義一個統一的接口，動態地更換具體的策略來實現不同的行

## 策略模式如何工作？

1. **上下文 (Context)**：使用策略(class)來執行操作的類。只需要執行不需要知道操作具體的算法。
2. **策略接口 (Strategy Interface)**：定義算法的統一接口。所有策略類都必須實現這個接口。
3. **具體策略 (Concrete Strategies)**：每個策略類的策略提供不同的算法。

## JavaScript 範例
- 假設我們需要對數字進行排序，可以使用不同的排序策略。

```javascript
// 策略接口
class SortStrategy {
  sort(data) {
    throw new Error("Method 'sort' should be implemented");
  }
}

// 具體策略：冒泡排序
class BubbleSort extends SortStrategy {
  sort(data) {
    console.log("使用冒泡排序");
    return data.sort((a, b) => a - b);
  }
}

// 具體策略：快速排序
class QuickSort extends SortStrategy {
  sort(data) {
    console.log("使用快速排序");
    if (data.length <= 1) return data;
    let pivot = data[data.length - 1];
    let left = data.filter(item => item < pivot);
    let right = data.filter(item => item > pivot);
    return [...left, pivot, ...right];
  }
}

// 上下文：使用排序策略的類
class SortContext {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  executeSort(data) {
    return this.strategy.sort(data);
  }
}

// 使用範例

const data = [5, 3, 8, 1, 2];

// 冒泡排序
const bubbleSortContext = new SortContext(new BubbleSort());
console.log(bubbleSortContext.executeSort(data)); // [1, 2, 3, 5, 8]

// 快速排序
const quickSortContext = new SortContext(new QuickSort());
console.log(quickSortContext.executeSort(data)); // [1, 2, 3, 5, 8]
