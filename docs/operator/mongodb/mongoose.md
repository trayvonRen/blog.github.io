优雅的 `mongodb` 对象模型工具  
## 快速入门  
### 安装
```shell
npm install mongoose
```
### 连接数据库
```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dbname', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
// 将连接与错误事件绑定（以获得连接错误的提示）
db.on('error', console.error.bind(console, 'connection error:'));
//连接成功
db.once('open', function() {
  // we're connected!
});
```

## 定义模式 Schema 
Mongoose 的一切始于 Schema。  
Mongoose 默认给你的 Schema 赋值一个 _id，这个值的类型是 ObjectId。
```js
// 获取 Mongoose
const mongoose = require('mongoose');

// 定义一个模式
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date
});
```
模式可以包含任意数量的字段，每个字段代表 MongoDB 文档中的一段存储区域。下面是一个模式的示例，其中有许多常见字段类型和声明方式：  
```js
const schema = new Schema(
{
  name: String,
  binary: Buffer,
  living: Boolean,
  updated: { type: Date, default: Date.now },
  age: { type: Number, min: 18, max: 65, required: true },
  mixed: Schema.Types.Mixed,
  _someId: Schema.Types.ObjectId,
  array: [],
  ofString: [String], // 其他类型也可使用数组
  nested: { stuff: { type: String, lowercase: true, trim: true } }
})
```
## 创建模型 Model  
使用 mongoose.model() 方法从模式创建模型

```js
// 定义模式
const Schema = mongoose.Schema;

const SomeModelSchema = new Schema({
    a_string: String,
    a_date: Date
});

// 使用模式“编译”模型
const SomeModel = mongoose.model('SomeModel', SomeModelSchema);
```
第一个参数是为模型所创建集合的别名（Mongoose 将为 SomeModel 模型创建数据库集合）  
第二个参数是创建模型时使用的模式。

## 使用 Model  
### 创建文档 
可以通过定义模型的实例并调用 save() 来创建记录。  
```JS
// 直接保存
new User(userData).save()
// 传入回调函数
new User(userData).save(function (err, product) {
  if (err) ..
})
```

### 搜索纪录
#### Model.find()
根据传入的条件查找文档
```js
// 如果条件为空，则返回所有记录
User.find()
// 条件查找
User.find({name: '韩梅梅'})
// 返回 name _id 字段
User.find({name: '韩梅梅'}, 'name _id')
// 添加回调函数
User.find({name: '韩梅梅'}, 'name _id', (error, result) => console.log(result))
```

#### Model.findById()
根据 id 查找记录  
```js
User.findById(id)
```

## 更新
### Model.findByIdAndUpdate()
```js
A.findByIdAndUpdate(id, update, options, callback)
```
## 删除
#### Model.findByIdAndRemove()
```js
A.findByIdAndRemove(id, options, callback)
```

## 参考资料
[mongoose](https://mongoosejs.com/)  
[MDN: 使用数据库 (Mongoose)](https://developer.mozilla.org/zh-CN/docs/learn/Server-side/Express_Nodejs/mongoose)