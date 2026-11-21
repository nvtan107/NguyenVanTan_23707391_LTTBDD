import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { ids: [] as string[] },
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      // BT10.10a: có rồi thì bỏ ra, chưa có thì thêm vào
      const i = state.ids.indexOf(action.payload);
      if (i >= 0) state.ids.splice(i, 1);
      else state.ids.push(action.payload);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

export const selectFavoriteIds = (s: RootState) => s.favorites.ids;
export const selectIsFavorite = (id: string) => (s: RootState) => s.favorites.ids.includes(id);