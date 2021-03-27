## 类型注解（Type Annotation）

可以人为的给变量设置一个类型，如

```ts
let n: number
n = 1231
```

## 类型推断（Type Inference）

所谓类型推断就是 TypeScript 可以通过变量值倒推变量类型，因此在绝大部分情况下，我们是不需要去写类型注解的，如

```ts
let n = 1231
```

Ts 可以从变量值中推断 n 为 `number` 类型

### 类型推断 —— 通用类型

需要从几个表达式中推断类型时候，会使用这些表达式的类型来推断出一个最合适的通用类型。例如，

```ts
let x = [0, 1, '1231', Symbol()]
```

Ts 推断出的类型为 `let x: (string | number | symbol)[]`
