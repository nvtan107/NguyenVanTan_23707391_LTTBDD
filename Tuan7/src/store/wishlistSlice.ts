import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  ids: number[];
}
const initialState: WishlistState = { ids: [] };

// THỬ THÁCH (BT7.C1) — dùng lại ở buổi sau
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // TODO BT7.C1 (thử thách): nếu id đã có trong state.ids thì bỏ ra, chưa có thì thêm vào
    
toggleWishlist(state, action: PayloadAction<number>) {
  const index = state.ids.indexOf(action.payload);

  if (index !== -1) {
    // Đã yêu thích thì bỏ khỏi danh sách
    state.ids.splice(index, 1);
  } else {
    // Chưa yêu thích thì thêm vào danh sách
    state.ids.push(action.payload);
  }
},

    hydrateWishlist(state, action: PayloadAction<number[]>) {
      state.ids = action.payload;
    },
  },
});

export const { toggleWishlist, hydrateWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
