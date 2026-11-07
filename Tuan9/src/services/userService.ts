import { api } from "../api/client";
import { User } from "../types";

export async function updateProfile(
  id: number,
  data: Pick<User, "name" | "phone">
): Promise<User> {
  const res = await api.patch<User & { password?: string }>(
    `/users/${id}`,
    data
  );

  const { password, ...safeUser } = res.data;
  void password;

  return safeUser;
}