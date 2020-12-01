render 阶段全部工作完成后，在 performSyncWorkOnRoot 函数中 fiberRootNode 被传递给 commitRoot 方法，开启 commit 阶段工作流程。

```js
commitRoot(root)
```

在 rootFiber.firstEffect 上保存了一条需要执行副作用的 Fiber 节点的单向链表 effectList，这些 Fiber 节点的 updateQueue 中保存了变化的 props。

这些副作用对应的 DOM 操作在 commit 阶段执行。

除此之外，一些生命周期钩子（比如 componentDidXXX）、hook（比如 useEffect）需要在 commit 阶段执行。

commit 阶段的主要工作（即 Renderer 的工作流程）分为三部分：

- before mutation 阶段（执行 DOM 操作前）

- mutation 阶段（执行 DOM 操作）

- layout 阶段（执行 DOM 操作后）

## before mutation

before mutation 阶段的代码很短，整个过程就是遍历 effectList 并调用 commitBeforeMutationEffects 函数处理。

### commitBeforeMutationEffects

大体代码逻辑：

```js
function commitBeforeMutationEffects() {
  while (nextEffect !== null) {
    const current = nextEffect.alternate

    if (!shouldFireAfterActiveInstanceBlur && focusedInstanceHandle !== null) {
      // ...focus blur相关
    }

    const effectTag = nextEffect.effectTag

    // 调用getSnapshotBeforeUpdate
    if ((effectTag & Snapshot) !== NoEffect) {
      commitBeforeMutationEffectOnFiber(current, nextEffect)
    }

    // 调度useEffect
    if ((effectTag & Passive) !== NoEffect) {
      if (!rootDoesHavePassiveEffects) {
        rootDoesHavePassiveEffects = true
        scheduleCallback(NormalSchedulerPriority, () => {
          flushPassiveEffects()
          return null
        })
      }
    }
    nextEffect = nextEffect.nextEffect
  }
}
```

整体可以分为三部分：

- 处理 DOM 节点渲染/删除后的 autoFocus、blur 逻辑。

- 调用 getSnapshotBeforeUpdate 生命周期钩子。

- 异步调度 useEffect。

#### 异步调度 useEffect

整个 useEffect 异步调用分为三步：

- before mutation 阶段在 scheduleCallback 中调度 flushPassiveEffects
- layout 阶段之后将 effectList 赋值给 rootWithPendingPassiveEffects
- scheduleCallback 触发 flushPassiveEffects，flushPassiveEffects 内部遍历 rootWithPendingPassiveEffects

## mutation

mutation 阶段也是遍历 effectList，执行函数。这里执行的是 commitMutationEffects。

### commitMutationEffects

```js
function commitMutationEffects(root: FiberRoot, renderPriorityLevel) {
  // 遍历effectList
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag

    // 根据 ContentReset effectTag重置文字节点
    if (effectTag & ContentReset) {
      commitResetTextContent(nextEffect)
    }

    // 更新ref
    if (effectTag & Ref) {
      const current = nextEffect.alternate
      if (current !== null) {
        commitDetachRef(current)
      }
    }

    // 根据 effectTag 分别处理
    const primaryEffectTag = effectTag & (Placement | Update | Deletion | Hydrating)
    switch (primaryEffectTag) {
      // 插入DOM
      case Placement: {
        commitPlacement(nextEffect)
        nextEffect.effectTag &= ~Placement
        break
      }
      // 插入DOM 并 更新DOM
      case PlacementAndUpdate: {
        // 插入
        commitPlacement(nextEffect)

        nextEffect.effectTag &= ~Placement

        // 更新
        const current = nextEffect.alternate
        commitWork(current, nextEffect)
        break
      }
      // SSR
      case Hydrating: {
        nextEffect.effectTag &= ~Hydrating
        break
      }
      // SSR
      case HydratingAndUpdate: {
        nextEffect.effectTag &= ~Hydrating

        const current = nextEffect.alternate
        commitWork(current, nextEffect)
        break
      }
      // 更新DOM
      case Update: {
        const current = nextEffect.alternate
        commitWork(current, nextEffect)
        break
      }
      // 删除DOM
      case Deletion: {
        commitDeletion(root, nextEffect, renderPriorityLevel)
        break
      }
    }

    nextEffect = nextEffect.nextEffect
  }
}
```

## layout

该阶段之所以称为 layout，因为该阶段的代码都是在 DOM 渲染完成（mutation 阶段完成）后执行的。

该阶段触发的生命周期钩子和 hook 可以直接访问到已经改变后的 DOM，即该阶段是可以参与 DOM layout 的阶段。

具体执行的函数是 commitLayoutEffects

### commitLayoutEffects

commitLayoutEffects 一共做了两件事：

- commitLayoutEffectOnFiber（调用生命周期钩子和 hook 相关操作）

- commitAttachRef（赋值 ref）

### commitLayoutEffectOnFiber

#### ClassComponent

对于 ClassComponent，他会通过 current === null?区分是 mount 还是 update，调用 componentDidMount (opens new window)或 componentDidUpdate。

触发状态更新的 this.setState 如果赋值了第二个参数回调函数，也会在此时调用。

```js
this.setState({ xxx: 1 }, () => {
  console.log('i am update~')
})
```

#### FunctionComponent

对于 FunctionComponent 及相关类型，他会调用 useLayoutEffect hook 的回调函数，调度 useEffect 的销毁与回调函数

mutation 阶段会执行 useLayoutEffect hook 的销毁函数。结合这里我们可以发现，useLayoutEffect hook 从上一次更新的销毁函数调用到本次更新的回调函数调用是同步执行的。

而 useEffect 则需要先调度，在 Layout 阶段完成后再异步执行。这就是 useLayoutEffect 与 useEffect 的区别。
