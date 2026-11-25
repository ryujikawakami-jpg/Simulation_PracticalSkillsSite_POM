import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BookPage } from '../pages/BookPage';
import { BookModal } from '../pages/BookModal';

// ============================================================
// Practice 2: POM 編集 — BookPage / BookModal の TODO を埋める
// ============================================================

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
  // Arrange: beforeEachでセットアップ済み
  // Act
  await bookPage.filterByAuthor('山田');
  const count = await bookPage.getBookCount();

  // Assert: 2件であることを検証
  expect(count).toBe(2);
});

// Q2: 書籍の著者名を取得できる
test('Q2: 書籍ID=1の著者名が「山田」である', async ({ page }) => {
  // Arrange: beforeEachでセットアップ済み
  // Act
  const name = await bookPage.getBookAuthor(1);

  // Assert
  expect(name).toContain('山田');
});

// Q3: 書籍のメモを取得できる
test('Q3: 書籍ID=1のメモが「初心者におすすめ」である', async ({ page }) => {
  // Arrange: beforeEachでセットアップ済み
  // Act
  const note = await bookPage.getBookNote(1);

  // Assert
  expect(note).toContain('初心者におすすめ');
});

// Q4: 書籍の評価を取得できる
test('Q4: 書籍ID=2の評価が「5」である', async ({ page }) => {
  // Arrange: beforeEachでセットアップ済み
  // Act
  const rate = await bookPage.getBookRating(2);

  // Assert:評価は数字ではなく星マークで表示される。'★★★★★' であることを検証
  expect(rate).toBe('★★★★★');
});

// Q5: 書籍のページ数を取得できる
test('Q5: 書籍ID=1のページ数が「320」である', async ({ page }) => {
  // Arrange: beforeEachでセットアップ済み
  // Act
  const pages = await bookPage.getBookPages(1);

  // Assert
  expect(pages).toContain('320');
});

// Q6: 著者「高橋」で絞り込むと2件になる
test('Q6: 著者「高橋」で絞り込むと2件になる', async ({ page }) => {
  // Arrange: beforeEachでセットアップ済み
  //Act
  await bookPage.filterByAuthor('高橋');
  const count = await bookPage.getBookCount();

  //Assert
  expect(count).toBe(2);
});

// Q7: 著者・メモを入力して書籍を追加できる
test('Q7: 著者・メモを入力して書籍を追加できる', async ({ page }) => {
  // Arrange: addBookButton をクリック
  await bookPage.addBookButton.click();

  // Act: タイトル、ジャンル、著者、メモを入力して保存
  await bookModal.fillTitle('HTML基礎');
  await bookModal.selectGenre('fiction');
  await bookModal.selectAuthor('山田');
  await bookModal.fillNote('第一回');
  await bookModal.save();

  // Assert: 書籍数が7件になり、追加された書籍の著者とメモが一覧に表示されることを検証
  const count = await bookPage.getBookCount();
  const author = await bookPage.getBookAuthor(7);
  const note = await bookPage.getBookNote(7);
  expect(count).toBe(7);
  expect(count).toBe(7);
  expect(author).toContain('山田');
  expect(note).toContain('第一回');
});

// Q8: 評価・ページ数を設定して書籍を追加できる
test('Q8: 評価・ページ数を設定して書籍を追加できる', async ({ page }) => {
  // Arrange: addBookButton をクリック
  await bookPage.addBookButton.click();

  // Act: タイトル、評価、ページ数を入力して保存
  await bookModal.fillTitle('CSS基礎');
  await bookModal.selectRating(3);
  await bookModal.fillPages('500');
  await bookModal.save();

  // Assert: 書籍数が7件になり、追加された書籍の評価とページ数が一覧に表示されることを検証
  const count = await bookPage.getBookCount();
  const rating = await bookPage.getBookRating(7);
  const pages = await bookPage.getBookPages(7);
  expect(count).toBe(7);
  expect(rating).toBe('★★★☆☆');
  expect(pages).toContain('500');
});

// Q9: ウィッシュリスト保存するとステータスが「未読」になる
test('Q9: ウィッシュリスト保存するとステータスが「未読」になる', async ({ page }) => {
  // Arrange: addBookButton をクリック
  await bookPage.addBookButton.click();

  // Act: タイトルを入力して saveWishlist() で保存
  await bookModal.fillTitle('JavaScript基礎');
  await bookModal.saveWishlist();

  // Assert: 追加された書籍のステータスが「未読」であることを検証
  const status = await bookPage.getBookStatus(7);
  expect(status).toBe('未読');
});

