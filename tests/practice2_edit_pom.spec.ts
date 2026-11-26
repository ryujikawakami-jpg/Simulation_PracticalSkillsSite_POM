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
test('Q1: 著者フィルターで「山田」を選択すると書籍が絞り込まれる', async ({ page }) => {
  // TODO: BookPage.filterByAuthor() を実装済み
  // Act: filterByAuthor('山田') → getBookCount()
  await bookPage.filterByAuthor('山田');
  const bookCount = await bookPage.getBookCount();
  // Assert: 2件であることを検証
  expect(bookCount).toBe(2);
});

// Q2: 書籍の著者名を取得できる
test('Q2: 書籍ID=1の著者名が「山田」である', async ({ page }) => {
  // TODO: BookPage.getBookAuthor() を実装済み
  // Act: getBookAuthor(1)
  const author = await bookPage.getBookAuthor(1);
  // Assert: '山田' であることを検証
  expect(author).toContain('山田');
});

// Q3: 書籍のメモを取得できる
test('Q3: 書籍ID=1のメモが「初心者におすすめ」である', async ({ page }) => {
  // TODO: BookPage.getBookNote() を実装済み
  // Act: getBookNote(1)
  const memo = await bookPage.getBookNote(1);
  // Assert: '初心者におすすめ' であることを検証
  expect(memo).toContain('初心者におすすめ');
});

// Q4: 書籍の評価を取得できる
test('Q4: 書籍ID=2の評価が「5」である', async ({ page }) => {
  // TODO: BookPage.getBookRating() を実装してから使用
  // Act: getBookRating(2)
  const rating = await bookPage.getBookRating(2);
  // Assert: 評価は数字ではなく星マークで表示される。'★★★★★' であることを検証
  expect(rating).toContain('★★★★★');
});

// Q5: 書籍のページ数を取得できる
test('Q5: 書籍ID=1のページ数が「320」である', async ({ page }) => {
  // TODO: BookPage.getBookPages() を実装してから使用
  // Act: getBookPages(1)
  const pages = await bookPage.getBookPages(1);
  // Assert: '320' を含むことを検証
  expect(pages).toContain('320');
});

// Q6: 著者「高橋」で絞り込むと2件になる
test('Q6: 著者「高橋」で絞り込むと2件になる', async ({ page }) => {
  // TODO: BookPage.filterByAuthor() を実装してから使用
  // Act: フィルターで絞り込む、行数を取得
  await bookPage.filterByAuthor('高橋');
  const bookCount2 = await bookPage.getBookCount();
  // Assert: 2件であることを検証
  expect(bookCount2).toBe(2);
});

// Q7: 著者・メモを入力して書籍を追加できる
test('Q7: 著者・メモを入力して書籍を追加できる', async ({ page }) => {
  // TODO: BookModal.selectAuthor() と BookModal.fillNote() を実装済み
  // Arrange: addBookButton をクリック
  await bookPage.addBookButton.click();
  // Act: タイトル、ジャンル、著者、メモを入力して保存
  await bookModal.fillTitle('test-bookタイトル');
  await bookModal.selectGenre('manga');
  await bookModal.selectAuthor('中村');
  await bookModal.fillNote('テスト内容');
  await bookModal.save();
  const bookCount3 = await bookPage.getBookCount();
  const author = await bookPage.getBookAuthor(7);
  const note = await bookPage.getBookNote(7);
  // Assert: 書籍数が7件になり、追加された書籍の著者とメモが一覧に表示されることを検証
  expect(bookCount3).toBe(7);
  expect(author).toContain('中村');
  expect(note).toContain('テスト内容');
});

// Q8: 評価・ページ数を設定して書籍を追加できる
test('Q8: 評価・ページ数を設定して書籍を追加できる', async ({ page }) => {
  // TODO: BookModal.selectRating() と BookModal.fillPages() を実装済み
  // Arrange: addBookButton をクリック
  await bookPage.addBookButton.click();
  // Act: タイトル、評価、ページ数を入力して保存
  await bookModal.fillTitle('test-bookタイトル2');
  await bookModal.selectRating(4);
  await bookModal.fillPages('357');
  await bookModal.save();
  const bookCount4 = await bookPage.getBookCount();
  const rating = await bookPage.getBookRating(7);
  const pagesCount = await bookPage.getBookPages(7);
  // Assert: 書籍数が7件になり、追加された書籍の評価とページ数が一覧に表示されることを検証
  expect(bookCount4).toBe(7);
  expect(rating).toContain('★★★★☆');
  expect(pagesCount).toContain('357');
});

