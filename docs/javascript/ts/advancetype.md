## 类型别名

可以使用 type 自定义类型

```ts
const objectArr: User[] = [
  {
    name: 'dell',
    age: 28,
  },
];
```

## 交叉类型（Intersection Types）

交叉类型可以让我们把现有的类型组合在一起得到一个新的类型，从而同时拥有它们的全部属性，表示方法是：A & B 。

:::warning
如果一个值是交叉类型，传递的值必须包含各个交叉类型的所有成员。  
:::

```ts
interface Bird {
  fly: () => any;
  layEggs: () => any;
}

interface Fish {
  swim: () => any;
  layEggs: () => any;
}

function getSmallPet(): Fish & Bird {
  return {
    swim() {
      return 111;
    },
    layEggs() {
      return 12433;
    },
    fly() {
      return 12313;
    },
  };
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim(); // okay
```

显然，两个基本类型的交叉类型为 `never`

```ts
let n: number & string;
// let n: never
```

## 联合类型（Union Types）

联合类型表示一个值可以是几种类型之一。 我们用竖线（ |）分隔每个类型，所以 number | string | boolean 表示一个值可以是 number， string，或 boolean。
:::warning
如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。  
:::

```ts
interface Bird {
  fly: () => any;
  layEggs: () => any;
}

interface Fish {
  swim: () => any;
  layEggs: () => any;
}

function getSmallPet(): Fish | Bird {
  return {
    swim() {
      return 111;
    },
    layEggs() {
      return 12433;
    },
  };
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim(); // errors
```
