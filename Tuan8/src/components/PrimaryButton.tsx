import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors, radius } from "../theme";

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "solid" | "outline";
}

export function PrimaryButton({ title, onPress, disabled, loading, variant = "solid" }: Props) {
  const outline = variant === "outline";
  return (
    <Pressable
      style={[styles.btn, outline && styles.outline, (disabled || loading) && styles.disabled]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? <ActivityIndicator color={outline ? colors.indigo : "#fff"} /> : <Text style={[styles.text, outline && styles.textOutline]}>{title}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { backgroundColor: colors.indigo, paddingVertical: 13, borderRadius: radius.md, alignItems: "center", justifyContent: "center", minHeight: 48 },
  outline: { backgroundColor: "transparent", borderWidth: 1.5, borderColor: colors.indigo },
  disabled: { opacity: 0.45 },
  text: { color: "#fff", fontWeight: "800", fontSize: 16 },
  textOutline: { color: colors.indigo },
});
