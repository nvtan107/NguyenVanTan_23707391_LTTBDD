interface Payment {
    pay(amount: number): void;
}

class CashPayment implements Payment {
    pay(amount: number): void {
        console.log(`Đã thanh toán bằng TIỀN MẶT: ${amount} VND.`);
    }
}

class CardPayment implements Payment {
    pay(amount: number): void {
        console.log(`Đã thanh toán qua THẺ NGÂN HÀNG: ${amount} VND.`);
    }
}

// In kết quả
const cash: Payment = new CashPayment();
const card: Payment = new CardPayment();
cash.pay(250000);
card.pay(500000);