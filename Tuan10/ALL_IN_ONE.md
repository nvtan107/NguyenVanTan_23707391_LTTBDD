# BookStore Buổi 10 · Bản Starter · tất cả file trong một tài liệu

Mỗi mục bên dưới là một file. Trong Snack: nhấn nút + để tạo file với đúng đường dẫn, rồi dán nội dung vào. Snack tạo sẵn App.js: tạo App.tsx, dán nội dung, rồi xoá App.js.

## App.tsx

```tsx
import React from "react";
import { HomeScreen } from "./screens/HomeScreen"; // BT10.7c: bỏ import này khi đã dùng RootNavigator
// TODO BT10.1a: import SafeAreaProvider từ "react-native-safe-area-context"
// TODO BT10.7c: import NavigationContainer từ "@react-navigation/native" và RootNavigator từ "./navigation"
// TODO BT10.8c: import Provider từ "react-redux" và store từ "./store"

export default function App() {
  // Tạm thời hiển thị thẳng màn Home (chưa có điều hướng, chưa có store).
  // TODO BT10.1a: bọc ứng dụng trong <SafeAreaProvider>
  // TODO BT10.7c: thay HomeScreen bằng <NavigationContainer><RootNavigator /></NavigationContainer>
  // TODO BT10.8c: bọc thêm <Provider store={store}> ở ngoài cùng
  return <HomeScreen {...({} as any)} />;
}
```

## types.ts

```tsx
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
```

## theme.ts

```tsx
export const colors = {
  navy: "#0B1F5C", indigo: "#3B3FD8", cyan: "#00B8D9", bg: "#F4F6FB",
  text: "#1F2430", muted: "#6B7280", line: "#E2E6F0", red: "#DC2626", green: "#16A34A",
};
```

## utils.ts

```tsx
// 389000 -> "389.000 đ"
export const formatPrice = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";

// Bỏ dấu tiếng Việt để "nha gia" tìm ra "Nhà Giả Kim"
export const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().trim();
```

## config.ts

```tsx
// Cấu hình cho Bài 10.11 (Bonus, không bắt buộc).
// USE_API = false: đọc dữ liệu từ mảng trong data/books.ts (mặc định của bài thực hành).
// USE_API = true : gọi json-server qua fetch.
export const USE_API = false;

// Trình duyệt chạy cùng máy với json-server: dùng localhost.
// Điện thoại hoặc Expo Go: thay localhost bằng IP LAN của máy chạy json-server, ví dụ "http://192.168.1.10:3000".
export const API_URL = "http://localhost:3000";
```

## data/books.ts

