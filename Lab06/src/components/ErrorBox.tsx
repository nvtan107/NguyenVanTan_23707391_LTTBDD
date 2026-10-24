
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface Props {
  message: string;
  onRetry: () => void;
}

export function ErrorBox({ message, onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Có lỗi xảy ra!</Text>
      <Text style={styles.message}>{message}</Text>

      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E53A2F',
  },
  message: {
    marginTop: 12,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4F63C8',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
