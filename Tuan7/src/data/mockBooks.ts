import { Book, Category } from "../types";

// Dữ liệu giả dùng khi chưa có API. Sẽ được thay bằng API (json-server).
export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Văn học", emoji: "📖" },
  { id: 2, name: "Kinh tế", emoji: "💼" },
  { id: 3, name: "Lập trình", emoji: "💻" },
  { id: 4, name: "Thiếu nhi", emoji: "🧸" },
];

export const MOCK_BOOKS: Book[] = [
  { id: 1, title: "Dế Mèn Phiêu Lưu Ký", author: "Tô Hoài", price: 65000, categoryId: 4, stock: 12, emoji: "🦗", color: "#16A34A",
    description: "Tác phẩm kinh điển về chú dế mèn dũng cảm và hành trình khám phá thế giới." },
  { id: 2, title: "Nhà Giả Kim", author: "Paulo Coelho", price: 79000, categoryId: 1, stock: 8, emoji: "🏜️", color: "#F59E0B",
    description: "Hành trình đi tìm kho báu của cậu bé chăn cừu Santiago." },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", price: 389000, categoryId: 3, stock: 5, emoji: "🧹", color: "#3B3FD8",
    description: "Nghệ thuật viết mã sạch, dễ đọc và dễ bảo trì." },
  { id: 4, title: "Đắc Nhân Tâm", author: "Dale Carnegie", price: 86000, categoryId: 2, stock: 20, emoji: "🤝", color: "#0B1F5C",
    description: "Những nguyên tắc ứng xử giúp bạn thành công trong giao tiếp." },
  { id: 5, title: "Lão Hạc", author: "Nam Cao", price: 45000, categoryId: 1, stock: 3, emoji: "🐕", color: "#64748B",
    description: "Truyện ngắn hiện thực xúc động về số phận người nông dân." },
  { id: 6, title: "TypeScript Handbook", author: "Anders H.", price: 250000, categoryId: 3, stock: 7, emoji: "🔷", color: "#00B8D9",
    description: "Cẩm nang TypeScript từ cơ bản đến nâng cao." },
];
