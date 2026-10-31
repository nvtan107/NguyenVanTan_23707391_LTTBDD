import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../components/Header";

import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { TabScreenProps } from "../navigation/types";
import { Category } from "../types";
import { colors, radius } from "../theme";

// danh mục lấy từ API; nhấn → về Home kèm categoryId (Home tự lọc)
export function CategoriesScreen({
  navigation,
}: TabScreenProps<"Categories">) {
  // TODO BT7.6b: state data / loading / error + load() gọi getCategories() trong useEffect — giống Home
  // TODO BT7.6c: loading → <LoadingView/>, error → <ErrorView onRetry={load}/>
  const [data, setData] = useState<Category[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const load = useCallback(async () => {
  setLoading(true);
  setError(null);

  try {
    const categories = await getCategories();
    setData(categories);
  } catch (e) {
    setError(getErrorMessage(e));
  } finally {
    setLoading(false);
  }
}, []);
useEffect(() => {
  load();
}, [load]);
return (
  <View style={styles.container}>
    <Header title="🗂️ Danh mục" />

    {loading ? (
      <LoadingView label="Đang tải danh mục..." />
    ) : error ? (
      <ErrorView message={error} onRetry={load} />
    ) : (
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 12, gap: 10 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => {
              navigation.navigate("Home", {
                categoryId: item.id,
              });
            }}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text>Chưa có danh mục nào.</Text>
        }
      />
    )}
  </View>
);
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  row: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", padding: 16, borderRadius: radius.md, gap: 12 },
  emoji: { fontSize: 26 },
  name: { flex: 1, fontSize: 16, fontWeight: "700", color: colors.text },
  arrow: { fontSize: 22, color: colors.muted },
});
