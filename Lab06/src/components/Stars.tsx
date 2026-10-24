
import React from 'react';
import { Text } from 'react-native';
import { colors } from '../theme';

interface Props {
  value: number;
  size?: number;
}

export function Stars({ value, size = 16 }: Props) {
  return (
    <Text style={{ color: colors.star, fontSize: size, letterSpacing: 1 }}>
      {'★'.repeat(value)}
      <Text style={{ color: colors.line }}>
        {'★'.repeat(5 - value)}
      </Text>
    </Text>
  );
}
