## 创建一个新的 axios 实例
axios 库默认是单例模式，全局共用一个默认的 axios 实例
用户也可以根据需要创建新的 axios 实例
```js
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};
```