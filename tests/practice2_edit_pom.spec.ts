import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BookPage } from '../pages/BookPage';
import { BookModal } from '../pages/BookModal';

// 初期データ（6件）の次に新規追加される書籍のID
const NEW_BOOK_ID = 7;

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
  // Arrange: beforeEachで書籍一覧ページへ遷移済み
  // Act: 著者フィルターで「山田」を選択し、表示件数を取得する
  await bookPage.filterByAuthor('山田');
  const count = await bookPage.getBookCount();
  // Assert: 絞り込まれた書籍が2件であることを検証する
  expect(count).toBe(2);
});

// Q2: 書籍の著者名を取得できる
test('Q2: 書籍ID=1の著者名が「山田」である', async () => {
  // Arrange: beforeEachで書籍一覧ページへ遷移済み
  // Act & Assert: 書籍ID=1の著者名に「山田」が含まれることを検証する
  await expect(bookPage.getBookAuthorLocator(1)).toContainText('山田');
});

// Q3: 書籍のメモを取得できる
test('Q3: 書籍ID=1のメモが「初心者におすすめ」である', async () => {
  // Arrange: beforeEachで書籍一覧ページへ遷移済み
  // Act & Assert: 書籍ID=1のメモに「初心者におすすめ」が含まれることを検証する
  await expect(bookPage.getBookNoteLocator(1)).toContainText('初心者におすすめ');
});

// Q4: 書籍の評価を取得できる
test('Q4: 書籍ID=2の評価が「5」である', async () => {
  // Arrange: beforeEachで書籍一覧ページへ遷移済み
  // Act & Assert: 書籍ID=2の評価が星5つ「★★★★★」で表示されることを検証する
  await expect(bookPage.getBookRatingLocator(2)).toHaveText('★★★★★');
});

// Q5: 書籍のページ数を取得できる
test('Q5: 書籍ID=1のページ数が「320」である', async () => {
  // Arrange: beforeEachで書籍一覧ページへ遷移済み
  // Act & Assert: 書籍ID=1のページ数に「320」が含まれることを検証する
  await expect(bookPage.getBookPagesLocator(1)).toContainText('320');
});

// Q6: 著者「高橋」で絞り込むと2件になる
test('Q6: 著者「高橋」で絞り込むと2件になる', async () => {
  // Arrange: beforeEachで書籍一覧ページへ遷移済み
  // Act: 著者フィルターで「高橋」を選択し、表示件数を取得する
  await bookPage.filterByAuthor('高橋');
  const count = await bookPage.getBookCount();
  // Assert: 絞り込まれた書籍が2件であることを検証する
  expect(count).toBe(2);
});

// Q7: 著者・メモを入力して書籍を追加できる
test('Q7: 著者・メモを入力して書籍を追加できる', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.openAddModal();
  // Act: タイトル・ジャンル・著者・メモを入力して保存する
  await bookModal.fillTitle('テスト駆動開発入門');
  await bookModal.selectGenre('tech');
  await bookModal.selectAuthor('山田');
  await bookModal.fillNote('実務で役立つ一冊');
  await bookModal.save();
  // Assert: 書籍数が7件になり、追加した書籍の著者とメモが正しく表示されることを検証する
  expect(await bookPage.getBookCount()).toBe(7);
  await expect(bookPage.getBookAuthorLocator(NEW_BOOK_ID)).toContainText('山田');
  await expect(bookPage.getBookNoteLocator(NEW_BOOK_ID)).toContainText('実務で役立つ一冊');
});

// Q8: 評価・ページ数を設定して書籍を追加できる
test('Q8: 評価・ページ数を設定して書籍を追加できる', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.openAddModal();
  // Act: タイトル・評価・ページ数を入力して保存する
  await bookModal.fillTitle('Playwright実践ガイド');
  await bookModal.selectRating(4);
  await bookModal.fillPages('280');
  await bookModal.save();
  // Assert: 書籍数が7件になり、追加した書籍の評価とページ数が正しく表示されることを検証する
  expect(await bookPage.getBookCount()).toBe(7);
  await expect(bookPage.getBookRatingLocator(NEW_BOOK_ID)).toHaveText('★★★★☆');
  await expect(bookPage.getBookPagesLocator(NEW_BOOK_ID)).toContainText('280');
});

