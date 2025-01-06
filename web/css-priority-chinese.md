
# CSS 優先級
## 1. 權重速查表 CSS 選擇器優先級計算規則
權重| 選擇器類型                             
1000| **行內樣式** `style="color: red;"`       
100| **ID 選擇器**：`#id`                            
10| **類選擇器、偽類、屬性選擇器**：`.class`、`[attr=value]`、`:hover` 等            
1| **元素選擇器、偽元素**：`div`、`h1`、`::before` 等    
0| **通配符選擇器**：`*` 或`繼承  font-size: 16px;`的樣式，優先級最低。



## 2. 優先級對比實例
#### 規則：
```css
/* 權重為 10 */
.class { color: blue; }

/* 權重為 1 */
div { color: red; }

/* 權重為 100 */
#id { color: green; }
```

#### HTML：
```html
<div id="id" class="class">Text</div>
```

**優先級計算結果：**
1. `.class {}` (權重 10)
2. `div {}` (權重 1)
3. `#id {}` (權重 100) **勝出**：文字顯示為綠色。

## 3. 使用 `!important`
- `!important` 強制覆蓋優先級規則，即使權重較低。
- 例如：
  ```css
  div {
    color: blue !important;
  }
  #id {
    color: red;
  }
  ```
  即使 `#id` 的權重較高，`!important` 的規則仍然生效，文字顯示為藍色。

- **相同優先級時的順序規則**：
  後定義的樣式會覆蓋前面定義的樣式（CSS 的 **層疊性**）。

## 7. 優化優先級
- 避免濫用 `!important`，否則會導致樣式難以維護。
- 使用更精確選擇器提高優先級，而不是加更多規則。
