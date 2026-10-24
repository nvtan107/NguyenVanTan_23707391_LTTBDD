
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
      <Text style={styles.heading}>Thông tin cá nhân</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>TN</Text>
        </View>

        <Text style={styles.name}>Nguyễn Văn Tân</Text>
        <Text style={styles.email}>tan@example.com</Text>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.label}>Họ và tên</Text>
          <Text style={styles.value}>Nguyễn Văn Tân</Text>
        </View>

        <View style={styles.infoRow}>
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
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#20243A',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
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
    fontSize: 14,
    color: '#777777',
    marginTop: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    alignSelf: 'stretch',
    marginVertical: 24,
  },
  infoRow: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  label: {
    color: '#777777',
    fontSize: 14,
  },
  value: {
    color: '#20243A',
    fontSize: 14,
    fontWeight: '600',
  },
});
