
import { api } from "../api/client";
import { AppNotification } from "../types";

// Lấy danh sách thông báo của một user, mới nhất trước.
export async function getNotifications(
  userId: number
): Promise<AppNotification[]> {
  const res = await api.get<AppNotification[]>("/notifications", {
    params: {
      userId,
      _sort: "createdAt",
      _order: "desc",
    },
  });

  return res.data;
}

// Đánh dấu một thông báo đã đọc.
export async function markAsRead(
  id: number
): Promise<AppNotification> {
  const res = await api.patch<AppNotification>(
    `/notifications/${id}`,
    { read: true }
  );

  return res.data;
}
