// Definition for singly-linked list.
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

// Function to convert an array to a linked list
function arrayToList(arr) {
    let dummy = new ListNode(0);
    let current = dummy;
    for (let i = 0; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return dummy.next; // return the actual head of the list
}

//遞迴（recursion）
var reverseList = function(head) {
    // 基本情況：如果 head 為 null，或者 head.next 為 null，表示鏈表已經遍歷完成
    // 返回 head，這時 head 是鏈表的最後一個節點
    if (head === null || head.next === null) {
        return head; // 返回當前節點（即最終的反轉後的頭節點）
    }
    
    // 遞迴呼叫：反轉從 head.next 開始的鏈表
    let reversedHead = reverseList(head.next); // 頭節點的下一個節點開始遞迴反轉

    // 在此處打印日誌，顯示當前處理的 head 和 reversedHead 節點
    console.log(
        "%c reverseList_head", 
        "color:#f00;font-family:system-ui;font-size:2rem;font-weight:bold", 
        "head:", head, 
        "reversedHead", reversedHead
    );

    // 將 head.next 的 next 指向 head，這是反轉的關鍵操作
    head.next.next = head; // 假設 head.next 是節點2，則執行 2.next.next = 3.next，即讓 3.next = 2
    
    // 斷開 head 與 head.next 的鏈接，使得 head 的 next 成為 null
    head.next = null; // 讓原來的 head 變成鏈表的最後一個節點，這樣可以避免形成循環
    
    // 返回反轉後的頭節點
    return reversedHead;
};

// Test the function
let head = arrayToList([1,2,3]);

let recursionResult = reverseList(head);//遞迴（recursion）

// console.log(
//     "%c head",
//     "color:#f00;font-family:system-ui;font-size:2rem;font-weight:bold",
//     "recursionResult:",
//     recursionResult
//   );
