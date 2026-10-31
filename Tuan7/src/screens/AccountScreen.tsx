import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import { useAuth } from "../store/hooks";

export default function AccountScreen() {
  const { user, isLoggedIn, signIn, signOut } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tài khoản</Text>

      {isLoggedIn ? (
        <View style={styles.card}>
          <Text style={styles.avatar}>👤</Text>

          <Text style={styles.name}>
            {user?.name}
          </Text>

          <Text style={styles.email}>
            {user?.email}
          </Text>

          <Pressable
            style={styles.logoutButton}
            onPress={signOut}
          >
            <Text style={styles.buttonText}>
              Đăng xuất
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.avatar}>🔒</Text>

          <Text style={styles.message}>
            Bạn chưa đăng nhập
          </Text>

          <Text style={styles.description}>
            Đăng nhập để sử dụng các chức năng tài khoản.
          </Text>

          <Pressable
            style={styles.loginButton}
            onPress={() =>
              signIn(
                {
                  id: 1,
                  name: "Học viên Demo",
                  email: "demo@bookstore.vn",
                },
                "fake-token"
              )
            }
          >
            <Text style={styles.buttonText}>
              Đăng nhập thử
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    elevation: 3,
  },
  avatar: {
    fontSize: 55,
    marginBottom: 15,
  },
  name: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  email: {
    fontSize: 15,
    color: "#666",
    marginBottom: 25,
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 25,
  },
  loginButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});