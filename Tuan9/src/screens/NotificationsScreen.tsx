
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { NotificationItem } from "../components/NotificationItem";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";

import {
  getNotifications,
  markAsRead,
} from "../services/notificationService";

import { getErrorMessage } from "../api/client";
import { useAuth } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { AppNotification } from "../types";
import { colors } from "../theme";

export function NotificationsScreen({
  navigation,
}: RootScreenProps<"Notifications">) {
  const { user, isLoggedIn } = useAuth();

  const [data, setData] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // BT9.5c: Tải thông báo của user.
  const load = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const result = await getNotifications(user.id);
      setData(result);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  // BT9.5d: Xử lý khi người dùng bấm vào thông báo.
  const open = async (n: AppNotification) => {
    if (!n.read) {
      // Cập nhật giao diện ngay lập tức.
      setData((prev) =>
        prev.map((item) =>
          item.id === n.id
            ? { ...item, read: true }
            : item
        )
      );

      // Gửi yêu cầu cập nhật lên server.
      try {
        await markAsRead(n.id);
      } catch (e) {
        // API lỗi thì hoàn tác trạng thái chưa đọc.
        setData((prev) =>
          prev.map((item) =>
            item.id === n.id
              ? { ...item, read: false }
              : item
          )
        );
      }
    }

    // Điều hướng theo target của thông báo.
    if (n.target?.screen === "Orders") {
      navigation.navigate("Orders");
    } else if (
      n.target?.screen === "BookDetail" &&
      n.target.bookId
    ) {
      navigation.navigate("BookDetail", {
        bookId: n.target.bookId,
      });
    }
  };

  if (!isLoggedIn) {
    return (
      <EmptyState
        emoji="🔒"
        title="Bạn cần đăng nhập"
        actionLabel="Đăng nhập"
        onAction={() => navigation.navigate("Login")}
      />
    );
  }

  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={load} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(n) => String(n.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <NotificationItem
            item={item}
            onPress={open}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            emoji="🔔"
            title="Chưa có thông báo nào"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  list: {
    padding: 12,
    gap: 8,
    flexGrow: 1,
  },
});
