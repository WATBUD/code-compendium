
# `defer` 屬性

## 1. `defer` 屬性的作用

`defer` 屬性用於 `<script>` 標籤，控制外部 JavaScript 文件的加載和執行方式，從而優化頁面的加載性能。

### `defer` 屬性解釋
- 當使用 `defer` 屬性時，腳本會異步加載，但執行會被延遲到 HTML 文檔完全解析完成後，這樣不會阻塞頁面的渲染過程。
- `defer` 只對外部腳本有效，內部腳本（即直接寫在 `<script>` 標籤內的腳本）無法使用 `defer` 屬性。
- 預設情況下，`defer` 會確保按順序執行腳本，即如果有多個腳本使用 `defer` 屬性，它們會按照在 HTML 中的出現順序執行。

### 使用範例

```html
<script src="example.js" defer></script>
```

在這個例子中，`example.js` 會在 HTML 文檔解析完成後才會執行。

## 2. `defer` 屬性與 `async` 屬性的區別

- **`async`**：腳本下載後立即執行，可能會打斷文檔解析。
- **`defer`**：腳本下載後執行被延遲，直到文檔解析完成，這樣可以避免阻塞頁面渲染。

## 3. `defer` 屬性適用場景

- 主要用於需要依賴於 DOM 完全解析或其他腳本的情況，避免阻塞頁面的渲染。
- 例如，一些腳本需要等待頁面內容完全加載後再進行操作，這時可以使用 `defer` 屬性。
