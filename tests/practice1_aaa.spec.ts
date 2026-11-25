import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { StatsPage } from '../pages/StatsPage';

let loginPage: LoginPage;
let statsPage: StatsPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  statsPage = new StatsPage(page);
  await loginPage.goto();
  await loginPage.loginAsAdmin();
  await statsPage.navigate();
});

// Q1: 全ジャンルで統計テーブルに6件表示される
test('Q1: 全ジャンルで統計テーブルに6件表示される', async () => {
  // Arrange: beforeEachでログインと統計ページへの移動を行う

  // Act: 統計テーブルの行数を取得する
  const count = await statsPage.getStatsRowCount();

  // Assert: 行数が6件であることを検証する
  expect(count).toBe(6);
});

// Q2: ジャンル「tech」で絞り込むとテーブルが2件になる
test('Q2: ジャンル「tech」で絞り込むとテーブルが2件になる', async () => {
  // Arrange: beforeEachでログインと統計ページへの移動を行う

  // Act: ジャンルをtechで絞り込んで行数を取得する
  await statsPage.filterByGenre('tech');
  const count = await statsPage.getStatsRowCount();

  // Assert: 行数が2件であることを検証する
  expect(count).toBe(2);
});

// Q3: ジャンル「fiction」で絞り込むとテーブルが1件になる
test('Q3: ジャンル「fiction」で絞り込むとテーブルが1件になる', async () => {
  // Arrange: beforeEachでログインと統計ページへの移動を行う

  // Act: ジャンルをfictionで絞り込んで行数を取得する
  await statsPage.filterByGenre('fiction');
  const count = await statsPage.getStatsRowCount();

  // Assert: 行数が1件であることを検証する
  expect(count).toBe(1);
});

// Q4: 著者「山田」で絞り込むとテーブルが2件になる
test('Q4: 著者「山田」で絞り込むとテーブルが2件になる', async () => {
  // Arrange: beforeEachでログインと統計ページへの移動を行う

  // Act: 著者を山田で絞り込んで行数を取得する
  await statsPage.filterByAuthor('山田');
  const count = await statsPage.getStatsRowCount();

  // Assert: 行数が2件であることを検証する
  expect(count).toBe(2);
});

// Q5: 著者「高橋」で絞り込むとテーブルが2件になる
test('Q5: 著者「高橋」で絞り込むとテーブルが2件になる', async () => {
  // Arrange: beforeEachでログインと統計ページへの移動を行う

  // Act: 著者を高橋で絞り込んで行数を取得する
  await statsPage.filterByAuthor('高橋');
  const count = await statsPage.getStatsRowCount();

  // Assert: 行数が2件であることを検証する
  expect(count).toBe(2);
});

// Q6: 集計カードの「総冊数」がテーブルの行数と一致する
test('Q6: 集計カードの「総冊数」がテーブルの行数と一致する', async () => {
  // Arrange: beforeEachでログインと統計ページへの移動を行う

  // Act: 集計カードの総冊数とテーブルの行数を取得する
  const stats = await statsPage.getStatValues();
  const rowCount = await statsPage.getStatsRowCount();

  // Assert: 総冊数がテーブルの行数と一致することを検証する
  expect(Number(stats.total)).toBe(rowCount);
});

// Q7: 全ジャンルで「読了」数が2件になる
test('Q7: 全ジャンルで「読了」数が2件になる', async () => {
  // Arrange: beforeEachでログインと統計ページへの移動を行う

  // Act: 集計カードの数値を取得する
  const stats = await statsPage.getStatValues();

  // Assert: 読了数が2件であることを検証する
  expect(stats.finished).toBe('2');
});

// Q8: 全ジャンルで「読書中」数が2件になる
test('Q8: 全ジャンルで「読書中」数が2件になる', async () => {
  // Arrange: beforeEachでログインと統計ページへの移動を行う

  // Act: 集計カードの数値を取得する
  const stats = await statsPage.getStatValues();

  // Assert: 読書中の数が2件であることを検証する
  expect(stats.reading).toBe('2');
});

// Q9: 全ジャンルで「未読」数が2件になる
test('Q9: 全ジャンルで「未読」数が2件になる', async () => {
  // Arrange: beforeEachでログインと統計ページへの移動を行う

  // Act: 集計カードの数値を取得する
  const stats = await statsPage.getStatValues();

  // Assert: 未読数が2件であることを検証する
  expect(stats.unread).toBe('2');
});

// Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる
test('Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる', async () => {
  // Arrange: beforeEachでログインと統計ページへの移動を行う

  // Act: ジャンルと著者で絞り込んで行数を取得する
  await statsPage.filterByGenre('tech');
  await statsPage.filterByAuthor('山田');
  const count = await statsPage.getStatsRowCount();

  // Assert: 行数が1件であることを検証する
  expect(count).toBe(1);
});

// Q11: ジャンル「manga」で絞り込むと1件になる
test('Q11: ジャンル「manga」で絞り込むと1件になる', async () => {
  // Arrange: beforeEachでログインと統計ページへの移動を行う

  // Act: ジャンルをmangaで絞り込んで行数を取得する
  await statsPage.filterByGenre('manga');
  const count = await statsPage.getStatsRowCount();

  // Assert: 行数が1件であることを検証する
  expect(count).toBe(1);
});

// Q12: エクスポートボタンをクリックするとトーストが表示される
test('Q12: エクスポートボタンをクリックするとトーストが表示される', async () => {
  // Arrange: beforeEachでログインと統計ページへの移動を行う

  // Act: エクスポートボタンをクリックする
  await statsPage.exportStats();

  // Assert: エクスポート完了のトーストが表示されることを検証する
  await expect(statsPage.exportToast).toBeVisible();
});

// Q13: ジャンル「non-fiction」で絞り込むと2件になる
test('Q13: ジャンル「non-fiction」で絞り込むと2件になる', async () => {
  // Arrange: beforeEachでログインと統計ページへの移動を行う

  // Act: ジャンルをnon-fictionで絞り込んで行数を取得する
  await statsPage.filterByGenre('non-fiction');
  const count = await statsPage.getStatsRowCount();

  // Assert: 行数が2件であることを検証する
  expect(count).toBe(2);
});

// Q14: 著者「中村」で絞り込むと1件になる
test('Q14: 著者「中村」で絞り込むと1件になる', async () => {
  // Arrange: beforeEachでログインと統計ページへの移動を行う

  // Act: 著者を中村で絞り込んで行数を取得する
  await statsPage.filterByAuthor('中村');
  const count = await statsPage.getStatsRowCount();

  // Assert: 行数が1件であることを検証する
  expect(count).toBe(1);
});

// Q15: ジャンル「all」に戻すとテーブルが6件に戻る
test('Q15: ジャンル「all」に戻すとテーブルが6件に戻る', async () => {
  // Arrange: 絞り込み前の状態としてジャンルをtechに設定する
  await statsPage.filterByGenre('tech');

  // Act: ジャンルをallに戻して行数を取得する
  await statsPage.filterByGenre('all');
  const count = await statsPage.getStatsRowCount();

  // Assert: 行数が6件に戻ることを検証する
  expect(count).toBe(6);
});
