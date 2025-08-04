
## 如何讓 Android 模擬器使用 VPN DNS

## How to Make Android Emulator Use VPN DNS

---

### 問題描述

### Problem Description

當主機透過 WireGuard VPN 連上公司內網後，可以正常解析內部 DNS，
但 Android 模擬器無法解析內部網域名稱（如 `internal.company.com`）。

When the host connects to a company intranet via WireGuard VPN, DNS resolution works fine.
However, the Android emulator cannot resolve internal domain names (e.g., `internal.company.com`).

---

### 原因

### Cause

Android 模擬器使用的是 NAT 虛擬網路介面，無法繼承主機的 DNS 設定。
The Android emulator uses a NAT-based virtual network interface and cannot inherit the host's DNS settings.

---

### 解法一：模擬器內安裝 WireGuard App

### Solution 1: Install WireGuard App Inside the Emulator

1. 在模擬器中安裝 [WireGuard for Android](https://play.google.com/store/apps/details?id=com.wireguard.android)。

2. 將你的 WireGuard `.conf` 檔案匯入 App 中。

3. 啟用 VPN 後，模擬器會自動使用 VPN 的 DNS。

4. Install [WireGuard for Android](https://play.google.com/store/apps/details?id=com.wireguard.android) inside the emulator.

5. Import your WireGuard `.conf` file into the app.

6. After enabling the VPN, the emulator will use the VPN's DNS automatically.

---

### 解法二：手動指定模擬器 DNS

### Solution 2: Manually Set Emulator DNS

1. 開啟模擬器 → 設定 > 網路與網際網路 > Wi-Fi → 選擇連線中的網路。

2. 點選「進階設定」，切換 IP 設定為「靜態」。

3. 將 DNS 1 設定為公司 VPN 提供的 DNS，例如 `10.0.0.53`。

4. Open the emulator → Settings > Network & Internet > Wi-Fi → Select the connected network.

5. Tap "Advanced options", change IP settings to "Static".

6. Set DNS 1 to your company’s VPN DNS, e.g., `10.0.0.53`.

---

### 解法三：主機建立 DNS Proxy

### Solution 3: Create a DNS Proxy on Host

1. 在主機上啟動 `dnsmasq` 或其他 DNS Proxy 工具，綁定在 `127.0.0.1:53`。

2. 模擬器內將 DNS 設定為 `10.0.2.2`（模擬器對應主機的 IP）。

3. 主機會將 DNS 請求轉發到 VPN 的 DNS。

4. Run `dnsmasq` or any DNS proxy tool on the host, binding to `127.0.0.1:53`.

5. Set DNS in the emulator to `10.0.2.2` (this points to the host from the emulator).

6. The host will forward DNS queries to the VPN DNS server.

---

### 備註：Android Emulator 不支援 Bridge 模式

### Note: Android Emulator Does Not Support Bridge Mode

原生 Android Studio Emulator 使用 QEMU，僅支援 NAT，無法設定為 Bridge 網路。
The native Android Studio Emulator uses QEMU and only supports NAT networking. It cannot be configured for bridged networking.

