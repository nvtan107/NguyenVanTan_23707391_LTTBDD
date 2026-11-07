
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
import { showMessage } from "../utils/dialog";

import { useDebounce } from "../hooks/useDebounce";
import { useCart } from "../store/hooks";
import { filterBooks, PriceRange } from "../utils/filters";
import { TabScreenProps } from "../navigation/types";
import { Book, Category } from "../types";
import { colors } from "../theme";

export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  const { totalQuantity } = useCart();

  // Dữ liệu từ API
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // BT9.6: trạng thái kéo để làm mới
  const [refreshing, setRefreshing] = useState(false);

  // Bộ lọc
  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);

  const debouncedKeyword = useDebounce(keyword, 400);

  // Tải dữ liệu lần đầu
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [bookList, categoryList] = await Promise.all([
        getBooks(),
        getCategories(),
      ]);

      setBooks(bookList);
      setCategories(categoryList);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // BT9.6: Kéo xuống để tải lại sách và danh mục
  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      // Gọi đồng thời hai API
      const [bookList, categoryList] = await Promise.all([
        getBooks(),
        getCategories(),
      ]);

      // Chỉ cập nhật khi cả hai API thành công
      setBooks(bookList);
      setCategories(categoryList);
    } catch (e) {
      // Giữ nguyên dữ liệu cũ nếu có lỗi
      showMessage(
        "Không thể làm mới",
        getErrorMessage(e)
      );
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Nhận categoryId từ tab Danh mục
  useEffect(() => {
    const id = route.params?.categoryId;

    if (id !== undefined) {
      setCategoryId(id);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);

  // Lọc sách
  const visibleBooks = useMemo(
    () =>
      filterBooks(books, {
        keyword: debouncedKeyword,
        categoryId,
        priceRange,
      }),
    [books, debouncedKeyword, categoryId, priceRange]
  );

  const hasFilter =
    keyword !== "" ||
    categoryId !== null ||
    priceRange !== null;

  const clearFilters = () => {
    setKeyword("");
    setCategoryId(null);
    setPriceRange(null);
  };

  const header = (
    <View>
      <CategoryChips
        categories={categories}
        selectedId={categoryId}
        onSelect={setCategoryId}
      />

      <PriceFilter
        value={priceRange}
        onChange={setPriceRange}
      />

      {hasFilter && (
        <Pressable
          onPress={clearFilters}
          style={styles.clearBtn}
        >
          <Text style={styles.clearText}>
            ✕ Xóa bộ lọc
          </Text>
        </Pressable>
      )}
    </View>
  );

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

      {loading ? (
        <LoadingView label="Đang tải sách…" />
      ) : error ? (
        <ErrorView
          message={error}
          onRetry={load}
        />
      ) : (
        <BookGrid
          data={visibleBooks}
          onPressBook={(b) =>
            navigation.navigate("BookDetail", {
              bookId: b.id,
            })
          }
          ListHeaderComponent={header}
          ListEmptyComponent={
            <EmptyState
              emoji="🔎"
              title="Không tìm thấy sách phù hợp"
              message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc."
              actionLabel="Xóa bộ lọc"
              onAction={clearFilters}
            />
          }
          // BT9.6: hai props kích hoạt RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}

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
  clearBtn: {
    alignSelf: "flex-start",
    marginLeft: 12,
    marginBottom: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#FEE2E2",
  },
  clearText: {
    color: colors.danger,
    fontWeight: "700",
    fontSize: 12,
  },
});
