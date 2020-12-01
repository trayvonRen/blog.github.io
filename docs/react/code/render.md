render 阶段开始于 `performSyncWorkOnRoot` 或 `performConcurrentWorkOnRoot` 方法的调用。这取决于本次更新是同步更新还是异步更新。

```js
// performSyncWorkOnRoot会调用该方法
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}

// performConcurrentWorkOnRoot会调用该方法
function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress)
  }
}
```

我们知道 Fiber Reconciler 是从 Stack Reconciler 重构而来，通过遍历的方式实现可中断的递归，所以 performUnitOfWork 的工作可以分为两部分：“递”和“归”。

## 流程概览

### “递”阶段

首先从 rootFiber 开始向下深度优先遍历。为遍历到的每个 Fiber 节点调用 beginWork 方法 (opens new window)。

该方法会根据传入的 Fiber 节点创建子 Fiber 节点，并将这两个 Fiber 节点连接起来。

当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

### “归”阶段

在“归”阶段会调用 completeWork (opens new window)处理 Fiber 节点。

当某个 Fiber 节点执行完 completeWork，如果其存在兄弟 Fiber 节点（即 fiber.sibling !== null），会进入其兄弟 Fiber 的“递”阶段。

如果不存在兄弟 Fiber，会进入父级 Fiber 的“归”阶段。

“递”和“归”阶段会交错执行直到“归”到 rootFiber。至此，render 阶段的工作就结束了。

## beginWork

<img src="/img/react/beginWork.png" width="1000px">

```js
function beginWork(current: Fiber | null, workInProgress: Fiber, renderLanes: Lanes): Fiber | null {
  // update时：如果current存在可能存在优化路径，可以复用current（即上一次更新的Fiber节点）
  if (current !== null) {
    // ...省略

    // 复用current
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
  } else {
    didReceiveUpdate = false
  }

  // mount 时：根据 tag 不同，创建不同的子 Fiber 节点
  switch (workInProgress.tag) {
    case IndeterminateComponent:
    // ...省略
    case LazyComponent:
    // ...省略
    case FunctionComponent:
    // ...省略
    case ClassComponent:
    // ...省略
    case HostRoot:
    // ...省略
    case HostComponent:
    // ...省略
    case HostText:
    // ...省略
    // ...省略其他类型
  }
}
```

### mount 时

根据 fiber.tag 不同，进入不同类型 Fiber 的创建逻辑

```js
// mount时：根据tag不同，创建不同的Fiber节点
switch (workInProgress.tag) {
  case IndeterminateComponent:
  // ...省略
  case LazyComponent:
  // ...省略
  case FunctionComponent:
  // ...省略
  case ClassComponent:
  // ...省略
  case HostRoot:
  // ...省略
  case HostComponent:
  // ...省略
  case HostText:
  // ...省略
  // ...省略其他类型
}
```

### update 时

我们可以看到，满足如下情况时 didReceiveUpdate === false（即可以直接复用前一次更新的子 Fiber，不需要新建子 Fiber）

- oldProps === newProps && workInProgress.type === current.type，即 props 与 fiber.type 不变
- !includesSomeLane(renderLanes, updateLanes)，即当前 Fiber 节点优先级不够，会在讲解 Scheduler 时介绍

```js
if (current !== null) {
  const oldProps = current.memoizedProps
  const newProps = workInProgress.pendingProps

  if (
    oldProps !== newProps ||
    hasLegacyContextChanged() ||
    (__DEV__ ? workInProgress.type !== current.type : false)
  ) {
    didReceiveUpdate = true
  } else if (!includesSomeLane(renderLanes, updateLanes)) {
    didReceiveUpdate = false
    switch (
      workInProgress.tag
      // 省略处理
    ) {
    }
    return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
  } else {
    didReceiveUpdate = false
  }
} else {
  didReceiveUpdate = false
}
```

### reconcileChildren

在 mount 或者 update （didReceiveUpdate === true）时，会进入 reconcileChildren  
从该函数名就能看出这是 Reconciler 模块的核心部分。那么他究竟做了什么呢？

- 对于 mount 的组件，他会创建新的子 Fiber 节点

- 对于 update 的组件，他会将当前组件与该组件在上次更新时对应的 Fiber 节点比较（也就是俗称的 Diff 算法），将比较的结果生成新 Fiber 节点

该方法会尝试复用已有的节点并生产更新后的所有子 Fiber 节点，并返回第一个子节点 `workInProgress.child`

## completeWork

![](/img/react/completeWork.png)

beginWork 后会创建子 Fiber 节点，节点上可能存在 effectTag

类似 beginWork，completeWork 也是针对不同 fiber.tag 调用不同的处理逻辑。

```js
function completeWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes,
): Fiber | null {
  const newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case LazyComponent:
    case SimpleMemoComponent:
    case FunctionComponent:
    case ForwardRef:
    case Fragment:
    case Mode:
    case Profiler:
    case ContextConsumer:
    case MemoComponent:
      return null;
    case ClassComponent: {
      // ...省略
      return null;
    }
    case HostRoot: {
      // ...省略
      updateHostContainer(workInProgress);
      return null;
    }
    case HostComponent: {
      // ...省略
      return null;
    }
  // ...省略
```

### update 时

当 update 时，Fiber 节点已经存在对应 DOM 节点，所以不需要生成 DOM 节点。需要做的主要是处理 props，比如：

- onClick、onChange 等回调函数的注册
- 处理 style prop
- 处理 DANGEROUSLY_SET_INNER_HTML prop
- 处理 children prop

### mount 时

同样，我们省略了不相关的逻辑。可以看到，mount 时的主要逻辑包括三个：

- 为 Fiber 节点生成对应的 DOM 节点
- 将子孙 DOM 节点插入刚生成的 DOM 节点中
- 与 update 逻辑中的 updateHostComponent 类似的处理 props 的过程

```js
// mount的情况

// ...省略服务端渲染相关逻辑

const currentHostContext = getHostContext()
// 为fiber创建对应DOM节点
const instance = createInstance(
  type,
  newProps,
  rootContainerInstance,
  currentHostContext,
  workInProgress
)
// 将子孙DOM节点插入刚生成的DOM节点中
appendAllChildren(instance, workInProgress, false, false)
// DOM节点赋值给fiber.stateNode
workInProgress.stateNode = instance

// 与update逻辑中的updateHostComponent类似的处理props的过程
if (finalizeInitialChildren(instance, type, newProps, rootContainerInstance, currentHostContext)) {
  markUpdate(workInProgress)
}
```

mount 时只会在 rootFiber 存在 Placement effectTag，那么 commit 阶段是如何通过一次插入 DOM 操作（对应一个 Placement effectTag）将整棵 DOM 树插入页面的呢？

原因就在于 completeWork 中的 appendAllChildren 方法。

由于 completeWork 属于“归”阶段调用的函数，每次调用 appendAllChildren 时都会将已生成的子孙 DOM 节点插入当前生成的 DOM 节点下。那么当“归”到 rootFiber 时，我们已经有一个构建好的离屏 DOM 树。

## effectList

在 completeWork 的上层函数 completeUnitOfWork 中，每个执行完 completeWork 且存在 effectTag 的 Fiber 节点会被保存在一条被称为 effectList 的单向链表中。

effectList 中第一个 Fiber 节点保存在 fiber.firstEffect，最后一个元素保存在 fiber.lastEffect。这样，在 commit 阶段只需要遍历 effectList 就能执行所有 effect 了。
