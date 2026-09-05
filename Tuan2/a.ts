// 1. Tạo Promise trả về "Hello Async" sau 2 giây[cite: 1]
// const helloPromise = new Promise<string>((resolve) => 
//     setTimeout(() => resolve("Ex 1: Hello Async"), 2000)
// );
// helloPromise.then(console.log);




// // 2. Hàm trả về số 10 sau 1 giây[cite: 1]
// const returnTen = (): Promise<number> => 
//     new Promise((resolve) => setTimeout(() => resolve(10), 1000));
// returnTen().then(res => console.log("Ex 2:", res));


// 3. Hàm reject lỗi sau 1 giây[cite: 1]
// const rejectError = (): Promise<void> => 
//     new Promise((_, reject) => setTimeout(() => reject(new Error("Ex 3: Something went wrong")), 1000));
// rejectError().catch(err => console.error(err.message));


// 4. Xử lý số ngẫu nhiên[cite: 1]
// const randomNumPromise = new Promise<number>((resolve) => resolve(Math.random()));
// randomNumPromise
//     .then((num) => console.log("Ex 4 Random:", num))
//     .catch((err) => console.error(err));


// 5. Hàm simulateTask[cite: 1]
const simulateTask = (time: number): Promise<string> => 
    new Promise((resolve) => setTimeout(() => resolve(`Task done in ${time}ms`), time));
simulateTask(1500).then(res => console.log("Ex 5:", res));


// // 6. Chạy 3 Promise song song[cite: 1]
Promise.all([simulateTask(100), simulateTask(200), simulateTask(300)])
    .then((results) => console.log("Ex 6 Promise.all:", results));


// 7. Lấy Promise hoàn thành đầu tiên[cite: 1]
Promise.race([simulateTask(500), simulateTask(200)])
    .then((first) => console.log("Ex 7 Promise.race:", first));

// 8. Chuỗi Promise toán học[cite: 1]
// Promise.resolve(2)
//     .then((n) => n * n)
//     .then((n) => n * 2)
//     .then((n) => n + 5)
//     .then((result) => console.log("Ex 8 Chained result:", result));


// 9. Lọc mảng số chẵn sau 1 giây[cite: 1]
// new Promise<number[]>((resolve) => setTimeout(() => resolve([1, 2, 3, 4, 5, 6]), 1000))
//     .then((arr) => arr.filter((n) => n % 2 === 0))
//     .then((filtered) => console.log("Ex 9 Filtered array:", filtered));

// 10. Sử dụng .finally()[cite: 1]
simulateTask(50)
.then(res => console.log("Ex 10 Result:", res))
    .finally(() => console.log("Ex 10: Done (Finally block executed)"));








