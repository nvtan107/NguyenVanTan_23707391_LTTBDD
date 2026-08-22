class Animal {
    makeSound(): void {
        console.log("Âm thanh động vật chung.");
    }
}

class Dog extends Animal {
    override makeSound(): void {
        console.log("Chó sủa: Gâu gâu!");
    }
}

export class Cat extends Animal {
    override makeSound(): void {
        console.log("Mèo kêu: Meo meo!");
    }
}

// In kết quả
const animals: Animal[] = [new Animal(), new Dog(), new Cat()];
animals.forEach(a => a.makeSound());