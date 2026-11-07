import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { RatingStars } from "../components/RatingStars";
import { FormField } from "../components/FormField";
import { PrimaryButton } from "../components/PrimaryButton";
import { BookCard } from "../components/BookCard";
import { HeartButton } from "../components/HeartButton";
import { getBookById, getBooks } from "../services/bookService";
import { addReview, getReviews } from "../services/reviewService";
import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";
import { RootScreenProps } from "../navigation/types";
import { Book, Review } from "../types";
import { colors, formatPrice, radius } from "../theme";

export function BookDetailScreen({ navigation, route }: RootScreenProps<"BookDetail">) {
  const { bookId } = route.params;
  const { add } = useCart();
  const { user, isLoggedIn } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // form đánh giá
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, r] = await Promise.all([getBookById(bookId), getReviews(bookId)]);
      setBook(b);
      setReviews(r);
      // THỬ THÁCH: sách liên quan = cùng danh mục, trừ sách hiện tại
      const sameCategory = await getBooks({ categoryId: b.categoryId });
      setRelated(sameCategory.filter((x) => x.id !== b.id));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [bookId]);
  useEffect(() => {
    load();
  }, [load]);

  // Điểm trung bình tự tính lại mỗi khi mảng reviews đổi
  const average = useMemo(
    () => (reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0),
    [reviews]
  );

  const submitReview = async () => {
    if (!user) return;
    if (rating === 0) return setFormError("Vui lòng chọn số sao");
    if (!comment.trim()) return setFormError("Vui lòng nhập bình luận");
    setFormError(null);
    setSending(true);
    try {
      const created = await addReview({ bookId, userId: user.id, userName: user.name, rating, comment: comment.trim() });
      setReviews((prev) => [created, ...prev]); // cập nhật ngay, KHÔNG load lại cả trang
      setRating(0);
      setComment("");
    } catch (e) {
      setFormError(getErrorMessage(e));
    } finally {
      setSending(false);
    }
  };

  if (loading) return <LoadingView />;
  if (error || !book) return <ErrorView message={error ?? "Không tìm thấy sách."} onRetry={load} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={[styles.cover, { backgroundColor: book.color }]}>
        <Text style={styles.emoji}>{book.emoji}</Text>
        <HeartButton bookId={book.id} size={40} />
      </View>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <View style={styles.ratingRow}>
        <RatingStars value={average} size={20} />
        <Text style={styles.ratingText}>
          {reviews.length ? `${average.toFixed(1)} (${reviews.length} đánh giá)` : "Chưa có đánh giá"}
        </Text>
      </View>
      <Text style={styles.price}>{formatPrice(book.price)}</Text>
      <Text style={styles.stock}>Còn {book.stock} cuốn</Text>
      <Text style={styles.desc}>{book.description}</Text>
      <PrimaryButton
        title="Thêm vào giỏ"
        onPress={() => add({ bookId: book.id, title: book.title, price: book.price, emoji: book.emoji, color: book.color, stock: book.stock })}
      />

      <Text style={styles.h}>Đánh giá của độc giả</Text>
      {isLoggedIn ? (
        <View style={styles.form}>
          <Text style={styles.formTitle}>Viết đánh giá của bạn</Text>
          <RatingStars value={rating} size={30} onChange={setRating} />
          <FormField label="Bình luận" value={comment} onChangeText={setComment} multiline placeholder="Cảm nhận của bạn về cuốn sách…" autoCapitalize="sentences" style={{ minHeight: 70, textAlignVertical: "top" }} />
          {formError ? <Text style={styles.formError}>{formError}</Text> : null}
          <PrimaryButton title="Gửi đánh giá" onPress={submitReview} loading={sending} />
        </View>
      ) : (
        <View style={styles.loginHint}>
          <Text style={styles.loginHintText}>Đăng nhập để viết đánh giá.</Text>
          <PrimaryButton title="Đăng nhập" variant="outline" onPress={() => navigation.navigate("Login")} />
        </View>
      )}
      {reviews.length === 0 ? (
        <Text style={styles.muted}>Hãy là người đầu tiên đánh giá cuốn sách này.</Text>
      ) : (
        reviews.map((r) => (
          <View key={r.id} style={styles.review}>
            <View style={styles.reviewHead}>
              <Text style={styles.reviewer}>{r.userName}</Text>
              <RatingStars value={r.rating} size={14} />
            </View>
            <Text style={styles.reviewBody}>{r.comment}</Text>
          </View>
        ))
      )}

      {related.length > 0 && (
        <>
          <Text style={styles.h}>Sách liên quan</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={related}
            keyExtractor={(b) => String(b.id)}
            renderItem={({ item }) => (
              <View style={{ width: 150 }}>
                <BookCard book={item} onPress={(b) => navigation.push("BookDetail", { bookId: b.id })} />
              </View>
            )}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: 16, gap: 8, paddingBottom: 40 },
  cover: { height: 220, borderRadius: radius.lg, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 90 },
  title: { fontSize: 22, fontWeight: "800", color: colors.text, marginTop: 8 },
  author: { color: colors.muted, fontSize: 15 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  ratingText: { color: colors.muted },
  price: { fontSize: 20, fontWeight: "800", color: colors.indigo },
  stock: { color: colors.muted },
  desc: { color: colors.text, lineHeight: 22, marginVertical: 4 },
  h: { fontSize: 18, fontWeight: "800", color: colors.navy, marginTop: 18 },
  form: { backgroundColor: "#fff", padding: 12, borderRadius: radius.md, gap: 10 },
  formTitle: { fontWeight: "800", color: colors.text },
  formError: { color: colors.danger },
  loginHint: { backgroundColor: "#fff", padding: 12, borderRadius: radius.md, gap: 8 },
  loginHintText: { color: colors.muted },
  muted: { color: colors.muted },
  review: { backgroundColor: "#fff", padding: 12, borderRadius: radius.md, gap: 4 },
  reviewHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  reviewer: { fontWeight: "800", color: colors.text },
  reviewBody: { color: colors.text },
});
