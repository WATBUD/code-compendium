### 1. 檢查路由表

Check Routing Table

```bash
netstat -rn
```

或更詳細：

```bash
route -n get 192.168.241.29
```

**說明：**
確認你的 Mac（192.168.14.10）是否有正確路由到 192.168.241.29。
Check if your Mac (192.168.14.10) has the correct route to 192.168.241.29.

---

### 2. 用 Ping 測試

Ping Test

```bash
ping -c 4 192.168.241.29
```

* 回應正常：代表 ICMP 通
* 無回應：可能網路不通或防火牆擋 ICMP

If reply is normal, ICMP packets pass.
No reply? Network issue or firewall blocks ICMP.

---

### 3. 用 Traceroute 查路由跳點

Traceroute to Check Route Hops

```bash
traceroute 192.168.241.29
```

會顯示經過的路由節點。
If stuck early, route misconfigured or blocked.

---

### 4. 確認防火牆狀態

Check Firewall Status

```bash
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate
```

或

```bash
sudo pfctl -sr
```

檢查是否有規則阻擋連線。
Check if any rules block your connection.

---

### 5. 嘗試 telnet 測試端口連線

Telnet to Test Service Port

```bash
telnet 192.168.241.29 8081
```

連不上，表示服務未開或防火牆擋了。
Can't connect? Service offline or firewall blocks it.

---

### 補充說明：

Additional Notes:

* `traceroute` 早期斷線：路由不通
* `ping` 通但 `telnet` 不通：服務或防火牆問題


