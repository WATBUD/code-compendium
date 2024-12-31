// 定義節點結構
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

// 遞迴合併兩個有序鏈表
function mergeTwoLists(l1, l2) {
    // 如果其中一個鏈表為空，直接返回另一個鏈表
    if (l1 === null) {
        console.log("l1 為空，返回 l2");
        return l2;
    }
    if (l2 === null) {
        console.log("l2 為空，返回 l1");
        return l1;
    }

    // 比較兩個鏈表的當前節點值
    if (l1.val <= l2.val) {
        console.log(`l1:${l1.val} <= l2:${l2.val}值`);
        l1.next = mergeTwoLists(l1.next, l2); // 遞迴合併剩餘部分
        return l1;
    } else {
        console.log(`l1:${l1.val} > l2:${l2.val}值`);
        l2.next = mergeTwoLists(l1, l2.next); // 遞迴合併剩餘部分
        return l2;
    }
}

// 打印鏈表
function printList(head) {
    const values = [];
    while (head !== null) {
        values.push(head.val);
        head = head.next;
    }
    console.log("合併後的鏈表：", values);
}

// 測試數據
const l1 = new ListNode(1, new ListNode(2, new ListNode(4)));
const l2 = new ListNode(1, new ListNode(3, new ListNode(4)));

// 執行合併
const result = mergeTwoLists(l1, l2);

// 打印結果
printList(result);
