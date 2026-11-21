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
  // BT10.10c: chỉ giữ các sách có id nằm trong ids
  const favorites = BOOKS.filter((b) => ids.includes(b.id));
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