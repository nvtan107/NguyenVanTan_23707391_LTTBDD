
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";

import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";

import { useDebounce } from "../hooks/useDebounce";
import { filterBooks, PriceRange } from "../utils/filters";
import { useCart } from "../store/hooks";

import type { Book, Category } from "../types";
import type { TabScreenProps } from "../navigation/types";

import { colors, radius } from "../theme";

export function HomeScreen({
  navigation,
  route,
}: TabScreenProps<"Home">) {
  // Số lượng sách trong giỏ hàng
  const { totalQuantity } = useCart();

  // Dữ liệu từ API
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Tìm kiếm và lọc
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);

  // Câu 5: Sắp xếp giá
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Tải sách và danh mục song song
  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [bookData, categoryData] = await Promise.all([
        getBooks(),
        getCategories(),
      ]);

      setBooks(bookData);
      setCategories(categoryData);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Debounce tìm kiếm 400ms
  const debouncedKeyword = useDebounce(keyword, 400);

  // Lọc sách và sắp xếp theo giá
  const visibleBooks = useMemo(() => {
    const filteredBooks = filterBooks(books, {
      keyword: debouncedKeyword,
      categoryId,
      priceRange,
    });

    return [...filteredBooks].sort((a, b) =>
      sortOrder === "asc"
        ? a.price - b.price
        : b.price - a.price
    );
  }, [
    books,
    debouncedKeyword,
    categoryId,
    priceRange,
    sortOrder,
  ]);

  // Nhận danh mục được gửi từ màn hình Categories
  useEffect(() => {
    const id = route.params?.categoryId;

    if (id !== undefined) {
      setCategoryId(id);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);

  // Kiểm tra có bộ lọc đang hoạt động không
  const hasFilter =
    keyword.trim() !== "" ||
    categoryId !== null ||
    priceRange !== null;

  // Xóa tất cả bộ lọc
  const clearFilters = () => {
    setKeyword("");
    setCategoryId(null);
    setPriceRange(null);
  };

  // Đang tải dữ liệu
  if (loading) {
    return <LoadingView label="Đang tải danh sách sách..." />;
  }

  // Có lỗi khi gọi API
  if (error) {
    return <ErrorView message={error} onRetry={load} />;
  }

  return (
    <View style={styles.container}>
      <Header
        title="📚 BookStore"
        onSearchPress={() => setSearchOpen((v) => !v)}
      />

      {searchOpen && (
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          onClose={() => {
            setSearchOpen(false);
            setKeyword("");
          }}
        />
      )}

      <BookGrid
        data={visibleBooks}
        onPressBook={(book) =>
          navigation.navigate("BookDetail", {
            bookId: book.id,
          })
        }
        ListHeaderComponent={
          <View>
            {/* Lọc theo danh mục */}
            <CategoryChips
              categories={categories}
              selectedId={categoryId}
              onSelect={setCategoryId}
            />

            {/* Lọc theo khoảng giá */}
            <PriceFilter
              value={priceRange}
              onChange={setPriceRange}
            />

            {/* Câu 5: Nút sắp xếp giá */}
            <Pressable
              style={styles.sortButton}
              onPress={() =>
                setSortOrder((prev) =>
                  prev === "asc" ? "desc" : "asc"
                )
              }
            >
              <Text style={styles.sortText}>
                {sortOrder === "asc"
                  ? "↗ Giá tăng dần"
                  : "↘ Giá giảm dần"}
              </Text>
            </Pressable>

            {/* Nút xóa bộ lọc */}
            {hasFilter && (
              <Pressable
                style={styles.clearButton}
                onPress={clearFilters}
              >
                <Text style={styles.clearText}>
                  ✕ Xóa bộ lọc
                </Text>
              </Pressable>
            )}
          </View>
        }
        ListEmptyComponent={
          <EmptyState
            emoji="🔎"
            title="Không tìm thấy sách phù hợp"
            message="Hãy thử thay đổi từ khóa hoặc bộ lọc."
            actionLabel="Xóa bộ lọc"
            onAction={clearFilters}
          />
        }
      />

      {/* Nút giỏ hàng */}
      <FloatingCartButton
        count={totalQuantity}
        onPress={() => navigation.navigate("Cart")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  sortButton: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginVertical: 10,
    borderRadius: radius.md,
    backgroundColor: "#E8F1FF",
  },

  sortText: {
    color: "#2563EB",
    fontWeight: "bold",
    fontSize: 14,
  },

  clearButton: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    borderRadius: radius.md,
    backgroundColor: "#FEE2E2",
  },

  clearText: {
    color: colors.danger,
    fontWeight: "700",
  },
});
