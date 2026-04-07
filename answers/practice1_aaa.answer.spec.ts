import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { StatsPage } from '../pages/StatsPage';

let loginPage: LoginPage;
let statsPage: StatsPage;

test.beforeEach(async ({ page }) => {
  // Arrange
  loginPage = new LoginPage(page);
  statsPage = new StatsPage(page);
  await loginPage.goto();
  await loginPage.loginAsAdmin();
  await statsPage.navigate();
});

// Q1: 全ジャンルで統計テーブルに6件表示される
test('Q1: 全ジャンルで統計テーブルに6件表示される', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  const count = await statsPage.getStatsRowCount();
  // Assert
  expect(count).toBe(6);
});

// Q2: ジャンル「tech」で絞り込むとテーブルが2件になる
test('Q2: ジャンル「tech」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  await statsPage.filterByGenre('tech');
  const count = await statsPage.getStatsRowCount();
  // Assert
  expect(count).toBe(2);
});

// Q3: ジャンル「fiction」で絞り込むとテーブルが1件になる
test('Q3: ジャンル「fiction」で絞り込むとテーブルが1件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  await statsPage.filterByGenre('fiction');
  const count = await statsPage.getStatsRowCount();
  // Assert
  expect(count).toBe(1);
});

// Q4: 著者「山田」で絞り込むとテーブルが2件になる
test('Q4: 著者「山田」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  await statsPage.filterByAuthor('山田');
  const count = await statsPage.getStatsRowCount();
  // Assert
  expect(count).toBe(2);
});

// Q5: 著者「高橋」で絞り込むとテーブルが2件になる
test('Q5: 著者「高橋」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  await statsPage.filterByAuthor('高橋');
  const count = await statsPage.getStatsRowCount();
  // Assert
  expect(count).toBe(2);
});

// Q6: 集計カードの「総冊数」がテーブルの行数と一致する
test('Q6: 集計カードの「総冊数」がテーブルの行数と一致する', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  const stats = await statsPage.getStatValues();
  const rowCount = await statsPage.getStatsRowCount();
  // Assert
  expect(Number(stats.total)).toBe(rowCount);
});

// Q7: 全ジャンルで「読了」数が2件になる
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
  // Act
  const stats = await statsPage.getStatValues();
  // Assert
  expect(stats.reading).toBe('2');
});

// Q9: 全ジャンルで「未読」数が2件になる
test('Q9: 全ジャンルで「未読」数が2件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  const stats = await statsPage.getStatValues();
  // Assert
  expect(stats.unread).toBe('2');
});

// Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる
test('Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  await statsPage.filterByGenre('tech');
  await statsPage.filterByAuthor('山田');
  const count = await statsPage.getStatsRowCount();
  // Assert
  expect(count).toBe(1);
});

// Q11: ジャンル「manga」で絞り込むと1件になる
test('Q11: ジャンル「manga」で絞り込むと1件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  await statsPage.filterByGenre('manga');
  const count = await statsPage.getStatsRowCount();
  // Assert
  expect(count).toBe(1);
});

// Q12: エクスポートボタンをクリックするとトーストが表示される
test('Q12: エクスポートボタンをクリックするとトーストが表示される', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  await statsPage.exportStats();
  // Assert
  await expect(page.getByText('エクスポートしました（CSV）')).toBeVisible();
});

// Q13: ジャンル「non-fiction」で絞り込むと2件になる
test('Q13: ジャンル「non-fiction」で絞り込むと2件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  await statsPage.filterByGenre('non-fiction');
  const count = await statsPage.getStatsRowCount();
  // Assert
  expect(count).toBe(2);
});

// Q14: 著者「中村」で絞り込むと1件になる
test('Q14: 著者「中村」で絞り込むと1件になる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  await statsPage.filterByAuthor('中村');
  const count = await statsPage.getStatsRowCount();
  // Assert
  expect(count).toBe(1);
});

// Q15: ジャンル「all」に戻すとテーブルが6件に戻る
test('Q15: ジャンル「all」に戻すとテーブルが6件に戻る', async ({ page }) => {
  // Arrange: 別のジャンルで絞り込む
  await statsPage.filterByGenre('tech');
  const filteredCount = await statsPage.getStatsRowCount();
  expect(filteredCount).toBe(2);

  // Act: 「all」に戻す
  await statsPage.filterByGenre('all');
  const count = await statsPage.getStatsRowCount();

  // Assert
  expect(count).toBe(6);
});