```tsx
import type { Book } from "../types";

// Dữ liệu cho sẵn trong đề: một mảng, không gọi API.
export const BOOKS: Book[] = [
  { id: "1", title: "Clean Code", author: "Robert C. Martin", price: 389000, rating: 9.1, category: "Lập trình", inStock: true, description: "Cuốn sách kinh điển về cách viết code sạch, dễ đọc và dễ bảo trì.", cover: "https://picsum.photos/seed/book1/300/450" },
  { id: "2", title: "Dế Mèn Phiêu Lưu Ký", author: "Tô Hoài", price: 65000, rating: 8.7, category: "Thiếu nhi", inStock: true, description: "Cuộc phiêu lưu của chú dế mèn, tác phẩm quen thuộc của nhiều thế hệ.", cover: "https://picsum.photos/seed/book2/300/450" },
  { id: "3", title: "Nhà Giả Kim", author: "Paulo Coelho", price: 79000, rating: 8.9, category: "Văn học", inStock: true, description: "Hành trình đi tìm kho báu của cậu bé chăn cừu Santiago.", cover: "https://picsum.photos/seed/book3/300/450" },
  { id: "4", title: "Đắc Nhân Tâm", author: "Dale Carnegie", price: 86000, rating: 9.0, category: "Kinh tế", inStock: true, description: "Những nguyên tắc giao tiếp và ứng xử được đọc nhiều nhất thế giới.", cover: "https://picsum.photos/seed/book4/300/450" },
  { id: "5", title: "React Native in Action", author: "Nader Dabit", price: 259000, rating: 8.2, category: "Lập trình", inStock: false, description: "Xây dựng ứng dụng di động bằng React Native từ cơ bản đến nâng cao.", cover: "https://picsum.photos/seed/book5/300/450" },
  { id: "6", title: "Sapiens", author: "Yuval Noah Harari", price: 189000, rating: 9.2, category: "Khoa học", inStock: true, description: "Lược sử loài người từ thời nguyên thuỷ đến hiện đại.", cover: "https://picsum.photos/seed/book6/300/450" },
  { id: "7", title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh", author: "Nguyễn Nhật Ánh", price: 95000, rating: 8.8, category: "Văn học", inStock: true, description: "Tuổi thơ ở một làng quê nghèo, nhẹ nhàng mà sâu lắng.", cover: "https://picsum.photos/seed/book7/300/450" },
  { id: "8", title: "Atomic Habits", author: "James Clear", price: 159000, rating: 9.0, category: "Kinh tế", inStock: false, description: "Xây dựng thói quen tốt bằng những thay đổi rất nhỏ mỗi ngày.", cover: "https://picsum.photos/seed/book8/300/450" },
  { id: "9", title: "Vũ Trụ Trong Vỏ Hạt Dẻ", author: "Stephen Hawking", price: 175000, rating: 8.6, category: "Khoa học", inStock: true, description: "Giải thích các ý tưởng vật lý lớn bằng ngôn ngữ dễ hiểu.", cover: "https://picsum.photos/seed/book9/300/450" },
  { id: "10", title: "Truyện Kiều", author: "Nguyễn Du", price: 72000, rating: 8.5, category: "Văn học", inStock: true, description: "Kiệt tác thơ lục bát của văn học Việt Nam.", cover: "https://picsum.photos/seed/book10/300/450" },
];

// Giả lập việc tải dữ liệu: trả về mảng sau một khoảng trễ để thấy ActivityIndicator
// và RefreshControl. Hàm này không truy cập mạng.
export function loadBooks(delay = 700): Promise<Book[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...BOOKS]), delay));
}

export const getBookById = (id: string): Book | undefined => BOOKS.find((b) => b.id === id);
```

## components/BookCard.tsx

```tsx
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { Book } from "../types";
import { formatPrice } from "../utils";
import { colors } from "../theme";

// TODO BT10.3a: khai báo interface BookCardProps gồm
//   book: Book; layout?: "row" | "tile"; onSelect: (id: string) => void

// TODO BT10.3b: viết component BookCard
//   - bọc nội dung bằng TouchableOpacity, nhấn thì gọi onSelect(book.id)
//   - ảnh bìa (Image), tên sách, giá (formatPrice), rating (book.rating.toFixed(1)), ✅ hoặc ❌ theo inStock
// TODO BT10.4: xử lý layout "row" và "tile" trong CÙNG component này
//   - isTile = layout === "tile"
//   - style của thẻ: [styles.card, isTile && styles.cardTile]; làm tương tự cho coverBox và info
//   - tile: hiện nhãn rating (styles.ratingBadge) đè lên ảnh, tên sách 1 dòng, ẩn tác giả và thể loại
function BookCard(_props: any) {
  return null;
}

// TODO BT10.3c: đổi thành export default React.memo(BookCard)
export default BookCard;

const styles = StyleSheet.create({
  card: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 14, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: colors.line, gap: 12 },
  cardTile: { flexDirection: "column", width: "48%", gap: 8 },
  coverBox: { width: 70, height: 100, borderRadius: 8, overflow: "hidden", backgroundColor: colors.indigo },
  coverBoxTile: { width: "100%", height: "auto", aspectRatio: 2 / 3 }, // height "auto" để aspectRatio có hiệu lực
  cover: { width: "100%", height: "100%" },
  ratingBadge: { position: "absolute", top: 6, right: 6, backgroundColor: "rgba(0,0,0,0.65)", color: "#fff", fontSize: 11, fontWeight: "700", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, overflow: "hidden" },
  info: { flex: 1, gap: 4, justifyContent: "center" },
  infoTile: { flexGrow: 0, flexBasis: "auto" }, // không co về 0, để tên sách hiện đủ
  title: { fontSize: 15, fontWeight: "800", color: colors.text },
  sub: { fontSize: 12, color: colors.muted },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  price: { color: colors.indigo, fontWeight: "800" },
});
```

