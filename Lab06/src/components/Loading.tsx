
import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4F63C8" />
      <Text style={styles.text}>Đang tải...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    marginTop: 12,
    fontSize: 16,
  },
});
