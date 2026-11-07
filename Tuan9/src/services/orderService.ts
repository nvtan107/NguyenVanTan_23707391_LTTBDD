import { api } from "../api/client";
import {
  Order,
  OrderItem,
  PaymentMethod,
  ShippingAddress,
} from "../types";

export interface NewOrder {
  userId: number;
  items: OrderItem[];
  total: number;
  address: ShippingAddress;
  paymentMethod: PaymentMethod;
}

// Tạo đơn hàng mới
export async function createOrder(
  payload: NewOrder
): Promise<Order> {
  const body = {
    ...payload,
    status: "pending" as const,
    createdAt: new Date().toISOString(),
  };

  const res = await api.post<Order>("/orders", body);

  return res.data;
}

// Lấy danh sách đơn hàng của người dùng
export async function getOrdersByUser(
  userId: number
): Promise<Order[]> {
  const res = await api.get<Order[]>("/orders", {
    params: {
      userId,
      _sort: "createdAt",
      _order: "desc",
    },
  });

  return res.data;
}