## store/index.ts

```tsx
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favoritesReducer from "./favoritesSlice";
import booksReducer from "./booksSlice";

export const store = configureStore({
  reducer: { cart: cartReducer, favorites: favoritesReducer, books: booksReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## store/hooks.ts

```tsx
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "./index";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## store/cartSlice.ts

```tsx
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Book, CartItem } from "../types";
import type { RootState } from "./index";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] as CartItem[] },
  reducers: {
    addToCart(state, action: PayloadAction<Pick<Book, "id" | "title" | "price">>) {
      // TODO BT10.8a: nếu sách đã có trong giỏ thì tăng quantity, chưa có thì push { bookId, title, price, quantity: 1 }
      // Gợi ý: state.items.find(...) rồi sửa trực tiếp (Immer cho phép)
    },
    decrease(state, action: PayloadAction<string>) {
      // TODO BT10.9a: giảm quantity đi 1; nếu quantity đang là 1 thì xoá sách khỏi giỏ
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.bookId !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, decrease, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (s: RootState) => s.cart.items;
// TODO BT10.8b: tính tổng số lượng bằng reduce
export const selectCartCount = (_s: RootState): number => 0;
// TODO BT10.8b: tính tổng tiền = tổng price * quantity bằng reduce
export const selectCartTotal = (_s: RootState): number => 0;
```

## store/favoritesSlice.ts

```tsx
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { ids: [] as string[] },
  reducers: {
    toggleFavorite(state, action: PayloadAction<string>) {
      // TODO BT10.10a: id đã có trong state.ids thì bỏ ra, chưa có thì thêm vào
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

export const selectFavoriteIds = (s: RootState) => s.favorites.ids;
export const selectIsFavorite = (id: string) => (s: RootState) => s.favorites.ids.includes(id);
```

## store/booksSlice.ts

```tsx
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Book } from "../types";
import { API_URL } from "../config";
import type { RootState } from "./index";

type Status = "idle" | "loading" | "succeeded" | "failed";

// TODO BT10.11a (Bonus): thunk gọi API
//   const res = await fetch(`${API_URL}/books`);
//   res.ok sai -> return rejectWithValue(`Máy chủ trả về lỗi ${res.status}`)
//   thành công -> return (await res.json()) as Book[]
//   bọc try/catch: lỗi mạng -> return rejectWithValue(`Không kết nối được tới ${API_URL}`)
export const fetchBooks = createAsyncThunk<Book[], void, { rejectValue: string }>(
  "books/fetchBooks",
  async (_, { rejectWithValue }) => {
    void API_URL;
    void rejectWithValue;
    return [];
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: { items: [] as Book[], status: "idle" as Status, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    // TODO BT10.11b (Bonus): ba trường hợp của fetchBooks
    //   pending   -> status = "loading", error = null
    //   fulfilled -> status = "succeeded", items = action.payload
    //   rejected  -> status = "failed", error = action.payload ?? "Không tải được dữ liệu"
    void builder;
  },
});

export default booksSlice.reducer;

export const selectBooksState = (s: RootState) => s.books;
```

## navigation.tsx

```tsx
import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import { DetailScreen } from "./screens/DetailScreen";
import { CartScreen } from "./screens/CartScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { useAppSelector } from "./store/hooks";
import { selectCartCount } from "./store/cartSlice";
import { colors } from "./theme";

export type RootStackParamList = {
  Tabs: undefined;
  Detail: { id: string };
};
export type TabParamList = { Home: undefined; Cart: undefined; Favorites: undefined };

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function Tabs() {
  // TODO BT10.7b: dùng Tab.Navigator (headerShown: false) gồm 3 tab:
  //   Home (title "Sách"), Cart (title "Giỏ hàng"), Favorites (title "Yêu thích")
  // TODO BT10.9c: tab Cart có tabBarBadge = số lượng trong giỏ (useAppSelector(selectCartCount)), ẩn khi bằng 0
  return null;
}

export function RootNavigator() {
  // TODO BT10.7a: dùng Stack.Navigator gồm
  //   Tabs (options: headerShown false) và Detail (title "Chi tiết sách")
  return null;
}
```

