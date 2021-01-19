## MVC

将应用程序划分为三种组件，模型 - 视图 - 控制器（MVC）设计定义它们之间的相互作用。

- 模型（Model） Model 负责存储、定义、操作数据；

- 视图（View）View 用来展示给用户，并且和用户进行交互；

- 控制器（Controller）起到不同层面间的组织作用，用于控制应用程序的流程。它处理事件并作出响应。“事件”包括用户的行为和数据 Model 上的改变。

![](/img/other/mvc)

## MVVM

MVVM 把 View 和 Model 的同步逻辑自动化了。  
View 和 Model 同步不再手动地进行操作，而是交给框架所提供的数据绑定功能进行负责，只需要告诉它 View 显示的数据对应的是 Model 哪一部分即可。

![](/img/other/mvvm.png)
