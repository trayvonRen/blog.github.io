## 动态规划基本步骤

### 确定状态空间

本质上是枚举所有可能的状态，一般会用数组来表示

### 推导递推方程

使用递推方程进行正确的枚举

## 例题

### 0-1 背包问题

#### 基本解法

使用二维数组

```java
package lanqiao;

public class BAG {
	public void dp(int N, int Bag_weight, int[] weight, int[] value) {

		int[][] dp = new int[N][Bag_weight + 1];
		for(int i = 0; i < N ; i++) {
			for(int j = weight[i]; j <= Bag_weight; j++) {
				if(i == 0) {
					dp[i][j] = Bag_weight >= weight[0] ? value[0] : 0;
				} else {
					dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
				}
			}
		}

		for(int[] item : dp) {
			for(int v: item) {
				System.out.print(v);
			}
			System.out.println(" ");
		}

	}
}

```

使用一维数组

```java
public class BAG {
	public void dp(int N, int Bag_weight, int[] weight, int[] value) {

		int[] dp = new int[Bag_weight + 1];
		for(int i = 0; i < N ; i++) {
			for(int j = Bag_weight; j >= weight[i]; j--) {
				dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
			}
		}
		for(int item : dp) {
			System.out.println(item);
		}

	}
}



```
