# MongoDB Update Command Example

## Update All Elements in `personal_config` Array to Add `last_read_time` Field

# 新增欄位
db.collection.updateMany(
    {}, // Filter criteria - applies to all documents. Modify as needed.
    {
        $set: {
            "personal_config.$[].last_read_time": new Date() // Set to the current date/time or a specific date
        }
    }
)

- add user_list array
{
  $set: {
   "user_list": []
  },
}


# 删除欄位
{
  $unset: {
    "personal_config.$[].isMuted": ""
    "chatroom_list.$[].notification_on": ""
  }
}

