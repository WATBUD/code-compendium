比較兩個 parent 的差異 如果要找出 merge commit 的所有異動檔案，可以用以下指令：
git diff --name-only 639874fb5f 036f8d22a6
查看合併過程中引入的變更 如果您需要檢查合併時新引入的變更，可以執行：
git diff --name-only cb86824238bf7c2e818ef43a3733e65f88bf8682^1 cb86824238bf7c2e818ef43a3733e65f88bf8682^2

