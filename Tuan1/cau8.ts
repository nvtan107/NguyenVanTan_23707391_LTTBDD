export class Product {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

// Tạo mảng sản phẩm
const products: Product[] = [
    new Product("Bút bi", 10),
    new Product("Bàn phím cơ", 150),
    new Product("Chuột gaming", 80),
    new Product("Màn hình máy tính", 250)
];

// Lọc sản phẩm có giá > 100
const expensiveProducts = products.filter(p => p.price > 100);

// In kết quả
console.log("Các sản phẩm có giá > 100:");
console.log(expensiveProducts);