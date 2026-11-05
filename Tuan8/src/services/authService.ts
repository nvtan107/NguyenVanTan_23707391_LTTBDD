import { api } from "../api/client";
import { User } from "../types";

export interface AuthResult {
  user: User;
  token: string;
}

// json-server không có đăng nhập thật → ta GIẢ LẬP: tìm user theo email rồi so mật khẩu.
// (Chỉ dùng cho bài tập; hệ thống thật phải để SERVER kiểm tra và cấp token.)
interface UserRecord extends User {
  password: string;
}

const toResult = (u: UserRecord): AuthResult => {
  const { password: _pw, ...user } = u;
  return { user, token: `token-${u.id}-${Date.now()}` };
};

export async function login(email: string, password: string): Promise<AuthResult> {
  const res = await api.get<UserRecord[]>("/users", { params: { email: email.trim().toLowerCase() } });
  const found = res.data[0];
  if (!found || found.password !== password) throw new Error("Email hoặc mật khẩu không đúng");
  return toResult(found);
}

export async function register(name: string, email: string, password: string): Promise<AuthResult> {
  const mail = email.trim().toLowerCase();
  const exists = await api.get<UserRecord[]>("/users", { params: { email: mail } });
  if (exists.data.length > 0) throw new Error("Email này đã được đăng ký");
  const res = await api.post<UserRecord>("/users", { name: name.trim(), email: mail, password });
  return toResult(res.data);
}