## screens/HomeScreen.tsx

```tsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { CompositeScreenProps } from "@react-navigation/native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList, TabParamList } from "../navigation";
import { loadBooks } from "../data/books";
import { normalize } from "../utils";
import type { Book } from "../types";
import BookCard from "../components/BookCard";
import { colors } from "../theme";

type Props = CompositeScreenProps<BottomTabScreenProps<TabParamList, "Home">, NativeStackScreenProps<RootStackParamList>>;

export function HomeScreen({ navigation }: Props) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [isTile, setIsTile] = useState(false); // Switch "Dạng lưới"

  // TODO BT10.11c (Bonus, không bắt buộc): đọc từ API khi USE_API = true
  //   - import { USE_API } từ "../config"; import { fetchBooks, selectBooksState } từ "../store/booksSlice"
  //   - dispatch(fetchBooks()) trong useEffect khi USE_API bật; nguồn dữ liệu là state.books.items
  //   - đặt sourceBooks = (đang đọc mảng) ? books : api.items; categories và visible đều dùng sourceBooks
  //   - status "loading" hiện ActivityIndicator; status "failed" hiện thông báo lỗi, nút "Thử lại" (dispatch lại)
  //     và nút "Dùng dữ liệu mảng" (quay về đọc mảng); kéo để làm mới cũng dispatch(fetchBooks())
  // Lần đầu: tải mảng (có độ trễ giả lập) rồi tắt trạng thái loading
  useEffect(() => {
    loadBooks().then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  // TODO BT10.5b: kéo để làm mới
  //   setRefreshing(true) -> setBooks(await loadBooks()) -> setRefreshing(false)
  const onRefresh = useCallback(async () => {}, []);

  const categories = useMemo(() => Array.from(new Set(books.map((b) => b.category))), [books]);

  // TODO BT10.6: lọc theo category (null là tất cả) và theo keyword (so khớp tên hoặc tác giả,
  //   dùng normalize() để bỏ dấu); bọc trong useMemo với [books, keyword, category]
  const visible = books;

  const onSelect = useCallback((id: string) => {
    // TODO BT10.7d: navigation.navigate("Detail", { id })
    console.log("Chọn sách", id);
  }, []);

  // TODO BT10.5a: numColumns = isTile ? 2 : 1
  const numColumns = 1;

  return (
    // TODO BT10.1b: thay View bên dưới bằng SafeAreaView (edges={["top"]}) từ react-native-safe-area-context,
    //   đổi cả thẻ đóng </View> tương ứng ở cuối return thành </SafeAreaView>
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 BookStore</Text>
        <TextInput
          style={styles.search}
          placeholder="Tìm theo tên sách hoặc tác giả…"
          placeholderTextColor="#9AA3B8"
          value={keyword}
          onChangeText={setKeyword}
        />
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} testID="grid-switch" />
        </View>
      </View>

      <View style={styles.chips}>
        {[null, ...categories].map((c) => (
          <TouchableOpacity
            key={c ?? "all"}
            style={[styles.chip, category === c && styles.chipOn]}
            onPress={() => setCategory(c)}
            testID={`chip-${c ?? "all"}`}
          >
            <Text style={[styles.chipText, category === c && styles.chipTextOn]}>{c ?? "Tất cả"}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        // TODO BT10.2b: hiển thị <ActivityIndicator size="large" color={colors.indigo} /> kèm chữ "Đang tải sách…"
        <Text style={styles.empty}>Đang tải…</Text>
      ) : (
        // TODO BT10.2a: thay khối bên dưới bằng FlatList (data={visible}, keyExtractor) hiển thị tên, rating, ✅/❌
        // TODO BT10.3d: renderItem dùng <BookCard book={item} layout={isTile ? "tile" : "row"} onSelect={onSelect} />
        // TODO BT10.5a: key={String(numColumns)}, numColumns, columnWrapperStyle={isTile ? styles.columnWrapper : undefined}
        // TODO BT10.5b: refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        <View style={{ padding: 14 }}>
          {visible.map((b) => (
            <Text key={b.id} style={styles.plain}>{b.title}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.navy, paddingHorizontal: 14, paddingBottom: 12, paddingTop: 6, gap: 8 },
  title: { color: "#fff", fontSize: 22, fontWeight: "800" },
  search: { backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 9 },
  switchRow: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 8 },
  switchLabel: { color: "#D5DDF7", fontWeight: "600" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: 14, paddingTop: 10 },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  chipOn: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  chipText: { color: colors.text, fontWeight: "600", fontSize: 13 },
  chipTextOn: { color: "#fff" },
  columnWrapper: { justifyContent: "space-between" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  errorTitle: { fontSize: 16, fontWeight: "700", color: colors.text },
  errorText: { color: colors.muted, textAlign: "center", paddingHorizontal: 24 },
  errorActions: { flexDirection: "row", gap: 10, marginTop: 6 },
  errBtn: { backgroundColor: colors.indigo, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.indigo },
  errBtnAlt: { backgroundColor: "#fff" },
  errBtnText: { color: "#fff", fontWeight: "700" },
  banner: { color: "#B42318", marginBottom: 8, textAlign: "center" },
  empty: { textAlign: "center", color: colors.muted, marginTop: 30 },
  plain: { fontSize: 15, color: colors.text, paddingVertical: 4 },
});
```

