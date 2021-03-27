## 数组

```ts
let list: number[] = [1, 2, 3]
```

使用数组泛型定义数组

```ts
let list: Array<number> = [1, 2, 3]
```

数组元素为对象类型

```ts
const objectArr: { name: string; age: number }[] = [
  {
    name: 'dell',
    age: 28,
  },
]

class Teacher{
  name: string,
  age: number
}


const objectArr: Teacher[]= [
  new Teacher(),
  {
    name: 'rcw',
    age: 28
  }
]
```

## 元组

元组与数组类似，但是元组每个成员的类型可以确定。

```ts
// Declare a tuple type
let x: [string, number] = ['hello', 10]
// Initialize it incorrectly
x = [10, 'hello'] // Error
```

## 函数

有一下两种方式给函数定义类型

```ts
const func = (str: string): number => {
  return parseInt(str, 10)
}

const func1: (str: string) => number = str => {
  return parseInt(str, 10)
}
```

在一般情况下，函数的返回值可以通过类型推断自动推断出来，所以可以不用写返回值的类型

```ts
const func = (str: string) => {
  return parseInt(str, 10)
}
```
