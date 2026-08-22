interface Movable {
    move(): void;
}

class Car implements Movable {
    move(): void {
        console.log("Xe hơi đang lăn bánh bằng 4 bánh xe.");
    }
}

class Robot implements Movable {
    move(): void {
        console.log("Robot đang bước đi bằng các khớp chân cơ khí.");
    }
}

// In kết quả
const car: Movable = new Car();
const robot: Movable = new Robot();
car.move();
robot.move();