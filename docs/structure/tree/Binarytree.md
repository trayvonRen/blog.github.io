## 二叉树的前序遍历
### 递归
```java
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        LinkedList<TreeNode> stack = new LinkedList<>();
        LinkedList<Integer> output = new LinkedList<>();
        if(root == null) {
            return output;
        }
        stack.add(root);
        while(!stack.isEmpty()) {
            TreeNode node = stack.pollLast();
            if(node.right != null) {
                stack.add(node.right);
            }
            if(node.left != null) {
                stack.add(node.left);
            }
            output.add(node.val);
        }
        
        return output;
    }
}
```

## 二叉树的中序遍历
### 递归
```java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        LinkedList<Integer> output = new LinkedList<>();
        if(root != null)
            helper(root, output);
        return output;
    }
    
    public void helper(TreeNode root, LinkedList res) {
        if(root.left != null) {
            helper(root.left, res);
        }
        
        res.add(root.val);
        
        if(root.right != null) {
            helper(root.right, res);
        }
    }
}
```