export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  rating: number; // thang 0 đến 10
  category: string;
  inStock: boolean;
  description: string;
  cover: string; // URL ảnh bìa
}

export interface CartItem {
  bookId: string;
  title: string;
  price: number;
  quantity: number;
}
