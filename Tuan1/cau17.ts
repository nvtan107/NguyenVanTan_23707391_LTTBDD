class Logger {
    private static instance: Logger;

    private constructor() {} // Ngăn tạo đối tượng mới bằng 'new'

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }
}

// In kết quả
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();
logger1.log("Hệ thống khởi động thành công.");
console.log(`Cả hai biến trỏ cùng một thực thể: ${logger1 === logger2}`);