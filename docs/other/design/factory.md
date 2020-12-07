工厂模式是用来创建对象的一种最常用的设计模式。我们不暴露创建对象的具体逻辑，而是将将逻辑封装在一个函数中，那么这个函数就可以被视为一个工厂。工厂模式根据抽象程度的不同可以分为：`简单工厂`，`工厂方法`。

## 简单工厂模式

简单工厂模式又叫静态工厂模式，由一个工厂对象决定创建某一种产品对象类的实例。主要用来创建同一类对象。

```js
class User {
  //构造器
  constructor(opt) {
    this.name = opt.name
    this.viewPage = opt.viewPage
  }

  //静态方法
  static getInstance(role) {
    switch (role) {
      case 'superAdmin':
        return new User({
          name: '超级管理员',
          viewPage: ['首页', '通讯录', '发现页', '应用数据', '权限管理'],
        })
        break
      case 'admin':
        return new User({ name: '管理员', viewPage: ['首页', '通讯录', '发现页', '应用数据'] })
        break
      case 'user':
        return new User({ name: '普通用户', viewPage: ['首页', '通讯录', '发现页'] })
        break
      default:
        throw new Error('参数错误, 可选参数:superAdmin、admin、user')
    }
  }
}

let superAdmin = User.getInstance('superAdmin')
let admin = User.getInstance('admin')
let normalUser = User.getInstance('user')
```

简单工厂的优点在于，你只需要一个正确的参数，就可以获取到你所需要的对象，而无需知道其创建的具体细节。但是在函数内包含了所有对象的创建逻辑（构造函数）和判断逻辑的代码，每增加新的构造函数还需要修改判断逻辑代码。当我们的对象不是上面的 3 个而是 30 个或更多时，这个函数会成为一个庞大的超级函数，便得难以维护。所以，简单工厂只能作用于创建的对象数量较少，对象的创建逻辑不复杂时使用。

## 工厂方法模式

工厂方法模式的本意是将实际创建对象的工作推迟到子类中，这样核心类就变成了抽象类。但是在 JavaScript 中很难像传统面向对象那样去实现创建抽象类。所以在 JavaScript 中我们只需要参考它的核心思想即可。

```js
// 核心类
class User {
  constructor(name = '', viewPage = []) {
    if (new.target === User) {
      throw new Error('抽象类不能实例化!')
    }
    this.name = name
    this.viewPage = viewPage
  }
}

// 工厂子类
class UserFactory extends User {
  constructor(name, viewPage) {
    super(name, viewPage)
  }
  create(role) {
    switch (role) {
      case 'superAdmin':
        return new UserFactory('超级管理员', ['首页', '通讯录', '发现页', '应用数据', '权限管理'])
        break
      case 'admin':
        return new UserFactory('普通用户', ['首页', '通讯录', '发现页'])
        break
      case 'user':
        return new UserFactory('普通用户', ['首页', '通讯录', '发现页'])
        break
      default:
        throw new Error('参数错误, 可选参数:superAdmin、admin、user')
    }
  }
}

let userFactory = new UserFactory()
let superAdmin = userFactory.create('superAdmin')
let admin = userFactory.create('admin')
let user = userFactory.create('user')
```

## 总结

- 构造函数和创建者分离
- 符合开放封闭原则
