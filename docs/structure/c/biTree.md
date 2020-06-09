## 链式存储

### 类型定义

```c
#define TRUE 1
#define FALSE 0
#define OK 1
#define ERROR 0
#define OVERFLOW -2
typedef int Status;  /* Status是函数的类型,其值是函数结果状态代码，如OK等 */
typedef int Boolean; /* Boolean是布尔类型,其值是TRUE或FALSE */
typedef char TElemType;
TElemType Nil = ' '; /* 字符型以空格符为空 */

/*二叉树的二叉链表存储表示 */
typedef struct BiTNode
{
   TElemType data;
   struct BiTNode *lchild, *rchild; /* 左右孩子指针 */
} BiTNode, *BiTree;
```

### 创建二叉树（先序次序）

```c
void CreateBiTree(BiTree *T)
{ /* 按先序次序输入二叉树中结点的值(可为字符型或整型，在主程中定义)，*/
   /* 构造二叉链表表示的二叉树T。变量Nil表示空(子)树。有改动 */
   //完成本函数
   char ch;
   scanf("%c", &ch);
   if (ch == Nil)
   {
      (*T) = NULL;
   }
   else
   {
      if (!(*T = (BiTNode *)malloc(sizeof(BiTNode))))
         exit(OVERFLOW);
      (*T)->data = ch;
      CreateBiTree(&(*T)->lchild);
      CreateBiTree(&(*T)->rchild);
   }
}
```

### 销毁二叉树

```c
void DestroyBiTree(BiTree *T)
{          /* 初始条件：二叉树T存在。操作结果：销毁二叉树T */
   if (*T) /* 非空树 */
   {
      if ((*T)->lchild)                /* 有左孩子 */
         DestroyBiTree(&(*T)->lchild); /* 销毁左孩子子树 */
      if ((*T)->rchild)                /* 有右孩子 */
         DestroyBiTree(&(*T)->rchild); /* 销毁右孩子子树 */
      free(*T);                        /* 释放根结点 */
      *T = NULL;                       /* 空指针赋0 */
   }
}
```

### 判断是否为空二叉树

```c
Status BiTreeEmpty(BiTree T)
{ /* 初始条件：二叉树T存在。操作结果：若T为空二叉树，则返回TRUE，否则FALSE */
   if (T)
      return FALSE;
   else
      return TRUE;
}
```

### 返回根节点

```c
TElemType Root(BiTree T)
{ //初始条件：二叉树T存在。操作结果：返回T的根
   if (BiTreeEmpty(T))
      return Nil;
   else
      return T->data;
}
```

### 计算二叉树深度

```c
int BiTreeDepth(BiTree T)
{
   int lDepth, rDepth, maxDepth;
   if (!T)
      return 0;
   lDepth = TreeDepth(T->lchild);
   rDepth = TreeDepth(T->rchild);
   maxDepth = lDepth > rDepth ? lDepth : rDepth;
   return maxDepth + 1;
}
```

### 计算二叉树叶子节点总数

```c
/**
 * 计算二叉树叶子节点总数
*/
int CountBiTree(BiTree T)
{
  if (!T)
    return 0;
  else if (T->lchild == NULL && T->rchild == NULL)
    return 1;
  else
    return CountBiTree(T->lchild) + CountBiTree(T->rchild);
}

```

### 复制二叉树

```c

/**
 * 根据已有二叉树拷贝一颗新二叉树
*/
void CopyBiTree(BiTree T, BiTree *TT)
{
  if (!T)
    *TT = NULL;
  else
  {
    if (!(*TT = (BiTNode *)malloc(sizeof(BiTNode))))
      exit(OVERFLOW);
    (*TT)->data = T->data;
    CopyBiTree(T->lchild, &(*TT)->lchild);
    CopyBiTree(T->rchild, &(*TT)->rchild);
  }
}
```

### 先序遍历

```c
void PreOrderTraverse(BiTree T, void (*Visit)(TElemType))
{ /* 初始条件：二叉树T存在，Visit是对结点操作的应用函数。算法6.1，有改动 */
   /* 操作结果：先序递归遍历T，对每个结点调用函数Visit一次且仅一次 */
   if (T) /* T不空 */
   {
      Visit(T->data);                     /* 先访问根结点 */
      PreOrderTraverse(T->lchild, Visit); /* 再先序遍历左子树 */
      PreOrderTraverse(T->rchild, Visit); /* 最后先序遍历右子树 */
   }
}
```

### 中序遍历

```c
void InOrderTraverse(BiTree T, void (*Visit)(TElemType))
{ /* 初始条件：二叉树T存在，Visit是对结点操作的应用函数 */
   /* 操作结果：中序递归遍历T，对每个结点调用函数Visit一次且仅一次 */
   if (T)
   {
      InOrderTraverse(T->lchild, Visit); /* 先中序遍历左子树 */
      Visit(T->data);                    /* 再访问根结点 */
      InOrderTraverse(T->rchild, Visit); /* 最后中序遍历右子树 */
   }
}
```

### 中序遍历（非递归算法）

```c
void InOrderTraverse(BiTree T, void (*Visit)(TElemType))
{ /* 初始条件：二叉树T存在，Visit是对结点操作的应用函数 */
   /* 操作结果：中序递归遍历T，对每个结点调用函数Visit一次且仅一次 */

   // 为了简化算法，使用数组来模拟栈操作
   BiTree stack[100];

   // 栈顶指针
   int top = 0;

   BiTree p = T;
   while (p || top != 0)
   {
      if (p)
      {
         stack[++top] = p;
         p = p->lchild;
      }
      else
      {
         p = stack[top--];
         Visit(p->data);
         p = p->rchild;
      }
   }
}
```

### 后序遍历

```c
void PostOrderTraverse(BiTree T, void (*Visit)(TElemType))
{ /* 初始条件：二叉树T存在，Visit是对结点操作的应用函数 */
   /* 操作结果：后序递归遍历T，对每个结点调用函数Visit一次且仅一次 */
   if (T) /* T不空 */
   {
      PostOrderTraverse(T->lchild, Visit); /* 先后序遍历左子树 */
      PostOrderTraverse(T->rchild, Visit); /* 再后序遍历右子树 */
      Visit(T->data);                      /* 最后访问根结点 */
   }
}
```
