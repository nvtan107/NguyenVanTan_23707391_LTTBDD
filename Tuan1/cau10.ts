class Account {
    public username: string;         
    private balance: number;        
    readonly accountNumber: string;  

    constructor(username: string, initialBalance: number, accountNumber: string) {
        this.username = username;
        this.balance = initialBalance;
        this.accountNumber = accountNumber;
    }

    displayAccountInfo(): void {
        console.log(`Số tài khoản (readonly): ${this.accountNumber}`);
        console.log(`Chủ tài khoản (public): ${this.username}`);
        console.log(`Số dư (private): ${this.balance}`);
    }
}

// In kết quả
const acc = new Account("nguyenvantan", 5000, "STK_123456789");
acc.displayAccountInfo();