// Q9: ウィッシュリスト保存するとステータスが「未読」になる
test('Q9: ウィッシュリスト保存するとステータスが「未読」になる', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.openAddModal();
  // Act: タイトルを入力してウィッシュリストとして保存する
  await bookModal.fillTitle('ウィッシュリストの本');
  await bookModal.saveWishlist();
  // Assert: 追加した書籍のステータスが「未読」になっていることを検証する
  await expect(bookPage.getBookStatusLocator(NEW_BOOK_ID)).toHaveText('未読');
});

// Q10: ジャンル「tech」＋著者「山田」の組み合わせフィルター
test('Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる', async () => {
  // Arrange: beforeEachで書籍一覧ページへ遷移済み
  // Act: ジャンル「tech」と著者「山田」で絞り込み、表示件数を取得する
  await bookPage.filterByGenre('tech');
  await bookPage.filterByAuthor('山田');
  const count = await bookPage.getBookCount();
  // Assert: 絞り込まれた書籍が1件であることを検証する
  expect(count).toBe(1);
});

// Q11: 著者フィルターで「unknown」を選択すると未割当の書籍が表示される
test('Q11: 著者「unknown」で絞り込むと著者未設定の書籍が表示される', async () => {
  // Arrange: beforeEachで書籍一覧ページへ遷移済み
  // Act: 著者フィルターで「unknown」を選択し、表示件数を取得する
  await bookPage.filterByAuthor('unknown');
  const count = await bookPage.getBookCount();
  // Assert: 著者未設定の書籍が1件表示されることを検証する
  expect(count).toBe(1);
});

// Q12: メモ付きで書籍を追加し、一覧でメモが表示される
test('Q12: メモ付きで書籍を追加し、一覧でメモが表示される', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.openAddModal();
  // Act: タイトルとメモを入力して保存する
  await bookModal.fillTitle('メモ付き書籍');
  await bookModal.fillNote('重要なメモ内容');
  await bookModal.save();
  // Assert: 追加した書籍のメモが一覧に正しく表示されることを検証する
  await expect(bookPage.getBookNoteLocator(NEW_BOOK_ID)).toContainText('重要なメモ内容');
});

// Q13: 著者・評価・ページ数を全て設定して追加できる
test('Q13: 著者・評価・ページ数を全て設定して追加できる', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.openAddModal();
  // Act: タイトル・著者・評価・ページ数をすべて入力して保存する
  await bookModal.fillTitle('完全設定の書籍');
  await bookModal.selectAuthor('高橋');
  await bookModal.selectRating(5);
  await bookModal.fillPages('450');
  await bookModal.save();
  // Assert: 書籍数が7件になり、追加した書籍の著者・評価・ページ数がすべて正しく表示されることを検証する
  expect(await bookPage.getBookCount()).toBe(7);
  await expect(bookPage.getBookAuthorLocator(NEW_BOOK_ID)).toContainText('高橋');
  await expect(bookPage.getBookRatingLocator(NEW_BOOK_ID)).toHaveText('★★★★★');
  await expect(bookPage.getBookPagesLocator(NEW_BOOK_ID)).toContainText('450');
});

// Q14: 書籍名を空のまま保存するとエラーが表示される
test('Q14: 書籍名を空のまま保存するとエラーが表示される', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.openAddModal();
  // Act: タイトルを空のまま保存ボタンをクリックする
  await bookModal.fillTitle('');
  await bookModal.save();
  // Assert: タイトル未入力エラーが表示されることを検証する
  await expect(bookModal.titleError).toBeVisible();
});

// Q15: ウィッシュリスト保存後、ステータスが「未読」で評価も保持される
test('Q15: ウィッシュリスト保存後、ステータスが「未読」で評価も保持される', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.openAddModal();
  // Act: タイトルと評価を入力してウィッシュリストとして保存する
  await bookModal.fillTitle('評価付きウィッシュリスト');
  await bookModal.selectRating(3);
  await bookModal.saveWishlist();
  // Assert: 追加した書籍のステータスが「未読」で、選択した評価も保持されていることを検証する
  await expect(bookPage.getBookStatusLocator(NEW_BOOK_ID)).toHaveText('未読');
  await expect(bookPage.getBookRatingLocator(NEW_BOOK_ID)).toHaveText('★★★☆☆');
});
