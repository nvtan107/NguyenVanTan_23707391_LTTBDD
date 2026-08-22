export abstract class Shape {
    abstract area(): number;
}

class Square extends Shape {
    constructor(public side: number) {
        super();
    }

    area(): number {
        return this.side * this.side;
    }
}

class Circle extends Shape {
    constructor(public radius: number) {
        super();
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

// In kết quả
const sq = new Square(4);
const cr = new Circle(3);
console.log(`Diện tích hình vuông: ${sq.area()}`);
console.log(`Diện tích hình tròn: ${cr.area().toFixed(2)}`);