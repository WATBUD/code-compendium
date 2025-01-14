* [靜強] 型別：[Java、Go、C#、Swift]。
* [靜弱] 型別：[C、C++]。
* [動強] 型別：[Python、Ruby、Kotlin]。
* [動弱] 型別：[JavaScript、PHP、Perl]。
* 靜態型別 / 動態型別 / 強型別 / 弱型別 四種型別[正確/錯誤]案例：
### **靜態型別說明  (Static Typing)**
靜態型別語言需要在編譯時就明確指定變數的型別，型別錯誤會在編譯時被檢查出來。
#### 例子：Java(靜強)
```java
// 正確案例
int x = 10;   // 定義整數型別變數
x = 20;       // 可以重新賦值，但型別必須一致

// 錯誤案例
int x = 10;
x = "hello";  // 錯誤，無法將字串賦值給整數型別變數
```

#### 例子：Go
```go
// 正確案例
var x int = 10
x = 20  // 可以重新賦值，但型別必須一致

// 錯誤案例
var x int = 10
x = "hello"  // 錯誤，無法將字串賦值給整數型別變數
```
### **動態型別說明 (Dynamic Typing)**
允許變數型別運行時確定，可以改變型別。
#### 例子：Python
```python
# 正確案例
x = 10       # 初始型別是整數
x = "hello"  # 動態改變型別為字串
print(x)     # 輸出: hello

# 錯誤案例
x = 10 + "5"  # 錯誤，Python 不允許直接將整數與字串相加
```

# ex：JavaScript(動弱)
```javascript
// 正確案例
let x = 10;       
x = "hello";  // 型別可以動態變更
console.log(x);  // 輸出: hello

// 錯誤案例
let x = 10 + "5";  // 不會報錯，輸出: "105" (可能導致非預期結果)
```
### **強型別 (Strong Typing) 對型別嚴格，不允許不同型別直接隱式運算**

# ex：Python(動強)
```python
# 正確案例
x = "10"
y = 5
x = int(x) + y  # 需要顯式轉換型別
print(x)        # 輸出: 15

# 錯誤案例
x = "10"
y = 5
z = x + y       # 錯誤，無法將字串與數字直接相加
```

# ex：Java(靜強)
```java
// 正確案例
int x = 10;
int y = 20;
int z = x + y;  // 可以進行相同型別的運算

// 錯誤案例
String s = "10";
int y = 20;
int z = s + y;  // 錯誤，無法將字串與整數直接相加
```

### **弱型別 (Weak Typing) 允許隱式型別轉換**

# ex：JavaScript(動弱)
```javascript
// 正確案例
let x = "10";
let y = 5;
let z = parseInt(x) + y;  // 顯式轉換型別
console.log(z);           // 輸出: 15

// 錯誤案例
let x = "10";
let y = 5;
let z = x + y;            // 不會報錯，但結果為 "105"，而非數值相加
console.log(z);           // 輸出: "105"
```
# ex：PHP(動弱)
```php
// 正確案例
$x = "10";
$y = 5;
$z = intval($x) + $y;  // 顯式轉換型別
echo $z;               // 輸出: 15

// 錯誤案例
$x = "10";
$y = 5;
$z = $x + $y;          // PHP 隱式轉換字串為數字，結果為 15，但行為可能不易察覺
echo $z;               // 輸出: 15
```

**對比**

1. **靜態型別和動態型別的區別**在於「型別檢查的時間點」：
   - 靜態型別在編譯時檢查，提供安全性但限制靈活性。
   - 動態型別在運行時檢查，靈活但可能導致運行時錯誤。

2. **強型別和弱型別的區別**在於「是否允許隱式型別轉換」：
   - 強調型別一致不允許隱式轉換。
   - 弱型別允許隱式轉換。

--- 
靜強 型別：Java、Go、C#、Swift。
靜弱 型別：C、C++。
動強 型別：Python、Ruby、Kotlin。
動弱 型別：JavaScript、PHP、Perl。
 