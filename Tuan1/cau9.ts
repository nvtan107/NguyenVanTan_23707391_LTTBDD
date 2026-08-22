interface Animal {
    name: string;
    sound(): void;
}

// Lớp hiện thực interface
export class Dog1 implements Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sound(): void {
        console.log(`${this.name} sủa: Chắc nó cũng thích mình!`);
    }
}

// In kết quả
const myDog: Animal = new Dog1("Cún");
myDog.sound();