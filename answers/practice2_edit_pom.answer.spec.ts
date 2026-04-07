import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BookPage } from './pages/BookPage.answer';
import { BookModal } from './pages/BookModal.answer';

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
test('Q1: 著者フィルターで「山田」を選択すると書籍が絞り込まれる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  await bookPage.filterByAuthor('山田');
  const count = await bookPage.getBookCount();
  // Assert
  expect(count).toBe(2);
});

// Q2: 書籍ID=1の著者名が「山田」である
test('Q2: 書籍ID=1の著者名が「山田」である', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  const author = await bookPage.getBookAuthor(1);
  // Assert
  expect(author).toContain('山田');
});

// Q3: 書籍ID=1のメモが「初心者におすすめ」である
test('Q3: 書籍ID=1のメモが「初心者におすすめ」である', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  const note = await bookPage.getBookNote(1);
  // Assert
  expect(note).toContain('初心者におすすめ');
});

// Q4: 書籍ID=2の評価が「5」である
test('Q4: 書籍ID=2の評価が「5」である', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  const rating = await bookPage.getBookRating(2);
  // Assert
  expect(rating).toContain('5');
});

// Q5: 書籍ID=1のページ数が「320」である
test('Q5: 書籍ID=1のページ数が「320」である', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  const pages = await bookPage.getBookPages(1);
  // Assert
  expect(pages).toContain('320');
});

// Q6: 著者「高橋」で絞り込むと2件になる
test('Q6: 著者「高橋」で絞り込むと2件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  await bookPage.filterByAuthor('高橋');
  const count = await bookPage.getBookCount();
  // Assert
  expect(count).toBe(2);
});

// Q7: 著者・メモを入力して書籍を追加できる
test('Q7: 著者・メモを入力して書籍を追加できる', async ({ page }) => {
  // Arrange
  await bookPage.addBookButton.click();
  // Act
  await bookModal.fillTitle('テスト書籍');
  await bookModal.selectGenre('tech');
  await bookModal.selectAuthor('山田');
  await bookModal.fillNote('テスト用のメモ');
  await bookModal.save();
  // Assert
  const count = await bookPage.getBookCount();
  expect(count).toBe(7);
});

// Q8: 評価・ページ数を設定して書籍を追加できる
test('Q8: 評価・ページ数を設定して書籍を追加できる', async ({ page }) => {
  // Arrange
  await bookPage.addBookButton.click();
  // Act
  await bookModal.fillTitle('評価テスト書籍');
  await bookModal.selectRating(4);
  await bookModal.fillPages('350');
  await bookModal.save();
  // Assert
  const count = await bookPage.getBookCount();
  expect(count).toBe(7);
});

// Q9: ウィッシュリスト保存するとステータスが「未読」になる
test('Q9: ウィッシュリスト保存するとステータスが「未読」になる', async ({ page }) => {
  // Arrange
  await bookPage.addBookButton.click();
  // Act
  await bookModal.fillTitle('ウィッシュリスト書籍');
  await bookModal.saveWishlist();
  // Assert
  const count = await bookPage.getBookCount();
  expect(count).toBe(7);
  const status = await bookPage.getBookStatus(7);
  expect(status).toContain('未読');
});

// Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる
test('Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  await bookPage.filterByGenre('tech');
  await bookPage.filterByAuthor('山田');
  const count = await bookPage.getBookCount();
  // Assert
  expect(count).toBe(1);
});

// Q11: 著者「unknown」で絞り込むと著者未設定の書籍が表示される
test('Q11: 著者「unknown」で絞り込むと著者未設定の書籍が表示される', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  await bookPage.filterByAuthor('unknown');
  const count = await bookPage.getBookCount();
  // Assert
  expect(count).toBe(1);
});

// Q12: メモ付きで書籍を追加し、一覧でメモが表示される
test('Q12: メモ付きで書籍を追加し、一覧でメモが表示される', async ({ page }) => {
  // Arrange
  await bookPage.addBookButton.click();
  // Act
  await bookModal.fillTitle('メモ付き書籍');
  await bookModal.fillNote('これはテストメモです');
  await bookModal.save();
  // Assert
  const count = await bookPage.getBookCount();
  expect(count).toBe(7);
  const note = await bookPage.getBookNote(7);
  expect(note).toContain('これはテストメモです');
});

// Q13: 著者・評価・ページ数を全て設定して追加できる
test('Q13: 著者・評価・ページ数を全て設定して追加できる', async ({ page }) => {
  // Arrange
  await bookPage.addBookButton.click();
  // Act
  await bookModal.fillTitle('フル設定書籍');
  await bookModal.selectGenre('fiction');
  await bookModal.selectAuthor('高橋');
  await bookModal.selectRating(5);
  await bookModal.fillPages('400');
  await bookModal.save();
  // Assert
  const count = await bookPage.getBookCount();
  expect(count).toBe(7);
});

// Q14: 書籍名を空のまま保存するとエラーが表示される
test('Q14: 書籍名を空のまま保存するとエラーが表示される', async ({ page }) => {
  // Arrange
  await bookPage.addBookButton.click();
  // Act
  await bookModal.save();
  // Assert
  const isVisible = await bookModal.isTitleErrorVisible();
  expect(isVisible).toBe(true);
});

// Q15: ウィッシュリスト保存後、ステータスが「未読」で評価も保持される
test('Q15: ウィッシュリスト保存後、ステータスが「未読」で評価も保持される', async ({ page }) => {
  // Arrange
  await bookPage.addBookButton.click();
  // Act
  await bookModal.fillTitle('評価付きウィッシュ');
  await bookModal.selectRating(4);
  await bookModal.saveWishlist();
  // Assert
  const count = await bookPage.getBookCount();
  expect(count).toBe(7);
  const status = await bookPage.getBookStatus(7);
  expect(status).toContain('未読');
  const rating = await bookPage.getBookRating(7);
  expect(rating).toContain('4');
});
