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

## 参考资料

[Promise 的源码实现（完美符合 Promise/A+规范）](https://github.com/YvetteLau/Blog/issues/2)  
[Promises/A+](https://promisesaplus.com/)
