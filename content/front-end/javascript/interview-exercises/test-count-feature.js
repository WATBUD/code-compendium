
//-------------------------------------------Counter Class-------------------------------------------
class Counter {
  constructor() {
      this.sum = 0;  // 初始化總和為 0
  }

  add(value) {
      this.sum += value;  // 將傳入的數值加到總和上
  }

  total() {
      return this.sum;  // 返回總和
  }
}

// 創建 counter 實例
const counter = new Counter();

// 測試
function testCount(counter) {
  counter.add(1);
  counter.add(4);
  return counter.total();
}

console.log("Counter Class:",testCount(counter) === 5);  // 輸出 true


//-------------------------------------------閉包-------------------------------------------
function createCounter() {
  let sum = 0;  // 這是計數器的內部狀態，會被閉包保存

  // 返回一個物件，包含兩個方法：add 和 total
  return {
      add(value) {
          sum += value;  // 更新計數器的總和
      },
      total() {
          return sum;  // 返回計數器的總和
      }
  };
}

// 創建 counter 實例
const counter2 = createCounter();

// 測試
function testCount(counter2) {
  counter2.add(1);
  counter2.add(4);
  return counter2.total();
}

console.log("閉包:",testCount(counter2) === 5);  // 輸出 true



//-------------------------------------------直接定義 this 的上下文問題：-------------------------------------------

let counter3 = {
  val: 0,
  add: function(addVal) {
      this.val = this.val + addVal;
  },
  total: function() {
      return this.val;
  }
};

// 測試
function testCount(counter3) {
  counter3.add(1);
  counter3.add(4);
  return counter3.total();
}

console.log("直接定義 this 的上下文問題:",testCount(counter3) === 5);  // 輸出 true








let counter4 = {
  val: 0,
  add: (addVal) => {
      this.val = this.val + addVal; // 箭頭函數的 this 不指向 counter
  },
  total: () => {
      return this.val; // 箭頭函數的 this 不指向 counter
  }
};
counter4.add(5);  // 這會錯誤，因為箭頭函數中的 `this` 不是指向 counter
console.log(counter4.total());  // 這也會錯誤`