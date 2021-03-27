TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 它有时被称做“鸭式辨型法”或“结构性子类型化”。 在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。

### 对象类型的接口

```ts
interface Person {
  name: string
}

const setPersonName = (person: Person, name: string) => {
  person.name = name
  return person.name
}
```

### 函数类型的接口

```ts
interface SayHi {
  (word: string): string
}

const say: SayHi = (word: string) => {
  return 'hi'
}

let say1: SayHi
say1 = function(word) {
  return 'hi'
}
```

## 接口语法

### 只读属性

```ts
interface Person {
  readonly name: string
}
```

### 可选属性

```ts
interface Person {
  age?: number
}
```

### 额外属性检查

对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时候。 如果一个对象字面量存在任何“目标类型”不包含的属性时，会得到一个错误。

```ts
const person = {
  name: 'rcw',
  age: 20,
}
setPersonName(person, 'rcw1') // true
setPersonName({ name: 'rcw', age: 20 }, 'rcw1') // error
```

可以使用`索引签名`解决这个问题

```ts
interface Person {
  name: string
  [propName: string]: any
}

const setPersonName = (person: Person, name: string) => {
  person.name = name
  return person.name
}

const person = {
  name: 'rcw',
  age: 20,
}
setPersonName({ name: 'rcw', age: 20 }, 'rcw1') // true
```

### 接口继承

可以使用接口继承另外一个接口，实现接口的对象必须同时满足两个接口的条件

```ts
interface Person {
  name: string
  age?: number
}

interface Teacher extends Person {
  teacher(): string
}

const person: Teacher = {
  name: 'rcw',
  teacher() {
    return '123'
  },
}
```
