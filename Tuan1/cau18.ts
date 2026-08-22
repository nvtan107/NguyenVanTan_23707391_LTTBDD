class MathUtil {
    static add(a: number, b: number): number { return a + b; }
    static subtract(a: number, b: number): number { return a - b; }
    static multiply(a: number, b: number): number { return a * b; }
    static divide(a: number, b: number): number {
        if (b === 0) throw new Error("Không thể chia cho 0!");
        return a / b;
    }
}

// In kết quả (gọi trực tiếp từ lớp, không cần new)
console.log(`Tổng: ${MathUtil.add(10, 5)}`);
console.log(`Hiệu: ${MathUtil.subtract(10, 5)}`);
console.log(`Tích: ${MathUtil.multiply(10, 5)}`);
console.log(`Thương: ${MathUtil.divide(10, 5)}`);