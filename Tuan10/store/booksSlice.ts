import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Book } from "../types";
import { API_URL } from "../config";
import type { RootState } from "./index";

type Status = "idle" | "loading" | "succeeded" | "failed";

// BT10.11a: thunk gọi API
export const fetchBooks = createAsyncThunk<Book[], void, { rejectValue: string }>(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/books`);
      if (!res.ok) {
        return rejectWithValue(`Máy chủ trả về lỗi ${res.status}`);
      }
      return (await res.json()) as Book[];
    } catch {
      return rejectWithValue(`Không kết nối được tới ${API_URL}`);
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: { items: [] as Book[], status: "idle" as Status, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    // BT10.11b: ba trường hợp của fetchBooks
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Không tải được dữ liệu";
      });
  },
});

export default booksSlice.reducer;

export const selectBooksState = (s: RootState) => s.books;