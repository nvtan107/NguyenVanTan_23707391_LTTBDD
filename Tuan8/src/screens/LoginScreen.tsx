
import React, { useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";

import { login } from "../services/authService";
import { getErrorMessage } from "../api/client";

import { useAuth } from "../store/hooks";

import {
  validateEmail,
  validatePassword,
} from "../utils/validators";

import { RootScreenProps } from "../navigation/types";
import { colors } from "../theme";

export function LoginScreen({
  navigation,
  route,
}: RootScreenProps<"Login">) {
  const { signIn } = useAuth();

  // State nhập liệu
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State lỗi
  const [errors, setErrors] = useState<{
    email?: string | null;
    password?: string | null;
  }>({});

  const [submitError, setSubmitError] = useState("");

  // State loading
  const [loading, setLoading] = useState(false);

  // BT8.Câu 5: State hiện/ẩn mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  // Hàm đăng nhập
  const submit = async () => {
    // Kiểm tra dữ liệu
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    setSubmitError("");

    // Nếu có lỗi thì dừng
    if (emailError || passwordError) {
      return;
    }

    try {
      setLoading(true);

      // Gọi API đăng nhập
      const result = await login(email, password);

      // Lưu thông tin đăng nhập vào Redux
      signIn(result.user, result.token);

      // Nếu đăng nhập để thanh toán
      if (route.params?.redirectTo === "Checkout") {
        navigation.replace("Checkout", {
          total: route.params.total ?? 0,
        });
      } else {
        // Nếu đăng nhập bình thường
        navigation.navigate("Tabs", {
          screen: "Home",
        });
      }
    } catch (err) {
      setSubmitError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        Platform.OS === "ios" ? "padding" : undefined
      }
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <Text style={styles.logo}>📚</Text>

        <Text style={styles.title}>
          Đăng nhập BookStore
        </Text>

        {/* Email */}
        <FormField
          label="Email"
          placeholder="Nhập email của bạn"
          value={email}
          onChangeText={(value) => {
            setEmail(value);

            if (errors.email) {
              setErrors((prev) => ({
                ...prev,
                email: null,
              }));
            }
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          error={errors.email}
        />

        {/* Mật khẩu + nút hiện/ẩn */}
        <View style={styles.passwordContainer}>
          <View style={styles.passwordField}>
            <FormField
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              value={password}
              onChangeText={(value) => {
                setPassword(value);

                if (errors.password) {
                  setErrors((prev) => ({
                    ...prev,
                    password: null,
                  }));
                }
              }}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              error={errors.password}
            />
          </View>

          {/* Nút hiện/ẩn mật khẩu */}
          <Pressable
            style={styles.eyeButton}
            onPress={() =>
              setShowPassword((prev) => !prev)
            }
            accessibilityRole="button"
            accessibilityLabel={
              showPassword
                ? "Ẩn mật khẩu"
                : "Hiện mật khẩu"
            }
          >
            <Text style={styles.eyeText}>
              {showPassword ? "🙈" : "👁"}
            </Text>
          </Pressable>
        </View>

        {/* Lỗi đăng nhập */}
        {submitError ? (
          <Text style={styles.submitError}>
            {submitError}
          </Text>
        ) : null}

        {/* Nút đăng nhập */}
        <PrimaryButton
          title="Đăng nhập"
          onPress={submit}
          loading={loading}
          disabled={loading}
        />

        {/* Chuyển sang đăng ký */}
        <Pressable
          onPress={() =>
            navigation.replace("Register", route.params)
          }
        >
          <Text style={styles.link}>
            Chưa có tài khoản? Đăng ký
          </Text>
        </Pressable>

        {/* Tài khoản demo */}
        <View style={styles.hint}>
          <Text style={styles.hintText}>
            Tài khoản demo: demo@bookstore.vn / 123456
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  content: {
    padding: 20,
    gap: 14,
  },

  logo: {
    fontSize: 56,
    textAlign: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.navy,
    textAlign: "center",
    marginBottom: 6,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },

  passwordField: {
    flex: 1,
  },

  eyeButton: {
    width: 48,
    height: 46,
    marginBottom: 22,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  eyeText: {
    fontSize: 21,
  },

  submitError: {
    color: colors.danger,
    textAlign: "center",
  },

  link: {
    color: colors.indigo,
    fontWeight: "700",
    textAlign: "center",
  },

  hint: {
    backgroundColor: "#E0F2FE",
    padding: 10,
    borderRadius: 10,
  },

  hintText: {
    color: colors.navy,
    textAlign: "center",
    fontSize: 12,
  },
});
