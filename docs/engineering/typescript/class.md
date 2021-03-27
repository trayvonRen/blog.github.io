## 类的语法

### public，private，protected

```ts
class Person {
  private _name = 'dell'
  public age = 12
  protected sex = 'male'
  getName() {
    return this._name
  }
}
```

### readonly 修饰符

你可以使用 readonly 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

```ts
class Octopus {
  readonly name: string
  readonly numberOfLegs: number = 8
  constructor(theName: string) {
    this.name = theName
  }
}
let dad = new Octopus('Man with the 8 strong legs')
dad.name = 'Man with the 3-piece suit' // 错误! name 是只读的.
```

### getter / setter

TypeScript 支持通过 getters/setters 来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。

```ts
class Person {
  constructor(private _name) {}
  get getName() {
    return this._name
  }

  set setName(name) {
    this._name = name
  }
}
```

### 静态属性

我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。

```ts
class Grid {
  static origin = { x: 0, y: 0 }
  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x
    let yDist = point.y - Grid.origin.y
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale
  }
  constructor(public scale: number) {}
}

let grid1 = new Grid(1.0) // 1x scale
let grid2 = new Grid(5.0) // 5x scale

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }))
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }))
```

## 抽象类

抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。 不同于接口，抽象类可以包含成员的实现细节。 abstract 关键字是用于定义抽象类和在抽象类内部定义抽象方法。

```ts
abstract class Gemo {
  abstract getArea(): number
}

class Circle implements Gemo {
  constructor(private _r) {
    this._r = _r
  }
  getArea() {
    return this._r * this._r
  }
}
```
