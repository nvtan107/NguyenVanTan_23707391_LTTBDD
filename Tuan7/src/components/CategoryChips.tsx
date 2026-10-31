import React from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { Category } from "../types";
import { colors, radius } from "../theme";

interface Props {
  categories: Category[];
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

// Chip danh mục cuộn ngang. Chip đang chọn có màu khác.
export function CategoryChips({ categories, selectedId, onSelect }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {categories.map((c) => {
        const active = c.id === selectedId;
        return (
          <Pressable key={c.id} style={[styles.chip, active && styles.chipActive]} onPress={() => onSelect(active ? null : c.id)}>
            <Text style={[styles.text, active && styles.textActive]}>{c.emoji} {c.name}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: "#fff", borderWidth: 1, borderColor: colors.line },
  chipActive: { backgroundColor: colors.indigo, borderColor: colors.indigo },
  text: { color: colors.text, fontWeight: "600" },
  textActive: { color: "#fff" },
});
