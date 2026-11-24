import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BookPage } from '../pages/BookPage';
import { BookModal } from '../pages/BookModal';

// ============================================================
// Practice 2: POM 編集 — BookPage / BookModal の TODO を埋める
// ============================================================
// BookPage.ts と BookModal.ts の TODO コメントを実装してから、
// 各テストを test.fixme() → test() に変更してテストを完成させてください。

let loginPage: LoginPage;
let bookPage: BookPage;
let bookModal: BookModal;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  bookPage  = new BookPage(page);
  bookModal = new BookModal(page);
  await loginPage.goto();
  await loginPage.loginAsAdmin();
  await bookPage.navigate();
});

// Q1: 著者フィルターで「山田」を選択すると書籍が絞り込まれる
test('Q1: 著者フィルターで「山田」を選択すると書籍が絞り込まれる', async () => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 著者で絞り込み、表示件数を取得
  await bookPage.filterByAuthor('山田');
  const count = await bookPage.getBookCount();

  // Assert: 2件であることを検証
  expect(count).toBe(2);
});

// Q2: 書籍の著者名を取得できる
test('Q2: 書籍ID=1の著者名が「山田」である', async () => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 書籍ID=1の著者名を取得
  const author = await bookPage.getBookAuthor(1);

  // Assert: 著者名に「山田」が含まれることを検証
  expect(author).toContain('山田');
});

// Q3: 書籍のメモを取得できる
test('Q3: 書籍ID=1のメモが「初心者におすすめ」である', async () => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 書籍ID=1のメモを取得
  const note = await bookPage.getBookNote(1);

  // Assert: メモが期待どおりであることを検証
  expect(note).toContain('初心者におすすめ');
});

// Q4: 書籍の評価を取得できる
test('Q4: 書籍ID=2の評価が「5」である', async () => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 書籍ID=2の評価を取得
  const rating = await bookPage.getBookRating(2);

  // Assert: 評価が星5つで表示されることを検証
  expect(rating).toBe('★★★★★');
});

// Q5: 書籍のページ数を取得できる
test('Q5: 書籍ID=1のページ数が「320」である', async () => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 書籍ID=1のページ数を取得
  const pages = await bookPage.getBookPages(1);

  // Assert: ページ数に「320」が含まれることを検証
  expect(pages).toContain('320');
});

// Q6: 著者「高橋」で絞り込むと2件になる
test('Q6: 著者「高橋」で絞り込むと2件になる', async () => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 著者で絞り込み、表示件数を取得
  await bookPage.filterByAuthor('高橋');
  const count = await bookPage.getBookCount();

  // Assert: 2件であることを検証
  expect(count).toBe(2);
});

// Q7: 著者・メモを入力して書籍を追加できる
test('Q7: 著者・メモを入力して書籍を追加できる', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.addBookButton.click();

  // Act: 書籍情報を入力して保存
  await bookModal.fillTitle('テスト書籍');
  await bookModal.selectGenre('tech');
  await bookModal.selectAuthor('山田');
  await bookModal.fillNote('テスト用のメモ');
  await bookModal.save();

  // Assert: 追加件数と著者・メモが反映されたことを検証
  const count = await bookPage.getBookCount();
  const author = await bookPage.getBookAuthor(7);
  const note = await bookPage.getBookNote(7);
  expect(count).toBe(7);
  expect(author).toContain('山田');
  expect(note).toContain('テスト用のメモ');
});

// Q8: 評価・ページ数を設定して書籍を追加できる
test('Q8: 評価・ページ数を設定して書籍を追加できる', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.addBookButton.click();

  // Act: 書籍情報を入力して保存
  await bookModal.fillTitle('評価テスト書籍');
  await bookModal.selectRating(4);
  await bookModal.fillPages('350');
  await bookModal.save();

  // Assert: 追加件数と評価・ページ数が反映されたことを検証
  const count = await bookPage.getBookCount();
  const rating = await bookPage.getBookRating(7);
  const pages = await bookPage.getBookPages(7);
  expect(count).toBe(7);
  expect(rating).toBe('★★★★☆');
  expect(pages).toContain('350');
});

