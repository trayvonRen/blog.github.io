## 解题步骤
- 定义子问题  
- 写出子问题的递推关系（状体转移方程）  
- 确定 DP 数组的计算顺序  
- 空间优化（可选）    
**动态规划不一定有所谓的阶段。其实质是状态空间的状态转移**

## 例题  
### leetcode #70 爬楼梯
不难发现，这个问题可以被分解为一些包含最优子结构的子问题，即它的最优解可以从其子问题的最优解来有效地构建，我们可以使用动态规划来解决这一问题。  
第 i 阶可以由以下两种方法得到：  
- 在第 (i-1) 阶后向上爬一阶。
- 在第 (i-2) 阶后向上爬 2 阶。  

令 dp[i] 表示能到达第 i 阶的方法总数, 得到状态转移方程  

$dp[i]=dp[i-1]+dp[i-2]$

#### 编程实现
```java
class Solution {
    public int climbStairs(int n) {
        if(n == 1) {
            return 1;
        }
        int n1 = 1, n2 = 2;
        for(int i = 3; i <= n; i++) {
            int temp = n1 + n2;
            n1 = n2;
            n2 = temp;
        }
        return n2;
    }
}
```

### leetcode #198 打家劫舍
令 dp[i] 表示 0 ~ i 个元素所得的最大值
很容易得到状态转移方程  

$dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])$  
#### 编程实现
```java
class Solution {
    public int rob(int[] nums) {
        if(nums.length == 0) {
            return 0;
        }
        if(nums.length == 1) {
            return nums[0];
        }
        int[] dp = new int[nums.length];

        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);

        for(int i = 2; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
        }

        return dp[nums.length - 1];
    }
}
```