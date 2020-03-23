## 递归中的重复计算
为了演示重复计算的另一个问题，让我们看一个大多数人可能都很熟悉的例子，斐波那契数。 如果我们定义函数 F(n) 表示在索引 n 处的斐波那契数，那么你可以推导出如下的递推关系：
$$F(n) = F(n - 1) + F(n - 2)$$
基本情况：
$$F(0) = 0, F(1) = 1$$
根据斐波那契数列的定义，可以实现下面的函数：
```java
public static int fibonacci(int n) {
  if (n < 2) {
    return n;
  } else {
    return fibonacci(n-1) + fibonacci(n-2);
  }
}
```

下面的树显示了在计算 F(4) 时发生的所有重复计算（按颜色分组）。

<img src="/img/fibonacci.png" width=600 heigh=600>

**可见递归中的重复计算会产生巨大的性能损耗**  

## 记忆化
为了消除上述情况中的重复计算，正如许多人已经指出的那样，其中一个想法是将中间结果存储在缓存中，以便我们以后可以重用它们，而不需要重新计算。

这个想法也被称为记忆化，这是一种经常与递归一起使用的技术。
>记忆化 是一种优化技术，主要用于加快计算机程序的速度，方法是存储昂贵的函数调用的结果，并在相同的输入再次出现时返回缓存的结果。 (来源: 维基百科)

回到斐波那契函数 F(n)。 我们可以使用哈希表来跟踪每个以 n 为键的 F(n) 的结果。 散列表作为一个缓存，可以避免重复计算。 记忆化技术是一个很好的例子，它演示了如何通过增加额外的空间以减少计算时间。**(空间换时间)**

```java
import java.util.HashMap;

public class Main {

  HashMap<Integer, Integer> cache = new HashMap<Integer, Integer>();

  private int fib(int N) {
    if (cache.containsKey(N)) {
      return cache.get(N);
    }
    int result;
    if (N < 2) {
      result = N;
    } else {
      result = fib(N-1) + fib(N-2);
    }
    // keep the result in cache.
    cache.put(N, result);
    return result;
  }
}
```