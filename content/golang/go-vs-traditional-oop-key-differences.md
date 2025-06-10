# Go與傳統OOP的主要差異 (Go vs Traditional OOP Key Differences)

## 1. 沒有類別概念 (No Class Concept)

**傳統OOP (Java)：**
```java
public class Person {
    private String name;
    private int age;
    
    public void speak() {
        System.out.println("Hello, I'm " + name);
    }
}
```

**Go：**
```go
type Person struct {
    name string
    age  int
}

func (p Person) speak() {
    fmt.Printf("Hello, I'm %s\n", p.name)
}
```

## 2. 沒有繼承 (No Inheritance)

**傳統OOP (Java)：**
```java
public class Animal {
    protected String name;
    public void eat() { /* ... */ }
}

public class Dog extends Animal {  // 繼承
    public void bark() { /* ... */ }
}
```

**Go：**
```go
type Animal struct {
    name string
}

func (a Animal) eat() { /* ... */ }

type Dog struct {
    Animal  // 嵌入，不是繼承 (Embedding, not inheritance)
    breed string
}

func (d Dog) bark() { /* ... */ }
```

## 3. 介面實現方式不同 (Different Interface Implementation)

**傳統OOP (Java)：**
```java
interface Speaker {
    void speak();
}

public class Person implements Speaker {  // 明確宣告
    public void speak() {
        System.out.println("Hello!");
    }
}
```

**Go：**
```go
type Speaker interface {
    speak()
}

type Person struct {
    name string
}

func (p Person) speak() {  // 隱式實現，不需宣告 (Implicit implementation, no declaration needed)
    fmt.Println("Hello!")
}
// Person 自動實現了 Speaker 介面 (Person automatically implements Speaker interface)
```

## 4. 沒有建構函數 (No Constructor)

**傳統OOP (Java)：**
```java
public class Person {
    private String name;
    
    public Person(String name) {  // 建構函數
        this.name = name;
    }
}

Person p = new Person("Alice");
```

**Go：**
```go
type Person struct {
    name string
}

// 工廠函數替代建構函數 (Factory function replaces constructor)
func NewPerson(name string) Person {
    return Person{name: name}
}

// 或直接初始化 (Or direct initialization)
p := Person{name: "Alice"}
```

## 5. 設計哲學不同 (Different Design Philosophy)

**傳統OOP - 強調階層抽象 (Traditional OOP - Emphasizes Hierarchical Abstraction)：**
```java
abstract class Vehicle {
    abstract void move();
}

class Car extends Vehicle {
    void move() { /* 開車 */ }
}

class Plane extends Vehicle {
    void move() { /* 飛行 */ }
}
```

**Go - 多重 interface 組合隱式實現的抽象 (Go - Emphasizes Composition and Simplicity)：**
```go
// 可以同時實現多個 interface
type Flyable interface {
    fly()
}

type Swimmable interface {
    swim()
}

type Duck struct{}

func (d Duck) move() { /* 走路 */ }
func (d Duck) fly()  { /* 飛行 */ }  
func (d Duck) swim() { /* 游泳 */ }
// Mover interface 需要 move() 方法
// Car 有 move() 方法嗎？✅ 有
// 方法簽名一致嗎？✅ 一致
// 那 Car 就是 Mover！

// Duck 同時是 Mover, Flyable, Swimmable

```

## 總結 (Summary)

Go不是傳統的OOP語言，而是一種**多範式語言** (Go is not a traditional OOP language, but a **multi-paradigm language**)，它：
- 借用了OOP的封裝和多型概念 (Borrows encapsulation and polymorphism concepts from OOP)
- 摒棄了複雜的繼承階層 (Abandons complex inheritance hierarchies)
- 採用組合優於繼承的設計原則 (Adopts composition over inheritance design principle)
- 強調簡潔性和實用性 (Emphasizes simplicity and practicality)