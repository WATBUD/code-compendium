#!/bin/bash

# 來源資料夾 (要搬的資料夾所在的路徑)

SRC="/path/to/source_folder"

# 目標資料夾 (要搬到哪裡)

DST="/path/to/destination_folder"

# 確認目標資料夾存在，不存在就建立

mkdir -p "$DST"

# 要搬移的資料夾清單

# 可以改成你想搬的資料夾名稱，例如 ("docs" "assets")

FOLDERS=("folder1" "folder2")

for folder in "${FOLDERS[@]}"; do
    SRC_FOLDER="$SRC/$folder"
    DST_FOLDER="$DST/$folder"

    if [ -d "$SRC_FOLDER" ]; then
        echo "搬移 $folder..."

        # rsync 說明：
        # --ignore-existing  → 只複製目標沒有的檔案
        # --existing         → 只覆蓋目標已存在的檔案
        rsync -av --ignore-existing "$SRC_FOLDER/" "$DST_FOLDER/"
        rsync -av --existing "$SRC_FOLDER/" "$DST_FOLDER/"

        # 搬移完成後刪掉原始資料夾
        rm -rf "$SRC_FOLDER"

        echo "$folder 已成功搬移到 $DST (只覆蓋衝突部分)"
    else
        echo "$folder 不存在於 $SRC"
    fi

done
