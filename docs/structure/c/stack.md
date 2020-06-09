## 顺序存储表示

### 类型定义

```c
#define TRUE 1
#define FALSE 0
#define OK 1
#define ERROR 0
#define OVERFLOW -2
typedef int Status;         /* Status是函数的类型,其值是函数结果状态代码，如OK等 */
typedef int Boolean;        /* Boolean是布尔类型,其值是TRUE或FALSE */
typedef int SElemType;      /* 定义栈元素类型，此句要在c3-1.h的前面 */
                            /* 栈的顺序存储表示 */
#define STACK_INIT_SIZE 100 /* 存储空间初始分配量 */
#define STACK_INCREMENT 2   /* 存储空间分配增量 */
typedef struct SqStack
{
   SElemType *base; /* 在栈构造之前和销毁之后，base的值为NULL */
   SElemType *top;  /* 栈顶指针 */
   int stacksize;   /* 当前已分配的存储空间，以元素为单位 */
} SqStack;          /* 顺序栈 */
```

### 初始化

```c
/*  顺序栈的基本操作(9个) */
void InitStack(SqStack *S)
{ /* 构造一个空栈S */
   S->base = (SElemType *)malloc(STACK_INIT_SIZE * sizeof(SElemType));
   if (!S->base)
      exit(OVERFLOW); /* 存储分配失败 */
   S->top = S->base;
   S->stacksize = STACK_INIT_SIZE;
}
```

### 销毁

```c
void DestroyStack(SqStack *S)
{ /* 销毁栈S，S不再存在 */
   free(S->base);
   S->base = NULL;
   S->top = NULL;
   S->stacksize = 0;
}
```

### 置空

```c
void ClearStack(SqStack *S)
{ /* 把S置为空栈 */
   S->top = S->base;
}
```

### 判断是否为空

```c
Status StackEmpty(SqStack S)
{ /* 若栈S为空栈，则返回TRUE，否则返回FALSE */
   if (S.top == S.base)
      return TRUE;
   else
      return FALSE;
}
```

### 返回元素个数

```c
int StackLength(SqStack S)
{ /* 返回S的元素个数，即栈的长度 */
   return S.top - S.base;
}
```

### 取栈顶元素

```c
Status GetTop(SqStack S, SElemType *e)
{ /* 若栈不空，则用e返回S的栈顶元素，并返回OK；否则返回ERROR */
   if (S.top > S.base)
   {
      *e = *(S.top - 1);
      return OK;
   }
   else
      return ERROR;
}
```

### 入栈

```c
/* 请将下面函数补充完整 */
void Push(SqStack *S, SElemType e)
{ /* 插入元素e为新的栈顶元素 */
   if (S->top - S->base >= S->stacksize)
   {
      S->base = (SElemType *)realloc(S->base, (S->stacksize + STACK_INCREMENT) * sizeof(SElemType));
      if (!S->base)
         exit(OVERFLOW);
      S->top = S->base + S->stacksize;
      S->stacksize += STACK_INCREMENT;
   }
   *S->top++ = e;
}
```

### 出栈

```c
/* 请将下面函数补充完整 */
Status Pop(SqStack *S, SElemType *e)
{ /* 若栈不空，则删除S的栈顶元素，用e返回其值，并返回OK；否则返回ERROR */
   if (S->top == S->base)
      return ERROR;
   *e = *--S->top;
   return OK;
}
```

### 遍历

```c
void StackTraverse(SqStack S, void (*visit)(SElemType))
{ /* 从栈底到栈顶依次对栈中每个元素调用函数visit() */
   while (S.top > S.base)
      visit(*S.base++);
   printf("\n");
}
```

## 链式存储表示

### 类型定义

```c
#define TRUE 1
#define FALSE 0
#define OK 1
#define ERROR 0
#define OVERFLOW -2
typedef int Status;
typedef int Boolean;
typedef int ElemType;
typedef struct StackNode *Stack;

struct StackNode
{
   ElemType data;
   struct StackNode *next;
};
```

### 初始化

```c
void InitStack(Stack *S)
{
   *S = (Stack)malloc(sizeof(struct StackNode));
   if (!(*S))
      exit(OVERFLOW);
   (*S)->next = NULL;
}
```

### 销毁

```c
void DestroyStack(Stack S)
{
   Stack q;
   while (S)
   {
      q = (S)->next;
      free(S);
      S = q;
   }
}
```

### 置空

```c
void ClearStack(Stack S)
{
   DestroyStack(S->next);
   S->next = NULL;
}
```

### 判断是否非空

```c
Status StackEmpty(Stack S)
{
   if (S->next)
      return FALSE;
   else
      return TRUE;
}
```

### 返回元素个数

```c
int StackLength(Stack S)
{
   int result = 0;
   while (S->next)
   {
      S = S->next;
      result++;
   }
   return result;
}
```

### 取栈顶元素

```c
Status GetTop(Stack S)
{
   if (!S->next)
      return ERROR;
   while (S->next)
   {
      S = S->next;
   }
   return S->data;
}
```

### 入栈

```c
void Push(Stack S, ElemType e)
{
   Stack p;
   while (S->next)
   {
      S = S->next;
   }
   p = (Stack)malloc(sizeof(struct StackNode));
   p->data = e;
   p->next = NULL;
   S->next = p;
}
```

### 出栈

```c
Status Pop(Stack S)
{
   Stack q;
   int result;
   if (!S->next)
      return ERROR;
   while (S->next && S->next->next)
   {
      S = S->next;
   }
   q = S->next;
   S->next = NULL;
   result = q->data;
   free(q);
   return result;
}
```

### 遍历

```c
void StackTraverse(Stack S)
{
   Stack p = S->next;
   while (p)
   {
      printf("%4d", p->data);
      p = p->next;
   }
   printf("\n");
}
```

## 栈的应用

### 进制转化

```c
void conversion(int number, int hex)
{
   SqStack S;
   SElemType e;
   InitStack(&S);
   while (number)
   {
      Push(&S, number % hex);
      number = number / hex;
   }

   if (hex != 16)
   {
      while (!StackEmpty(S))
      {
         Pop(&S, &e);
         printf("%d", e);
      }
   }
   else
   {
      while (!StackEmpty(S))
      {
         Pop(&S, &e);
         switch (e)
         {
         case 10:
            printf("A");
            break;
         case 11:
            printf("B");
            break;
         case 12:
            printf("C");
            break;
         case 13:
            printf("D");
            break;
         case 14:
            printf("E");
            break;
         case 15:
            printf("F");
            break;
         default:
            printf("%d", e);
         }
      }
   }
}
```

### 括号匹配

```c

void match(char *expressionStr)
{
   SqStack s;
   SElemType e, n;
   int expressionLen;
   int index = 0;
   InitStack(&s);
   expressionLen = strlen(expressionStr);
   while (index < expressionLen)
   {
      e = expressionStr[index];
      if (e == '(')
      {
         Push(&s, e);
      }
      else if (e == ')')
      {
         Pop(&s, &e);
         if (e != '(')
         {
            printf("String does not match");
            return;
         }
      }
      index++;
   }
   if (StackEmpty(s) == TRUE)
   {
      printf("String successfully matched");
   }
   else
   {
      printf("String does not match");
   }
}
```
