## 1. 什麼是 Event-driven Architecture？

Event-driven Architecture（事件驅動架構）是一種設計模式，系統中各模組透過事件（Event）作為溝通媒介，進行非同步且鬆耦合的交互。適合高擴展性、分散式系統或微服務架構。

---

## 2. 核心元件說明與小範例

### 2.1 Event Producer（事件產生者）

**功能**：產生事件並發布到事件通道。
**範例（Node.js，Kafka生產事件）：**

```javascript
const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient();
const producer = new Producer(client);

const event = {
  type: 'OrderCreated',
  data: { orderId: 123, userId: 456, amount: 789 }
};

producer.on('ready', () => {
  producer.send([{ topic: 'orders', messages: JSON.stringify(event) }], (err, data) => {
    if (err) console.error(err);
    else console.log('Event sent:', data);
  });
});
```

---

### 2.2 Event Channel（事件通道）

**功能**：傳遞事件的中介，確保事件可靠且順序送達。
**範例**：Kafka、RabbitMQ、AWS SNS/SQS 等（屬平台服務或中介軟體，不直接寫程式碼）。

---

### 2.3 Event Consumer（事件消費者）

**功能**：訂閱並處理事件，執行相應業務邏輯。
**範例（Node.js，Kafka消費事件）：**

```javascript
const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient();
const consumer = new Consumer(client, [{ topic: 'orders' }], { autoCommit: true });

consumer.on('message', (message) => {
  const event = JSON.parse(message.value);
  if (event.type === 'OrderCreated') {
    console.log('Received order created event:', event.data);
    // 這裡可觸發寄送 Email 或更新資料庫
  }
});
```

---

### 2.4 Event Store（事件儲存）

**功能**：紀錄所有事件，支持事件溯源（Event Sourcing）。
**範例（SQL插入事件紀錄）：**

```sql
INSERT INTO event_store (event_type, event_data, created_at)
VALUES ('OrderCreated', '{"orderId":123,"userId":456,"amount":789}', NOW());
```

---

### 2.5 Event Processing（事件處理）

**功能**：根據事件執行商業邏輯。
**範例（簡單Email通知偽碼）：**

```javascript
function handleOrderCreated(eventData) {
  sendEmail(eventData.userId, `你的訂單 ${eventData.orderId} 已成立，金額 ${eventData.amount}`);
}
```

---

## 3. 事件流完整示意（帶程式碼範例）

1. **事件產生者發布事件**

```javascript
dispatchEvent({
  type: 'OrderCreated',
  data: { orderId: 123 }
});
```

2. **事件通過事件通道傳遞**
   （由 Kafka 或 RabbitMQ 處理，無需手寫程式碼）

3. **事件消費者接收並處理事件**

```javascript
onEvent(event => {
  if (event.type === 'OrderCreated') {
    processOrder(event.data);
  }
});
```

4. **事件消費者更新狀態或觸發後續工作**

```javascript
function processOrder(data) {
  updateOrderStatus(data.orderId, 'processing');
  sendNotification(data.userId, '訂單已進入處理中');
}
```

---

## 4. 其他常見技術範例

### 4.1 RabbitMQ 簡單發送與接收範例（Python）

```python
import pika

# 發送端
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='task_queue')
channel.basic_publish(exchange='', routing_key='task_queue', body='OrderCreated:123')
connection.close()

# 消費端
def callback(ch, method, properties, body):
    print("Received %r" % body)

channel.basic_consume(queue='task_queue', on_message_callback=callback, auto_ack=True)
channel.start_consuming()
```

---

## 5. Event-driven Architecture 優點

* **鬆耦合**：模組間透過事件溝通，降低依賴
* **高擴展性**：可水平擴展消費者處理能力
* **彈性與容錯**：事件持久化，支持重放與回溯
* **反應式設計**：系統能即時響應事件變化

---



