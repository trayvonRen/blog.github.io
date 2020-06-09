## 顺序存储结构

### 类型定义

```c
#define TRUE 1
#define FALSE 0
#define OK 1
#define ERROR 0
#define OVERFLOW -2

typedef int Status;  /* Status是函数的类型,其值是函数结果状态代码，如OK      */
typedef int Boolean; /* Boolean是布尔类     ,其值是TRUE或FALSE */
typedef int ElemType;
#define LIST_INIT_SIZE 10 /* 线性表存储空间的初始分配量 */
#define LIST_INCREMENT 2  /* 线性表存储空间的分配增      */
typedef struct            /* 线性表的动态分配顺序存储结      */
{
  ElemType *elem; /* 存储空间基址 */
  int length;     /* 当前长度 */
  int listsize;   /* 当前分配的存储容     (以sizeof(ElemType)为单     ) */
} SqList;
```

### 初始化

```c
void InitList(SqList *L)
{
  L->elem = (ElemType *)malloc(LIST_INIT_SIZE * sizeof(ElemType));
  if (!L->elem)
    exit(OVERFLOW);
  L->length = 0;
  L->listsize = LIST_INIT_SIZE;
}
```

### 插入元素

```c
Status ListInsert(SqList *L, int i, ElemType e)
{
  ElemType *q, *p;
  ElemType *newbase;
  if (i < 1 || i > L->length + 1)
    return ERROR;
  if (L->length >= L->listsize)
  {
    newbase = (ElemType *)realloc(L->elem, (L->listsize + LIST_INCREMENT) * sizeof(ElemType));
    if (!L->elem)
      exit(OVERFLOW);
    L->elem = newbase;
    L->listsize += LIST_INCREMENT;
  }
  q = &L->elem[i - 1];
  for (p = &L->elem[L->length - 1]; p >= q; --p)
    *(p + 1) = *p;
  *q = e;
  ++L->length;
  return OK;
}
```

### 删除元素

```c
Status ListDelete(SqList *L, int i, ElemType *e)
{
  ElemType *q, *p;

  if (i < 1 || i > L->length)
    return ERROR;

  p = &L->elem[i - 1];
  *e = *p;
  q = L->elem + L->length - 1;
  for (++p; p <= q; ++p)
    *(p - 1) = *(p);


  --L->length;
  return OK;
}
```

### 销毁线性表

```c
void DestroyList(SqList *L)
{
  free(L->elem);
  L->elem = NULL;
  L->length = 0;
  L->listsize = 0;
}
```

### 遍历

```c
void ListTraverse(SqList L)
{
  ElemType *p;
  int i;
  p = L.elem;
  for (i = 1; i <= L.length; i++)
    printf("%3d", *p++);
  printf("\n");
}
```

### 合并线性表

```c
void MergeList_Sq(SqList La, SqList Lb, SqList *Lc)
{
   ElemType *pa, *pb, *pc, *pa_last, *pb_last;
   pa = La.elem;
   pb = Lb.elem;

   Lc->listsize = Lc->length = La.length + Lb.length;
   pc = Lc->elem = (ElemType *)malloc(Lc->length * sizeof(ElemType));
   if (!Lc->elem)
      exit(OVERFLOW);

   pa_last = La.elem + La.length - 1;
   pb_last = Lb.elem + Lb.length - 1;
   while (pa <= pa_last && pb <= pb_last)
   {
      if (*pa <= *pb)
         *pc++ = *pa++;
      else
         *pc++ = *pb++;
   }

   while (pa <= pa_last)
      *pc++ = *pa++;

   while (pb <= pb_last)
      *pc++ = *pb++;
}
```

## 链式存储结构

### 类型定义

```c
#define TRUE 1
#define FALSE 0
#define OK 1
#define ERROR 0
#define OVERFLOW -2
typedef int Status;  /* Status是函数的类型,其值是函数结果状态代码，如OK等 */
typedef int Boolean; /* Boolean是布尔类型,其值是TRUE或FALSE */
typedef int ElemType;
/*线性表的单链表存储结构 */
struct LNode
{
   ElemType data;
   struct LNode *next;
};
typedef struct LNode *LinkList; /* 另一种定义LinkList的方法 */
```

### 初始化

```c
void InitList(LinkList *L)
{                                              /* 操作结果：构造一个空的线性表L */
  *L = (LinkList)malloc(sizeof(struct LNode)); /* 产生头结点，并使L指向此头结点 */
  if (!*L)                                     /* 存储分配失败 */
    exit(OVERFLOW);
  (*L)->next = NULL; /* 指针域为空 */
}
```

### 获取元素

```c
Status GetElem(LinkList L, int i, ElemType *e) /* 算法2.8 */
{                                              /* L为带头结点的单链表的头指针。当第i个元素存在时，其值赋给e并返回OK，否则返回ERROR */
   int j = 1;                                  /* j为计数器 */
   LinkList p = L->next;                       /* p指向第一个结点 */
   while (p && j < i)                          /* 顺指针向后查找，直到p指向第i个元素或p为空 */
   {
      p = p->next;
      j++;
   }
   if (!p || j > i) /* 第i个元素不存在 */
      return ERROR;
   *e = p->data; /* 取第i个元素 */
   return OK;
}
```

### 插入元素

```c
Status ListInsert(LinkList L, int i, ElemType e) /* 算法2.9。不改变L */
{
   /* 在带头结点的单链线性表L中第i个位置之前插入元素e */
   LinkList p = L;
   LinkList q;
   LinkList s;
   int j = 0;
   while (p && j < i - 1)
   {
      p = p->next;
      j++;
   }

   if (!p || j > i - 1)
      return ERROR;
   s = (LinkList) malloc (sizeof(struct LNode));
   s->data = e;
   s->next = p->next;
   p->next = s;
   return OK;
}
```

### 删除元素

```c
Status ListDelete(LinkList L, int i, ElemType *e) /* 算法2.10。不改变L */
{
   /* 在带头结点的单链线性表L中，删除第i个元素，并由e返回其值 */
   LinkList p = L;
   LinkList q;
   int j = 0;
   while (p->next && j < i - 1)
   {
      p = p->next;
      j++;
   }

   if (!(p->next) || j > i - 1)
      return ERROR;
   q = p->next;
   p->next = q->next;
   *e = q->data;
   free(q);
   return OK;
}
```

### 遍历

```c
void ListTraverse(LinkList L)
{
   LinkList p = L->next;
   while (p)
   {
      printf("%3d", p->data);
      p = p->next;
   }
   printf("\n");
}
```

### 合并两个有序链表

```c
void MergeList(LinkList La, LinkList Lb, LinkList *Lc)
{
   LinkList pa, pb, pc;
   pa = La->next;
   pb = Lb->next;
   *Lc = pc = La;
   while (pa && pb)
   {
      if (pa->data <= pb->data)
      {
         pc->next = pa;
         pc = pa;
         pa = pa->next;
      }
      else
      {
         pc->next = pb;
         pc = pb;
         pb = pb->next;
      }
   }
  pc->next = pa ? pa : pb;
}
```
