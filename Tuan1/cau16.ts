class Box<T> {
    private content: T;

    constructor(value: T) {
        this.content = value;
    }

    getValue(): T {
        return this.content;
    }
}

// In kết quả
const stringBox = new Box<string>("Hộp chứa chữ");
const numberBox = new Box<number>(2024);

console.log(stringBox.getValue());
console.log(numberBox.getValue());