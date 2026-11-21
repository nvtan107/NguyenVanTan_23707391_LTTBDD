import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";
import booksReducer from "./booksSlice";

export const store = configureStore({
  reducer: { cart: cartReducer, favorites: favoritesReducer, books: booksReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
