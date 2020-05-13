## 概念
在计算机科学中，二叉树（英语：Binary tree）是每个节点最多只有两个分支（即不存在分支度大于2的节点）的树结构。  
通常分支被称作“左子树”或“右子树”。二叉树的分支具有左右次序，不能随意颠倒。  

与普通树不同，普通树的节点个数至少为1，而二叉树的节点个数可以为0；  
普通树节点的最大分支度没有限制，而二叉树节点的最大分支度为2；  
普通树的节点无左、右次序之分，而二叉树的节点有左、右次序之分。

<img src="/img/288px-Binary_tree.svg.png" width="400">

## 深度优先遍历
### 前序遍历
指先访问根，然后访问子树的遍历方式
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    LinkedList<Integer> output = new LinkedList<>();
    public List<Integer> preorderTraversal(TreeNode root) {
        helper(root);
        return output;
    }
    
    public void helper(TreeNode node) {
        if(node == null) {
            return;
        }
        output.add(node.val);
        helper(node.left);
        helper(node.right);
    }
}
```

### 中序遍历
指先访问左（右）子树，然后访问根，最后访问右（左）子树的遍历方式
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    LinkedList<Integer> output = new LinkedList<>();
    public List<Integer> inorderTraversal(TreeNode root) {
        helper(root);
        return output;
    }
    
    public void helper(TreeNode root) {
        if(root == null) return;
        helper(root.left);
        output.add(root.val);
        helper(root.right);
    }
}
```

### 后序遍历
指先访问子树，然后访问根的遍历方式
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    LinkedList<Integer> output = new LinkedList<>();
    public List<Integer> postorderTraversal(TreeNode root) {
        helper(root);
        return output;
    }
    
    public void helper(TreeNode root) {
        if(root == null) return;
        helper(root.left);
        helper(root.right);
        output.add(root.val);
    }
}
```

## 广度优先遍历
### 层次遍历
```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    List<List<Integer>> list = new ArrayList<List<Integer>>();
    
    public List<List<Integer>> levelOrder(TreeNode root) {
        helper(root, 0);
        return list;
    }
    
    public void helper(TreeNode node, int depth) {
        if(node == null) return;
        if(list.size() - 1 < depth) {
            list.add(new ArrayList<Integer>());
        }
        
        list.get(depth).add(node.val);
        helper(node.left, depth + 1);
        helper(node.right, depth + 1);
    }
}
```