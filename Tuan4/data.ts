// Dữ liệu mẫu dùng chung cho toàn bộ 5 Giờ — đúng tinh thần "cho sẵn trong data.js"
// của tài liệu, để không phải nhập liệu tay, chỉ tập trung vào LAYOUT.

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
  discountPercent?: number; // có giá trị -> Giờ 3 vẽ badge "-x%"
  isNew?: boolean; // true -> Giờ 3 vẽ badge "Mới" thay vì badge giảm giá
  description: string; // dùng cho Giờ 4 (màn Chi tiết, đoạn mô tả dài cần cuộn)
}

export const CATEGORIES: string[] = [
  "Văn học",
  "Kinh tế",
  "Thiếu nhi",
  "Kỹ năng sống",
  "Truyện tranh",
  "Ngoại ngữ",
  "Lịch sử",
];

// Cố tình để vài tựa sách DÀI (để test numberOfLines + layout không vỡ khi nội dung dài
// — đúng tiêu chí "Không bị lệch khi đổi nội dung" ở cuối tài liệu).
export const BOOKS: Book[] = [
  {
    id: 1,
    title: "Dế Mèn Phiêu Lưu Ký",
    author: "Tô Hoài",
    price: 45000,
    cover: "https://picsum.photos/seed/book1/400/560",
    discountPercent: 20,
    description:
      "Cuốn sách kể về hành trình phiêu lưu của chú Dế Mèn, qua đó gửi gắm bài học về lòng dũng cảm, " +
      "sự trưởng thành và tình bạn. Đây là tác phẩm văn học thiếu nhi kinh điển của Việt Nam, được nhiều " +
      "thế hệ độc giả yêu thích và đưa vào chương trình giảng dạy phổ thông.",
  },
  {
    id: 2,
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 89000,
    cover: "https://picsum.photos/seed/book2/400/560",
    isNew: true,
    description:
      "Câu chuyện ngụ ngôn về chàng chăn cừu Santiago trên hành trình đi tìm kho báu, khám phá ra rằng " +
      "kho báu lớn nhất chính là những bài học có được trên con đường mình đã đi qua.",
  },
  {
    id: 3,
    title: "Sapiens: Lược Sử Loài Người",
    author: "Yuval Noah Harari",
    price: 129000,
    cover: "https://picsum.photos/seed/book3/400/560",
    description:
      "Một góc nhìn tổng quan về lịch sử loài người, từ thời kỳ đồ đá cho đến cuộc cách mạng khoa học " +
      "và công nghệ hiện đại, lý giải vì sao Homo sapiens trở thành loài thống trị hành tinh.",
  },
  {
    id: 4,
    title: "Điều Kỳ Diệu Của Tiệm Tạp Hoá Namiya",
    author: "Higashino Keigo",
    price: 98000,
    cover: "https://picsum.photos/seed/book4/400/560",
    discountPercent: 15,
    description:
      "Những lá thư gửi đến một tiệm tạp hoá cũ kỹ vượt thời gian, kết nối quá khứ và hiện tại, mang đến " +
      "câu chuyện ấm áp về sự sẻ chia và chữa lành.",
  },
  {
    id: 5,
    title: "Muôn Kiếp Nhân Sinh",
    author: "Nguyên Phong",
    price: 150000,
    cover: "https://picsum.photos/seed/book5/400/560",
    description: "Hành trình khám phá luân hồi và nhân quả qua nhiều kiếp sống, dựa trên các nghiên cứu tâm linh.",
  },
  {
    id: 6,
    title: "Cách Nghĩ Để Thành Công",
    author: "Napoleon Hill",
    price: 79000,
    cover: "https://picsum.photos/seed/book6/400/560",
    isNew: true,
    description: "Đúc kết 13 nguyên tắc thành công từ hơn 500 nhân vật thành đạt nhất nước Mỹ đầu thế kỷ 20.",
  },
];

export interface CartItem {
  book: Book;
  quantity: number;
}

// Giỏ hàng mẫu dùng sẵn cho Giờ 5 — Bài tập 2 (Cart Screen)
export const CART_ITEMS: CartItem[] = [
  { book: BOOKS[0], quantity: 2 },
  { book: BOOKS[1], quantity: 1 },
  { book: BOOKS[3], quantity: 1 },
];
