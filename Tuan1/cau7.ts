export class User {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    // Getter
    get name(): string {
        return this._name;
    }

    // Setter
    set name(newName: string) {
        if (newName.trim().length > 0) {
            this._name = newName;
        } else {
            console.log("Tên không được để trống!");
        }
    }
}

// In kết quả
const user1 = new User("Tan");
console.log(`Tên ban đầu: ${user1.name}`);
user1.name = "Nguyen Van Tan"; // Gọi setter
console.log(`Tên sau khi đổi: ${user1.name}`);