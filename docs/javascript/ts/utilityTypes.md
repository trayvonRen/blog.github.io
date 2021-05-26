TypeScript 提供了一些全局范围的工具类型以供类型转换

## `Partial<Type>`

构造一个将 Type 的所有属性设置为可选的类型

```ts
interface Todo {
  title: string;
  description: string;
}

//ok
const todo1: Partial<Todo> = {
  title: 'organize desk',
  description: 'clear clutter',
};

//ok
const todo2: Partial<Todo> = {
  description: 'clear clutter',
};

//ok
const todo3: Partial<Todo> = {};

// error
const todo4: Partial<Todo> = {
  name: 'rcw',
};
```

### 类似的还有以下类型

#### `Required<Type>`

构造一个类型，该类型包括将 Type 设置为 required 的所有属性。

#### `Readonly<Type>`

构造一个 Type 的所有属性都设置为 readonly 的类型，这意味着无法重新分配所构造类型的属性。

## `Record<Keys,Type>`

```ts
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = 'miffy' | 'boris' | 'mordred';

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' },
};
```

## `Pick<Type, Keys>`

从 Type 中选择一部分属性来构建类型

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
```

## `Omit<Type, Keys>`

从 Type 中删除某些属性构建类型

## `Exclude<Type, ExcludedUnion>`

删除某个联合类型的部分子类型

```ts
type T0 = Exclude<'a' | 'b' | 'c', 'a'>;
//    ^ = type T0 = "b" | "c"
```

## `Extract<Type, Union>`

去交集

```ts
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>;
//    ^ = type T0 = "a"
```

## `NonNullable<Type>`

去除 null 和 undefined

```ts
type T0 = NonNullable<string | number | undefined>;
//    ^ = type T0 = string | number
```

## `Parameters<Type>`

从函数类型中提取出参数的类型

```ts
type T0 = Parameters<(a: number, b: string) => void>;
// type T0 = [a: number, b: string];
```
