## Type Annotation

使用类型注解可以人为的给变量设置类型

```ts
let n: number;
n = 1231;
```

## Type Inference

所谓类型推断就是 TypeScript 可以通过变量值倒推变量类型，因此在绝大部分情况下，我们是不需要去写类型注解的，如

```ts
let n = 1231;
```

Ts 可以从变量值中推断 n 为 `number` 类型

### 通用类型

需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型。例如，

```ts
let x = [0, 1, '1231', Symbol()];
```

Ts 推断出的类型为 `let x: (string | number | symbol)[]`

## Type Assertions

TypeScript 允许你覆盖它的推断，并且能以你任何你想要的方式分析它，这种机制被称为「类型断言」。TypeScript 类型断言用来告诉编译器你比它更了解这个类型，并且它不应该再发出错误。

::: warning
它之所以不被称为「类型转换」，是因为转换通常意味着某种运行时的支持。但是，类型断言纯粹是一个编译时语法，同时，它也是一种为编译器提供关于如何分析代码的方法。  
不应该过度的使用类型断言，除非对类型有十足把握，否则有可能带来预期之外的运行时错误。
:::

```ts
interface Foo {
  bar: number;
  bas: string;
}

const foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
```

##
