import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius } from "../theme";

interface Props {
  emoji: string;
  label: string;
  hint?: string;
  onPress: () => void;
}

// Một dòng menu trong tab Tài khoản
export function MenuItem({ emoji, label, hint, onPress }: Props) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{label}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#fff", padding: 14, borderRadius: radius.md },
  emoji: { fontSize: 22 },
  label: { flex: 1, fontSize: 15, fontWeight: "700", color: colors.text },
  hint: { color: colors.muted, fontSize: 12 },
  arrow: { fontSize: 20, color: colors.muted },
});
