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
  const rowCount = await statsPage.getStatsRowCount();
  // Assert: 6件であることを検証
  expect(rowCount).toBe(6);
});

// Q2: ジャンル「tech」で絞り込むとテーブルが2件になる
test('Q2: ジャンル「tech」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  // Act: ジャンルを「tech」で絞り込み、行数を取得
  await statsPage.filterByGenre('tech');
  const rowCount = await statsPage.getStatsRowCount();
  // Assert: 2件であることを検証
  expect(rowCount).toBe(2);
});

// Q3: ジャンル「fiction」で絞り込むとテーブルが1件になる
test('Q3: ジャンル「fiction」で絞り込むとテーブルが1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  // Act: ジャンルを「fiction」で絞り込み、行数を取得
  await statsPage.filterByGenre('fiction');
  const rowCount = await statsPage.getStatsRowCount();
  // Assert: 1件であることを検証
  expect(rowCount).toBe(1);
});

// Q4: 著者「山田」で絞り込むとテーブルが2件になる
test('Q4: 著者「山田」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  // Act: 著者を「山田」で絞り込み、行数を取得
  await statsPage.filterByAuthor('山田');
  const rowCount = await statsPage.getStatsRowCount();
  // Assert: 2件であることを検証
  expect(rowCount).toBe(2);
});

// Q5: 著者「高橋」で絞り込むとテーブルが2件になる
test('Q5: 著者「高橋」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  // Act: 著者を「高橋」で絞り込み、行数を取得
  await statsPage.filterByAuthor('高橋');
  const rowCount = await statsPage.getStatsRowCount();
  // Assert: 2件であることを検証
  expect(rowCount).toBe(2);
});

// Q6: 集計カードの「総冊数」がテーブルの行数と一致する
test('Q6: 集計カードの「総冊数」がテーブルの行数と一致する', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: getStatValues() と getStatsRowCount() を使う
  //Arrange: (beforeEach でセットアップ済み)
  //Act: 集計カードの「総冊数」を取得し、テーブルの行数を取得
  const statValues = await statsPage.getStatValues();
  const rowCount = await statsPage.getStatsRowCount();
  //Assert: 集計カードの「総冊数」とテーブルの行数が一致することを検証
  expect(statValues.total).toBe(rowCount.toString());
});

// Q7: 全ジャンルで「読了」数が2件になる
test('Q7: 全ジャンルで「読了」数が2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: getStatValues().finished を使う
  //Arrange: (beforeEach でセットアップ済み)

  //Act: 全てのジャンルで集計カードの「読了」数を取得
  await statsPage.filterByGenre('all');
  const finishedCount = (await statsPage.getStatValues()).finished;

  //Assert: 集計カードの「読了」数が2件であることを検証
  expect(finishedCount).toBe('2');
});

// Q8: 全ジャンルで「読書中」数が2件になる
test('Q8: 全ジャンルで「読書中」数が2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  //Arrange: (beforeEach でセットアップ済み)

  //Act: 全てのジャンルで集計カードの「読書中」数を取得
  await statsPage.filterByGenre('all');
  const readingCount = (await statsPage.getStatValues()).reading;

  //Assert: 集計カードの「読書中」数が2件であることを検証
  expect(readingCount).toBe('2');
});

// Q9: 全ジャンルで「未読」数が2件になる
test('Q9: 全ジャンルで「未読」数が2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  //Act
  await statsPage.filterByGenre('all');
  const unReadingCount = (await statsPage.getStatValues()).unread;

  //Assert
  expect(unReadingCount).toBe('2');
});

// Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる
test('Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: filterByGenre と filterByAuthor を両方使う
  //Arrange: (beforeEach でセットアップ済み)

  //Act: ジャンルを「tech」、著者を「山田」で絞り込み、行数を取得
  await statsPage.filterByGenre('tech');
  await statsPage.filterByAuthor('山田');
  const rowCount = await statsPage.getStatsRowCount();

  //Assert: 1件であることを検証
  expect(rowCount).toBe(1);
});

// Q11: ジャンル「manga」で絞り込むと1件になる
test('Q11: ジャンル「manga」で絞り込むと1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  //Arrange: (beforeEach でセットアップ済み)

  //Act: ジャンルを「manga」で絞り込み、行数を取得
  await statsPage.filterByGenre('manga');
  const rowCount = await statsPage.getStatsRowCount();

  //Assert: 1件であることを検証
  expect(rowCount).toBe(1);
});

// Q12: エクスポートボタンをクリックするとトーストが表示される
test('Q12: エクスポートボタンをクリックするとトーストが表示される', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: exportStats() を呼んだ後、トーストメッセージを検証
  // トーストメッセージ: "エクスポートしました（CSV）"
  //Arrange: (beforeEach でセットアップ済み)

  //Act: エクスポートボタンをクリック
  await statsPage.exportStats();

  //Assert: トーストメッセージが表示されることを検証
  await expect(page.getByText('エクスポートしました（CSV）', {exact : true})).toBeVisible();
});

// Q13: ジャンル「non-fiction」で絞り込むと2件になる
test('Q13: ジャンル「non-fiction」で絞り込むと2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  //Arrange: (beforeEach でセットアップ済み)

  //Act: ジャンルを「non-fiction」で絞り込み、行数を取得
  await statsPage.filterByGenre('non-fiction');
  const rowCount = await statsPage.getStatsRowCount();

  //Assert: 2件であることを検証
  expect(rowCount).toBe(2);
});

// Q14: 著者「中村」で絞り込むと1件になる
test('Q14: 著者「中村」で絞り込むと1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  //Arrange: (beforeEach でセットアップ済み)

  //Act: 著者を「中村」で絞り込み、行数を取得
  await statsPage.filterByAuthor('中村');
  const rowCount = await statsPage.getStatsRowCount();

  //Assert: 1件であることを検証
  expect(rowCount).toBe(1);
});

// Q15: ジャンル「all」に戻すとテーブルが6件に戻る
test('Q15: ジャンル「all」に戻すとテーブルが6件に戻る', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: まず別のジャンルで絞り込んでから「all」に戻す
  //Arrange
  await statsPage.filterByGenre('fiction');

  //Act: ジャンルを「all」に戻し、行数を取得
  await statsPage.filterByGenre('all');
  const rowCount = await statsPage.getStatsRowCount();

  //Assert: 6件であることを検証
  expect(rowCount).toBe(6);
});
