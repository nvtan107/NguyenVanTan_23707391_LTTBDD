class BankAccount {
    balance: number;

    constructor(initialBalance: number = 0) {
        this.balance = initialBalance;
    }

    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Nạp thành công: ${amount}. Số dư mới: ${this.balance}`);
        }
    }

    withdraw(amount: number): void {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Rút thành công: ${amount}. Số dư còn lại: ${this.balance}`);
        } else {
            console.log(`Rút thất bại: Số dư không đủ (${this.balance})!`);
        }
    }
}

const myAccount = new BankAccount(1000);
myAccount.deposit(500);
myAccount.withdraw(300);
myAccount.withdraw(1500);