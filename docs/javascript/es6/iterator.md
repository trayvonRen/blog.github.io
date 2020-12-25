ES 6 提出的迭代器本质上是对**迭代器模式**的实现。

## 核心概念

### 可迭代对象 Iterable

实现了 Interator 接口的对象就是可迭代对象。

#### 可迭代协议

要成为可迭代对象， 一个对象必须实现 @@iterator 方法。这意味着对象（或者它原型链上的某个对象）必须有一个键为 @@iterator 的属性，可通过常量 Symbol.iterator 访问该属性

<table class="standard-table">
 <thead>
  <tr>
   <th scope="col">属性</th>
   <th scope="col">值</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td><code>[Symbol.iterator]</code></td>
   <td>
    <p>一个无参数的函数，返回一个迭代器。</p>
   </td>
  </tr>
 </tbody>
</table>

### 迭代器 Iterator

迭代器是按需创建的一次性对象，每个迭代器都关联着一个可迭代对象。可迭代对象会提供 API 给迭代器,因此迭代器无需了解与其关联结构的具体实现，就可以连续的迭代对象。

#### 迭代器协议

迭代器协议定义了产生一系列值（无论是有限个还是无限个）的标准方式。 （迭代的内容和顺序）
只有实现了一个拥有的 next() 方法，一个对象才能成为迭代器。  
每次成功调用 next() 方法,都会返回一个 InteratorResult 对象:

<table class="standard-table">
 <tbody>
  <tr>
   <th scope="col">属性</th>
   <th scope="col">值</th>
  </tr>
  <tr>
   <td><code>next</code></td>
   <td>
    <p>一个无参数函数，返回一个应当拥有以下两个属性的对象：</p>
    <dl>
     <dt><code>done</code>（boolean）</dt>
     <dd>
     <p>如果迭代器可以产生序列中的下一个值，则为 <code>false</code>。（这等价于没有指定&nbsp; <code>done</code> 这个属性。）</p>
     <p>如果迭代器已将序列迭代完毕，则为 <code>true</code>。这种情况下，<code>value</code> 是可选的，如果它依然存在，即为迭代结束之后的默认返回值。</p>
     </dd>
     <dt><code>value</code></dt>
     <dd>迭代器返回的任何 JavaScript 值。done 为 true 时可省略。</dd>
    </dl>
    <p><code>next()</code>&nbsp;方法必须返回一个对象，该对象应当有两个属性： <code>done</code> 和 <code>value</code>，如果返回了一个非对象值（比如 <code>false</code> 或 <code>undefined</code>），则会抛出一个 <a href="/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError"><code>TypeError</code></a> 异常（<code>"iterator.next() returned a non-object value"</code>）。</p>
   </td>
  </tr>
 </tbody>
</table>

## 自定义迭代器

### 使用闭包

在需要迭代的对象上部署 [Symbol.iterator]，并使用闭包保存迭代的中间过程。

```js
class Person {
  constructor(name, age, school, color) {
    this.name = name
    this.age = age
    this.school = school
    this.color = color
  }

  [Symbol.iterator]() {
    let keys = Object.keys(this)
    let index = 0
    let self = this

    return {
      next() {
        if (index < keys.length) {
          return { done: false, value: self[keys[index++]] }
        } else {
          return { done: true, value: self[keys[index++]] }
        }
      },
    }
  }
}

let instance = new Person('rcw', 20, 'cqupt', 'red')
for (item of instance) {
  console.log(item)
}
```

### 定义一个新的迭代器

在迭代器对象中保存对象的引用

```js
class Person {
  constructor(name, age, school, color) {
    this.name = name
    this.age = age
    this.school = school
    this.color = color
  }
}

class PersonIterator {
  constructor(obj) {
    this.obj = obj
    this.keys = Object.keys(obj)
    this.length = this.keys.length
    this.index = 0
  }
  next() {
    if (this.index < this.length) {
      return { done: false, value: this.obj[this.keys[this.index++]] }
    } else {
      return { done: true, value: this.obj[this.keys[this.index++]] }
    }
  }

  [Symbol.iterator]() {
    return this
  }
}

let instance = new Person('rcw', 20, 'cqupt', 'red')
for (item of new PersonIterator(instance)) {
  console.log(item)
}
```
