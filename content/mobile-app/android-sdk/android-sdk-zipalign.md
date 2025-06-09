遇到 `zipalign: command not found` 错误是因为系统找不到 `zipalign` 命令，通常是因为 Android SDK 的构建工具路径未正确配置到环境变量中。以下是解决方案：

---

### **1. 找到 `zipalign` 的完整路径**
`zipalign` 工具位于 Android SDK 的 `build-tools` 目录中。首先需要确认：
```bash
ls $ANDROID_HOME/build-tools/
```
或手动查找路径（例如）：
```bash
ls ~/Library/Android/sdk/build-tools/  # macOS
ls /opt/android-sdk/build-tools/       # Linux
ls %ANDROID_HOME%\build-tools\         # Windows (CMD)
```

找到最新的版本号（如 `36.0.0`），完整路径类似：
```
~/Library/Android/sdk/build-tools/36.0.0/zipalign
```

---

### **2. 临时使用完整路径运行**
直接指定完整路径执行命令：
```bash
~/Library/Android/sdk/build-tools/36.0.0/zipalign -v 4 input.apk output.apk
```

---

### **3. 永久解决（推荐）**
将 `build-tools` 目录添加到 `PATH` 环境变量中：

#### **Mac/Linux**
编辑 `~/.zshrc` 或 `~/.bashrc`：
```bash
export ANDROID_HOME=~/Library/Android/sdk  # 确保路径正确
export PATH=$ANDROID_HOME/build-tools/36.0.0:$PATH
```
然后刷新配置：
```bash
source ~/.zshrc
```

#### **Windows**
在系统环境变量中添加：
```
变量名: PATH
变量值: %ANDROID_HOME%\build-tools\36.0.0\
```

---

### **4. 验证是否生效**
```bash
zipalign -h  # 能显示帮助信息即表示成功
```

---

### **5. 替代方案（如果未安装 Android SDK）**
如果根本找不到 `build-tools` 目录，说明 Android SDK 未安装或缺失组件：
1. 通过 Android Studio 安装：
   - 打开 **Android Studio → SDK Manager → SDK Tools**  
   - 勾选 **Android SDK Build-Tools** 并安装最新版。
2. 或使用命令行安装：
   ```bash
   sdkmanager "build-tools;36.0.0"
   ```

---

### **关键点总结**
| 问题原因               | 解决方法                          |
|-------------------------|-----------------------------------|
| `zipalign` 不在 `PATH`  | 使用完整路径或配置环境变量        |
| Android SDK 未安装      | 通过 Android Studio 或 `sdkmanager` 安装 |
| 版本不匹配             | 检查 `build-tools` 下的具体版本号 |

完成后重新运行你的 `zipalign` 命令即可解决问题！