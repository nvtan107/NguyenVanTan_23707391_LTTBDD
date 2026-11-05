import { loadJSON, removeKey, saveJSON } from "./storage";
import { User } from "../types";

const KEY = "@bookstore/auth";
export interface StoredAuth {
  user: User;
  token: string;
}

export const saveAuth = (a: StoredAuth) => saveJSON(KEY, a);
export const loadAuth = () => loadJSON<StoredAuth>(KEY);
export const clearAuth = () => removeKey(KEY);
