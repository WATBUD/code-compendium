
---

# 📘 ISO 8601 日期時間格式介紹（中英對照）

**Introduction to ISO 8601 Date-Time Format (Bilingual)**

---

## 🔰 ISO 是什麼？

### What is ISO?

**ISO** 指的是國際標準化組織（**International Organization for Standardization**）所制定的一系列標準。
而 **ISO 8601** 是其中用來**定義日期與時間格式**的標準。

> ✅ 它是一種為電腦與人類都易於解析的格式，廣泛應用於資料儲存、API 傳輸、排序與時間計算。

---

## 📌 ISO 8601 格式基礎 | **Basic Structure**

| 組件（中文）          | Component (EN)         | 格式 (Format)    | 範例 (Example)            |
| --------------- | ---------------------- | -------------- | ----------------------- |
| 年               | Year                   | `YYYY`         | `2025`                  |
| 月               | Month                  | `MM`           | `07`                    |
| 日               | Day                    | `DD`           | `28`                    |
| 日期與時間分隔符        | Date-Time Separator    | `T`            | `T`                     |
| 小時（24小時制）       | Hour (24-hour)         | `HH`           | `14`                    |
| 分鐘              | Minute                 | `mm`           | `30`                    |
| 秒               | Second                 | `ss`           | `00`                    |
| 毫秒（選用）          | Millisecond (Optional) | `.sss`         | `.123`                  |
| 時區（Z 或 +HH\:mm） | Timezone               | `Z` / `+08:00` | `Z`, `+08:00`, `-05:00` |

---

## 🔁 常見 ISO 8601 範例 | **Common ISO 8601 Examples**

| ISO 字串                          | 中文解釋             | English Meaning                     |
| ------------------------------- | ---------------- | ----------------------------------- |
| `2025-07-28`                    | 只表示日期（不含時間）      | Date only                           |
| `2025-07-28T14:30:00`           | 日期與時間（無時區）       | Date and time without timezone      |
| `2025-07-28T14:30:00Z`          | UTC 時間（Z 代表 UTC） | UTC time (Z = Zulu = UTC)           |
| `2025-07-28T14:30:00+08:00`     | 台灣/中國時區時間        | Time with +08:00 timezone           |
| `2025-07-28T14:30:00.000-05:00` | 含毫秒與西五區時間        | Millisecond + timezone offset (EST) |

---

## 🔧 為什麼使用 ISO 8601？| **Why Use ISO 8601?**

| 原因（中文）           | Reason (English)                      |
| ---------------- | ------------------------------------- |
| ✅ 可排序（字串即時間先後）   | Sortable (lexicographically sortable) |
| ✅ 時區資訊清楚         | Timezone information explicit         |
| ✅ 國際通用（避免地區格式歧義） | Locale-independent                    |
| ✅ 被多數語言與系統原生支援   | Natively supported by most languages  |

---

## 📦 語言支援 | **Language/Platform Support**

| 語言/平台           | 支援方式                                                    |
| --------------- | ------------------------------------------------------- |
| JavaScript / TS | `new Date(isoString)`、`toISOString()` ✅                 |
| Python          | `datetime.fromisoformat()`、`isoformat()` ✅              |
| SQL             | `DATETIME`, `TIMESTAMP`, `STR_TO_DATE()` ✅              |
| Go              | `time.Parse(time.RFC3339, ...)` ✅                       |
| Java            | `Instant`, `ZonedDateTime`, `DateTimeFormatter.ISO_*` ✅ |

> 💡 註：`RFC 3339` 是 ISO 8601 的一個常見實作版本（幾乎等同）

---

## 📅 應用場景 | **Use Cases**

| 使用場景（中文） | 建議格式                   | Use Case (EN)               |
| -------- | ---------------------- | --------------------------- |
| API 傳輸   | `2025-07-28T14:30:00Z` | API transmission            |
| 跨時區排程    | `+08:00`, `-05:00`     | Timezone-sensitive apps     |
| 時間排序     | 直接使用 ISO 字串            | Versioning / Sorting        |
| 顯示給使用者   | 建議轉換成當地格式（i18n）        | Display using locale format |

---

## ⚠️ 常見注意事項 | **Common Gotchas**

| 中文問題                        | 英文說明                                    |
| --------------------------- | --------------------------------------- |
| `Z` 是 UTC，非本地時間             | `Z` indicates UTC, not local time       |
| 不建議直接讓使用者看到 `Z`             | Avoid showing raw ISO string to users   |
| 字串比對會出現時區錯位                 | Always parse and compare as Date object |
| 顯示應使用 `Intl.DateTimeFormat` | Use i18n formatting for UI display      |

---

## 📚 延伸學習 | **Further Reading**

* [ISO 8601 on Wikipedia](https://en.wikipedia.org/wiki/ISO_8601)
* [MDN: Date.prototype.toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
* [RFC 3339 (ISO 8601 subset)](https://datatracker.ietf.org/doc/html/rfc3339)

---
