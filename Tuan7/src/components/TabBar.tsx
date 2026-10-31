import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Badge } from "./Badge";
import { colors } from "../theme";

export interface TabItem {
  key: string;
  label: string;
  emoji: string;
  badge?: number;
}

interface Props {
  items: TabItem[];
  activeKey: string;
  onPress: (key: string) => void;
}

// Tab Bar thuần giao diện — chưa biết gì về thư viện điều hướng.
// CustomTabBar sẽ "nối" nó với React Navigation.
export function TabBar({ items, activeKey, onPress }: Props) {
  return (
    <View style={styles.bar}>
      {items.map((it) => {
        const active = it.key === activeKey;
        return (
          <Pressable key={it.key} style={styles.item} onPress={() => onPress(it.key)}>
            <View>
              <Text style={[styles.emoji, !active && styles.dim]}>{it.emoji}</Text>
              <Badge count={it.badge ?? 0} style={styles.badge} />
            </View>
            <Text style={[styles.label, active && styles.labelActive]}>{it.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: "row", backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: colors.line, paddingVertical: 6 },
  item: { flex: 1, alignItems: "center", paddingVertical: 4 },
  emoji: { fontSize: 22 },
  dim: { opacity: 0.45 },
  label: { fontSize: 11, color: colors.muted, marginTop: 2, fontWeight: "600" },
  labelActive: { color: colors.indigo, fontWeight: "800" },
  badge: { position: "absolute", top: -6, right: -12 },
});
