```js
function URLParser(url) {
  // 浏览器环境的 <a> 可以直接解析 url
  let urlObj = null
  if (typeof document !== 'undefined') {
    urlObj = document.createElement('a')
    urlObj.href = url
    urlObj.query = {}
    urlObj.search
      .slice(1, urlObj.search.length)
      .split('&')
      .map(item => {
        let arr = item.split('=')
        urlObj.query[arr[0]] = arr[1]
      })
  } else {
    // 在 node 环境中使用 URL 对象解析
    urlObj = new URL(url)
  }

  return {
    origin: urlObj.protocol + '//' + urlObj.hostname,
    protocol: urlObj.protocol,
    host: urlObj.hostname,
    port: urlObj.port,
    pathname: urlObj.pathname,
    hash: urlObj.hash,
    query: urlObj.searchParams,
  }
}
console.log(URLParser('https://www.alibaba.com/abc/d?p=1&e=2#/hash'))
```
