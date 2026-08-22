export class Car {
    brand: string;
    model: string;
    year: number;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    showCarInfo(): void {
        console.log(`Thông tin xe: Hãng ${this.brand} - Dòng xe: ${this.model} - Năm sản xuất: ${this.year}`);
    }
}

const myCar = new Car("Toyota", "Camry", 2023);
myCar.showCarInfo();