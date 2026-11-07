import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { StatusBadge } from "../components/StatusBadge";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";

import { getOrdersByUser } from "../services/orderService";
import { getBooks } from "../services/bookService";

import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";

import { formatDateTime } from "../utils/format";
import { showMessage } from "../utils/dialog";

import { RootScreenProps } from "../navigation/types";
import { Book, CartItem, Order } from "../types";

import { colors, formatPrice, radius } from "../theme";

type OrderStatusFilter =
  | "all"
  | "pending"
  | "shipping"
  | "completed"
  | "cancelled";

const STATUS_FILTERS: {
  label: string;
  value: OrderStatusFilter;
}[] = [
  { label: "Tất cả", value: "all" },
  { label: "Chờ xác nhận", value: "pending" },
  { label: "Đang giao", value: "shipping" },
  { label: "Hoàn tất", value: "completed" },
  { label: "Đã huỷ", value: "cancelled" },
];

export const PAYMENT_LABEL = {
  cod: "Thanh toán khi nhận hàng (COD)",
  bank: "Chuyển khoản ngân hàng",
} as const;

export function OrdersScreen({
  navigation,
}: RootScreenProps<"Orders">) {
  const { user, isLoggedIn } = useAuth();

  const { items: cartItems, reorder } = useCart();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Bộ lọc trạng thái đơn hàng - BT9.C5
  const [statusFilter, setStatusFilter] =
    useState<OrderStatusFilter>("all");

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);

  // ID của đơn hàng đang mở rộng
  const [openId, setOpenId] = useState<number | null>(null);

  // ID của đơn hàng đang xử lý mua lại
  const [reorderingId, setReorderingId] = useState<number | null>(
    null
  );

  // ==================== LOAD ORDERS ====================

  const load = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await getOrdersByUser(user.id);

      // Sắp xếp đơn mới nhất lên đầu
      const sortedOrders = [...data].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );

      setOrders(sortedOrders);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  // ==================== REORDER - BT9.C1 ====================

  const handleReorder = async (order: Order) => {
    if (order.status !== "completed") {
      showMessage(
        "Không thể mua lại",
        "Chỉ có thể mua lại đơn hàng đã hoàn tất."
      );
      return;
    }

    try {
      setReorderingId(order.id);

      // Lấy dữ liệu sách mới nhất từ server
      const latestBooks = await getBooks();

      const booksToAdd: CartItem[] = [];

      let skippedCount = 0;
      let addedCount = 0;

      // Tạo bản đồ số lượng hiện có trong giỏ
      const currentQuantity = new Map<number, number>();

      cartItems.forEach((item) => {
        currentQuantity.set(item.bookId, item.quantity);
      });

      // Xử lý từng sản phẩm trong đơn hàng cũ
      order.items.forEach((orderItem) => {
        const latestBook: Book | undefined = latestBooks.find(
          (book) => book.id === orderItem.bookId
        );

        // Sách đã bị xóa hoặc hết hàng
        if (!latestBook || latestBook.stock <= 0) {
          skippedCount++;
          return;
        }

        const oldQuantity =
          currentQuantity.get(orderItem.bookId) ?? 0;

        // Số lượng tối đa còn có thể thêm
        const availableQuantity = Math.max(
          0,
          latestBook.stock - oldQuantity
        );

        const quantityToAdd = Math.min(
          orderItem.quantity,
          availableQuantity
        );

        if (quantityToAdd <= 0) {
          skippedCount++;
          return;
        }

        // Chuẩn bị sản phẩm với giá và tồn kho mới nhất
        booksToAdd.push({
          bookId: latestBook.id,
          title: latestBook.title,
          price: latestBook.price,
          emoji: latestBook.emoji,
          color: latestBook.color,
          stock: latestBook.stock,
          quantity: quantityToAdd,
        });

        addedCount += quantityToAdd;

        // Cập nhật số lượng tạm để xử lý trường hợp
        // một đơn hàng có nhiều dòng cùng bookId
        currentQuantity.set(
          orderItem.bookId,
          oldQuantity + quantityToAdd
        );
      });

      // Không có sản phẩm nào có thể thêm
      if (booksToAdd.length === 0) {
        showMessage(
          "Không thể mua lại",
          "Các sách trong đơn hàng hiện đã hết hàng hoặc không còn tồn tại."
        );
        return;
      }

      // Thêm sản phẩm vào Redux cart
      reorder(booksToAdd);

      // Chuyển sang tab Giỏ hàng
      showMessage(
        "Mua lại thành công",
        `Đã thêm ${addedCount} sản phẩm vào giỏ hàng.${
          skippedCount > 0
            ? `\nBỏ qua ${skippedCount} sản phẩm không còn hàng hoặc đã đủ tồn kho.`
            : ""
        }`,
        () => {
          navigation.navigate("Tabs", {
            screen: "Cart",
          });
        }
      );
    } catch (e) {
      showMessage(
        "Lỗi mua lại",
        getErrorMessage(e)
      );
    } finally {
      setReorderingId(null);
    }
  };

  // ==================== AUTH / LOADING / ERROR ====================

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
    return <LoadingView label="Đang tải đơn hàng..." />;
  }

  if (error) {
    return <ErrorView message={error} onRetry={load} />;
  }

  // ==================== RENDER ORDER ====================

  const renderOrder = ({ item }: { item: Order }) => {
    const expanded = openId === item.id;

    return (
      <View style={styles.orderCard}>
        <TouchableOpacity
          style={styles.orderHeader}
          activeOpacity={0.7}
          onPress={() =>
            setOpenId(expanded ? null : item.id)
          }
        >
          <View style={styles.orderInfo}>
            <Text style={styles.orderId}>
              Đơn hàng #{item.id}
            </Text>

            <Text style={styles.date}>
              {formatDateTime(item.createdAt)}
            </Text>
          </View>

          <View style={styles.headerRight}>
            <StatusBadge status={item.status} />
            <Text style={styles.arrow}>
              {expanded ? "▲" : "▼"}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>
            Tổng tiền
          </Text>

          <Text style={styles.totalPrice}>
            {formatPrice(item.total)}
          </Text>
        </View>

        {expanded && (
          <View style={styles.detailContainer}>
            <View style={styles.separator} />

            <Text style={styles.sectionTitle}>
              Chi tiết sản phẩm
            </Text>

            {item.items.map((orderItem, index) => (
              <View
                key={`${orderItem.bookId}-${index}`}
                style={styles.productRow}
              >
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>
                    {orderItem.title}
                  </Text>

                  <Text style={styles.productQuantity}>
                    Số lượng: {orderItem.quantity}
                  </Text>
                </View>

                <Text style={styles.productPrice}>
                  {formatPrice(
                    orderItem.price * orderItem.quantity
                  )}
                </Text>
              </View>
            ))}

            <View style={styles.separator} />

            <Text style={styles.sectionTitle}>
              Địa chỉ giao hàng
            </Text>

            <Text style={styles.addressText}>
              {item.address.name}
            </Text>

            <Text style={styles.addressText}>
              {item.address.phone}
            </Text>

            <Text style={styles.addressText}>
              {item.address.address}
            </Text>

            <View style={styles.separator} />

            <Text style={styles.paymentText}>
              Phương thức thanh toán:{" "}
              {PAYMENT_LABEL[item.paymentMethod]}
            </Text>

            {item.status === "completed" && (
              <View style={styles.reorderButton}>
                <PrimaryButton
                  title="🔄 Mua lại"
                  onPress={() => handleReorder(item)}
                  loading={reorderingId === item.id}
                  disabled={reorderingId !== null}
                />
              </View>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Bộ lọc trạng thái đơn hàng */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContainer}
      >
        {STATUS_FILTERS.map((filter) => {
          const selected = statusFilter === filter.value;

          return (
            <TouchableOpacity
              key={filter.value}
              activeOpacity={0.8}
              onPress={() => setStatusFilter(filter.value)}
              style={[
                styles.filterButton,
                selected && styles.filterButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  selected && styles.filterTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderOrder}
        contentContainerStyle={
          filteredOrders.length === 0
            ? styles.emptyContainer
            : styles.listContent
        }
        ListEmptyComponent={
          orders.length === 0 ? (
            <EmptyState
              emoji="🧾"
              title="Bạn chưa có đơn hàng nào"
              message="Hãy chọn sách và đặt hàng để xem lịch sử tại đây."
              actionLabel="Mua sắm ngay"
              onAction={() =>
                navigation.navigate("Tabs", {
                  screen: "Home",
                })
              }
            />
          ) : (
            <EmptyState
              emoji="🔎"
              title="Không có đơn hàng phù hợp"
              message="Không tìm thấy đơn hàng ở trạng thái này."
            />
          )
        }
        onRefresh={load}
        refreshing={loading}
      />
    </View>
  );
}

// ==================== STYLES ====================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 12,
  },

  filterContainer: {
    alignItems: "center",
    gap: 8,
    paddingBottom: 12,
  },

  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
  },

  filterButtonActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  filterText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
  },

  filterTextActive: {
    color: "#FFFFFF",
  },

  listContent: {
    gap: 12,
    paddingBottom: 24,
  },

  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },

  orderCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: 14,
    gap: 12,
  },

  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderInfo: {
    flex: 1,
    gap: 4,
  },

  orderId: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
  },

  date: {
    fontSize: 12,
    color: colors.muted,
  },

  headerRight: {
    alignItems: "flex-end",
    gap: 6,
  },

  arrow: {
    color: colors.muted,
    fontSize: 12,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 10,
  },

  totalLabel: {
    color: colors.muted,
    fontSize: 14,
  },

  totalPrice: {
    color: colors.danger,
    fontWeight: "800",
    fontSize: 17,
  },

  detailContainer: {
    gap: 10,
  },

  separator: {
    height: 1,
    backgroundColor: colors.line,
    marginVertical: 4,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
  },

  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },

  productInfo: {
    flex: 1,
    gap: 4,
  },

  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },

  productQuantity: {
    fontSize: 12,
    color: colors.muted,
  },

  productPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.text,
  },

  addressText: {
    fontSize: 13,
    color: colors.muted,
  },

  paymentText: {
    fontSize: 13,
    color: colors.text,
  },

  reorderButton: {
    marginTop: 6,
  },
});