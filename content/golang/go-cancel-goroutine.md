在 Go 中，可以使用 **`context.Context`** 來取消 `goroutine`，這是最常見且推薦的方式，特別是在處理 API 請求或長時間運行的任務時。  

---

## **1. 使用 `context.WithCancel`**
`context.WithCancel` 允許主 `goroutine` 發送取消信號，讓其他 `goroutine` 監聽並結束。  

### **範例**
```go
package main

import (
	"context"
	"fmt"
	"time"
)

func worker(ctx context.Context) {
	for {
		select {
		case <-ctx.Done(): // 監聽取消信號
			fmt.Println("Worker canceled")
			return
		default:
			fmt.Println("Worker running...")
			time.Sleep(500 * time.Millisecond) // 模擬工作
		}
	}
}

func main() {
	ctx, cancel := context.WithCancel(context.Background())

	go worker(ctx) // 啟動 goroutine

	time.Sleep(2 * time.Second) // 讓 worker 運行一段時間
	cancel()                    // 發送取消信號

	time.Sleep(1 * time.Second) // 確保 worker 有時間結束
	fmt.Println("Main function exits")
}
```

### **輸出**
```
Worker running...
Worker running...
Worker running...
Worker running...
Worker canceled
Main function exits
```

🔹 **解析**
- `context.WithCancel` 會返回 `ctx` 和 `cancel` 函數。
- `worker` 在 `select` 中監聽 `ctx.Done()`，當 `cancel()` 被調用時，`ctx.Done()` 會收到信號，`worker` 結束。

---

## **2. 使用 `context.WithTimeout`**
如果想要**在一定時間後自動取消 `goroutine`**，可以使用 `context.WithTimeout`。  

### **範例**
```go
package main

import (
	"context"
	"fmt"
	"time"
)

func worker(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			fmt.Println("Worker timeout, exiting...")
			return
		default:
			fmt.Println("Worker running...")
			time.Sleep(500 * time.Millisecond)
		}
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer cancel() // 確保 context 被清理

	go worker(ctx)

	time.Sleep(3 * time.Second) // 等待超時發生
	fmt.Println("Main function exits")
}
```

### **輸出**
```
Worker running...
Worker running...
Worker running...
Worker running...
Worker timeout, exiting...
Main function exits
```

🔹 **解析**
- `context.WithTimeout` 設置 `2s` 超時，超時後 `ctx.Done()` 會被觸發，`worker` 自動結束。

---

## **3. 使用 `context.WithDeadline`**
`context.WithDeadline` 是 `WithTimeout` 的變體，可以指定**確切的時間點**來取消 `goroutine`。  

### **範例**
```go
ctx, cancel := context.WithDeadline(context.Background(), time.Now().Add(2*time.Second))
```
這與 `WithTimeout` 類似，但用的是 **固定時間點**。

---

## **4. 使用 `select` + `channel`**
另一種方式是用 **`channel`** 來手動控制 `goroutine` 的結束。

### **範例**
```go
package main

import (
	"fmt"
	"time"
)

func worker(stop chan struct{}) {
	for {
		select {
		case <-stop:
			fmt.Println("Worker stopped")
			return
		default:
			fmt.Println("Worker running...")
			time.Sleep(500 * time.Millisecond)
		}
	}
}

func main() {
	stop := make(chan struct{}) // 控制 goroutine 的 channel
	go worker(stop)

	time.Sleep(2 * time.Second)
	close(stop) // 通知 worker 停止

	time.Sleep(1 * time.Second)
	fmt.Println("Main function exits")
}
```

### **輸出**
```
Worker running...
Worker running...
Worker running...
Worker running...
Worker stopped
Main function exits
```

🔹 **解析**
- `stop` 是一個 `channel`，當 `close(stop)` 時，`worker` 會收到信號並結束。

---

## **結論**
| 方法 | 方式 | 適用場景 |
|------|------|--------|
| `context.WithCancel` | 手動取消 `goroutine` | 需要在某個時刻手動取消時 |
| `context.WithTimeout` | 設置**持續時間**，超時後取消 | 需要限制執行時間，例如 HTTP 請求超時 |
| `context.WithDeadline` | 設置**特定時間點**取消 | 需要在某個時間點強制結束 |
| `channel` + `select` | 手動關閉 channel 來通知結束 | 更靈活，適合多個 `goroutine` 管理 |

👉 **最佳做法**：如果是長時間運行的 `goroutine`（如 API 處理或 worker pool），建議用 **`context.Context`** 來管理，因為它還能夠傳遞額外的資訊，例如超時或父子 `context` 的取消機制。