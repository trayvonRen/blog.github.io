## Module

每个 Nest 应用程序至少有一个模块，即根模块。可以在模块中引入其他模块构建依赖关系。  
被`@Module()`装饰的类就被视为 Nest 模块。

```ts
@Module({
  imports: [],
  controllers: [],
  providers: [],
  exports: [],
})
export class CatsModule {}
```

## Provider

Providers 是 Nest 的一个基本概念。 他们都可以通过 constructor 注入依赖关系。  
Provider 只是一个用 @Injectable() 装饰器注释的类。  
如果想要注入依赖，必须把 provider 添加到模块的 providers 数组中。

```ts
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
```

## Controller

控制器负责处理传入的请求和向客户端返回响应 。

```ts
@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

## Middleware

中间件是在路由处理程序之前调用的函数。  
中间件函数可以访问请求和响应对象，以及应用程序请求响应周期中的 next() 中间件函数。  
 next() 中间件函数通常由名为 next 的变量表示。

以下示例使用了 cookieParser 中间件处理 cookie

```ts
const app = await NestFactory.create(AppModule);
app.use(cookieParser());
```

## Exception filters

内置的异常层负责处理整个应用程序中的所有抛出的异常。

```ts
app.useGlobalFilters(new HttpExceptionFilter());
```

## Pipes

管道是具有 @Injectable() 装饰器的类。管道应实现 PipeTransform 接口。  
管道有一般有两个作用:

- 转换：管道将输入数据转换为所需的数据输出
- 验证：对输入数据进行验证，如果验证成功继续传递; 验证失败则抛出异常;

以下示例使用了全局管道进行数据验证

```ts
app.useGlobalPipes(new ValidationPipe());
```

## Guards

守卫有一个单独的责任。它们根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。

## Interceptors

拦截器是使用 @Injectable() 装饰器注解的类。拦截器应该实现 NestInterceptor 接口。  
拦截器具有一系列有用的功能，这些功能受面向切面编程（AOP）技术的启发。它们可以：

- 在函数执行之前/之后绑定额外的逻辑
- 转换从函数返回的结果
- 转换从函数抛出的异常
- 扩展基本函数行为
- 根据所选条件完全重写函数 (例如, 缓存目的)

以下示例使用拦截器添加日志功能，实现 AOP。

```ts
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));
  }
}
```

## 参考资料

[NestJs](https://nestjs.com/)
