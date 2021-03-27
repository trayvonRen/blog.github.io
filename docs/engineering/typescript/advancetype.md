## 类型别名

可以使用 type 自定义类型

```ts
const objectArr: User[] = [
  {
    name: 'dell',
    age: 28,
  },
]
```

## 可索引的类型

## 交叉类型（Intersection Types）

交叉类型可以让我们把现有的类型组合在一起得到一个新的类型，从而同时拥有它们的全部属性，表示方法是：A & B 。

:::warning
如果一个值是交叉类型，传递的值必须包含各个交叉类型的所有成员。  
:::

```ts
interface Bird {
  fly: () => any
  layEggs: () => any
}

interface Fish {
  swim: () => any
  layEggs: () => any
}

function getSmallPet(): Fish & Bird {
  return {
    swim() {
      return 111
    },
    layEggs() {
      return 12433
    },
    fly() {
      return 12313
    },
  }
}

let pet = getSmallPet()
pet.layEggs() // okay
pet.swim() // okay
```

显然，两个基本类型的交叉类型为 `never`

```ts
let n: number & string
// let n: never
```

## 联合类型（Union Types）

联合类型表示一个值可以是几种类型之一。 我们用竖线（ |）分隔每个类型，所以 number | string | boolean 表示一个值可以是 number， string，或 boolean。
:::warning
如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。  
:::

```ts
interface Bird {
  fly: () => any
  layEggs: () => any
}

interface Fish {
  swim: () => any
  layEggs: () => any
}

function getSmallPet(): Fish | Bird {
  return {
    swim() {
      return 111
    },
    layEggs() {
      return 12433
    },
  }
}

let pet = getSmallPet()
pet.layEggs() // okay
pet.swim() // errors
```

## 类型保护

对于联合类型，typescript 并不知道具体是哪种类型。  
`类型保护`为我们提供了一种机制，让我们在运行时确定联合类型的具体类型。

### 用户自定义的类型保护

```ts
function isFish(pet: Bird | Fish): pet is Fish {
  return (pet as Fish).swim !== undefined
}
let pet = getSmallPet()
if (isFish(pet)) {
  pet.swim()
} else {
  pet.layEggs()
}
```

### in 操作符

```ts
let pet = getSmallPet()

pet.swim() // error
if ('swim' in pet) {
  pet.swim()
}
```

### typeof 操作符

```ts
function add(num1: string | number, num2: string | number) {
  if (typeof num1 === 'string') {
    return num1 + num2
  }
}
```

### 类型断言

```ts
let pet = getSmallPet() as Fish
pet.swim()
```

**类型保护的原理是：对于某些特定的语法，typescript 可以从联合类型中得到具体的类型**
