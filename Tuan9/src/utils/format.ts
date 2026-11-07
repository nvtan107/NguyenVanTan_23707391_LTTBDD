const pad = (n: number) => String(n).padStart(2, "0");

// "2026-10-22T08:05:00.000Z" → "22/10/2026 15:05" (giờ máy người dùng)
export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
