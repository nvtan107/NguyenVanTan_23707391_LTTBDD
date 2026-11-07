import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

interface Props {
  value: number; // 0–5 (có thể lẻ, sẽ làm tròn khi vẽ)
  size?: number;
  onChange?: (v: number) => void; // có truyền → cho phép bấm chọn sao
}

// Component sao TÁI SỬ DỤNG: chỉ hiển thị, hoặc nhập điểm nếu có onChange
export function RatingStars({ value, size = 18, onChange }: Props) {
  const filled = Math.round(value);
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((n) => {
        const star = (
          <Text key={n} style={{ fontSize: size, color: n <= filled ? colors.warning : colors.line }}>
            ★
          </Text>
        );
        return onChange ? (
          <Pressable key={n} onPress={() => onChange(n)} hitSlop={4} accessibilityLabel={`${n} sao`}>
            {star}
          </Pressable>
        ) : (
          star
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({ row: { flexDirection: "row", gap: 2 } });
