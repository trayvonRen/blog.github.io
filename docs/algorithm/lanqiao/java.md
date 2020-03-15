## 数据类型
### 基本数据类型
#### 整形(符号位占一个字节)
- byte  
1 字节
- short  
2 字节
- int  
4 字节
- long  
8 字节
```java
byte a = 1;
short b = 1;
int c = 1;
long d = 1L;
```
#### 浮点
- float  
4 字节
- double  
8 字节
```java
float a = 0.1f;
double b = 0.1;
```
#### 布尔
只有两个取值：true 和 false；

#### 字符
char类型是一个单一的 16 位 Unicode 字符;
- 最小值是 \u0000（即为0）；
- 最大值是 \uffff（即为65,535）；

### 字符串
Java中String类位于java.lang包下，是整个Java语言的基石。  
首先要强调的是，String并不是Java中的基础类型，它也是一个对象。  
<img src="/img/string.jpg" width = "100%" height = "100%" align=center />

#### 字符串方法
- charAt()  
返回指定索引处的 char 值。索引范围为从 0 到 length() - 1。  
- compareTo()  
按字典顺序比较两个字符串。  
- compareToIgnoreCase()  
按字典顺序比较两个字符串，不考虑大小写。  
- contains()  
当且仅当此字符串包含指定的 char 值序列时，返回 true。  

### 数组
Java 语言中提供的数组是用来存储固定大小的同类型元素。  
#### 数组方法  
java.util.Arrays 类能方便地操作数组，它提供的所有方法都是静态的。  
- public static void sort(Object[] a)    
对指定对象数组根据其元素的自然顺序进行升序排列。
- public static void fill(int[] a, int val)  
将指定的 int 值分配给指定 int 型数组指定范围中的每个元素。 
- 	public static boolean equals(long[] a, long[] a2)  
判断数组是否相等。  
- public static int binarySearch(Object[] a, Object key)  
用二分查找算法在给定数组中搜索给定值的对象(Byte,Int,double等)。数组在调用前必须排序好的。

## 输入输出
java.util.Scanner 是 Java5 的新特征，我们可以通过 Scanner 类来获取用户的输入。  

```java
Scanner s = new Scanner(System.in);
```

## 集合框架
Java提供了几个能有效地组织和操作数据的数据结构，这些数据结构通常称为Java集合框架。
<img src="/img/collection.gif" width = "100%" height = "100%" align=center />
从上面的集合框架图可以看到，Java 集合框架主要包括两种类型的容器，一种是集合（Collection），存储一个元素集合，另一种是图（Map），存储键/值对映射。  
Collection 接口又有 3 种子类型，List、Set 和 Queue，再下面是一些抽象类，最后是具体实现类，常用的有 ArrayList、LinkedList、HashSet、LinkedHashSet、HashMap、LinkedHashMap 等等。  
**集合框架体系如图所示**
<img src="/img/java-coll.png" width = "100%" height = "100%" align=center />
### Collection接口
Collection接口是处理对象集合的根接口，其中定义了很多对元素进行操作的方法，AbstractCollection是提供Collection部分实现的抽象类。  
下图展示了Collection接口中的全部方法。
<img src="/img/collection.webp" width = "60%" height = "60%" align=center />
#### List接口
List接口扩展自Collection，它可以定义一个允许重复的有序集合，从List接口中的方法来看，List接口主要是增加了面向位置的操作，允许在指定位置上操作元素，同时增加了一个能够双向遍历线性表的新列表迭代器ListIterator。   
##### ArrayList  
ArrayList以数组的形式存储数据，查找快，增删慢   
##### LinkedList  
LinkList以链表的形式存储数据，查找慢，增删快   