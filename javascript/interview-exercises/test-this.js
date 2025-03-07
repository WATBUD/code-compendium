//window.name = "ray";
//瀏覽器中，this 在全域範圍指向 window。
//Node.js 中，this 在全域範圍指向模組的 exports 物件。
// 模擬全域物件 `window`
global.name = "ray";  // 在 Node.js 中，`global` 是全域物件

function testA() {
    console.log(this.name);  // `this` 會指向全域物件
}
testA();  // 輸出 "ray"

const test = () => {
    console.log(this.name);  // 箭頭函數繼承外部的 `this`
};
test();  // 輸出 "ray"（這裡 `this` 會指向全域物件）

let b = { ee: 12, test, testA };
b.test();  // 輸出 "ray"（箭頭函數繼承全域 `this`）
b.testA();  // 輸出 "ray"（常規函數會依照呼叫的上下文，指向 `b`，但是 `this` 繼承了全域 `this`）
