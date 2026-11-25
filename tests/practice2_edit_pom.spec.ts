import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BookPage } from '../pages/BookPage';
import { BookModal } from '../pages/BookModal';

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
  // Arrange: beforeEachでログインと書籍一覧への移動を行う

  // Act: 著者を山田で絞り込む
  await bookPage.filterByAuthor('山田');

  // Assert: 条件に合う書籍が2件表示されることを検証する
  await expect(bookPage.bookCards).toHaveCount(2);
});

// Q2: 書籍の著者名を取得できる
test('Q2: 書籍ID=1の著者名が「山田」である', async () => {
  // Arrange: beforeEachでログインと書籍一覧への移動を行う

  // Act: 書籍ID 1の著者名ロケーターを取得する
  const authorLocator = bookPage.bookAuthor(1);

  // Assert: 著者名に山田が含まれることを検証する
  await expect(authorLocator).toContainText('山田');
});

// Q3: 書籍のメモを取得できる
test('Q3: 書籍ID=1のメモが「初心者におすすめ」である', async () => {
  // Arrange: beforeEachでログインと書籍一覧への移動を行う

  // Act: 書籍ID 1のメモロケーターを取得する
  const noteLocator = bookPage.bookNote(1);

  // Assert: メモに初心者におすすめが含まれることを検証する
  await expect(noteLocator).toContainText('初心者におすすめ');
});

// Q4: 書籍の評価を取得できる
test('Q4: 書籍ID=2の評価が「5」である', async () => {
  // Arrange: beforeEachでログインと書籍一覧への移動を行う

  // Act: 書籍ID 2の評価ロケーターを取得する
  const ratingLocator = bookPage.bookRating(2);

  // Assert: 評価が星5つで表示されることを検証する
  await expect(ratingLocator).toHaveText('★★★★★');
});

// Q5: 書籍のページ数を取得できる
test('Q5: 書籍ID=1のページ数が「320」である', async () => {
  // Arrange: beforeEachでログインと書籍一覧への移動を行う

  // Act: 書籍ID 1のページ数ロケーターを取得する
  const pagesLocator = bookPage.bookPages(1);

  // Assert: ページ数に320が含まれることを検証する
  await expect(pagesLocator).toContainText('320');
});

// Q6: 著者「高橋」で絞り込むと2件になる
test('Q6: 著者「高橋」で絞り込むと2件になる', async () => {
  // Arrange: beforeEachでログインと書籍一覧への移動を行う

  // Act: 著者を高橋で絞り込む
  await bookPage.filterByAuthor('高橋');

  // Assert: 条件に合う書籍が2件表示されることを検証する
  await expect(bookPage.bookCards).toHaveCount(2);
});

// Q7: 著者・メモを入力して書籍を追加できる
test('Q7: 著者・メモを入力して書籍を追加できる', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.addBookButton.click();

  // Act: 書籍名、ジャンル、著者、メモを入力して保存する
  await bookModal.fillTitle('テスト書籍');
  await bookModal.selectGenre('tech');
  await bookModal.selectAuthor('山田');
  await bookModal.fillNote('テスト用のメモ');
  await bookModal.save();

  // Assert: 追加した書籍数、著者、メモを検証する
  await expect(bookPage.bookCards).toHaveCount(7);
  await expect(bookPage.bookAuthor(7)).toContainText('山田');
  await expect(bookPage.bookNote(7)).toContainText('テスト用のメモ');
});

// Q8: 評価・ページ数を設定して書籍を追加できる
test('Q8: 評価・ページ数を設定して書籍を追加できる', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.addBookButton.click();

  // Act: 書籍名、評価、ページ数を入力して保存する
  await bookModal.fillTitle('評価テスト書籍');
  await bookModal.selectRating(4);
  await bookModal.fillPages('350');
  await bookModal.save();

  // Assert: 追加した書籍数、評価、ページ数を検証する
  await expect(bookPage.bookCards).toHaveCount(7);
  await expect(bookPage.bookRating(7)).toHaveText('★★★★☆');
  await expect(bookPage.bookPages(7)).toContainText('350');
});

