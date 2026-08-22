class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    calculateArea(): number {
        return this.width * this.height;
    }

    calculatePerimeter(): number {
        return 2 * (this.width + this.height);
    }
}

const rect = new Rectangle(5, 10);
console.log(`Diện tích: ${rect.calculateArea()}`);
console.log(`Chu vi: ${rect.calculatePerimeter()}`);