import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const clamp = (quantity: number, stock: number) =>
  Math.max(1, Math.min(quantity, stock));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Thêm một sản phẩm vào giỏ
    addItem(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const book = action.payload;

      if (book.stock <= 0) return;

      const found = state.items.find(
        (item) => item.bookId === book.bookId
      );

      if (found) {
        found.quantity = clamp(found.quantity + 1, book.stock);
        found.price = book.price;
        found.title = book.title;
        found.emoji = book.emoji;
        found.color = book.color;
        found.stock = book.stock;
      } else {
        state.items.push({
          ...book,
          quantity: 1,
        });
      }
    },

    // BT9.C1: Thêm lại nhiều sản phẩm từ đơn hàng cũ
    reorderItems(state, action: PayloadAction<CartItem[]>) {
      action.payload.forEach((book) => {
        if (book.stock <= 0 || book.quantity <= 0) return;

        const found = state.items.find(
          (item) => item.bookId === book.bookId
        );

        if (found) {
          // Cập nhật thông tin và giá mới nhất
          const newQuantity = found.quantity + book.quantity;

          found.quantity = Math.min(newQuantity, book.stock);
          found.price = book.price;
          found.title = book.title;
          found.emoji = book.emoji;
          found.color = book.color;
          found.stock = book.stock;
        } else {
          state.items.push({
            ...book,
            quantity: Math.min(book.quantity, book.stock),
          });
        }
      });
    },

    // Xóa sản phẩm khỏi giỏ
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.bookId !== action.payload
      );
    },

    // Thay đổi số lượng
    setQuantity(
      state,
      action: PayloadAction<{ bookId: number; quantity: number }>
    ) {
      const found = state.items.find(
        (item) => item.bookId === action.payload.bookId
      );

      if (found) {
        found.quantity = clamp(
          action.payload.quantity,
          found.stock
        );
      }
    },

    // Xóa toàn bộ giỏ hàng
    clearCart(state) {
      state.items = [];
    },

    // Khôi phục giỏ hàng từ AsyncStorage
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  addItem,
  reorderItems,
  removeItem,
  setQuantity,
  clearCart,
  hydrateCart,
} = cartSlice.actions;

export default cartSlice.reducer;