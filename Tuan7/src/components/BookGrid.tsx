import React from "react";
import { FlatList } from "react-native";
import { Book } from "../types";
import { BookCard } from "./BookCard";

interface Props {
  data: Book[];
  onPressBook?: (book: Book) => void;
  ListHeaderComponent?: React.ReactElement | null;
  ListEmptyComponent?: React.ReactElement | null;
  bottomSpace?: number;
}

// Lưới sách 2 cột — được tái sử dụng ở Home, kết quả tìm kiếm, Yêu thích…
export function BookGrid({ data, onPressBook, ListHeaderComponent, ListEmptyComponent, bottomSpace = 90 }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(b) => String(b.id)}
      numColumns={2}
      renderItem={({ item }) => <BookCard book={item} onPress={onPressBook} />}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={{ padding: 6, paddingBottom: bottomSpace }}
    />
  );
}
