abstract class Appliance {
    abstract turnOn(): void;
}

class Fan extends Appliance {
    turnOn(): void {
        console.log("Quạt: Động cơ quay, cánh quạt bắt đầu tạo gió.");
    }
}

class AirConditioner extends Appliance {
    turnOn(): void {
        console.log("Điều hòa: Máy nén khởi động, nhiệt độ phòng bắt đầu giảm.");
    }
}

// In kết quả
const devices: Appliance[] = [new Fan(), new AirConditioner()];
devices.forEach(device => device.turnOn());