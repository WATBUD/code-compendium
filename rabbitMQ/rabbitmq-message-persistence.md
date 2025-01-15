
# RabbitMQ 消息持久化(Message Persistence)

這個範例展示了如何在 Go 項目中使用 RabbitMQ，並保證消息不會丟失，即使消費者斷線。主要通過以下機制實現：
1. **消息持久化**：將消息標記為持久化，保證 RabbitMQ 服務重啟後不會丟失未處理的消息。
2. **手動確認**：消費者在成功處理消息後發送確認，避免在消費者斷線時丟失消息。
3. **持久化隊列**：確保隊列在 RabbitMQ 重啟後依然存在。

### 需求
- Go 1.18 及以上版本
- RabbitMQ 服務

### 安裝依賴

首先，安裝 `pika` Go 客戶端（`github.com/streadway/amqp`）。

```bash
go get github.com/streadway/amqp
```

### 代碼範例

#### `main.go`

```go
package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/streadway/amqp"
)

func main() {
	// 建立與 RabbitMQ 伺服器的連接
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	if err != nil {
		log.Fatalf("無法連接到 RabbitMQ: %v", err)
	}
	defer conn.Close()

	// 創建一個通道
	ch, err := conn.Channel()
	if err != nil {
		log.Fatalf("無法創建通道: %v", err)
	}
	defer ch.Close()

	// 創建一個持久化隊列
	_, err = ch.QueueDeclare(
		"task_queue", // 隊列名
		true,         // 持久化
		false,        // 自動刪除
		false,        // 排他性
		false,        // 不等候
		nil,          // 額外參數
	)
	if err != nil {
		log.Fatalf("無法創建隊列: %v", err)
	}

	// 設置消息持久化，並將消息推送到隊列中
	body := "Hello RabbitMQ!"
	err = ch.Publish(
		"",            // 交換機
		"task_queue",  // 路由鍵（隊列名稱）
		false,         // 不等待確認
		false,         // 不需要回應
		amqp.Publishing{
			ContentType:   "text/plain",
			DeliveryMode:  amqp.Persistent, // 設置為持久化消息
			Body:          []byte(body),
		},
	)
	if err != nil {
		log.Fatalf("無法發送消息: %v", err)
	}
	fmt.Println("消息已發送: ", body)

	// 設置信號捕獲器以處理中斷（如 Ctrl+C）
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)

	// 消費者部分：手動確認消息
	go consumeMessages(ch)

	// 等待中斷信號
	<-sigs
	fmt.Println("接收到中斷信號，退出程序")
}

// 消費者代碼
func consumeMessages(ch *amqp.Channel) {
	msgs, err := ch.Consume(
		"task_queue", // 队列名稱
		"",           // 消費者名稱
		false,        // 不自動確認
		false,        // 非排他性
		false,        // 不等候
		false,        // 非阻塞
		nil,          // 額外參數
	)
	if err != nil {
		log.Fatalf("無法消費消息: %v", err)
	}

	// 循環接收消息
	for msg := range msgs {
		fmt.Printf("接收到消息: %s
", msg.Body)
		// 處理完消息後確認
		msg.Ack(false)
	}
}
```

### 執行步驟

1. 啟動 RabbitMQ 伺服器，您可以使用 Docker 運行 RabbitMQ：
   
   ```bash
   docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
   ```

2. 編譯並運行 Go 程式：

   ```bash
   go run main.go
   ```

   這樣會啟動一個簡單的生產者和消費者。生產者會發送持久化的消息，而消費者會手動確認消息。

3. 當您按下 `Ctrl+C` 停止程序時，您會看到信號捕獲並平穩退出。

### 重要提示

1. 消息持久化：RabbitMQ 會將消息持久化到磁碟，這樣即使 RabbitMQ 重啟，消息也不會丟失。
2. 手動確認：當消費者成功處理完消息後，必須顯式確認（`msg.Ack(false)`）。如果消費者斷線，消息不會丟失，RabbitMQ 會將未確認的消息重新排入隊列。

### 結論

這個範例展示了如何使用 Go 和 RabbitMQ 保證消息的可靠性，即使在消費者斷線的情況下，消息仍然不會丟失。