## screens/DetailScreen.tsx

```tsx
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation";
// TODO BT10.9b: import useAppDispatch (store/hooks) và addToCart (store/cartSlice)
// TODO BT10.10b: import useAppSelector (store/hooks), selectIsFavorite và toggleFavorite (store/favoritesSlice)
import { getBookById } from "../data/books";
import { formatPrice } from "../utils";
import { colors } from "../theme";

export function DetailScreen({ route }: NativeStackScreenProps<RootStackParamList, "Detail">) {
  const { id } = route.params; // tham số do màn Home truyền sang
  // TODO BT10.9b: const dispatch = useAppDispatch();
  // TODO BT10.10b: const favorite = useAppSelector(selectIsFavorite(id));
  const favorite = false;
  const book = getBookById(id);

  if (!book) return <Text style={{ padding: 20 }}>Không tìm thấy sách.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.box}>
      <Image source={{ uri: book.cover }} style={styles.cover} resizeMode="cover" />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.sub}>{book.author} · {book.category}</Text>
      <Text style={styles.sub}>⭐ {book.rating.toFixed(1)} / 10</Text>
      <Text style={styles.price}>{formatPrice(book.price)}  {book.inStock ? "✅ Còn hàng" : "❌ Hết hàng"}</Text>
      <Text style={styles.desc}>{book.description}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, !book.inStock && { opacity: 0.4 }]}
          disabled={!book.inStock}
          onPress={() => {
            // TODO BT10.9b: dispatch(addToCart(book))
          }}
          testID="add-cart"
        >
          <Text style={styles.btnText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnFav, favorite && styles.btnFavOn]}
          onPress={() => {
            // TODO BT10.10b: dispatch(toggleFavorite(book.id))
          }}
          testID="toggle-fav"
        >
          <Text style={[styles.btnText, !favorite && { color: colors.indigo }]}>{favorite ? "♥ Đã yêu thích" : "♡ Yêu thích"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box: { padding: 16, gap: 8, backgroundColor: colors.bg },
  cover: { width: "100%", aspectRatio: 2 / 3, maxHeight: 360, borderRadius: 12, backgroundColor: colors.indigo },
  title: { fontSize: 22, fontWeight: "800", color: colors.navy, marginTop: 6 },
  sub: { color: colors.muted },
  price: { fontSize: 18, fontWeight: "800", color: colors.indigo },
  desc: { color: colors.text, lineHeight: 21 },
  actions: { flexDirection: "row", gap: 10, marginTop: 10 },
  btn: { flex: 1, backgroundColor: colors.indigo, paddingVertical: 12, borderRadius: 10, alignItems: "center" },
  btnFav: { backgroundColor: "#fff", borderWidth: 1.5, borderColor: colors.indigo },
  btnFavOn: { backgroundColor: colors.red, borderColor: colors.red },
  btnText: { color: "#fff", fontWeight: "800" },
});
```

