## 布尔值

```ts
let isDone: boolean = false
```

## 数字

```ts
let decLiteral: number = 6
let hexLiteral: number = 0xf00d
let binaryLiteral: number = 0b1010
let octalLiteral: number = 0o744
```

## 字符串

```ts
let name: string = 'bob'
name = 'smith'
```


## 枚举

```ts
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green
```

## Any

```ts
let notSure: any = 4
notSure = 'maybe a string instead'
notSure = false // okay, definitely a boolean
```

## Void

```ts
function warnUser(): void {
  console.log('This is my warning message')
}
```

## Null 和 Undefined

```ts
// Not much else we can assign to these variables!
let u: undefined = undefined
let n: null = null
```

## Never

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}

// 推断的返回值类型为never
function fail() {
  return error('Something failed')
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
  while (true) {}
}
```