// Q9: ウィッシュリスト保存するとステータスが「未読」になる
test('Q9: ウィッシュリスト保存するとステータスが「未読」になる', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.addBookButton.click();

  // Act: 書籍名を入力してウィッシュリストとして保存する
  await bookModal.fillTitle('ウィッシュリスト書籍');
  await bookModal.saveWishlist();

  // Assert: 追加した書籍数と未読ステータスを検証する
  await expect(bookPage.bookCards).toHaveCount(7);
  await expect(bookPage.bookStatus(7)).toContainText('未読');
});

// Q10: ジャンル「tech」＋著者「山田」の組み合わせフィルター
test('Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる', async () => {
  // Arrange: beforeEachでログインと書籍一覧への移動を行う

  // Act: ジャンルと著者で絞り込む
  await bookPage.filterByGenre('tech');
  await bookPage.filterByAuthor('山田');

  // Assert: 条件に合う書籍が1件表示されることを検証する
  await expect(bookPage.bookCards).toHaveCount(1);
});

// Q11: 著者フィルターで「unknown」を選択すると未割当の書籍が表示される
test('Q11: 著者「unknown」で絞り込むと著者未設定の書籍が表示される', async () => {
  // Arrange: beforeEachでログインと書籍一覧への移動を行う

  // Act: 著者未設定で絞り込む
  await bookPage.filterByAuthor('unknown');

  // Assert: 著者未設定の書籍が1件表示されることを検証する
  await expect(bookPage.bookCards).toHaveCount(1);
});

// Q12: メモ付きで書籍を追加し、一覧でメモが表示される
test('Q12: メモ付きで書籍を追加し、一覧でメモが表示される', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.addBookButton.click();

  // Act: 書籍名とメモを入力して保存する
  await bookModal.fillTitle('メモ付き書籍');
  await bookModal.fillNote('これはテストメモです');
  await bookModal.save();

  // Assert: 追加した書籍数とメモを検証する
  await expect(bookPage.bookCards).toHaveCount(7);
  await expect(bookPage.bookNote(7)).toContainText('これはテストメモです');
});

// Q13: 著者・評価・ページ数を全て設定して追加できる
test('Q13: 著者・評価・ページ数を全て設定して追加できる', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.addBookButton.click();

  // Act: 書籍名、ジャンル、著者、評価、ページ数を入力して保存する
  await bookModal.fillTitle('フル設定書籍');
  await bookModal.selectGenre('fiction');
  await bookModal.selectAuthor('高橋');
  await bookModal.selectRating(5);
  await bookModal.fillPages('400');
  await bookModal.save();

  // Assert: 追加した書籍数、著者、評価、ページ数を検証する
  await expect(bookPage.bookCards).toHaveCount(7);
  await expect(bookPage.bookAuthor(7)).toContainText('高橋');
  await expect(bookPage.bookRating(7)).toHaveText('★★★★★');
  await expect(bookPage.bookPages(7)).toContainText('400');
});

// Q14: 書籍名を空のまま保存するとエラーが表示される（提供済みメソッドで動作確認用）
test('Q14: 書籍名を空のまま保存するとエラーが表示される', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.addBookButton.click();

  // Act: 書籍名を空のまま保存する
  await bookModal.save();

  // Assert: 書籍名の入力エラーが表示されることを検証する
  await expect(bookModal.titleError).toBeVisible();
});

// Q15: ウィッシュリスト保存後、ステータスが「未読」で評価も保持される
test('Q15: ウィッシュリスト保存後、ステータスが「未読」で評価も保持される', async () => {
  // Arrange: 書籍追加モーダルを開く
  await bookPage.addBookButton.click();

  // Act: 書籍名と評価を入力してウィッシュリストとして保存する
  await bookModal.fillTitle('評価付きウィッシュ');
  await bookModal.selectRating(4);
  await bookModal.saveWishlist();

  // Assert: 追加した書籍数、未読ステータス、評価を検証する
  await expect(bookPage.bookCards).toHaveCount(7);
  await expect(bookPage.bookStatus(7)).toContainText('未読');
  await expect(bookPage.bookRating(7)).toHaveText('★★★★☆');
});
