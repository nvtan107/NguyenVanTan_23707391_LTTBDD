import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../theme";

interface Props {
  label: string;
  hint?: string;
  selected: boolean;
  onPress: () => void;
}

// Lựa chọn phương thức thanh toán dạng radio (chỉ UI)
export function PaymentOption({ label, hint, selected, onPress }: Props) {
  return (
    <Pressable style={[styles.box, selected && styles.boxActive]} onPress={onPress}>
      <View style={[styles.radio, selected && styles.radioActive]}>{selected && <View style={styles.dot} />}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#fff", borderRadius: radius.md, padding: 12, borderWidth: 1.5, borderColor: colors.line },
  boxActive: { borderColor: colors.indigo, backgroundColor: "#EEF2FF" },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: colors.muted, alignItems: "center", justifyContent: "center" },
  radioActive: { borderColor: colors.indigo },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.indigo },
  label: { fontWeight: "700", color: colors.text },
  hint: { color: colors.muted, fontSize: 12 },
});
