## 如何取消一个 Promise

## 如何实时获取 Promise 的进度

写一个增强般的 Promise，内部保存一个用于描述进度 progress 的成员变量，不断去更新即可。

```js
class TraceablePromise extends Promise {
  constructor(executor) {
    super((resolve, reject) => {
      return executor(resolve, reject, state => {
        this.progress = state
      })
    })

    this.progress = 'promise 刚刚执行'
  }

  notify(type, callback) {
    this.notifyHandles.set(type, callback)
  }
}

let p = new TraceablePromise(function(resolve, reject, update) {
  let times = 0
  let timer = setInterval(() => {
    update('promise执行' + times++ + '%')
  }, 100)

  setTimeout(() => {
    clearInterval(timer)
    resolve()
  }, 10000)
})

setInterval(() => {
  console.log(p.progress)
}, 100)

p.then(res => {
  console.log('promise resolved')
})
```

## 如何监听 Promise 的进度

使用发布订阅模式，利用事件回调机制，当执行到某个进度的时候触发事件。

```js
class TraceablePromise extends Promise {
  constructor(executor) {
    super((resolve, reject) => {
      return executor(resolve, reject, type => {
        this.notifyHandles.get(type)()
      })
    })

    this.notifyHandles = new Map()
  }

  notify(type, callback) {
    this.notifyHandles.set(type, callback)
  }
}

let p = new TraceablePromise(function(resolve, reject, notify) {
  setTimeout(() => {
    notify('onhalf')
  }, 5000)
  setTimeout(() => {
    notify('on80')
  }, 8000)

  setTimeout(() => {
    resolve()
  }, 10000)
})

p.notify('onhalf', () => {
  console.log('事件执行一半了')
})

p.notify('on80', () => {
  console.log('事件执行80%了')
})

p.then(res => {
  console.log('promise resolved')
})
```

## 有一个 Api 列表如何依次请求他们(必须等上次请求返回结果之后再请求下一个)

### async

```js
let apiList = [
  'http://localhost:3000/erpn/&id=1',
  'http://localhost:3000/erpn/&id=2',
  'http://localhost:3000/erpn/&id=3',
  'http://localhost:3000/erpn/&id=4',
  'http://localhost:3000/erpn/&id=5',
  'http://localhost:3000/erpn/&id=6',
  'http://localhost:3000/erpn/&id=7',
]

async function runApiList(apiList) {
  let prev = null
  for (let item of apiList) {
    console.log('上次的执行结果', prev)
    prev = await fetch(item)
  }
}

runApiList(apiList)
```

### generator

async 本质上是 generator，所以使用 generator + 自动执行器也可以解决这个问题

```js
let apiList = [
  'http://localhost:3000/erpn/&id=1',
  'http://localhost:3000/erpn/&id=2',
  'http://localhost:3000/erpn/&id=3',
  'http://localhost:3000/erpn/&id=4',
  'http://localhost:3000/erpn/&id=5',
  'http://localhost:3000/erpn/&id=6',
  'http://localhost:3000/erpn/&id=7',
]

function* runApiList(apiList) {
  let prev = null
  for (let item of apiList) {
    console.log('上次的执行结果', prev)
    prev = yield fetch(item)
  }
}

function co(gen) {
  let ret = null
  onFullFilled()
  function onFullFilled(res) {
    ret = gen.next(res)
    next(ret)
  }
  function next(ret) {
    if (ret.done) return
    ret.value.then(onFullFilled)
  }
}

co(runApiList(apiList))
```

### Promise

使用最简单的 promise 也可以

```js
let apiList = [
  '/erpn/group/getGroupList',
  '/erpn/group/getGroupList',
  '/erpn/group/getGroupList',
  '/erpn/group/getGroupList',
  '/erpn/group/getGroupList',
  '/erpn/group/getGroupList',
  '/erpn/group/getGroupList',
]

function runApiList(apiList) {
  let p = Promise.resolve('开始执行了')
  for (let item of apiList) {
    p = p.then(res => {
      console.log('上次的执行结果', res)
      return fetch(item)
    })
  }
}

runApiList(apiList)
```

## async await promise 执行顺序

**await promise 后续的代码的执行类似于传入 then() 中的回调**  
promise resolve 之后会把后续代码加入微任务队列

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function() {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function(resolve) {
  console.log('promise1')
  resolve()
}).then(function() {
  console.log('promise2')
})

/***
 * script start
* async1 start
* async2
* promise1
* script end
* promise2
* async1 end
* setTimeout
 * /
```
