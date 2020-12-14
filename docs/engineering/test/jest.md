## 匹配器

Jest 使用“匹配器”让你可以用各种方式测试你的代码。

### 普通匹配器

最简单的测试值的方法是看是否精确匹配。

```js
test('two plus two is four', () => {
  expect(2 + 2).toBe(4)
})
```

### 数字

大多数的比较数字有等价的匹配器。

```js
test('two plus two', () => {
  const value = 2 + 2
  expect(value).toBeGreaterThan(3)
  expect(value).toBeGreaterThanOrEqual(3.5)
  expect(value).toBeLessThan(5)
  expect(value).toBeLessThanOrEqual(4.5)

  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4)
  expect(value).toEqual(4)
})
```

## 测试异步代码

### 回调类型的异步函数

被测试的模块

```js
import axios from 'axios'

export const fetchData = fn => {
  axios.get('http://www.dell-lee.com/react/api/demo.json').then(res => {
    fn(res.data)
  })
}
```

测试代码

```js
import { fetchData } from './fetchData'

test('fetch data', done => {
  fetchData(data => {
    expect(data).toEqual({
      success: true,
    })
    done()
  })
})
```

### Promise 类型异步函数

被测试的模块

```js
import axios from 'axios'

export const fetchData = () => {
  return axios.get('http://www.dell-lee.com/react/api/demo.json')
}
```

测试代码

```js
import { fetchData } from './fetchData'

test('fetch data', () => {
  fetchData().then(res => {
    expect(res.data).toEqual({
      success: true,
    })
  })
})
```

```js
import { fetchData } from './fetchData'

test('fetch data', () => {
  return expect(fetchData()).resolves.toMatchObject({
    data: {
      success: true,
    },
  })
})
```

```js
import { fetchData } from './fetchData'

test('fetch data', async () => {
  const response = await fetchData()
  expect(response.data).toEqual({
    success: true,
  })
})
```

测试是否为异常

```js
import { fetchData } from './fetchData'

test('fetch data', () => {
  return expect(fetchData()).rejects.toThrow()
})
```

```js
import { fetchData } from './fetchData'

test('fetch data', async () => {
  expect.assertions(1)

  try {
    await fetchData()
  } catch (e) {
    expect(e.toString()).toEqual('Error: Request failed with status code 404')
  }
})
```

## 钩子函数

```js
import Counter from './Counter'

let counter = null

beforeAll(() => {
  counter = new Counter()
})

afterAll(() => {})

beforeEach(() => {})
afterEach(() => {})
test('Coounter addOne', () => {
  counter.addOne()
  expect(counter.number).toBe(1)
})
```

## Mock Functions

Mock 函数允许你测试代码之间的连接——实现方式包括：擦除函数的实际实现、捕获对函数的调用 ( 以及在这些调用中传递的参数) 、在使用 new 实例化时捕获构造函数的实例、允许测试时配置返回值。

### 捕获函数调用

```js
import { runCallback } from './demo'

test('测试 runCallback', () => {
  const func = jest.fn()
  runCallback(func)
  expect(func).toBeCalled()
})
```

### 获取更多.mock 属性

```js
import { run } from 'jest'
import { runCallback } from './demo'

test('测试 runCallback', () => {
  const mockCallback = jest.fn(x => 42 + x)
  runCallback(mockCallback)
  runCallback(mockCallback)

  // 此 mock 函数被调用了两次
  expect(mockCallback.mock.calls.length).toBe(2)

  // 第一次调用函数时的第一个参数是 0
  expect(mockCallback.mock.calls[0][0]).toBe(0)

  // 第二次调用函数时的第一个参数是 1
  expect(mockCallback.mock.calls[1][0]).toBe(1)

  // 第一次函数调用的返回值是 42
  expect(mockCallback.mock.results[0].value).toBe(42)
})
```

### 模拟模块，改变函数的内部实现

```js
import { getData, runCallback } from './demo'
import axios from 'axios'
jest.mock('axios')

test.only('测试 getdata', async () => {
  axios.get.mockResolvedValue({ data: 'hello' })
  await getData().then(data => {
    expect(data).toBe('hello')
  })
})
```

### 对计时器 mock

```js
import { timer } from './timer'

jest.useFakeTimers()
test('timer 测试', () => {
  const fn = jest.fn()
  timer(fn)
  jest.runAllTimers()
  expect(fn).toHaveBeenCalledTimes(1)
})
```

## 快照

使用快照可以测试出文件的变化情况  
test 会比较上次生产的快照与本次运行结果是否有变化。

```js
export const generateConfig = () => {
  return {
    server: 'http://localhost',
    port: 8080,
  }
}
```

```js
import { generateConfig } from './demo2'

test('测试 generateConfig', () => {
  expect(generateConfig()).toMatchSnapshot()
})
```

```js
import { generateConfig } from './demo2'

test('测试 generateConfig', () => {
  expect(generateConfig()).toMatchSnapshot({
    time: expect.any(Date),
  })
})
```

### 行内快照

```js
test('测试 generateConfig', () => {
  expect(generateConfig()).toMatchInlineSnapshot(
    {
      time: expect.any(Date),
    },
    `
    Object {
      "port": 8080,
      "server": "http://localhost",
      "time": Any<Date>,
    }
  `
  )
})
```

## 测试 DOM 节点
