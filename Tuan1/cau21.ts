export class Product {
    constructor(public name: string, public price: number) {}
}

class Repository<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return this.items;
    }
}

const productRepo = new Repository<Product>();
productRepo.add(new Product("Chuột máy tính", 50));
productRepo.add(new Product("Bàn phím cơ", 150));
console.log("Danh sách sản phẩm trong kho:", productRepo.getAll());