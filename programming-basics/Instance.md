# Instance

**Instance** 可以是一把武器、一個人、一本書。今天我要你做一個 **Class** 叫 **武器**。但是我要 5000 把不同的武器，不同的可能是顏色、攻擊力、速度等等。

如果你沒有建構子，那你就失去了初始化和動態變化的權力。

```python
class Weapon:
    def __init__(self, color, attack_power, speed):
        self.color = color
        self.attack_power = attack_power
        self.speed = speed

# 創建不同實例的範例
weapon1 = Weapon("red", 50, 10)
weapon2 = Weapon("blue", 60, 8)
weapon3 = Weapon("green", 45, 12)
# ... 可以繼續創建其他不同的武器實例







