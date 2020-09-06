通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。

## 提取自定义 Hook

```js
import { useState, useEffect } from 'react'

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null)

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline)
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange)
    }
  })

  return isOnline
}
```

## 使用自定义 Hook

我们一开始的目标是在 FriendStatus 和 FriendListItem 组件中去除重复的逻辑，即：这两个组件都想知道好友是否在线。

现在我们已经把这个逻辑提取到 useFriendStatus 的自定义 Hook 中，然后就可以使用它了：

```js
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id)

  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}
```

```js
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id)

  return <li style={{ color: isOnline ? 'green' : 'black' }}>{props.friend.name}</li>
}
```
