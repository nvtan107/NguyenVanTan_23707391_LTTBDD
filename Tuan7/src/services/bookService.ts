import { api } from "../api/client";
import type { Book } from "../types";

export interface BookQuery {
  categoryId?: number;
  q?: string;
}

export async function getBooks(params?: BookQuery): Promise<Book[]> {
  const res = await api.get<Book[]>("/books", { params });
  return res.data;
}

export async function getBookById(id: number): Promise<Book> {
  const res = await api.get<Book>(`/books/${id}`);
  return res.data;
}