JavaScript 提供三种不同的值比较操作：

- 严格相等比较 (也被称作"strict equality", "identity", "triple equals")，使用 === ,
- 抽象相等比较 ("loose equality"，"double equals") ，使用 ==
- 以及 Object.is （ECMAScript 2015/ ES6 新特性）

简而言之，在比较两件事情时，双等号将执行类型转换; 三等号将进行相同的比较，而不进行类型转换 (如果类型不同, 只是总会返回 false ); 而 Object.is 的行为方式与三等号相同，但是对于 NaN 和-0 和+0 进行特殊处理，所以最后两个不相同，而 Object.is（NaN，NaN）将为 true。(通常使用双等号或三等号将 NaN 与 NaN 进行比较，结果为 false，因为 IEEE 754 如是说.) 请注意，所有这些之间的区别都与其处理原语有关; 这三个运算符的原语中，没有一个会比较两个变量是否结构上概念类似。对于任意两个不同的非原始对象，即便他们有相同的结构， 以上三个运算符都会计算得到 false 。

## 严格相等 ===

全等操作符比较两个值是否相等，两个被比较的值在比较前都不进行隐式转换。如果两个被比较的值具有不同的类型，这两个值是不全等的。否则，如果两个被比较的值类型相同，值也相同，并且都不是 number 类型时，两个值全等。最后，如果两个值都是 number 类型，当两个都不是 NaN，并且数值相同，或是两个值分别为 +0 和 -0 时，两个值被认为是全等的。

```js
NaN === NaN // false
;+0 === -0 // true
```

## 非严格相等 ==

相等操作符比较两个值是否相等，在比较前将两个被比较的值转换为相同类型。在转换后（等式的一边或两边都可能被转换），最终的比较方式等同于全等操作符 === 的比较方式。 相等操作符满足交换律。

相等操作符对于不同类型的值，进行的比较如下图所示：

<table class="standard-table">
 <thead>
  <tr>
   <th scope="row"></th>
   <th colspan="7" scope="col" style="text-align: center;">被比较值 B</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <th scope="row"></th>
   <td></td>
   <td style="text-align: center;">Undefined</td>
   <td style="text-align: center;">Null</td>
   <td style="text-align: center;">Number</td>
   <td style="text-align: center;">String</td>
   <td style="text-align: center;">Boolean</td>
   <td style="text-align: center;">Object</td>
  </tr>
  <tr>
   <th colspan="1" rowspan="6" scope="row">被比较值 A</th>
   <td>Undefined</td>
   <td style="text-align: center;"><code>true</code></td>
   <td style="text-align: center;"><code>true</code></td>
   <td style="text-align: center;"><code>false</code></td>
   <td style="text-align: center;"><code>false</code></td>
   <td style="text-align: center;"><code>false</code></td>
   <td style="text-align: center;"><code>IsFalsy(B)</code></td>
  </tr>
  <tr>
   <td>Null</td>
   <td style="text-align: center;"><code>true</code></td>
   <td style="text-align: center;"><code>true</code></td>
   <td style="text-align: center;"><code>false</code></td>
   <td style="text-align: center;"><code>false</code></td>
   <td style="text-align: center;"><code>false</code></td>
   <td style="text-align: center;"><code>IsFalsy(B)</code></td>
  </tr>
  <tr>
   <td>Number</td>
   <td style="text-align: center;"><code>false</code></td>
   <td style="text-align: center;"><code>false</code></td>
   <td style="text-align: center;"><code>A === B</code></td>
   <td style="text-align: center;"><code>A === ToNumber(B)</code></td>
   <td style="text-align: center;"><code>A=== ToNumber(B) </code></td>
   <td style="text-align: center;"><code>A== ToPrimitive(B)</code></td>
  </tr>
  <tr>
   <td>String</td>
   <td style="text-align: center;"><code>false</code></td>
   <td style="text-align: center;"><code>false</code></td>
   <td style="text-align: center;"><code>ToNumber(A) === B</code></td>
   <td style="text-align: center;"><code>A === B</code></td>
   <td style="text-align: center;"><code>ToNumber(A) === ToNumber(B)</code></td>
   <td style="text-align: center;"><code>ToPrimitive(B) == A</code></td>
  </tr>
  <tr>
   <td>Boolean</td>
   <td style="text-align: center;"><code>false</code></td>
   <td style="text-align: center;"><code>false</code></td>
   <td style="text-align: center;"><code>ToNumber(A) === B</code></td>
   <td style="text-align: center;"><code>ToNumber(A) === ToNumber(B)</code></td>
   <td style="text-align: center;"><code>A === B</code></td>
   <td style="text-align: center;">ToNumber(A) == ToPrimitive(B)</td>
  </tr>
  <tr>
   <td>Object</td>
   <td style="text-align: center;"><font face="Consolas, Liberation Mono, Courier, monospace">false</font></td>
   <td style="text-align: center;"><font face="Consolas, Liberation Mono, Courier, monospace">false</font></td>
   <td style="text-align: center;"><code>ToPrimitive(A) == B</code></td>
   <td style="text-align: center;"><code>ToPrimitive(A) == B</code></td>
   <td style="text-align: center;">ToPrimitive(A) == ToNumber(B)</td>
   <td style="text-align: center;">
    <p><code>A === B</code></p>
   </td>
  </tr>
 </tbody>
</table>

:::warning
有些开发者认为，最好永远都不要使用相等操作符。全等操作符的结果更容易预测，并且因为没有隐式转换，全等比较的操作会更快
:::

## 同值相等

同值相等由 Object.is 方法提供

## 零值相等

与同值相等类似，不过会认为 +0 与 -0 相等。
