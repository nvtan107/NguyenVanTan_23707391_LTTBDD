export class Animal {
    constructor(public name: string) {}
}

class Dog extends Animal {
    bark(): void {
        console.log(`${this.name}: Gâu gâu!`);
    }
}

class Cat extends Animal {
    meow(): void {
        console.log(`${this.name}: Meo meo!`);
    }
}

// In kết quả
const dog = new Dog("Cún");
const cat = new Cat("Mèo");
dog.bark();
cat.meow();