## screens/CartScreen.tsx

```tsx
import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addToCart, clearCart, decrease, removeFromCart, selectCartItems, selectCartTotal } from "../store/cartSlice";
import { formatPrice } from "../utils";
import { colors } from "../theme";

export function CartScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}><Text style={styles.title}>🛒 Giỏ hàng</Text></View>
      <FlatList
        data={items}
        keyExtractor={(i) => i.bookId}
        contentContainerStyle={{ padding: 14, flexGrow: 1 }}
        ListEmptyComponent={<Text style={styles.empty}>Giỏ hàng trống.</Text>}
        renderItem={({ item }) => (
          <View style={styles.row} testID={`cart-${item.bookId}`}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
            </View>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => dispatch(decrease(item.bookId))} testID={`dec-${item.bookId}`}><Text style={styles.qtyText}>−</Text></TouchableOpacity>
            <Text style={styles.qty}>{item.quantity}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => dispatch(addToCart({ id: item.bookId, title: item.title, price: item.price }))} testID={`inc-${item.bookId}`}><Text style={styles.qtyText}>＋</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(removeFromCart(item.bookId))}><Text style={{ fontSize: 18 }}>🗑️</Text></TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.footer}>
        <Text style={styles.total} testID="cart-total">Tổng cộng: {formatPrice(total)}</Text>
        <TouchableOpacity style={[styles.clear, items.length === 0 && { opacity: 0.4 }]} disabled={items.length === 0} onPress={() => dispatch(clearCart())} testID="clear-cart">
          <Text style={styles.clearText}>Xoá giỏ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.navy, padding: 14 },
  title: { color: "#fff", fontSize: 20, fontWeight: "800" },
  empty: { textAlign: "center", color: colors.muted, marginTop: 40 },
  row: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#fff", padding: 12, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: colors.line },
  name: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "700" },
  qtyBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" },
  qtyText: { fontSize: 18, fontWeight: "800", color: colors.navy },
  qty: { minWidth: 18, textAlign: "center", fontWeight: "800" },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fff", padding: 14, borderTopWidth: 1, borderTopColor: colors.line },
  total: { fontSize: 17, fontWeight: "800", color: colors.navy },
  clear: { borderWidth: 1.5, borderColor: colors.red, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  clearText: { color: colors.red, fontWeight: "800" },
});
```

## screens/FavoritesScreen.tsx

```tsx
import React, { useCallback } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation";
import { useAppSelector } from "../store/hooks";
import { selectFavoriteIds } from "../store/favoritesSlice";
import { BOOKS } from "../data/books";
import BookCard from "../components/BookCard";
import { colors } from "../theme";

export function FavoritesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const ids = useAppSelector(selectFavoriteIds);
  // TODO BT10.10c: chỉ giữ các sách có id nằm trong ids (BOOKS.filter(...))
  const favorites = BOOKS;
  const onSelect = useCallback((id: string) => navigation.navigate("Detail", { id }), [navigation]);

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}><Text style={styles.title}>♥ Yêu thích</Text></View>
      <FlatList
        data={favorites}
        keyExtractor={(b) => b.id}
        contentContainerStyle={{ padding: 14, flexGrow: 1 }}
        renderItem={({ item }) => <BookCard book={item} onSelect={onSelect} />}
        ListEmptyComponent={<Text style={styles.empty}>Chưa có sách yêu thích.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  header: { backgroundColor: colors.navy, padding: 14 },
  title: { color: "#fff", fontSize: 20, fontWeight: "800" },
  empty: { textAlign: "center", color: colors.muted, marginTop: 40 },
});
```

