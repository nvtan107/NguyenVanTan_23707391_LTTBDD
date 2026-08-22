class Animal {
    protected makeSound(): string {
        return "Âm thanh động vật";
    }
}

class Dog extends Animal {
    bark(): void {
        console.log(`Chó (${this.makeSound()}): Gâu gâu!`);
    }
}

class Cat extends Animal {
    meow(): void {
        console.log(`Mèo (${this.makeSound()}): Meo meo!`);
    }
}

// In kết quả
const dog = new Dog();
const cat = new Cat();
dog.bark();
cat.meow();