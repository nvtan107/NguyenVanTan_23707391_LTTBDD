
import { useEffect, useState } from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "../store/hooks";

import { setCredentials } from "../store/authSlice";
import { hydrateCart } from "../store/cartSlice";
import { hydrateWishlist } from "../store/wishlistSlice";

import {
  clearAuth,
  loadAuth,
  saveAuth,
} from "../storage/authStorage";

import { loadJSON } from "../storage/storage";

import { useAutoPersist } from "./useAutoPersist";

import { CartItem } from "../types";

// Khóa lưu dữ liệu
export const CART_KEY = "@bookstore/cart";
export const WISHLIST_KEY = "@bookstore/wishlist";

export function usePersistence() {
  const dispatch = useAppDispatch();

  // Trạng thái đã khôi phục dữ liệu hay chưa
  const [ready, setReady] = useState(false);

  // Lấy thông tin đăng nhập từ Redux
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);

  // Lấy giỏ hàng từ Redux
  const cartItems = useAppSelector((s) => s.cart.items);

  // Lấy danh sách yêu thích từ Redux
  const wishlistIds = useAppSelector(
    (s) => s.wishlist.ids
  );

  // Bước 1: Khôi phục dữ liệu khi mở ứng dụng
  useEffect(() => {
    let mounted = true;

    const restoreData = async () => {
      try {
        // Đọc dữ liệu song song
        const [auth, cart, wishlist] = await Promise.all([
          loadAuth(),
          loadJSON<CartItem[]>(CART_KEY),
          loadJSON<number[]>(WISHLIST_KEY),
        ]);

        // Component đã unmount thì không cập nhật nữa
        if (!mounted) return;

        // Khôi phục tài khoản đăng nhập
        if (auth?.user && auth?.token) {
          dispatch(setCredentials(auth));
        }

        // Khôi phục giỏ hàng
        if (cart !== null) {
          dispatch(hydrateCart(cart));
        }

        // Khôi phục danh sách yêu thích
        if (wishlist !== null) {
          dispatch(hydrateWishlist(wishlist));
        }
      } catch (error) {
        console.log("Lỗi khôi phục dữ liệu:", error);
      } finally {
        // Chỉ cho phép lưu sau khi đã đọc dữ liệu xong
        if (mounted) {
          setReady(true);
        }
      }
    };

    restoreData();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  // Bước 2: Tự động lưu thông tin đăng nhập
  useEffect(() => {
    if (!ready) return;

    if (user && token) {
      saveAuth({
        user,
        token,
      });
    } else {
      // Đăng xuất thì xóa thông tin đăng nhập
      clearAuth();
    }
  }, [ready, user, token]);

  // Bước 3: Tự động lưu giỏ hàng
  useAutoPersist(
    CART_KEY,
    cartItems,
    ready
  );

  // Bước 4: Tự động lưu danh sách yêu thích
  useAutoPersist(
    WISHLIST_KEY,
    wishlistIds,
    ready
  );

  return ready;
}
