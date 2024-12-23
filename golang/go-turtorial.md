# Go Language Comprehensive Guide

## Project Template and Best Practices

### Package Management
- Use `go get -u package_name` to fetch the latest package version
- Ensures most recent updates and compatible dependencies

# Go 的指標 (* 和 &)
`*` 是指標的標識符，表示指向某個變數的記憶體地址， `&` 則是用來取得變數的記憶體地址。
- **`*`**：表示指標，指標本身不存儲數據，存儲一個指向數據的記憶體地址。
- **`&`**：取得變數的記憶體地址。

### 範例：
```go
func main() {
    apple := 5
    fmt.Println("水果籃子中的蘋果數量:", apple)

    // 定義一個指向 apple 變數的指標
    var pointer *int
    pointer = &apple // 使用 & 取得 apple 的地址並賦值給指標

    // 通過指標修改水果籃子中的蘋果數量
    *pointer = 10 // 使用 * 修改指標指向的變數的值

    fmt.Println("通過指標修改後的水果籃子中的蘋果數量:", apple)
}
```
# Go 語言沒有像 C# 的 Attributes 或 Java 的 Annotations 這樣的機制。
# Go 使用 **結構體標籤**（Struct Tags）實現類似功能。
# (Struct Tags)附加在結構欄位後，通常用在序列化或反序列化附加屬性。
```go
type User struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}
```

# Go - Public and Private Functions: Upper Case and Lower Case
Go 函數、變數、類型等名稱的首字母大小寫決定了它們的訪問範圍：
- **首字母大寫**（Uppercase）：表示該函數或變數是公有的 (Public)，可以被其他包 (package) 訪問。
- **首字母小寫**（Lowercase）：表示該函數或變數是私有的 (Private)，只能在同一個包內使用。
### 例子：
如果你有一個私有的函數，名稱的首字母應該小寫，例如：
```go
// 這是私有的，只能在同一個 package 中訪問
func initStocksService(db *Database) {
    // 初始化股票服務
}
```

# Go - try...catch 
Go沒有try catch ，函數傳回值明確檢查處理錯誤
```go
func processFile(filename string) error {
    // Open file with error handling
    file, err := os.Open(filename)
    if err != nil {
        // Log the error and return it for caller to handle
        return fmt.Errorf("failed to open file: %w", err)
    }
    // Ensure file is closed after use
    defer file.Close()

    // Read file contents
    content, err := ioutil.ReadAll(file)
    if err != nil {
        return fmt.Errorf("failed to read file: %w", err)
    }

    // Process file contents
    fmt.Println("File contents:", string(content))
    return nil
}

func main() {
    if err := processFile("test.txt"); err != nil {
        // Handle error at the call site
        log.Printf("Error processing file: %v", err)
        // Optional: exit or take alternative action
        return
    }
    fmt.Println("File processed successfully")
}
```