// Q9: ウィッシュリスト保存するとステータスが「未読」になる
test('Q9: ウィッシュリスト保存するとステータスが「未読」になる', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.addBookButton.click();

  // Act: タイトルを入力してウィッシュリストとして保存
  await bookModal.fillTitle('ウィッシュリスト書籍');
  await bookModal.saveWishlist();

  // Assert: 追加件数とステータスが反映されたことを検証
  const count = await bookPage.getBookCount();
  const status = await bookPage.getBookStatus(7);
  expect(count).toBe(7);
  expect(status).toContain('未読');
});

// Q10: ジャンル「tech」＋著者「山田」の組み合わせフィルター
test('Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる', async () => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: ジャンルと著者で絞り込み、表示件数を取得
  await bookPage.filterByGenre('tech');
  await bookPage.filterByAuthor('山田');
  const count = await bookPage.getBookCount();

  // Assert: 1件であることを検証
  expect(count).toBe(1);
});

// Q11: 著者フィルターで「unknown」を選択すると未割当の書籍が表示される
test('Q11: 著者「unknown」で絞り込むと著者未設定の書籍が表示される', async () => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 著者未設定で絞り込み、表示件数を取得
  await bookPage.filterByAuthor('unknown');
  const count = await bookPage.getBookCount();
  const author = await bookPage.getBookAuthor(5);

  // Assert: 1件であること、「著者不明」であることを検証
  expect(count).toBe(1);
  expect(author).toContain('著者不明');
});

// Q12: メモ付きで書籍を追加し、一覧でメモが表示される
test('Q12: メモ付きで書籍を追加し、一覧でメモが表示される', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.addBookButton.click();

  // Act: タイトルとメモを入力して保存
  await bookModal.fillTitle('メモ付き書籍');
  await bookModal.fillNote('これはテストメモです');
  await bookModal.save();

  // Assert: 追加件数とメモが反映されたことを検証
  const count = await bookPage.getBookCount();
  const note = await bookPage.getBookNote(7);
  expect(count).toBe(7);
  expect(note).toContain('これはテストメモです');
});

// Q13: 著者・評価・ページ数を全て設定して追加できる
test('Q13: 著者・評価・ページ数を全て設定して追加できる', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.addBookButton.click();

  // Act: 書籍情報を入力して保存
  await bookModal.fillTitle('フル設定書籍');
  await bookModal.selectGenre('fiction');
  await bookModal.selectAuthor('高橋');
  await bookModal.selectRating(5);
  await bookModal.fillPages('400');
  await bookModal.save();

  // Assert: 追加件数と著者・評価・ページ数が反映されたことを検証
  const count = await bookPage.getBookCount();
  const author = await bookPage.getBookAuthor(7);
  const rating = await bookPage.getBookRating(7);
  const pages = await bookPage.getBookPages(7);
  expect(count).toBe(7);
  expect(author).toContain('高橋');
  expect(rating).toBe('★★★★★');
  expect(pages).toContain('400');
});

// Q14: 書籍名を空のまま保存するとエラーが表示される（提供済みメソッドで動作確認用）
test('Q14: 書籍名を空のまま保存するとエラーが表示される', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.addBookButton.click();

  // Act: タイトルを空のまま保存
  await bookModal.save();
  const isTitleErrorVisible = await bookModal.isTitleErrorVisible();

  // Assert: タイトルエラーが表示されることを検証
  expect(isTitleErrorVisible).toBe(true);
});

// Q15: ウィッシュリスト保存後、ステータスが「未読」で評価も保持される
test('Q15: ウィッシュリスト保存後、ステータスが「未読」で評価も保持される', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.addBookButton.click();

  // Act: タイトルと評価を入力してウィッシュリストとして保存
  await bookModal.fillTitle('評価付きウィッシュ');
  await bookModal.selectRating(4);
  await bookModal.saveWishlist();

  // Assert: 追加件数、ステータス、評価が反映されたことを検証
  const count = await bookPage.getBookCount();
  const status = await bookPage.getBookStatus(7);
  const rating = await bookPage.getBookRating(7);
  expect(count).toBe(7);
  expect(status).toContain('未読');
  expect(rating).toBe('★★★★☆');
});
