export interface Category {
  id: number;
  name: string;
  emoji: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  categoryId: number;
  stock: number;
  description: string;
  emoji: string;
  color: string; // màu nền "bìa sách" (không cần tải ảnh → chạy offline)
}

export interface CartItem {
  bookId: number;
  title: string;
  price: number;
  emoji: string;
  color: string;
  stock: number;
  quantity: number;
}

// ---- Các kiểu dùng chung (khai báo sớm để cả khoá dùng chung) ----
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface Review {
  id: number;
  bookId: number;
  userId: number;
  userName: string;
  rating: number; // 1–5
  comment: string;
  createdAt: string; // ISO
}

export type PaymentMethod = "cod" | "bank";
export type OrderStatus = "pending" | "shipping" | "completed" | "cancelled";

export interface OrderItem {
  bookId: number;
  title: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
}

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  total: number;
  address: ShippingAddress;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string; // ISO
}

export interface AppNotification {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: string; // ISO
  read: boolean;
  target?: { screen: "Orders" | "BookDetail"; bookId?: number };
}
