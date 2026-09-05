
// //21
// const fetchTodo = async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
//     const data = await response.json();
//     console.log("Câu 21:", data);
// };
// fetchTodo();


// //22
// const fetchMultipleTodos = async () => {
//     const [todo1, todo2] = await Promise.all([
//         fetch('https://jsonplaceholder.typicode.com/todos/1').then(r => r.json()),
//         fetch('https://jsonplaceholder.typicode.com/todos/2').then(r => r.json())
//     ]);
//     console.log("Câu 22 (Nhiều API cùng lúc):", todo1.id, todo2.id);
// };
// fetchMultipleTodos();

//23
// const fetchCompletedTodos = async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//     const todos: { id: number, completed: boolean, title: string }[] = await response.json();
//     // Lọc các công việc đã xong, cắt lấy 3 cái đầu tiên cho gọn Terminal
//     const completed = todos.filter((todo) => todo.completed).slice(0, 3);
//     console.log("Câu 23 (Todos đã hoàn thành):", completed);
// };
// fetchCompletedTodos();

//24
// const postData = async () => {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//         method: 'POST',
//         body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }),
//         headers: { 'Content-type': 'application/json; charset=UTF-8' },
//     });
//     const data = await response.json();
//     console.log("Câu 24 (Kết quả POST):", data);
// };
// postData();

// //25
// const downloadFile = async () => {
//     await new Promise((res) => setTimeout(res, 3000));
//     console.log("Câu 25: Download file xong (sau 3s)");
// };
// downloadFile();
// //26
// const waitFiveSeconds = async () => {
//     await new Promise((res) => setTimeout(res, 5000));
//     console.log("Câu 26: Đã chờ đúng 5 giây");
// };
// waitFiveSeconds();

//27
// const fetchWithRetry = async (url: string, retries: number): Promise<any> => {
//     for (let i = 0; i < retries; i++) {
//         try {
//             const response = await fetch(url);
//             if (!response.ok) throw new Error("HTTP Error " + response.status);
//             return await response.json();
//         } catch (error: any) {
//             console.log(`Câu 27: Lần thử ${i + 1} thất bại - ${error.message}`);
//             if (i === retries - 1) throw error; // Hết số lần thử thì ném lỗi ra ngoài
//         }
//     }
// };
// fetchWithRetry('https://jsonplaceholder.typicode.com/invalid-url', 3)
//     .catch(() => console.error("Câu 27: Đã bỏ cuộc sau 3 lần retry"));


//28
// const simulateTask3 = (time: number): Promise<string> => 
//     new Promise((resolve) => setTimeout(() => resolve(`Xong trong ${time}ms`), time));

// const batchProcess = async () => {
//     // Tạo 5 task chạy song song
//     const tasks = Array.from({ length: 5 }, (_, i) => simulateTask3((i + 1) * 100));
//     const results = await Promise.all(tasks);
//     console.log("Câu 28 (Batch Process):", results);
// };
// batchProcess();


// //29
// const queueProcess = async (tasks: (() => Promise<any>)[]) => {
//     console.log("Câu 29: Bắt đầu chạy tuần tự (Queue)...");
//     for (const task of tasks) {
//         const res = await task(); // Chạy từng task một
//         console.log("Câu 29 tiến độ:", res);
//     }
// };
// queueProcess([
//     () => simulateTask3(100), 
//     () => simulateTask3(150), 
//     () => simulateTask3(200)
// ]);

//30
const simulateTask4 = (time: number): Promise<string> => 
    new Promise((resolve) => setTimeout(() => resolve(`Xong trong ${time}ms`), time));
const handleMultipleCalls = async () => {
    const results = await Promise.allSettled([
        fetch('https://jsonplaceholder.typicode.com/todos/1').then(r => r.json()),
        Promise.reject(new Error("Cố tình lỗi")), 
        simulateTask4(50)
    ]);
    console.log("Câu 30 (allSettled):");
    results.forEach((res, index) => {
        console.log(`- Task ${index + 1} status: ${res.status}`);
    });
};
handleMultipleCalls();