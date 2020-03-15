## Typescript
```ts
class Stack<T> {
    private items: Array<T>;
    constructor() {
        this.items = [];
    }

    // 查看顶部元素
    top(): T {
        return this.items[this.items.length - 1];
    }

    // 入栈
    push(item: T): void {
        this.items.push(item);
    }

    // 出栈
    pop(): T {
        return this.items.pop();
    }

    // 检查是否非空
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // 栈大小
    size(): number {
        return this.items.length;
    }

    // 清空
    clear(): void {
        this.items = [];
    }

    toString(): string {
        if(this.isEmpty()) {
            return ''
        } else {
            return this.items.join(' ')
        }
    }
}
```