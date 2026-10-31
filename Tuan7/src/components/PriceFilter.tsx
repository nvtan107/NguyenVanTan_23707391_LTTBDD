
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import {
  PriceRange,
  PRICE_RANGES,
} from "../utils/filters";

import { colors, radius } from "../theme";

interface Props {
  value: PriceRange;
  onChange: (v: PriceRange) => void;
}

export function PriceFilter({ value, onChange }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {PRICE_RANGES.map((r) => {
        const active = value === r.key;

        return (
          <Pressable
            key={r.key}
            onPress={() => onChange(active ? null : r.key)}
            style={[
              styles.btn,
              active && styles.btnActive,
            ]}
          >
            <Text
              style={[
                styles.text,
                active && styles.textActive,
              ]}
            >
              {r.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  btn: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radius.pill,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.line,
  },
  btnActive: {
    backgroundColor: colors.cyan,
    borderColor: colors.cyan,
  },
  text: {
    color: colors.text,
    fontWeight: "600",
  },
  textActive: {
    color: "#FFFFFF",
  },
});
