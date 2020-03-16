## 取消请求
```js
function Cancel(message) {
  this.message = message;
}

function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}
```
CancelToken 是一个构造函数
使用 CancelToken.source 返回一个包含 token (CancelToken) 实例和 cancel (取消方法) 的对象
```js
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};
```
当执行 CancelToken.source.cancel 时， 会实例化一个 cancel 对象(用于描述取消请求的错误信息)，并且调用 resolvePromise 使内部的 promise 变成 resolve 状态
触发 xhr.abort()
```js
if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }
```
最后抛出错误
```js
request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };
```

当请求还没发送时，会直在 dispatchRequest 时被拦截，不会创建 xhr 对象
```js
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
}

function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

```