## 链队列

### 类型定义

```c
#define TRUE 1
#define FALSE 0
#define OK 1
#define ERROR 0
#define OVERFLOW -2
typedef int Status;  /* Status是函数的类型,其值是函数结果状态代码，如OK等 */
typedef int Boolean; /* Boolean是布尔类型,其值是TRUE或FALSE */
typedef int QElemType;

/*单链队列－－队列的链式存储结构 */
typedef struct QNode
{
   QElemType data;
   struct QNode *next;
} QNode, *QueuePtr;
typedef struct
{
   QueuePtr front, rear; /* 队头、队尾指针 */
} LinkQueue;
```

### 初始化

```c
/* 链队列的基本操作(9个) */
void InitQueue(LinkQueue *Q)
{ /* 构造一个空队列Q */
   Q->front = Q->rear = (QueuePtr)malloc(sizeof(QNode));
   if (!Q->front)
      exit(OVERFLOW);
   Q->front->next = NULL;
}
```

### 销毁

```c
void DestroyQueue(LinkQueue *Q)
{ /* 销毁队列Q(无论空否均可) */
   while (Q->front)
   {
      Q->rear = Q->front->next;
      free(Q->front);
      Q->front = Q->rear;
   }
}
```

### 置空

```c
void ClearQueue(LinkQueue *Q)
{ /* 将Q清为空队列 */
   QueuePtr p, q;
   Q->rear = Q->front;
   p = Q->front->next;
   Q->front->next = NULL;
   while (p)
   {
      q = p;
      p = p->next;
      free(q);
   }
}
```

### 判断是否非空

```c
Status QueueEmpty(LinkQueue Q)
{ /* 若Q为空队列，则返回TRUE，否则返回FALSE */
   if (Q.front->next == NULL)
      return TRUE;
   else
      return FALSE;
}
```

### 求长度

```c
int QueueLength(LinkQueue Q)
{ /* 求队列的长度 */
   int i = 0;
   QueuePtr p;
   p = Q.front;
   while (Q.rear != p)
   {
      i++;
      p = p->next;
   }
   return i;
}
```

### 取队头

```c
Status GetHead_Q(LinkQueue Q, QElemType *e) /* 避免与bo2-6.c重名 */
{                                           /* 若队列不空，则用e返回Q的队头元素，并返回OK，否则返回ERROR */
   QueuePtr p;
   if (Q.front == Q.rear)
      return ERROR;
   p = Q.front->next;
   *e = p->data;
   return OK;
}
```

### 入队

```c
/* 请将下面函数补充完整 */
void EnQueue(LinkQueue *Q, QElemType e)
{ /* 插入元素e为Q的新的队尾元素 */
   QNode *p = (QueuePtr)malloc(sizeof(QNode));
   if (!p)
      exit(OVERFLOW);
   p->data = e;
   p->next = NULL;
   Q->rear->next = p;
   Q->rear = p;
}
```

### 出队

```c
/* 请将下面函数补充完整 */
Status DeQueue(LinkQueue *Q, QElemType *e)
{ /* 若队列不空，删除Q的队头元素，用e返回其值，并返回OK，否则返回ERROR */
   QNode *p;
   if (Q->front == Q->rear)
      return ERROR;
   p = Q->front->next;
   *e = p->data;
   Q->front->next = p->next;
   if (Q->rear == p)
      Q->rear == Q->front;
   free(p);
   return OK;
}
```

### 遍历

```c
void QueueTraverse(LinkQueue Q, void (*vi)(QElemType))
{ /* 从队头到队尾依次对队列Q中每个元素调用函数vi() */
   QueuePtr p;
   p = Q.front->next;
   while (p)
   {
      vi(p->data);
      p = p->next;
   }
   printf("\n");
}
```

## 循环队列

### 类型定义

```c
#include <ctype.h>
#include <malloc.h>
#include <stdio.h>
#include <stdlib.h>
#include <process.h>
#define TRUE 1
#define FALSE 0
#define OK 1
#define ERROR 0
#define OVERFLOW -2
typedef int Status;
typedef int Boolean;
typedef int QElemType;

# define MAXQSIZE 100
typedef struct
{
   QElemType *base;
   int front;
   int rear;
} Squeue;
```

### 初始化

```c
void InitQueue(Squeue *Q)
{
   Q->base = (QElemType *)malloc(MAXQSIZE * sizeof(QElemType));
   if (!Q->base)
      exit(OVERFLOW);
   Q->front = Q->rear = 0;
}
```

### 求队列长度

```c
int QueueLength(Squeue Q)
{
   return (Q.rear - Q.front + MAXQSIZE) % MAXQSIZE;
}
```

### 入队

```c
Status EnQueue(Squeue *Q, QElemType e)
{
   if((Q->rear + 1) % MAXQSIZE == Q->front) return ERROR;
   Q->base[Q->rear] = e;
   Q->rear = (Q->rear + 1) % MAXQSIZE;
   return OK;
}
```

### 出队

```c

Status DeQueue(Squeue *Q, QElemType *e)
{
   if(Q->front == Q->rear) return ERROR;
   *e = Q->base[Q->front];
   Q->front = (Q->front + 1) % MAXQSIZE;
   return OK;
}
```

### 遍历

```c
void QueueTraverse(Squeue Q, void (*vi)(QElemType))
{
   QElemType p;
   p = Q.front;
   while(p != Q.rear) {
      p = (p + 1) % MAXQSIZE;
      vi(p);
   }
}

void print(QElemType i)
{
   printf("%d ", i);
}
```