// Q9: ウィッシュリスト保存するとステータスが「未読」になる
test('Q9: ウィッシュリスト保存するとステータスが「未読」になる', async ({ page }) => {
  // TODO: BookModal.saveWishlist() を実装済み
  // Arrange: addBookButton をクリック
  await bookPage.addBookButton.click();
  // Act: タイトルを入力して saveWishlist() で保存
  await bookModal.fillTitle('test-bookタイトル3');
  await bookModal.saveWishlist();
  const status = await bookPage.getBookStatus(7);
  // Assert: 追加された書籍のステータスが「未読」であることを検証
  expect(status).toContain('未読');
});

// Q10: ジャンル「tech」＋著者「山田」の組み合わせフィルター
test('Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる', async ({ page }) => {
  // TODO: BookPage.filterByAuthor() を実装済み
  // Act: filterByGenre('tech') → filterByAuthor('山田') → getBookCount()
  await bookPage.filterByGenre('tech');
  await bookPage.filterByAuthor('山田');  
  const bookCount5 = await bookPage.getBookCount();
  // Assert: 1件であることを検証
  expect(bookCount5).toBe(1);
});

// Q11: 著者フィルターで「unknown」を選択すると未割当の書籍が表示される
test('Q11: 著者「unknown」で絞り込むと著者未設定の書籍が表示される', async ({ page }) => {
  // TODO: BookPage.filterByAuthor() を実装済み
  // Act: filterByAuthor('unknown') → getBookCount()
  await bookPage.filterByAuthor('unknown');
  const bookCount6 = await bookPage.getBookCount();
  const title = await bookPage.getBookTitle(5);
  // Assert: 1件であることを検証（ワンピース100巻のみ）
  expect(bookCount6).toBe(1);
  expect(title).toContain('ワンピース100巻');
});

// Q12: メモ付きで書籍を追加し、一覧でメモが表示される
test('Q12: メモ付きで書籍を追加し、一覧でメモが表示される', async ({ page }) => {
  // TODO: BookModal.fillNote() と BookPage.getBookNote() を実装済み
  // Arrange: addBookButton をクリック
  await bookPage.addBookButton.click();
  // Act: タイトル・メモを入力して保存
  await bookModal.fillTitle('test-bookタイトル4');
  await bookModal.fillNote('メモテスト');
  await bookModal.save();
  const bookCount7 = await bookPage.getBookCount();
  const note = await bookPage.getBookNote(7);
  // Assert: 追加された書籍のメモが一覧に表示されることを検証
  expect(bookCount7).toBe(7);
  expect(note).toContain('メモテスト');
});

// Q13: 著者・評価・ページ数を全て設定して追加できる
test('Q13: 著者・評価・ページ数を全て設定して追加できる', async ({ page }) => {
  // TODO: BookModal の selectAuthor, selectRating, fillPages を全て実装してから使用
  // Arrange: addBookButton をクリック
  await bookPage.addBookButton.click();
  // Act: タイトル、著者、評価、ページ数を入力して保存
  await bookModal.fillTitle('test-bookタイトル');
  await bookModal.selectAuthor('中村');
  await bookModal.selectRating(2);
  await bookModal.fillPages('400');
  await bookModal.save();
  const bookCount8 = await bookPage.getBookCount();
  const author = await bookPage.getBookAuthor(7);
  const rating = await bookPage.getBookRating(7);
  const pagesCount = await bookPage.getBookPages(7);
  // Assert: 書籍数が7件になり、追加された書籍の著者・評価・ページ数が一覧に表示されることを検証
  expect(bookCount8).toBe(7);
  expect(author).toContain('中村');
  expect(rating).toContain('★★☆☆☆');
  expect(pagesCount).toContain('400');
});

// Q14: 書籍名を空のまま保存するとエラーが表示される（提供済みメソッドで動作確認用）
test('Q14: 書籍名を空のまま保存するとエラーが表示される', async ({ page }) => {
  // このテストは提供済みのメソッドだけで実装可能です
  // Arrange: addBookButton をクリック
  await bookPage.addBookButton.click();
  // Act: タイトルを空のまま save()
  await bookModal.fillTitle('');
  await bookModal.save();
  const isVisible = await bookModal.isTitleErrorVisible();
  // Assert: isTitleErrorVisible() が true
  expect(isVisible).toBe(true);
});

// Q15: ウィッシュリスト保存後、ステータスが「未読」で評価も保持される
test('Q15: ウィッシュリスト保存後、ステータスが「未読」で評価も保持される', async ({ page }) => {
  // TODO: BookModal.saveWishlist() と BookModal.selectRating() を実装済み
  // Arrange: addBookButton をクリック
  await bookPage.addBookButton.click();
  // Act: タイトル・評価を入力して saveWishlist() で保存
  await bookModal.fillTitle('test-bookタイトル1234');
  await bookModal.selectRating(5);
  await bookModal.saveWishlist();
  const status = await bookPage.getBookStatus(7);
  const rating = await bookPage.getBookRating(7);
  // Assert: ステータスが「未読」、評価が設定した値であることを検証
  expect(status).toContain('未読');
  expect(rating).toContain('★★★★★');
});
