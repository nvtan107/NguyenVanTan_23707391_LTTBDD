// ADAPTER: component chỉ gọi useCart() / useAuth() / useWishlist().
// Nếu sau này đổi sang Recoil/Zustand, chỉ sửa file này — UI không phải sửa.

import { useCallback, useMemo } from "react";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import type { AppDispatch, RootState } from "./index";

import {
  addItem,
  reorderItems,
  clearCart,
  removeItem,
  setQuantity,
} from "./cartSlice";

import {
  logout,
  setCredentials,
  updateUser,
} from "./authSlice";

import { toggleWishlist } from "./wishlistSlice";
import { CartItem, User } from "../types";

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;

// ==================== CART ====================

export function useCart() {
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.cart.items);

  const totalQuantity = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [items]
  );

  return {
    items,
    totalQuantity,
    totalPrice,

    // Thêm một sản phẩm
    add: useCallback(
      (book: Omit<CartItem, "quantity">) => {
        dispatch(addItem(book));
      },
      [dispatch]
    ),

    // BT9.C1: Thêm lại nhiều sản phẩm từ đơn hàng
    reorder: useCallback(
      (books: CartItem[]) => {
        dispatch(reorderItems(books));
      },
      [dispatch]
    ),

    // Xóa sản phẩm
    remove: useCallback(
      (bookId: number) => {
        dispatch(removeItem(bookId));
      },
      [dispatch]
    ),

    // Thay đổi số lượng
    setQty: useCallback(
      (bookId: number, quantity: number) => {
        dispatch(setQuantity({ bookId, quantity }));
      },
      [dispatch]
    ),

    // Xóa giỏ hàng
    clear: useCallback(() => {
      dispatch(clearCart());
    }, [dispatch]),
  };
}

// ==================== AUTH ====================

export function useAuth() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);

  return {
    user,
    token,
    isLoggedIn: !!token && !!user,

    signIn: useCallback(
      (user: User, token: string) => {
        dispatch(setCredentials({ user, token }));
      },
      [dispatch]
    ),

    signOut: useCallback(() => {
      dispatch(logout());
    }, [dispatch]),

    patchUser: useCallback(
      (data: Partial<User>) => {
        dispatch(updateUser(data));
      },
      [dispatch]
    ),
  };
}

// ==================== WISHLIST ====================

export function useWishlist() {
  const dispatch = useAppDispatch();

  const ids = useAppSelector((state) => state.wishlist.ids);

  return {
    ids,

    isFavorite: useCallback(
      (bookId: number) => ids.includes(bookId),
      [ids]
    ),

    toggle: useCallback(
      (bookId: number) => {
        dispatch(toggleWishlist(bookId));
      },
      [dispatch]
    ),
  };
}