## 只在最顶层使用 Hook

不要在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。(如果你对此感到好奇，我们在下面会有更深入的解释。)

## 只在 React 函数中调用 Hook

不要在普通的 JavaScript 函数中调用 Hook。你可以：

✅ 在 React 的函数组件中调用 Hook  
✅ 在自定义 Hook 中调用其他 Hook (我们将会在下一页 中学习这个。)
