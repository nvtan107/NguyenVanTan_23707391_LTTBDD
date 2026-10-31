import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types";

interface CartState {
  items: CartItem[];
}
const initialState: CartState = { items: [] };

const clamp = (q: number, stock: number) => Math.max(1, Math.min(q, stock));

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Omit<CartItem, "quantity">>) {
      const found = state.items.find(
        (item) => item.bookId === action.payload.bookId
      );
    
      if (found) {
        found.quantity = clamp(found.quantity + 1, found.stock);
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    
    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter(
        (item) => item.bookId !== action.payload
      );
    },
    
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
    
    clearCart(state) {
      state.items = [];
    },
    // Dùng ở buổi sau: nạp lại giỏ hàng đã lưu trong AsyncStorage
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
  },
});

export const { addItem, removeItem, setQuantity, clearCart, hydrateCart } = cartSlice.actions;
export default cartSlice.reducer;
