import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  id: string; // vd "BT8.1"
  children: string; // mô tả việc cần làm
}

// KHUNG VIỀN ĐỨT — placeholder cho chỗ bạn phải tự viết. Làm xong thì XÓA khung này.
export function TodoBox({ id, children }: Props) {
  return (
    <View style={styles.box}>
      <Text style={styles.id}>TODO {id}</Text>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderWidth: 2, borderStyle: "dashed", borderColor: "#F59E0B", backgroundColor: "#FFFBEB", borderRadius: 12, padding: 12, gap: 4 },
  id: { color: "#B45309", fontWeight: "800", fontSize: 12 },
  text: { color: "#78350F", fontSize: 13 },
});
