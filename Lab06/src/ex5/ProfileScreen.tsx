
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>TN</Text>
        </View>

        <Text style={styles.name}>Nguyễn Văn Tân</Text>
        <Text style={styles.email}>tan@example.com</Text>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.label}>Họ và tên</Text>
          <Text style={styles.value}>Nguyễn Văn Tân</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Vai trò</Text>
          <Text style={styles.value}>Người dùng</Text>
        </View>
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
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3451B2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#20243A',
  },
  email: {
    color: '#777777',
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    alignSelf: 'stretch',
    marginVertical: 24,
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  label: {
    color: '#777777',
  },
  value: {
    color: '#20243A',
    fontWeight: '600',
  },
});