// Q10: ジャンル「tech」＋著者「山田」の組み合わせフィルター
test('Q10: ジャンル「tech」+著者「山田」で絞り込むと1件になる', async ({ page }) => {
  // Arrange: beforeEachでセットアップ済み
  // Act: filterByGenre('tech') → filterByAuthor('山田') → getBookCount()
  await bookPage.filterByGenre('tech');
  await bookPage.filterByAuthor('山田');
  const count = await bookPage.getBookCount();

  // Assert: 1件であることを検証
  expect(count).toBe(1);
});

// Q11: 著者フィルターで「unknown」を選択すると未割当の書籍が表示される
test('Q11: 著者「unknown」で絞り込むと著者未設定の書籍が表示される', async ({ page }) => {
  // Arrange: beforeEachでセットアップ済み
  // Act: filterByAuthor('unknown') → getBookCount()
  await bookPage.filterByAuthor('unknown');
  const count = await bookPage.getBookCount();

  // Assert: 1件であることを検証（ワンピース100巻のみ）
  expect(count).toBe(1);
});

// Q12: メモ付きで書籍を追加し、一覧でメモが表示される
test('Q12: メモ付きで書籍を追加し、一覧でメモが表示される', async ({ page }) => {
  // Arrange: addBookButton をクリック
  await bookPage.addBookButton.click();

  // Act: タイトル・メモを入力して保存
  await bookModal.fillTitle('Git基礎');
  await bookModal.fillNote('第二回');
  await bookModal.save();

  // Assert: 追加された書籍のメモが一覧に表示されることを検証
  const memo = await bookPage.getBookNote(7);
  expect(memo).toContain('第二回');
});

// Q13: 著者・評価・ページ数を全て設定して追加できる
test('Q13: 著者・評価・ページ数を全て設定して追加できる', async ({ page }) => {
  // Arrange: addBookButton をクリック
  await bookPage.addBookButton.click();

  // Act: タイトル、著者、評価、ページ数を入力して保存
  await bookModal.fillTitle('SQL基礎');
  await bookModal.selectAuthor('山田');
  await bookModal.selectRating(3);
  await bookModal.fillPages('500');
  await bookModal.save();

  // Assert: 書籍数が7件になり、追加された書籍の著者・評価・ページ数が一覧に表示されることを検証
  const count = await bookPage.getBookCount();
  const author = await bookPage.getBookAuthor(7);
  const rating = await bookPage.getBookRating(7);
  const pages = await bookPage.getBookPages(7);
  expect(count).toBe(7);
  expect(author).toContain('山田');
  expect(rating).toBe('★★★☆☆');
  expect(pages).toContain('500');
});

// Q14: 書籍名を空のまま保存するとエラーが表示される（提供済みメソッドで動作確認用）
test('Q14: 書籍名を空のまま保存するとエラーが表示される', async ({ page }) => {
  // Arrange: addBookButton をクリック
  await bookPage.addBookButton.click();

  // Act: タイトルを空のまま save()
  await bookModal.fillTitle('');
  await bookModal.save();

  // Assert: isTitleErrorVisible() が true
  const error =await bookModal.isTitleErrorVisible();
  expect(error).toBe(true);
});

// Q15: ウィッシュリスト保存後、ステータスが「未読」で評価も保持される
test('Q15: ウィッシュリスト保存後、ステータスが「未読」で評価も保持される', async ({ page }) => {
  // Arrange: addBookButton をクリック
  await bookPage.addBookButton.click();

  // Act: タイトル・評価を入力して saveWishlist() で保存
  await bookModal.fillTitle('API基礎');
  await bookModal.selectRating(3);
  await bookModal.saveWishlist();

  // Assert: ステータスが「未読」、評価が設定した値であることを検証
  const newStatus = await bookPage.getBookStatus(7);
  const newRate = await bookPage.getBookRating(7);
  const newTitle = await bookPage.getBookTitle(7);
  expect(newStatus).toBe('未読');
  expect(newRate).toBe('★★★☆☆');
  expect(newTitle).toBe('API基礎');
});
