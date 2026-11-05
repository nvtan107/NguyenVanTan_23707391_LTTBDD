
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";

import { TodoBox } from "../components/TodoBox";
import { BookGrid } from "../components/BookGrid";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";

import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";

import { useWishlist } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { Book } from "../types";
import { colors } from "../theme";

export function WishlistScreen({
  navigation,
}: RootScreenProps<"Wishlist">) {
  // Lấy danh sách ID sách yêu thích từ Redux
  const { ids } = useWishlist();

  // State quản lý dữ liệu API
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Gọi API lấy danh sách sách
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getBooks();
      setBooks(data);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Lọc sách có ID nằm trong danh sách yêu thích
  const favorites = useMemo(
    () => books.filter((book) => ids.includes(book.id)),
    [books, ids]
  );

  // Đang tải dữ liệu
  if (loading) {
    return <LoadingView label="Đang tải sách yêu thích..." />;
  }

  // Có lỗi khi gọi API
  if (error) {
    return (
      <ErrorView
        message={error}
        onRetry={load}
      />
    );
  }

  return (
    <View style={styles.container}>
      <BookGrid
        data={favorites}
        onPressBook={(book) =>
          navigation.navigate("BookDetail", {
            bookId: book.id,
          })
        }
        ListEmptyComponent={
          <EmptyState
            emoji="💔"
            title="Chưa có sách yêu thích"
            message="Hãy khám phá và nhấn biểu tượng trái tim để lưu những cuốn sách bạn thích."
            actionLabel="Khám phá sách"
            onAction={() =>
              navigation.navigate("Tabs", {
                screen: "Home",
              })
            }
          />
        }
      />

      <TodoBox id="BT8.8b">
        {"Danh sách yêu thích được lọc từ Redux Store và cập nhật tự động khi thêm hoặc bỏ tim."}
      </TodoBox>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
