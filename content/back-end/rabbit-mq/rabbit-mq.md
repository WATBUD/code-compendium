
## 📘 RabbitMQ 是什麼？

### 📘 What is RabbitMQ?

**RabbitMQ 是一個開源的訊息代理伺服器（Message Broker），用於處理和傳遞訊息，常用於建立系統之間的非同步通訊。**
**RabbitMQ is an open-source message broker used to handle and deliver messages, commonly used for asynchronous communication between systems.**

---

## ✨ RabbitMQ 的用途

### ✨ Common Use Cases

* **非同步處理任務（如：寄信、通知、排程）**
  **Asynchronous task processing (e.g., emails, notifications, job queues)**
* **解耦服務，提升擴展性與穩定性**
  **Decouple services to improve scalability and stability**
* **事件驅動架構（EDA）**
  **Event-driven architecture (EDA)**
* **訊息緩衝與失敗重試機制**
  **Message buffering and retry mechanisms**

---

## ⚙️ 運作流程

### ⚙️ How It Works

1. **Producer（生產者）發送訊息到 RabbitMQ**
   **A producer sends messages to RabbitMQ**

2. **RabbitMQ 將訊息放入佇列（Queue）中**
   **RabbitMQ stores the message in a queue**

3. **Consumer（消費者）從佇列中接收並處理訊息**
   **A consumer receives and processes the message from the queue**

---

## 🧱 核心概念對照表

### 🧱 Core Concepts

| 中文概念 | 英文對應        | 說明（Explanation）                                          |
| ---- | ----------- | -------------------------------------------------------- |
| 生產者  | Producer    | 發送訊息的應用程式（App that sends messages）                       |
| 消費者  | Consumer    | 接收訊息的應用程式（App that receives messages）                    |
| 佇列   | Queue       | 暫存訊息的容器（Buffer for holding messages）                     |
| 交換器  | Exchange    | 決定訊息要送去哪（Routes messages to queues）                      |
| 綁定   | Binding     | 設定 Exchange 與 Queue 的關係（Link between queue and exchange） |
| 路由鍵  | Routing Key | 決定訊息流向的標籤（Tag used to route messages）                    |

---

## 🛠️ 支援協議

### 🛠️ Supported Protocols

* AMQP（主協議 / primary protocol）
* MQTT
* STOMP
* HTTP（透過 plugin / via plugin）

---

## ✅ RabbitMQ 優點

### ✅ Advantages

* **穩定、成熟、跨平台**
  **Stable, mature, cross-platform**
* **支援多語言與用戶端套件**
  **Supports many programming languages and clients**
* **圖形化管理介面（Web UI）**
  **Web-based management dashboard**
* **有插件支援延伸功能**
  **Plugin system for extended features**

---

## 🚀 實作範例（使用 Go 語言）

### 🚀 Code Example Using Go

> 下面範例已設定持久化佇列、持久化訊息與手動 Ack，避免 RabbitMQ 重啟或消費者當掉時遺失訊息；完整原因與 Publisher Confirms 的用法見同資料夾 `optimization-cases/rabbitmq-message-loss.html`。
> The example uses a durable queue, persistent messages and manual ack; see `optimization-cases/rabbitmq-message-loss.html` for details and publisher confirms.

### 📦 安裝套件

```bash
# streadway/amqp 已停止維護，改用 RabbitMQ 官方維護的 amqp091-go
# streadway/amqp is unmaintained; use the official amqp091-go
go get github.com/rabbitmq/amqp091-go
```

---

### 🐇 Producer（訊息發送者）

### 🐇 Producer (Message Sender)

```go
package main

import (
    "context"
    "log"
    "time"

    amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
    // 連接到 RabbitMQ 伺服器
    // Connect to RabbitMQ server
    conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
    if err != nil {
        log.Fatal("連線失敗 (Connection failed):", err)
    }
    defer conn.Close()

    // 建立通道
    // Create a channel
    ch, err := conn.Channel()
    if err != nil {
        log.Fatal("開啟 channel 失敗 (Open channel failed):", err)
    }
    defer ch.Close()

    // 宣告佇列，如果不存在則建立
    // Declare a queue
    q, err := ch.QueueDeclare(
        "hello", // 佇列名稱 (queue name)
        true,    // 持久化，重啟後佇列還在 (durable)
        false,   // 沒有使用會自動刪除 (delete when unused)
        false,   // 是否為專用 (exclusive)
        false,   // 是否阻塞 (no-wait)
        nil,     // 額外參數 (arguments)
    )
    if err != nil {
        log.Fatal("宣告佇列失敗 (Queue declare failed):", err)
    }

    // 發送一則訊息
    // Publish a message
    body := "Hello, RabbitMQ!"
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    err = ch.PublishWithContext(ctx,
        "",       // exchange（空字串表示使用預設）
        q.Name,   // routing key（佇列名稱）
        false,    // mandatory
        false,    // immediate
        amqp.Publishing{
            DeliveryMode: amqp.Persistent, // 持久化訊息 (persistent message)
            ContentType:  "text/plain",
            Body:         []byte(body),
        },
    )
    if err != nil {
        log.Fatal("發送訊息失敗 (Publish failed):", err)
    }

    log.Println("✅ 已發送訊息 (Message sent):", body)
}
```

---

### 🐰 Consumer（訊息接收者）

### 🐰 Consumer (Message Receiver)

```go
package main

import (
    "log"

    amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
    // 連接到 RabbitMQ
    conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
    if err != nil {
        log.Fatal("連線失敗 (Connection failed):", err)
    }
    defer conn.Close()

    // 建立通道
    ch, err := conn.Channel()
    if err != nil {
        log.Fatal("開啟 channel 失敗 (Open channel failed):", err)
    }
    defer ch.Close()

    // 宣告佇列（要與 Producer 相同）
    q, err := ch.QueueDeclare(
        "hello", // queue name
        true,    // durable（必須與 Producer 相同 / must match the producer）
        false,
        false,
        false,
        nil,
    )
    if err != nil {
        log.Fatal("宣告佇列失敗 (Queue declare failed):", err)
    }

    // 每個消費者最多同時持有 10 則未確認訊息 (prefetch)
    if err := ch.Qos(10, 0, false); err != nil {
        log.Fatal("設定 Qos 失敗 (Qos failed):", err)
    }

    // 接收訊息
    msgs, err := ch.Consume(
        q.Name, // 佇列名稱
        "",     // consumer tag
        false,  // 手動 ack：處理完才確認 (manual ack)
        false,  // exclusive
        false,  // no-local
        false,  // no-wait
        nil,    // args
    )
    if err != nil {
        log.Fatal("建立 consumer 失敗 (Consumer failed):", err)
    }

    log.Println("🔁 等待訊息中 (Waiting for messages)...")

    for msg := range msgs {
        log.Printf("📩 收到訊息 (Received message): %s", msg.Body)
        msg.Ack(false) // 處理完成才確認；確認前斷線，訊息會重新排入佇列
    }
}
```

---

## 🐳 啟動 RabbitMQ（Docker）

### 🐳 Start RabbitMQ via Docker

```bash
docker run -d --hostname rabbitmq \
  --name rabbitmq \
  -p 5672:5672 -p 15672:15672 \
  rabbitmq:3-management
```

* Web 管理介面網址： [http://localhost:15672](http://localhost:15672)
* 預設帳號密碼（Default credentials）： `guest / guest`

---

