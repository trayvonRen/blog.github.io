## 实现 promise

祈祷面试官不要问这个问题

根据 Promise A+ 实现 promise

```js
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise(executor) {
  let self = this
  this.status = PENDING
  self.onFulfilled = []
  self.onRejected = []
  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED
      self.value = value
      self.onFulfilled.fpromiseorEach(fn => fn())
    }
  }
  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED
      self.reason = reason
      self.onRejected.forEach(fn => fn())
    }
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : reason => {
          throw reason
        }
  let self = this
  let promise2 = new Promise((reslove, reject) => {
    if (self.status === FULFILLED) {
      queueMicrotask(() => {
        try {
          let x = onFulfilled(self.value)
          resolvePromise(promise2, x, reslove, reject)
        } catch (e) {
          reject(e)
        }
      })
    } else if (self.status === REJECTED) {
      queueMicrotask(() => {
        try {
          let x = onRejected(self.reason)
          resolvePromise(promise2, x, reslove, reject)
        } catch (e) {
          reject(e)
        }
      })
    } else if (self.status === PENDING) {
      self.onFulfilled.push(() => {
        queueMicrotask(() => {
          try {
            let x = onFulfilled(self.value)
            resolvePromise(promise2, x, reslove, reject)
          } catch (e) {
            reject(e)
          }
        })
      })

      self.onRejected.push(() => {
        queueMicrotask(() => {
          try {
            let x = onRejected(self.reason)
            resolvePromise(promise2, x, reslove, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }
  })
  return promise2
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    reject(new TypeError('Chaining cycle'))
  }
  if ((x && typeof x === 'object') || typeof x === 'function') {
    let used
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (used) return
            used = true
            resolvePromise(promise, y, resolve, reject)
          },
          r => {
            if (used) return
            used = true
            reject(r)
          }
        )
      } else {
        if (used) return
        used = true
        resolve(x)
      }
    } catch (e) {
      if (used) return
      used = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

Promise.defer = Promise.deferred = function() {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise
```

## 实现 promise.all

本质上利用 promise.then 进行模拟，当所有 promise.then 都执行时，即可执行 resolve

```js
function promiseAll(promisesArr) {
  return new Promise(function(resolve, reject) {
    let promiseNum = promisesArr.length
    let resolvedNum = 0
    let resolvedValues = new Array(promiseNum)

    for (let i = 0; i < promiseNum; i++) {
      let p = promisesArr[i]

      // 对非 promise 进行包装
      if (!(p instanceof Promise)) {
        p = Promise.resolve(p)
      }

      p.then(
        res => {
          resolvedValues[i] = res
          if (++resolvedNum === promiseNum) {
            resolve(resolvedValues)
          }
        },
        err => {
          reject(err)
        }
      )
    }
  })
}

let p1 = promiseAll([1, 12, 32])
p1.then(res => {
  console.log(res)
})
let p2 = promiseAll([1, Promise.resolve(1), 32])
p2.then(res => {
  console.log(res)
})
let p3 = promiseAll([
  1,
  Promise.resolve(1),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(232)
    }, 2000)
  }),
])
p3.then(res => {
  console.log(res)
})
let p4 = promiseAll([
  1,
  Promise.resolve(1),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(232)
    }, 2000)
  }),
])

p4.catch(err => {
  console.log(err)
})
```

## 实现 Promise.race

与 promise.all 实现方法类似

```js
function promiseRace(promisesArr) {
  return new Promise(function(resolve, reject) {
    for (let i = 0; i < promisesArr.length; i++) {
      let p = promisesArr[i]
      if (!(p instanceof Promise)) p = Promise.resolve(p)
      p.then(
        res => {
          resolve(res)
        },
        err => {
          reject(err)
        }
      )
    }
  })
}

let p1 = promiseRace([1, 12, 32])
p1.then(res => {
  console.log(res)
})

let p3 = promiseRace([
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(3)
    }, 3000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(2)
    }, 2000)
  }),
])

p3.then(
  res => {
    console.log('resolve', res)
  },
  err => {
    console.log('reject', err)
  }
)
let p4 = promiseRace([
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3)
    }, 3000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2)
    }, 2000)
  }),
])

p4.then(
  res => {
    console.log('resolve', res)
  },
  err => {
    console.log('reject', err)
  }
)
```

## 如何取消一个 Promise

封装一个 promise 把 reject 方法保存为 cancel 下来，调用 cancel 即可取消

```js
class cancelabePromise {
  constructor(executor) {
    return new Promise((resolve, reject) => {
      this.cancel = () => {
        reject('promise 已被取消！')
      }
      return executor(resolve, reject)
    })
  }
}

let p = new cancelabePromise(function(resolve, reject) {
  setTimeout(() => {
    resolve()
  }, 5000)
})

setTimeout(() => {
  p.cancel()
}, 3000)
```

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

## 有一个 Api 列表如何依次请求他们

> 必须等上次请求返回结果之后再请求下一个

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
