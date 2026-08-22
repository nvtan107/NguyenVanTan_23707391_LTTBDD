class Product {
    constructor(public name: string, public price: number) {}
}

class Order {
    products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }

    calculateTotalPrice(): number {
        return this.products.reduce((total, p) => total + p.price, 0);
    }
}

// In kết quả
const order = new Order();
order.addProduct(new Product("Bàn phím cơ", 120));
order.addProduct(new Product("Chuột gaming", 80));
order.addProduct(new Product("Tai nghe", 150));

console.log(`Tổng giá trị đơn hàng: $${order.calculateTotalPrice()}`);