import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { StatsPage } from '../pages/StatsPage';

// ============================================================
// Practice 1: AAA パターン — StatsPage（統計ページ）
// ============================================================
// StatsPage POM は完成済みです。
// 各テストを test.fixme() から test() に変更し、
// Arrange / Act / Assert のコメント付きでテストを完成させてください。

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
const rows = page.locator('table tbody tr');

  // Assert: 6件であることを検証
await expect(rows).toHaveCount(6);});

// Q2: ジャンル「tech」で絞り込むとテーブルが2件になる
test('Q2: ジャンル「tech」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください

  // Arrange: （beforeEach でセットアップ済み）
  
  // Act: ジャンルを「tech」で絞り込み、行数を取得
  await statsPage.filterByGenre('tech');
  const rows = page.locator('table tbody tr');

  // Assert: 2件であることを検証
  await expect(rows).toHaveCount(2);
});

// Q3: ジャンル「fiction」で絞り込むとテーブルが1件になる
test('Q3: ジャンル「fiction」で絞り込むとテーブルが1件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: ジャンルを「fiction」で絞り込み、行数を取得
  await statsPage.filterByGenre('fiction');
  const rows = page.locator('table tbody tr');

  // Assert: 1件であることを検証
  await expect(rows).toHaveCount(1);
});

// Q4: 著者「山田」で絞り込むとテーブルが2件になる
test('Q4: 著者「山田」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 著者を「山田」で絞り込み、行数を取得
  await statsPage.filterByAuthor('山田');
  const rows = page.locator('table tbody tr');

  // Assert: 2件であることを検証
  await expect(rows).toHaveCount(2);
});

// Q5: 著者「高橋」で絞り込むとテーブルが2件になる
test('Q5: 著者「高橋」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 著者を「高橋」で絞り込み、行数を取得
  await statsPage.filterByAuthor('高橋');
  const rows = page.locator('table tbody tr');

  // Assert: 2件であることを検証
  await expect(rows).toHaveCount(2);
});

// Q6: 集計カードの「総冊数」がテーブルの行数と一致する
test('Q6: 集計カードの「総冊数」がテーブルの行数と一致する', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 集計カードの総冊数とテーブルの行数を取得
  const stats = await statsPage.getStatValues();
  const rows = page.locator('table tbody tr');
  await expect(rows).toHaveCount(6);
  const rowCount = await rows.count();

  // Assert: 総冊数とテーブルの行数が一致することを検証
  expect(stats.total).toBe(String(rowCount));
});

test('Q7: 全ジャンルで「読了」数が2件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act
  const stats = await statsPage.getStatValues();

  // Assert
  expect(stats.finished).toBe('2');
});

// Q8: 全ジャンルで「読書中」数が2件になる
test('Q8: 全ジャンルで「読書中」数が2件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 集計カードの値を取得
  const stats = await statsPage.getStatValues();

  // Assert: 「読書中」数が2件であることを検証
  expect(stats.reading).toBe('2');
});

// Q9: 全ジャンルで「未読」数が2件になる
test('Q9: 全ジャンルで「未読」数が2件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 集計カードの値を取得
  const stats = await statsPage.getStatValues();

  // Assert: 「未読」数が2件であることを検証
  expect(stats.unread).toBe('2');
});

// Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる
test('Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: ジャンルと著者の両方で絞り込み、行数を取得
  await statsPage.filterByGenre('tech');
  await statsPage.filterByAuthor('山田');
  const rows = page.locator('table tbody tr');

  // Assert: 1件であることを検証
  await expect(rows).toHaveCount(1);
});

// Q11: ジャンル「manga」で絞り込むと1件になる
test('Q11: ジャンル「manga」で絞り込むと1件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: ジャンルを「manga」で絞り込み、行数を取得
  await statsPage.filterByGenre('manga');
  const rows = page.locator('table tbody tr');

  // Assert: 1件であることを検証
  await expect(rows).toHaveCount(1);
});

// Q12: エクスポートボタンをクリックするとトーストが表示される
test('Q12: エクスポートボタンをクリックするとトーストが表示される', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: エクスポートを実行
  await statsPage.exportStats();

  // Assert: トーストメッセージを検証
  await expect(page.getByRole('status')).toHaveText('エクスポートしました（CSV）');
});

// Q13: ジャンル「non-fiction」で絞り込むと2件になる
test('Q13: ジャンル「non-fiction」で絞り込むと2件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: ジャンルを「non-fiction」で絞り込み、行数を取得
  await statsPage.filterByGenre('non-fiction');
  const rows = page.locator('table tbody tr');

  // Assert: 2件であることを検証
  await expect(rows).toHaveCount(2);
});

// Q14: 著者「中村」で絞り込むと1件になる
test('Q14: 著者「中村」で絞り込むと1件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: 著者を「中村」で絞り込み、行数を取得
  await statsPage.filterByAuthor('中村');
  const rows = page.locator('table tbody tr');

  // Assert: 1件であることを検証
  await expect(rows).toHaveCount(1);
});

// Q15: ジャンル「all」に戻すとテーブルが6件に戻る
test('Q15: ジャンル「all」に戻すとテーブルが6件に戻る', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）

  // Act: まずtechで絞り込み、その後allに戻す
  await statsPage.filterByGenre('tech');
  await statsPage.filterByGenre('all');
  const rows = page.locator('table tbody tr');

  // Assert: 6件に戻ることを検証
  await expect(rows).toHaveCount(6);
});
