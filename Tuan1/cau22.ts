class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

// In kết quả
const myStack = new Stack<number>();
myStack.push(10);
myStack.push(20);
myStack.push(30);

console.log(`Phần tử trên đỉnh (peek): ${myStack.peek()}`);
console.log(`Lấy ra (pop): ${myStack.pop()}`);
console.log(`Phần tử đỉnh sau khi pop: ${myStack.peek()}`);
console.log(`Stack có rỗng không: ${myStack.isEmpty()}`);