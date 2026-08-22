class Person {
    constructor(public name: string, public age: number) {}
}

class Student extends Person {
    constructor(name: string, age: number, public grade: string) {
        super(name, age);
    }
    getInfo(): string {
        return `[Học sinh] ${this.name}, ${this.age} tuổi - Lớp: ${this.grade}`;
    }
}

export class Teacher extends Person {
    constructor(name: string, age: number, public subject: string) {
        super(name, age);
    }
    getInfo(): string {
        return `[Giáo viên] ${this.name}, ${this.age} tuổi - Môn: ${this.subject}`;
    }
}

class School {
    students: Student[] = [];
    teachers: Teacher[] = [];

    addStudent(student: Student): void {
        this.students.push(student);
    }

    addTeacher(teacher: Teacher): void {
        this.teachers.push(teacher);
    }

    displayInfo(): void {
        console.log("=== DANH SÁCH GIÁO VIÊN ===");
        this.teachers.forEach(t => console.log(t.getInfo()));
        
        console.log("\n=== DANH SÁCH HỌC SINH ===");
        this.students.forEach(s => console.log(s.getInfo()));
    }
}

// In kết quả
const mySchool = new School();
mySchool.addTeacher(new Teacher("Cô Hoa", 32, "Tiếng Anh"));
mySchool.addTeacher(new Teacher("Thầy Minh", 45, "Vật lý"));
mySchool.addStudent(new Student("Nguyen Van Tan", 20, "DHKTPM19A"));
mySchool.addStudent(new Student("Le Thi B", 19, "DHKTPM19B"));

mySchool.displayInfo();