var isValid = function(s) {
    const stack=[];
    const map={
     '(':')',
     '[':']',
     '{':'}',
    };
    for(let i=0;i<s.length;i++){
        const indexWord=s[i];// 當前字符
        if(map[indexWord]){//如果有左括號(, [, {，則將其推入 stack array 中。
            stack.push(indexWord);
        }
        else if(indexWord!==map[stack.pop()]){//不是左就是其他檢測是不是 ), ], } pop()拿到key(左括號)同時移除左括號=>然後比對。
            return false;
        } 
    }
    return stack.length===0;
};


console.log("isValid:", isValid("()"));
console.log("isValid:", isValid("()[]{}"));
console.log("isValid:", isValid("(]"));

// ### **時間複雜度與空間複雜度**
// - **時間複雜度**：`O(n)`，其中 `n` 是字串 `s` 的長度。每個字符只會被處理一次。
// - **空間複雜度**：`O(n)`，最壞情況下（例如 `(((((`），`stack` 的大小會與 `s` 的長度成正比。



const map={
    '(':')',
    '[':']',
    '{':'}',
};

const stack = ["("];

console.log("stack.pop()=>",stack.pop());

console.log(stack);




