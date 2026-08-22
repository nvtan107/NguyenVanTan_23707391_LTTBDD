class Employee {
    constructor(public name: string, public salary: number) {}
}

class Manager extends Employee {
    manage(): void {
        console.log(`Quản lý ${this.name} đang điều phối dự án.`);
    }
}

class Developer extends Employee {
    code(): void {
        console.log(`Lập trình viên ${this.name} đang viết code TypeScript.`);
    }
}

// In kết quả
const mgr = new Manager("Nguyen Van A", 2000);
const dev = new Developer("Nguyen Van Tan", 1500);
mgr.manage();
dev.code();