
# 依賴注入（Dependency Injection, DI）
- 依賴注入是 IoC 的一種具體實現方式，通過將依賴項從外部注入到物件中來實現控制反轉。以下是使用 Go 語言的具體範例。


# NewDatabaseConnection 函數創建 DatabaseConnection 實例，這是 提供（Provide）。
# Service 結構體聲明了對 DatabaseConnection 的依賴，並通過構造函數 NewService 注入這個依賴，這是 消費（Consume）。

```go
package main

import "fmt"

// DatabaseConnection 是我們的依賴項
type DatabaseConnection struct {
    // 這裡可以包含資料庫連接的細節
}

// NewDatabaseConnection 創建並返回一個新的 DatabaseConnection 實例
func NewDatabaseConnection() *DatabaseConnection {
    return &DatabaseConnection{}
}

// Service 是我們的主要服務，依賴於 DatabaseConnection
type Service struct {
    DB *DatabaseConnection
}

// NewService 創建並返回一個新的 Service 實例，並注入 DatabaseConnection 依賴
func NewService(db *DatabaseConnection) *Service {
    return &Service{DB: db}
}

func (s *Service) DoSomething() {
    fmt.Println("使用資料庫連接進行某些操作")
}

func main() {
    // 提供（Provide）
    db := NewDatabaseConnection()
    
    // 消費（Consume）並注入依賴
    service := NewService(db)
    
    // 使用服務進行操作
    service.DoSomething()
}
