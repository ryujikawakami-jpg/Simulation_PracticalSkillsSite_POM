import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';
import { StatsPage } from './pages/StatsPage';

let loginPage: LoginPage;
let statsPage: StatsPage;

// - StatsPage に遷移
test.beforeEach(async ({ page }) => {
  // TODO: ログインして統計ページに遷移する処理を書いてください
  loginPage = new LoginPage(page);
  statsPage = new StatsPage(page);
  await loginPage.goto();
  await page.waitForSelector('[data-testid="username-input"]');
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
  // Arrange: （beforeEach でセットアップ済み）
  // Act: 総冊数とテーブルの行数を取得
  const statValues = await statsPage.getStatValues();
  const rowCount = await statsPage.getStatsRowCount();
  // Assert: 総冊数がテーブルの行数と一致することを検証
  expect(Number(statValues.total)).toBe(rowCount);
});

// Q7: 全ジャンルで「読了」数が2件になる
test('Q7: 全ジャンルで「読了」数が2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  // Act: 読了数を取得
  const statValues = await statsPage.getStatValues();
  // Assert: 読了数が2件であることを検証
  expect(Number(statValues.finished)).toBe(2);
});

// Q8: 全ジャンルで「読書中」数が2件になる
test('Q8: 全ジャンルで「読書中」数が2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  // Act: 読書中数を取得
  const statValues = await statsPage.getStatValues();
  // Assert: 読書中数が2件であることを検証
  expect(Number(statValues.reading)).toBe(2);
});

// Q9: 全ジャンルで「未読」数が2件になる
test('Q9: 全ジャンルで「未読」数が2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  // Act: 未読数を取得
  const statValues = await statsPage.getStatValues();
  // Assert: 未読数が2件であることを検証
  expect(Number(statValues.unread)).toBe(2);
});

// Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる
test('Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  // Act: ジャンルを「tech」、著者を「山田」で絞り込み、行数を取得
  await statsPage.filterByGenre('tech');
  await statsPage.filterByAuthor('山田');
  const rowCount = await statsPage.getStatsRowCount();
  // Assert: 1件であることを検証
  expect(rowCount).toBe(1);
});

// Q11: ジャンル「manga」で絞り込むと1件になる
test('Q11: ジャンル「manga」で絞り込むと1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  // Act: ジャンルを「manga」で絞り込み、行数を取得
  await statsPage.filterByGenre('manga');
  const rowCount = await statsPage.getStatsRowCount();
  // Assert: 1件であることを検証
  expect(rowCount).toBe(1);
});

// Q12: エクスポートボタンをクリックするとトーストが表示される
test('Q12: エクスポートボタンをクリックするとトーストが表示される', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: exportStats() を呼んだ後、トーストメッセージを検証
  // トーストメッセージ: "エクスポートしました（CSV）"
  // Arrange: （beforeEach でセットアップ済み）
  // Act: エクスポートボタンをクリック
  await statsPage.exportStats();
  // Assert: トーストメッセージが表示されることを検証
  await expect(page.getByText('エクスポートしました（CSV）')).toBeVisible();
});

// Q13: ジャンル「non-fiction」で絞り込むと2件になる
test('Q13: ジャンル「non-fiction」で絞り込むと2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  // Act: ジャンルを「non-fiction」で絞り込み、行数を取得
  await statsPage.filterByGenre('non-fiction');
  const rowCount = await statsPage.getStatsRowCount();
  // Assert: 2件であることを検証
  expect(rowCount).toBe(2);
});

// Q14: 著者「中村」で絞り込むと1件になる
test('Q14: 著者「中村」で絞り込むと1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  // Act: 著者を「中村」で絞り込み、行数を取得
  await statsPage.filterByAuthor('中村');
  const rowCount = await statsPage.getStatsRowCount();
  // Assert: 1件であることを検証
  expect(rowCount).toBe(1);
});

// Q15: ジャンル「all」に戻すとテーブルが6件に戻る
test('Q15: ジャンル「all」に戻すとテーブルが6件に戻る', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: まず別のジャンルで絞り込んでから「all」に戻す
  // Arrange: （beforeEach でセットアップ済み）
  // Arrange: ジャンルを「tech」で絞り込む
  await statsPage.filterByGenre('tech');
  // Act: ジャンルを「all」に戻し、行数を取得
  await statsPage.filterByGenre('all');
  const rowCountAll = await statsPage.getStatsRowCount();
  // Assert: allで6件に戻ることを検証
  expect(rowCountAll).toBe(6);
});