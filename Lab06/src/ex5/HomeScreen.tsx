
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Trang chủ</Text>

        <Text style={styles.description}>
          Chào mừng bạn đến với ứng dụng Lab06.
          {'\n\n'}
          Hãy mở menu bên trái để chuyển đến Profile
          hoặc Settings.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#20243A',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 25,
    color: '#555555',
  },
});
