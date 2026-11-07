import React from "react";
import { FlatList, RefreshControl } from "react-native";
import { Book } from "../types";
import { BookCard } from "./BookCard";

interface Props {
  data: Book[];
  onPressBook?: (book: Book) => void;
  ListHeaderComponent?: React.ReactElement | null;
  ListEmptyComponent?: React.ReactElement | null;
  bottomSpace?: number;
  refreshing?: boolean; // kéo để làm mới
  onRefresh?: () => void;
}

// Lưới sách 2 cột, dùng lại ở Home, kết quả tìm kiếm, Yêu thích…
export function BookGrid({ data, onPressBook, ListHeaderComponent, ListEmptyComponent, bottomSpace = 90, refreshing, onRefresh }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(b) => String(b.id)}
      numColumns={2}
      renderItem={({ item }) => <BookCard book={item} onPress={onPressBook} />}
      ListHeaderComponent={ListHeaderComponent ?? undefined}
ListEmptyComponent={ListEmptyComponent ?? undefined}
      contentContainerStyle={{ padding: 6, paddingBottom: bottomSpace }}
      refreshControl={onRefresh ? <RefreshControl refreshing={!!refreshing} onRefresh={onRefresh} /> : undefined}
    />
  );
}
