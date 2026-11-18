```bash
#!/bin/bash
set -uo pipefail

# 來源資料夾 (要搬的資料夾所在的路徑)

SRC="/path/to/source_folder"

# 目標資料夾 (要搬到哪裡)

DST="/path/to/destination_folder"

# 確認目標資料夾存在，不存在就建立（建立失敗就直接中止）

mkdir -p "$DST" || exit 1

# 要搬移的資料夾清單

# 可以改成你想搬的資料夾名稱，例如 ("docs" "assets")

FOLDERS=("folder1" "folder2")

for folder in "${FOLDERS[@]}"; do
    SRC_FOLDER="$SRC/$folder"
    DST_FOLDER="$DST/$folder"

    if [ -d "$SRC_FOLDER" ]; then
        echo "搬移 $folder..."

        # rsync 說明：
        # -a  → 保留權限、時間等屬性並遞迴複製；-v → 顯示過程
        # 行為是「合併」：來源的所有檔案都會複製到目標，
        #   - 目標沒有的檔案 → 新增
        #   - 目標已有的同名檔案 → 以來源版本覆蓋（不論哪邊比較新）
        #     （rsync 預設以「檔案大小 + 修改時間」判斷是否相同，相同就略過）
        #   - 只存在於目標的檔案 → 保留不動
        # （若不想覆蓋目標已有的檔案，可加 --ignore-existing；只想在來源較新時才覆蓋，可加 --update）
        if rsync -av "$SRC_FOLDER/" "$DST_FOLDER/"; then
            # 只有 rsync 成功（exit status 0）才刪除原始資料夾，避免複製失敗時資料遺失
            rm -rf -- "$SRC_FOLDER"
            echo "$folder 已成功搬移到 $DST（同名檔案已以來源覆蓋）"
        else
            echo "⚠️ $folder 同步失敗（rsync exit status: $?），保留原始資料夾，未刪除：$SRC_FOLDER" >&2
        fi
    else
        echo "$folder 不存在於 $SRC"
    fi

done
```
