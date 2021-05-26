## 泛型

设计泛型的关键目的是在成员之间提供有意义的约束。  
最简单的一个例子如下

```ts
function identity<Type>(arg: Type): Type {
  return arg;
}
// equivalent to
const identity: <Type>(arg: Type) => Type = <Type>(arg: Type) => arg;
```

他可以保证函数的参数和返回值是同一个类型。

## Keyof

keyof 可以从对象接口中提取出键名作为联合类型

```ts
interface IPerson {
  name: string;
  age: number;
}
type PersonKey = keyof IPerson;
// 'name' | 'age'
```

## Typeof

typeof 与 javascript 中的行为类似，可以返回一个表达式的类型。

```ts
const obj = {
  name: 'rcw',
  age: 24,
};

type IPerson = typeof obj;
// type IPerson = {
//   name: string;
//   age: number;
// };
```

## Mapped Types

mapped type 以索引签名为基础，在原有的类型上构建新的类型

```ts
type IKeys = 'name' | 'age' | 'sex';

type IKeyMap = {
  [Property in IKeys]: string;
};
// type IKeyMap = {
//     name: string;
//     age: string;
//     sex: string;
// }
```
