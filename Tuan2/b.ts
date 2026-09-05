const helloPromise = new Promise<string>((resolve) => setTimeout(() => resolve("Hello Async"), 2000));
const simulateTask2 = (time: number): Promise<string> => new Promise((resolve) => setTimeout(() => resolve(`Task done in ${time}ms`), time));
const rejectError = (): Promise<void> => new Promise((_, reject) => setTimeout(() => reject(new Error("Something went wrong")), 1000));


//c1
// const asyncHello = async () => {
//     const msg = await helloPromise; 
//     console.log("Câu 11:", msg);
// };
// asyncHello();

//c12
// const logSimulatedTask2 = async () => {
//     const result = await simulateTask2(2000);
//     console.log("Câu 12:", result);
// };
// logSimulatedTask2()

// Câu 13: Xử lý lỗi bằng try/catch với async/await[cite: 1]
// const handleErrorAsync = async () => {
//     try {
//         await rejectError();
//     } catch (error: any) {
//         console.error("Câu 13 Lỗi bắt được:", error.message);
//     }
// };
// handleErrorAsync();

// Câu 14: Hàm async nhận một số, chờ 1 giây và trả về số đó x 3[cite: 1]
const multiplyByThree = async (num: number): Promise<number> => {
    await new Promise((res) => setTimeout(res, 1000));
    return num * 3;
};
// Gọi hàm thực thi (in kết quả sau 1s)
multiplyByThree(5).then(res => console.log("Câu 14 (5 x 3):", res));

// Câu 15: Gọi nhiều hàm async tuần tự bằng await[cite: 1]
const runSequentially = async () => {
    const res1 = await multiplyByThree(2); 
    const res2 = await multiplyByThree(4); 
    console.log("Câu 15 (Tuần tự):", res1, res2);
};
runSequentially(); // Gọi hàm thực thi

// Câu 16: Gọi nhiều hàm async song song bằng Promise.all()[cite: 1]
const runParallel = async () => {
    const results = await Promise.all([multiplyByThree(2), multiplyByThree(4)]);
    console.log("Câu 16 (Song song):", results);
};
runParallel(); // Gọi hàm thực thi

// Câu 17: Sử dụng for await...of để lặp qua mảng Promise[cite: 1]
const iteratePromises = async () => {
    const promises = [simulateTask2(100), simulateTask2(200)];
    for await (const result of promises) {
        console.log("Câu 17:", result);
    }
};
iteratePromises(); // Gọi hàm thực thi

// Câu 18: Hàm async fetchUser(id) mô phỏng gọi API[cite: 1]
const fetchUser = async (id: number) => {
    await new Promise((res) => setTimeout(res, 1000));
    return { id, name: `User_${id}` };
};
// Gọi hàm thực thi
fetchUser(99).then(user => console.log("Câu 18:", user));

// Câu 19: Hàm async fetchUsers(ids) gọi fetchUser cho từng ID[cite: 1]
const fetchUsers = async (ids: number[]) => {
    const users = await Promise.all(ids.map((id) => fetchUser(id)));
    console.log("Câu 19:", users);
};
fetchUsers([1, 2, 3]); // Gọi hàm thực thi

// Câu 20: Thêm timeout: nếu gọi API quá 2 giây thì ném lỗi[cite: 1]
const fetchWithTimeout = async <T>(promise: Promise<T>): Promise<T> => {
    const timeout = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error("API Timeout: Quá thời gian 2 giây!")), 2000)
    );
    return Promise.race([promise, timeout]);
};

const slowApiCall = new Promise<string>((resolve) => 
    setTimeout(() => resolve("Dữ liệu tải thành công"), 3000)
);
fetchWithTimeout(slowApiCall)
    .then(res => console.log("Câu 20:", res))
    .catch(err => console.error("Câu 20 Lỗi:", err.message));