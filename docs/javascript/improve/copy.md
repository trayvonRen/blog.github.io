## 对象浅拷贝

### Object.assign()

```js
const target = { a: 1, b: 2 }
const source = { b: 4, c: 5 }

const returnedTarget = Object.assign(target, source)

console.log(target)
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget)
// expected output: Object { a: 1, b: 4, c: 5 }
```

### 展开运算符

```js
const A = {
  name: 'rcw',
  age: 12,
  a: {
    x: 1212,
  },
}

const B = {
  b: 1212,
}

const C = {
  c: 1313,
}
const D = {
  ...A,
  ...B,
  ...C,
}
console.log(D)
console.log(A.a === D.a)
```

## 对象深拷贝

### JSON.parse(JSON.stringify())

```js
let arr = [
  1,
  3,
  {
    username: ' kobe',
  },
]
let arr4 = JSON.parse(JSON.stringify(arr))
arr4[2].username = 'duncan'
console.log(arr, arr4)
```

这种方法虽然可以实现数组或对象深拷贝,但不能处理函数和正则，因为这两者基于 JSON.stringify 和 JSON.parse 处理后，得到的正则就不再是正则（变为空对象），得到的函数就不再是函数（变为 null）了。

### 手写 cloneDeep

基础版本

```js
function cloneDeep(target) {
  if (typeof target === 'object') {
    let cloneTarget = Array.isArray(target) ? [] : {}
    for (const key in target) {
      cloneTarget[key] = cloneDeep(target[key])
    }
    return cloneTarget
  } else {
    return target
  }
}
```

解决循环引用问题

```js
function cloneDeep(target, map = new WeakMap()) {
  if (target === 'object') {
    if (map.has(target)) {
      return map.get(target)
    }
    let cloneTarget = Array.isArray(target) ? [] : {}
    map.set(target, cloneTarget)
    for (const key in target) {
      cloneTarget[key] = cloneDeep(target[key], map)
    }
  } else {
    return target
  }
}
```

使用 while 循环进行性能优化

```js
function forEach(keys, interatee) {
  let index = -1
  let length = keys.length
  while (++index < length) interatee(index, keys[index])
}

function cloneDeep(target, map = new WeakMap()) {
  if (typeof target === 'object') {
    if (map.has(target)) return map.get(target)
    let cloneTarget = Array.isArray(target) ? [] : {}
    map.set(target, cloneTarget)
    // for (let key in target) {
    //   cloneTarget[key] = cloneDeep(target[key], map)
    // }
    const keys = Array.isArray(target) ? undefined : Object.keys(target)

    forEach(keys || target, (key, value) => {
      if (keys) {
        key = value
      }
      cloneTarget[key] = cloneDeep(target[key], map)
    })
    return cloneTarget
  } else {
    return target
  }
}
```

## 数组浅拷贝

### Array.prototype.concat()

### Array.prototype.slice()

### 展开运算符

## 数组深拷贝

### JSON.parse(JSON.stringify())

```js
const A = [1, 2, { name: 'rcw' }]
const B = [
  3,
  4,
  {
    oj: {
      gae: 13,
    },
  },
]

console.log([...A, ...B])
```

### 手写 cloneDeep

同上

## 所有类型深拷贝：deepClone

参考代码

```js
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const argsTag = '[object Arguments]'

const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'
const funcTag = '[object Function]'

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]

function forEach(array, iteratee) {
  let index = -1
  const length = array.length
  while (++index < length) {
    iteratee(array[index], index)
  }
  return array
}

function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}

function getType(target) {
  return Object.prototype.toString.call(target)
}

function getInit(target) {
  const Ctor = target.constructor
  return new Ctor()
}

function cloneSymbol(targe) {
  return Object(Symbol.prototype.valueOf.call(targe))
}

function cloneReg(targe) {
  const reFlags = /\w*$/
  const result = new targe.constructor(targe.source, reFlags.exec(targe))
  result.lastIndex = targe.lastIndex
  return result
}

function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  if (func.prototype) {
    const param = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (body) {
      if (param) {
        const paramArr = param[0].split(',')
        return new Function(...paramArr, body[0])
      } else {
        return new Function(body[0])
      }
    } else {
      return null
    }
  } else {
    return eval(funcString)
  }
}

function cloneOtherType(targe, type) {
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Object(targe)
    case regexpTag:
      return cloneReg(targe)
    case symbolTag:
      return cloneSymbol(targe)
    case funcTag:
      return cloneFunction(targe)
    default:
      return null
  }
}

function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target
  }

  // 初始化
  const type = getType(target)
  let cloneTarget
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type)
  } else {
    return cloneOtherType(target, type)
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  // 克隆set
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(clone(value, map))
    })
    return cloneTarget
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map))
    })
    return cloneTarget
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target)
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value
    }
    cloneTarget[key] = clone(target[key], map)
  })

  return cloneTarget
}

const map = new Map()
map.set('key', 'value')
map.set('ConardLi', 'code秘密花园')

const set = new Set()
set.add('ConardLi')
set.add('code秘密花园')

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child',
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(false),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
    console.log('code秘密花园')
  },
  func2: function(a, b) {
    return a + b
  },
}

console.log(clone(target))
```

## 参考

[如何写出一个惊艳面试官的深拷贝?](https://juejin.im/post/6844903929705136141)
