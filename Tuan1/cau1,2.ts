
//Cau1
export class Person {
    constructor(public name: string, public age: number) {}

    displayInfo(): void {
        console.log(`Tên: ${this.name}, Tuổi: ${this.age}`);
    }
}

const person1 = new Person("Nguyen Van Tan", 20);
// person1.displayInfo();

//Cau2
class Student extends Person {
    grade: string;

    constructor(name: string, age: number, grade: string) {
        super(name, age); 
        this.grade = grade;
    }

    displayAllInfo(): void {
        console.log(`Họ và tên: ${this.name}, Tuổi: ${this.age}, Lớp/Khối: ${this.grade}`);
    }
}

const student1 = new Student("Nguyen Van Tan", 20, "DHKTPM19A");
student1.displayAllInfo();
