# Serverless 架構簡介

## 什麼是 Serverless？
Serverless（無伺服器架構）不代表完全沒有伺服器，而是指開發者無需管理伺服器，因為雲端提供商（如 AWS、Google Cloud、Azure）會自動處理伺服器的管理、擴展和維護。

## Serverless 的核心概念
1. **自動擴展**：根據流量自動增減資源，無需手動調整。
2. **事件驅動**：系統只在有請求時執行，沒有請求時不佔用資源。
3. **無需管理基礎設施**：開發者專注於寫應用程式，而不必維護伺服器、作業系統或負載平衡。
4. **按使用計費**：通常是基於執行時間或請求數計費，而不是預先分配伺服器。

## 常見的 Serverless 服務
### **函數即服務（FaaS）**
- AWS Lambda  
- Google Cloud Functions  
- Azure Functions  

### **後端即服務（BaaS）**
- Firebase（Firestore、Auth）  
- AWS AppSync（GraphQL API）  

## Serverless 與 Google Cloud Run
Google Cloud Run 也是 Serverless 解決方案，它允許使用 Docker 容器來部署應用程式，並根據請求自動擴展，沒有請求時會停用實例。這與傳統的 FaaS（如 Lambda）不同，Cloud Run 支援完整的 Web 服務，而不僅僅是執行單個函數。

## Serverless 的優缺點
### **優點**
✅ 減少基礎設施管理成本
✅ 自動擴展，適應高流量需求
✅ 按使用量計費，降低閒置成本
✅ 快速開發與部署

### **缺點**
❌ 限制較多，例如執行時間、內存等資源約束
❌ 冷啟動問題，影響請求延遲
❌ 服務依賴於雲供應商，可能面臨供應商鎖定風險

## 適合 Serverless 的應用場景
- 事件驅動應用（如處理上傳文件、Webhook）
- API 服務（低延遲需求的 API 端點）
- 週期性任務（如資料處理、報表生成）
- 聊天機器人、IoT 應用

## 結論
Serverless 是一種現代雲端運算架構，適合需要高擴展性、低運維成本的應用。如果你的 Go 專案已經使用 Docker，且考慮雲端部署，Google Cloud Run 是一個不錯的 Serverless 選擇。

