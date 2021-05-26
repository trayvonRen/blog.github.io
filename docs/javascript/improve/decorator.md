## 装饰器原理解析

在 Typescript 中，装饰器分为五种：

- 类装饰器
- 类方法装饰器
- 访问器装饰器
- 参数装饰器
- 属性装饰器

这些装饰器可以用来修改类的行为，也可以添加 `MetaData`，实现注解的功能，如在 `Nestjs` 中。

以最常用的`类装饰器`和`类方法装饰器`为例，探究它们的实现原理。

### 类装饰器

类装饰器接受类的构造函数，可以在装饰器中修改类的行为。

```ts
function changeName(constructor: any) {
  constructor.username = 'rcw';
}

@changeName
class People {
  static username: string;
  constructor(name: string) {}
}
console.log(People.username);
```

#### 原理解析

通过 [Typescript Playground](https://www.typescriptlang.org/play?target=7#code/GYVwdgxgLglg9mABBAFgQzAcwKYDk0C22AFBAgM5QBOI0cVAXIhgJ4CUiA3gLABQiyCtVpR6AOhDlsVMIWyIAvIgDkVCAHdlAbj4BfPnwACqDDnxE+EADZpy5RAAVscAA5X5PfokppYERJLSskRMlFQwWDpeZGBhIvTEwdih1BGYHJz6vFkx5HDuYlZwmMROrgWBMnJsWkA) 编译之后的结果：

```ts
'use strict';
var __decorate = function(decorators, target) {
  var decorator;
  var rst = target;
  for (var i = decorators.length - 1; i >= 0; i--) {
    if ((decorator = decorators[i])) {
      rst = decorator(target) || rst;
    }
  }
  return rst;
};

function changeName(constructor) {
  constructor.username = 'rcw';
}
let People = class People {
  constructor(name) {}
};
People = __decorate([changeName], People);
console.log(People.username);
```

通过编译之后的源码可以看出：  
类装饰器本质上就是把 class 通过参数传递给 decorator 执行。
类似于

```ts
let A = class A {};
A = decorator(A);
```

如果一个类有多个装饰器，会依次执行；  
**如果装饰器中返回对象，会直接代替原先的 class，通常不建议这样做。**

### 类方法装饰器

类方法装饰器可以用来修改方法的 descriptor

```ts
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }

  @enumerable(false)
  greet() {
    return 'Hello, ' + this.greeting;
  }
}

function enumerable(value: boolean) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = value;
  };
}
```

#### 原理解析

通过 [Typescript Playground](https://www.typescriptlang.org/play?target=7#code/MYGwhgzhAEDiBOBTRAXR9oG8CwAoa0A5kqgJYB2hAXNBCvBYQNx4HAD25d8ArsCu3gAKALaIoYQohrdGASiysC0FAAtSEAHTFkKRtAC80MRKkt80AL54lAAUTkeY+GABGIREIBmYEBERySjqoQgo4FgRIKDzw5NAARAASiCAg7AA0CdAA1CrqWsF6lOYE1rhleF485PyknNAOTuhuHkIAbr480tCu7OweYORhSlExcVU1evVCKGDwUig0gwCemQAO8Oxr6CjLANKIyzL0jJkAJuLADGsC8DQACpvb8LsAIpfXt8MR0BcQV6QboJNI1nC1EIZoB0QF0SlZzGUgA)
编译之后的结果：

```ts
'use strict';
var __decorate = function(decorators, target, key, desc) {
  var rst = (desc = Object.getOwnPropertyDescriptor(target, key));
  var decorator;

  for (var i = decorators.length - 1; i >= 0; i--) {
    if ((decorator = decorators[i])) {
      rst = decorator(target, key, rst) || rst;
    }
  }

  return rst && Object.defineProperty(target, key, rst), rst;
};

class Greeter {
  constructor(message) {
    this.greeting = message;
  }
  greet() {
    return 'Hello, ' + this.greeting;
  }
}

function enumerable(value) {
  return function(target, propertyKey, descriptor) {
    descriptor.enumerable = value;
  };
}

__decorate([enumerable(false)], Greeter.prototype, 'greet', null);
```

可以看出类方法装饰器本质上是执行了装饰器函数，并是使用了 `Object.defineProperty` 修改了方法的 `descriptor`

## 注解

注解是 Java 中的概念，用于添加元数据，并不能实现任何操作。需要另外的 Scanner 根据元数据执行相应操作。

TypeScript 本身并不支持注解，但是可以在装饰器中使用 `Reflect.metaData` 实现模拟注解的语法糖。

## 参考资料

[Typescript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)
