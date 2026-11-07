import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCredentials } from "../store/authSlice";
import { hydrateCart } from "../store/cartSlice";
import { hydrateWishlist } from "../store/wishlistSlice";
import { clearAuth, loadAuth, saveAuth } from "../storage/authStorage";
import { loadJSON } from "../storage/storage";
import { useAutoPersist } from "./useAutoPersist";
import { CartItem } from "../types";

export const CART_KEY = "@bookstore/cart";
export const WISHLIST_KEY = "@bookstore/wishlist";

// Lưu bền: auth, cart, wishlist.
// Mở app → nạp 3 loại dữ liệu đã lưu; sau đó mọi thay đổi tự ghi lại.
export function usePersistence() {
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const token = useAppSelector((s) => s.auth.token);
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistIds = useAppSelector((s) => s.wishlist.ids);

  useEffect(() => {
    (async () => {
      const [auth, cart, wish] = await Promise.all([loadAuth(), loadJSON<CartItem[]>(CART_KEY), loadJSON<number[]>(WISHLIST_KEY)]);
      if (auth?.token && auth.user) dispatch(setCredentials(auth));
      if (cart) dispatch(hydrateCart(cart));
      if (wish) dispatch(hydrateWishlist(wish));
      setReady(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (!ready) return;
    if (user && token) saveAuth({ user, token });
    else clearAuth();
  }, [ready, user, token]);

  useAutoPersist(CART_KEY, cartItems, ready); // giỏ hàng
  useAutoPersist(WISHLIST_KEY, wishlistIds, ready); // yêu thích

  return ready;
}
