import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { StatsPage } from '../pages/StatsPage';

// ============================================================
// Practice 1: AAA パターン — StatsPage（統計ページ）
// ============================================================
// StatsPage POM は完成済みです。
// 各テストを test.fixme() から test() に変更し、
// Arrange / Act / Assert のコメント付きでテストを完成させてください。
//
// ★ この回は「配布された POM のメソッドを使って書く」練習です。
//    page.locator(...) をテスト側に直接書かないでください。
//    行数を数えるなら statsPage.getStatsRowCount()、
//    絞り込むなら statsPage.filterByGenre() を使います。
//    直接書くとロケーターがテスト15本に散らばり、画面が変わったとき全部直すことになります。
//    POM を使う理由は「直す場所を1か所に集めること」です。

let loginPage: LoginPage;
let statsPage: StatsPage;

// TODO: beforeEach を実装してください
// - LoginPage でログイン
// - StatsPage に遷移
test.beforeEach(async ({ page }) => {
  // TODO: ログインして統計ページに遷移する処理を書いてください
  loginPage = new LoginPage(page);
  statsPage = new StatsPage(page);
  await loginPage.goto();
  await loginPage.loginAsAdmin();
  await statsPage.navigate();
});

// Q1: 全ジャンルで統計テーブルに6件表示される
test('Q1: 全ジャンルで統計テーブルに6件表示される', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）

  // Act: テーブルの行数を取得
  const allRowCount:number = await statsPage.getStatsRowCount();

  // Assert: 6件であることを検証
  expect(allRowCount).toBe(6);
});

// Q2: ジャンル「tech」で絞り込むとテーブルが2件になる
test('Q2: ジャンル「tech」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）

  // Act: ジャンルを「tech」で絞り込み、行数を取得
  await statsPage.filterByGenre('tech');
  const techRowCount:number = await statsPage.getStatsRowCount();

  // Assert: 2件であることを検証
  expect(techRowCount).toBe(2);
});

// Q3: ジャンル「fiction」で絞り込むとテーブルが1件になる
test('Q3: ジャンル「fiction」で絞り込むとテーブルが1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）

  // Act: ジャンルを「fiction」で絞り込み、行数を取得
  await statsPage.filterByGenre('fiction');
  const fictionRowCount:number = await statsPage.getStatsRowCount();

  // Assert: 1件であることを検証
  expect(fictionRowCount).toBe(1);
});

// Q4: 著者「山田」で絞り込むとテーブルが2件になる
test('Q4: 著者「山田」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 著者を「山田」で絞り込み、行数を取得
  await statsPage.filterByAuthor('山田');
  const yamadaRowCount:number = await statsPage.getStatsRowCount();

  // Assert: 2件であることを検証
  expect(yamadaRowCount).toBe(2);
});

// Q5: 著者「高橋」で絞り込むとテーブルが2件になる
test('Q5: 著者「高橋」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 著者を「高橋」で絞り込み、行数を取得
  await statsPage.filterByAuthor('高橋');
  const takahashiRowCount:number = await statsPage.getStatsRowCount();

  // Assert: 2件であることを検証
  expect(takahashiRowCount).toBe(2);
});

// Q6: 集計カードの「総冊数」がテーブルの行数と一致する
test('Q6: 集計カードの「総冊数」がテーブルの行数と一致する', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: getStatValues() と getStatsRowCount() を使う
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 総冊数と行数を取得
  const totalValue:string = (await statsPage.getStatValues()).total;
  const BookRowCount:number = await statsPage.getStatsRowCount();

  // Assert: 総冊数と行数を比較して、一致することを検証
  expect(BookRowCount).toBe(Number(totalValue));
});

// Q7: 全ジャンルで「読了」数が2件になる
test('Q7: 全ジャンルで「読了」数が2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: getStatValues().finished を使う
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 読了数を取得
  const finishValue:string = (await statsPage.getStatValues()).finished;

  // Assert: 2件であることを検証
  expect(Number(finishValue)).toBe(2);
});

// Q8: 全ジャンルで「読書中」数が2件になる
test('Q8: 全ジャンルで「読書中」数が2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 読書中数を取得
  const readingValue:string = (await statsPage.getStatValues()).reading;

  // Assert: 2件であることを検証
  expect(Number(readingValue)).toBe(2);
});

// Q9: 全ジャンルで「未読」数が2件になる
test('Q9: 全ジャンルで「未読」数が2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 未読数を取得
  const unreadValue:string = (await statsPage.getStatValues()).unread;

  // Assert: 2件であることを検証
  expect(Number(unreadValue)).toBe(2);
});

// Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる
test('Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: filterByGenre と filterByAuthor を両方使う
  // Arrange: （beforeEach でセットアップ済み）

  // Act: ジャンルをtech、著者を山田で絞り込み、行数を取得
  await statsPage.filterByGenre('tech');
  await statsPage.filterByAuthor('山田');
  const techYamadaRowCount:number = await statsPage.getStatsRowCount();

  // Assert: 1件であることを検証
  expect(techYamadaRowCount).toBe(1);
});

// Q11: ジャンル「manga」で絞り込むと1件になる
test('Q11: ジャンル「manga」で絞り込むと1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）

  // Act: ジャンルをmangaで絞り込み、行数を取得
  await statsPage.filterByGenre('manga');
  const mangaRowCount:number = await statsPage.getStatsRowCount();

  // Assert: 1件であることを検証
  expect(mangaRowCount).toBe(1);
});

// Q12: エクスポートボタンをクリックするとトーストが表示される
test('Q12: エクスポートボタンをクリックするとトーストが表示される', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: exportStats() を呼んだ後、トーストメッセージを検証
  // トーストメッセージ: "エクスポートしました（CSV）"
  // Arrange: （beforeEach でセットアップ済み）

  // Act: エクスポートボタンをクリック
  await statsPage.exportStats();

  // Assert: トーストメッセージが出現し、"エクスポートしました（CSV）"と表示されるか検証
  await expect(page.getByText('エクスポートしました（CSV）')).toBeVisible();
});

// Q13: ジャンル「non-fiction」で絞り込むと2件になる
test('Q13: ジャンル「non-fiction」で絞り込むと2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）

  // Act: ジャンルをnon-fictionで絞り込み、行数を取得
  await statsPage.filterByGenre('non-fiction');
  const nonfictionRowCount:number = await statsPage.getStatsRowCount();

  // Assert: 2件であることを検証
  expect(nonfictionRowCount).toBe(2);
});

// Q14: 著者「中村」で絞り込むと1件になる
test('Q14: 著者「中村」で絞り込むと1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 著者を「中村」で絞り込み、行数を取得
  await statsPage.filterByAuthor('中村');
  const nakamuraRowCount:number = await statsPage.getStatsRowCount();

  // Assert: 1件であることを検証
  expect(nakamuraRowCount).toBe(1);
});

// Q15: ジャンル「all」に戻すとテーブルが6件に戻る
test('Q15: ジャンル「all」に戻すとテーブルが6件に戻る', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: まず別のジャンルで絞り込んでから「all」に戻す
  // Arrange: （beforeEach でセットアップ済み）

  // Act: ジャンルをnon-fictionで絞り込み、6件ではないことを確認
  await statsPage.filterByGenre('non-fiction');
  const nonfictionRowCount:number = await statsPage.getStatsRowCount();
  expect(nonfictionRowCount).not.toBe(6);

  // ジャンルをallに戻し、行数を取得する
  await statsPage.filterByGenre('all');
  const allRowCount:number = await statsPage.getStatsRowCount();

  // Assert: 6件であることを検証
  expect(allRowCount).toBe(6);
});
