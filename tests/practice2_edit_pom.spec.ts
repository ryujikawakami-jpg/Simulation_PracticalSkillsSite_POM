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
test.fixme('Q1: 著者フィルターで「山田」を選択すると書籍が絞り込まれる', async ({ page }) => {
  // TODO: BookPage.filterByAuthor() を実装してから使用
  // Act: filterByAuthor('山田') → getBookCount()
  // Assert: 2件であることを検証
});

// Q2: 書籍の著者名を取得できる
test.fixme('Q2: 書籍ID=1の著者名が「山田」である', async ({ page }) => {
  // TODO: BookPage.getBookAuthor() を実装してから使用
  // Act: getBookAuthor(1)
  // Assert: '山田' であることを検証
});

// Q3: 書籍のメモを取得できる
test.fixme('Q3: 書籍ID=1のメモが「初心者におすすめ」である', async ({ page }) => {
  // TODO: BookPage.getBookNote() を実装してから使用
  // Act: getBookNote(1)
  // Assert: '初心者におすすめ' であることを検証
});

// Q4: 書籍の評価を取得できる
test.fixme('Q4: 書籍ID=2の評価が「5」である', async ({ page }) => {
  // TODO: BookPage.getBookRating() を実装してから使用
  // Act: getBookRating(2)
  // Assert: '5' を含むことを検証
});

// Q5: 書籍のページ数を取得できる
test.fixme('Q5: 書籍ID=1のページ数が「320」である', async ({ page }) => {
  // TODO: BookPage.getBookPages() を実装してから使用
  // Act: getBookPages(1)
  // Assert: '320' を含むことを検証
});

// Q6: 著者「高橋」で絞り込むと2件になる
test.fixme('Q6: 著者「高橋」で絞り込むと2件になる', async ({ page }) => {
  // TODO: BookPage.filterByAuthor() を実装してから使用
});

// Q7: 著者・メモを入力して書籍を追加できる
test.fixme('Q7: 著者・メモを入力して書籍を追加できる', async ({ page }) => {
  // TODO: BookModal.selectAuthor() と BookModal.fillNote() を実装してから使用
  // Arrange: addBookButton をクリック
  // Act: タイトル、ジャンル、著者、メモを入力して保存
  // Assert: 書籍数が7件になることを検証
});

// Q8: 評価・ページ数を設定して書籍を追加できる
test.fixme('Q8: 評価・ページ数を設定して書籍を追加できる', async ({ page }) => {
  // TODO: BookModal.selectRating() と BookModal.fillPages() を実装してから使用
  // Arrange: addBookButton をクリック
  // Act: タイトル、評価、ページ数を入力して保存
  // Assert: 書籍数が7件になることを検証
});

// Q9: ウィッシュリスト保存するとステータスが「未読」になる
test.fixme('Q9: ウィッシュリスト保存するとステータスが「未読」になる', async ({ page }) => {
  // TODO: BookModal.saveWishlist() を実装してから使用
  // Arrange: addBookButton をクリック
  // Act: タイトルを入力して saveWishlist() で保存
  // Assert: 追加された書籍のステータスが「未読」であることを検証
});

// Q10: ジャンル「tech」＋著者「山田」の組み合わせフィルター
test.fixme('Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる', async ({ page }) => {
  // TODO: BookPage.filterByAuthor() を実装してから使用
  // Act: filterByGenre('tech') → filterByAuthor('山田') → getBookCount()
  // Assert: 1件であることを検証
});

// Q11: 著者フィルターで「unknown」を選択すると未割当の書籍が表示される
test.fixme('Q11: 著者「unknown」で絞り込むと著者未設定の書籍が表示される', async ({ page }) => {
  // TODO: BookPage.filterByAuthor() を実装してから使用
  // Act: filterByAuthor('unknown') → getBookCount()
  // Assert: 1件であることを検証（ワンピース100巻のみ）
});

// Q12: メモ付きで書籍を追加し、一覧でメモが表示される
test.fixme('Q12: メモ付きで書籍を追加し、一覧でメモが表示される', async ({ page }) => {
  // TODO: BookModal.fillNote() と BookPage.getBookNote() を実装してから使用
  // Arrange: addBookButton をクリック
  // Act: タイトル・メモを入力して保存
  // Assert: 追加された書籍のメモが一覧に表示されることを検証
});

// Q13: 著者・評価・ページ数を全て設定して追加できる
test.fixme('Q13: 著者・評価・ページ数を全て設定して追加できる', async ({ page }) => {
  // TODO: BookModal の selectAuthor, selectRating, fillPages を全て実装してから使用
  // Arrange: addBookButton をクリック
  // Act: タイトル、著者、評価、ページ数を入力して保存
  // Assert: 書籍数が7件になることを検証
});

// Q14: 書籍名を空のまま保存するとエラーが表示される（提供済みメソッドで動作確認用）
test.fixme('Q14: 書籍名を空のまま保存するとエラーが表示される', async ({ page }) => {
  // このテストは提供済みのメソッドだけで実装可能です
  // Arrange: addBookButton をクリック
  // Act: タイトルを空のまま save()
  // Assert: isTitleErrorVisible() が true
});

// Q15: ウィッシュリスト保存後、ステータスが「未読」で評価も保持される
test.fixme('Q15: ウィッシュリスト保存後、ステータスが「未読」で評価も保持される', async ({ page }) => {
  // TODO: BookModal.saveWishlist() と BookModal.selectRating() を実装してから使用
  // Arrange: addBookButton をクリック
  // Act: タイトル・評価を入力して saveWishlist() で保存
  // Assert: ステータスが「未読」、評価が設定した値であることを検証
});
