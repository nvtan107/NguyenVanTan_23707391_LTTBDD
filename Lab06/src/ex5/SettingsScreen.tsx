
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Cài đặt</Text>

      <View style={styles.card}>
        <View style={styles.settingRow}>
          <View style={styles.info}>
            <Text style={styles.title}>Thông báo</Text>
            <Text style={styles.description}>
              Bật hoặc tắt thông báo ứng dụng
            </Text>
          </View>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.info}>
            <Text style={styles.title}>Chế độ tối</Text>
            <Text style={styles.description}>
              Bật hoặc tắt tùy chọn chế độ tối
            </Text>
          </View>

          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
          />
        </View>
      </View>

      <Text style={styles.status}>
        Thông báo: {notifications ? 'Đang bật' : 'Đang tắt'}
      </Text>

      <Text style={styles.status}>
        Chế độ tối: {darkMode ? 'Đang bật' : 'Đang tắt'}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#20243A',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#20243A',
  },
  description: {
    fontSize: 13,
    color: '#777777',
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  status: {
    fontSize: 14,
    color: '#555555',
    marginTop: 16,
  },
});
