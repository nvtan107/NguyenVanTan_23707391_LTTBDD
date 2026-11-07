import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radius } from "../theme";

interface Props {
  value: string;
  onChangeText: (t: string) => void;
  onClose: () => void;
}

export function SearchBar({ value, onChangeText, onClose }: Props) {
  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder="Tìm theo tên sách hoặc tác giả…"
        placeholderTextColor={colors.muted}
        autoFocus
        autoCorrect={false}
      />
      <Pressable onPress={onClose} hitSlop={8}>
        <Text style={styles.close}>Đóng</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: colors.navy },
  input: { flex: 1, backgroundColor: "#fff", borderRadius: radius.md, paddingHorizontal: 12, paddingVertical: 8, color: colors.text },
  close: { color: "#fff", fontWeight: "700" },
});
