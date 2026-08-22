interface Vehicle {
    speed: number;
    drive(): void;
}

export class Car implements Vehicle {
    constructor(public speed: number) {}
    drive(): void {
        console.log(`Ô tô đang chạy với tốc độ ${this.speed} km/h.`);
    }
}

class Bike implements Vehicle {
    constructor(public speed: number) {}
    drive(): void {
        console.log(`Xe đạp đang di chuyển với tốc độ ${this.speed} km/h.`);
    }
}

// In kết quả
const myCar: Vehicle = new Car(80);
const myBike: Vehicle = new Bike(20);
myCar.drive();
myBike.drive();