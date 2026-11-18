➡️ APK Installation
adb install app-release.apk

➡️ Get App Package Name
adb shell pm list packages

➡️ Uninstall App

adb uninstall <package_name>

➡️ List Installed Packages

adb shell pm list packages

➡️ Check Storage Usage

adb shell df -h

➡️ Clear App Cache (System-wide)

adb shell pm trim-caches 500M

➡️ Kill Emulator

adb emu kill

➡️ Install Debug APK

adb install android/app/build/outputs/apk/debug/app-debug.apk

➡️ Force Reinstall APK

adb install -r app-debug.apk
