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
    if (head === null || head.next === null) {
        return head;//3 return 
    }
    
    let reversedHead = reverseList(head.next);//head.next=2
    console.log(
        "%c reverseList_head",
        "color:#f00;font-family:system-ui;font-size:2rem;font-weight:bold",
        "head:",
        head,
        "reversedHead",
        reversedHead
      );
    head.next.next = head; //2.next.next=3.next =>so change 3.next=2
    head.next = null; //2 next =null     
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
