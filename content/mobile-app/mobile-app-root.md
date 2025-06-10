# Android 手機 Root 常見流程教學  
# Android Phone Rooting Common Procedure Tutorial

## 什麼是 Root？  
## What is Root?  
Root 是取得 Android 系統最高權限，允許用戶修改系統檔案、安裝特殊應用、解除系統限制。  
Root means gaining the highest system permission on Android, allowing users to modify system files, install special apps, and bypass system restrictions.

---

## Root 的基本流程概述  
## Basic Overview of Rooting Process

| 步驟 Step          | 說明 Description                                | 是否必要 Required      |
|--------------------|------------------------------------------------|------------------------|
| 1. 解鎖 Bootloader  | 解除手機出廠的系統鎖定 Unlock the factory lock | **必要 Required**       |
| 2. 刷入 Magisk     | 安裝 Magisk 取得 Root 權限 Install Magisk to gain root | **必要 Required**       |
| 3. (可選 Optional) 安裝 TWRP | 自訂 Recovery，方便刷入 ZIP Custom recovery for flashing ZIP files | 非必要 Optional         |

---

## 詳細流程說明  
## Detailed Procedure Explanation

### 1. 解鎖 Bootloader  
### 1. Unlock Bootloader  

- 目的：允許手機刷寫自訂系統、修改系統分區  
  Purpose: Allow flashing custom system and modifying system partitions  
- 如何做：  
  How to do:  
  - 註冊並登入小米/POCO 帳號（需設為中國區）  
    Register and log in Xiaomi/POCO account (set region to China)  
  - 啟用開發者選項（連點「MIUI 版本」7 次）  
    Enable Developer Options (tap "MIUI version" 7 times)  
  - 開啟「OEM 解鎖」與「USB 偵錯」  
    Enable "OEM Unlocking" and "USB Debugging"  
  - 使用小米官方的 Mi Unlock Tool 申請解鎖（通常有 7 天等待期）  
    Use Xiaomi's official Mi Unlock Tool to request unlock (usually 7-day wait)  
- 注意事項：解鎖會清除手機資料，請提前備份  
  Note: Unlocking will erase all data, please back up beforehand

### 2. 刷入 Magisk 取得 Root 權限  
### 2. Flash Magisk to Gain Root

- 下載對應手機型號及系統版本的 boot.img  
  Download matching boot.img for your phone model and system version  
- 用 Magisk App 修補 boot.img（產生 patched_boot.img）  
  Patch boot.img with Magisk App (generate patched_boot.img)  
- 用 Fastboot 模式刷入 patched_boot.img：  
  Flash patched_boot.img in Fastboot mode:  
  ```bash
  fastboot flash boot patched_boot.img
  fastboot reboot
````

* 安裝 Magisk App，確認 Root 狀態
  Install Magisk App and verify root status

### 3. (可選) 安裝 TWRP Recovery

### 3. (Optional) Install TWRP Recovery

* TWRP 是一個自訂 Recovery，方便刷入 ZIP 檔案（模組、修補包等）
  TWRP is a custom recovery that makes flashing ZIP files (modules, patches) easier
* 若只想 Root，可跳過此步驟
  If you only want root, this step can be skipped
* 安裝方法視手機型號不同，請查官方或 XDA 論壇
  Installation methods vary by phone model, please refer to official or XDA forums

---

## 補充說明

## Additional Notes

* **模擬器 Root**
  Android Studio 模擬器通常直接 `adb root` 即可，速度快且方便開發測試。
  Android Studio emulator usually allows `adb root` directly, fast and convenient for development/testing.

* **Root 風險**

  * 失去保固
  * 安全風險增加
  * 部分銀行、支付 App 可能無法使用
    Risks of rooting:
  * Warranty void
  * Increased security risks
  * Some banking/payment apps may not work

* **建議**

  * 確認備份重要資料
  * 選擇官方或信任的工具與資源
  * 了解解鎖後的風險與限制
    Recommendations:
  * Backup important data
  * Use official or trusted tools/resources
  * Understand risks and restrictions after unlocking
