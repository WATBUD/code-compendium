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

// Function to print the linked list
function printList(head) {
    let current = head;
    while (current !== null) {
        console.log(
            "%c printList(head)",
            "color:#00f;font-family:system-ui;font-size:2rem;font-weight:bold",
            // "head:",
            // head,
            "current.val",
            current.val,
          );
        current = current.next;
    }
}




var removeElements = function(head, val) {
    // Create a dummy node that points to the head
    let dummy = new ListNode(0);
    dummy.next = head;
    
    // Initialize current pointer to the dummy node
    let current = dummy;
    
    // Traverse the list
    while (current.next !== null) {
        if (current.next.val === val) {
            // Skip the node with the value equal to val
            current.next = current.next.next;
        } else {
            // Move to the next node
            current = current.next;
        }
    }
    
    // Return the new head, which is dummy.next
    return dummy.next;
};


// Test the function
let head = arrayToList([1, 2, 6, 3, 4, 5, 6]);
let val = 6;
let newHead = removeElements(head, val);

// Print the modified list

printList(newHead);

console.log(
    "%c head",
    "color:#f00;font-family:system-ui;font-size:2rem;font-weight:bold",
    "newHead:",
    newHead,
    //JSON.stringify(newHead),
    // "printList(newHead)",
    // printList(newHead)
  );
