```js
class EventEmitter {
  constructor() {
    this.event = {}
  }

  // 绑定事件回调函数
  on(type, cb) {
    this.event[type] = cb
  }

  // 触发事件，执行回调函数
  emit(type) {
    if (this.event[type]) {
      this.event[type]()
    } else {
      console.log('The event is not registered')
    }
  }

  // 取消对事件的绑定
  remove(type) {
    if (this.event[type]) {
      delete this.event[type]
    }
  }

  // 只执行一次触发之后立即解绑
  once(type, cb) {
    this.event[type] = () => {
      cb()
      this.remove(type)
    }
  }
}

const event = new EventEmitter()
event.on('click', () => {
  console.log('click emit')
})

event.emit('click')
event.emit('click')
event.emit('click')
event.emit('click')
event.remove('click')
event.emit('click')
event.emit('click')
event.once('click', () => {
  console.log('click emit')
})
event.emit('click')
event.emit('click')
```
