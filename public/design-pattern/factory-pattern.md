## 2. **Factory Pattern** - 不指定具體類別,根據傳入的類型來選擇創建相應的對象

### 範例

```javascript
// 定義車輛的類別
class Car {
    constructor(brand) {
        this.brand = brand;
    }

    drive() {
        console.log(`${this.brand} car is driving`);
    }
}

class Bike {
    constructor(brand) {
        this.brand = brand;
    }

    ride() {
        console.log(`${this.brand} bike is riding`);
    }
}

// 工廠類別
class VehicleFactory {
    static createVehicle(type, brand) {
        if (type === 'car') {
            return new Car(brand);
        } else if (type === 'bike') {
            return new Bike(brand);
        } else {
            throw new Error('Unknown vehicle type');
        }
    }
}

// 使用工廠方法創建對象
const myCar = VehicleFactory.createVehicle('car', 'Toyota');
myCar.drive();  // 輸出: Toyota car is driving

const myBike = VehicleFactory.createVehicle('bike', 'Yamaha');
myBike.ride();  // 輸出: Yamaha bike is riding
