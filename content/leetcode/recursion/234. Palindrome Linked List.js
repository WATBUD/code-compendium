/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = val === undefined ? 0 : val;
 *     this.next = next === undefined ? null : next;
 * }
 */

var isPalindrome = function(head) {
    let left = head;  // 用來指向鏈表的頭部

    // 使用遞迴進行比較
    function recurse(right) {
        // 基本情況：如果 right 為 null，說明已經到達鏈表的末尾
        if (!right) return true; // 到達末尾，回傳 true

        // 遞迴向前遍歷鏈表
        const res = recurse(right.next); // 這是遞迴的地方，right 會繼續向後移動

        // 輸出目前的比較情況
        console.log("right:", right ,"res:", res);

        // 如果發現不對稱的情況，直接返回 false
        if (!res || left.val !== right.val) {
            return false;
        }

        // 否則，left向右移動
        left = left.next;

        // 輸出 left 向右移動的情況
        console.log("Left moves to:", left ? left.val : "null");

        return true;
    }

    return recurse(head);  // 初次調用時，傳入 head 作為 right
};




function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}
// 建立一個回文鏈表 1 -> 2 -> 3 -> 2 -> 1
let node5 = new ListNode(1);
let node4 = new ListNode(2, node5);
let node3 = new ListNode(3, node4);
let node2 = new ListNode(2, node3);
let head = new ListNode(1, node2);

console.log(isPalindrome(head));  // 輸出: true

// // 建立一個非回文鏈表 1 -> 2 -> 3
// let node1 = new ListNode(3);
// let node0 = new ListNode(2, node1);
// let head2 = new ListNode(1, node0);

// console.log(isPalindrome(head2));  // 輸出: false
