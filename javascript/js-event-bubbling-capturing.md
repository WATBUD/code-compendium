# Event Capturing vs Event Bubbling

## 1. Basic Concepts of Event Flow
在瀏覽器中，當事件被觸發時，會經過三個主要階段：

1. **Event Capturing**: 
   - 事件從根元素開始向下傳遞到目標元素
   - 這是事件到達目標之前的第一個捕獲階段

2. **Target Phase**: 
   - 這是事件到達目標元素並觸發目標上的事件處理程序的階段

3. **Event Bubbling**: 
   - 事件從目標元素開始向上冒泡到根元素
   - 這個階段在目標階段之後觸發

## 2. Difference Between Event Capturing and Event Bubbling

### Event Capturing
- **處理過程**: 事件從根元素傳遞到目標元素
- **觸發時機**: 最先觸發
- **使用場景**: 當父元素需要在目標元素之前處理事件時使用

### Event Bubbling
- **處理過程**: 事件從目標元素冒泡到根元素
- **觸發時機**: 最後觸發
- **使用場景**: 當子元素觸發事件且父元素需要根據該事件進行處理時使用

## 3. Examples

### Event Capturing Example
以下是事件捕獲的範例：

```html
<div id="parent">
  <button id="child">Click Me</button>
</div>

<script>
  // 在捕獲階段註冊事件處理程序
  document.getElementById('parent').addEventListener('click', function() {
    console.log('Parent - Capturing phase');
  }, true);  // `true` 表示使用捕獲階段

  document.getElementById('child').addEventListener('click', function() {
    console.log('Child clicked');
  });
</script>
```

當你點擊子按鈕時，輸出將會是：
```
Parent - Capturing phase
Child clicked
```

### Event Bubbling Example
以下是事件冒泡的範例：

```html
<div id="parent">
  <button id="child">Click Me</button>
</div>

<script>
  // 在冒泡階段註冊事件處理程序
  document.getElementById('parent').addEventListener('click', function() {
    console.log('Parent - Bubbling phase');
  });

  document.getElementById('child').addEventListener('click', function() {
    console.log('Child clicked');
  });
</script>
```

當你點擊子按鈕時，輸出將會是：
```
Child clicked
Parent - Bubbling phase
```

## 4. Event Delegation
事件委派是事件冒泡的一個重要應用場景。通過將事件處理程序附加到父元素，我們可以處理動態添加的子元素的事件。

```html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<script>
  // 將點擊事件委派給父元素
  document.getElementById('list').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
      console.log('Clicked on ' + event.target.textContent);
    }
  });
</script>
```

當你點擊 "Item 1" 時，輸出將會是：
```
Clicked on Item 1
```

## 5. Stopping Event Propagation
`stopPropagation()` 可用於停止事件在事件流中的向上或向下傳播。這個方法可以選擇性地阻止某些事件的傳播。

```html
<div id="parent">
  <button id="child">Click Me</button>
</div>

<script>
  document.getElementById('parent').addEventListener('click', function() {
    console.log('Parent clicked');
  });

  document.getElementById('child').addEventListener('click', function(event) {
    console.log('Child clicked');
    event.stopPropagation();  // 停止事件冒泡
  });
</script>
```

當你點擊子按鈕時，輸出將會是：
```
Child clicked
```

## 6. Summary: The Relation and Use Cases

### Event Capturing
- 事件在到達目標元素之前，在捕獲階段被捕獲和處理
- 當你需要在目標處理之前處理事件時很有用（例如：全局事件攔截或表單驗證）

### Event Bubbling
- 事件從目標元素向上冒泡到根元素
- 當父元素需要處理其子元素觸發的事件時很有用（例如：表單提交、處理動態列表項）

### Use Case Summary
- **Event Capturing**: 當你想在目標元素處理之前在父級處理事件時很有用（例如：全局事件處理）

# **Event Bubbling**: 當你想讓父元素對其子元素觸發的事件做出反應時很有用（例如：表單提交、動態列表處理）

## 1. 表單提交範例
這個範例展示如何使用事件冒泡來處理表單內的所有輸入驗證：

```html
<form id="registrationForm">
    <div class="form-group">
        <input type="text" name="username" placeholder="用戶名">
        <input type="email" name="email" placeholder="電子郵件">
        <input type="password" name="password" placeholder="密碼">
    </div>
    <button type="submit">提交</button>
</form>

<script>
    const form = document.getElementById('registrationForm');
    
    // 在父元素（form）上監聽所有輸入事件
    form.addEventListener('input', function(event) {
        // 透過事件冒泡，我們可以捕獲所有輸入框的變化
        const input = event.target;
        
        if (input.name === 'username') {
            // 驗證用戶名
            if (input.value.length < 3) {
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = 'green';
            }
        } else if (input.name === 'email') {
            // 驗證電子郵件
            if (input.value.includes('@')) {
                input.style.borderColor = 'green';
            } else {
                input.style.borderColor = 'red';
            }
        }
    });
</script>
```

## 2. 動態列表處理範例
這個範例展示如何使用事件冒泡來處理動態添加的列表項：

```html
<div id="todoApp">
    <button onclick="addItem()">添加新任務</button>
    <ul id="todoList">
        <li>
            任務 1
            <button class="delete">刪除</button>
            <button class="complete">完成</button>
        </li>
    </ul>
</div>

<script>
    const todoList = document.getElementById('todoList');
    let itemCount = 1;

    // 在父元素上監聽所有按鈕點擊
    todoList.addEventListener('click', function(event) {
        const target = event.target;
        
        // 使用事件冒泡來處理所有按鈕點擊
        if (target.classList.contains('delete')) {
            // 刪除任務
            target.parentElement.remove();
        } else if (target.classList.contains('complete')) {
            // 標記任務為完成
            target.parentElement.style.textDecoration = 'line-through';
        }
    });

    // 添加新任務的函數
    function addItem() {
        itemCount++;
        const newItem = document.createElement('li');
        newItem.innerHTML = `
            任務 ${itemCount}
            <button class="delete">刪除</button>
            <button class="complete">完成</button>
        `;
        todoList.appendChild(newItem);
    }
</script>
```

## 3. 表格互動範例
這個範例展示如何使用事件冒泡來處理大型表格的互動：

```html
<table id="dataTable">
    <thead>
        <tr>
            <th>ID</th>
            <th>名稱</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>項目一</td>
            <td>
                <button class="edit">編輯</button>
                <button class="delete">刪除</button>
            </td>
        </tr>
        <!-- 更多行... -->
    </tbody>
</table>

<script>
    const table = document.getElementById('dataTable');
    
    // 在表格層級處理所有按鈕點擊
    table.addEventListener('click', function(event) {
        const target = event.target;
        
        if (target.classList.contains('edit')) {
            // 獲取當前行的數據
            const row = target.closest('tr');
            const id = row.cells[0].textContent;
            const name = row.cells[1].textContent;
            console.log(`編輯項目：${id}, ${name}`);
        } else if (target.classList.contains('delete')) {
            // 刪除當前行
            const row = target.closest('tr');
            if (confirm('確定要刪除這一行嗎？')) {
                row.remove();
            }
        }
    });
</script>
```

## 事件冒泡的優勢說明

1. **性能優化**
   - 不需要為每個子元素單獨添加事件監聽器
   - 減少了記憶體使用
   - 提高了頁面性能

2. **動態元素處理**
   - 自動處理動態添加的元素
   - 無需為新元素重新綁定事件

3. **代碼維護**
   - 集中管理事件處理邏輯
   - 更容易進行代碼維護和更新