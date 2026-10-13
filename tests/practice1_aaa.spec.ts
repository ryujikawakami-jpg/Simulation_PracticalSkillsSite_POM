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
  loginPage = new LoginPage(page);   // ログインページの初期化
  statsPage = new StatsPage(page);   // 統計ページの初期化

  await loginPage.goto();   // 　　ログインページに遷移する
  await loginPage.loginAsAdmin();  // LoginPage でログイン
  await statsPage.navigate();   // StatsPage に遷移
});

// Q1: 全ジャンルで統計テーブルに6件表示される
test('Q1: 全ジャンルで統計テーブルに6件表示される', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  const rowCount = await statsPage.getStatsRowCount();  // Act: テーブルの行数を取得
  
  await expect(rowCount).toBe(6);   // Assert: 6件であることを検証
});

// Q2: ジャンル「tech」で絞り込むとテーブルが2件になる
test('Q2: ジャンル「tech」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  await statsPage.filterByGenre('tech');   // Act: ジャンルを「tech」で絞り込む
  const rowCount = await statsPage.getStatsRowCount();   // 絞り込み後の行数を取得
  
  await expect(rowCount).toBe(2);   // Assert: 2件であることを検証
});

// Q3: ジャンル「fiction」で絞り込むとテーブルが1件になる
test('Q3: ジャンル「fiction」で絞り込むとテーブルが1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  await statsPage.filterByGenre('fiction');   // Act: ジャンルを「fiction」で絞り込む
  const rowCount = await statsPage.getStatsRowCount();   // 絞り込み後の行数を取得
  
  await expect(rowCount).toBe(1);   // Assert: 1件であることを検証
});

// Q4: 著者「山田」で絞り込むとテーブルが2件になる
test('Q4: 著者「山田」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  await statsPage.filterByAuthor('山田');   // Act: 著者を「山田」で絞り込む
  const rowCount = await statsPage.getStatsRowCount();   // 絞り込み後の行数を取得
  
  await expect(rowCount).toBe(2);   // Assert: 2件であることを検証
});

// Q5: 著者「高橋」で絞り込むとテーブルが2件になる
test('Q5: 著者「高橋」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  await statsPage.filterByAuthor('高橋');   // Act: 著者を「高橋」で絞り込む
  const rowCount = await statsPage.getStatsRowCount();   // 絞り込み後の行数を取得
  
  await expect(rowCount).toBe(2);   // Assert: 2件であることを検証
});

// Q6: 集計カードの「総冊数」がテーブルの行数と一致する
test('Q6: 集計カードの「総冊数」がテーブルの行数と一致する', async () => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: beforeEach でセットアップ済み

  const statValues = await statsPage.getStatValues();   // Act: 集計カードの値を取得
  const rowCount = await statsPage.getStatsRowCount();   // Act: テーブルの行数を取得

  await expect(Number(statValues.total)).toBe(rowCount); // Assert: 集計カードの「総冊数」とテーブルの行数が一致することを検証
});

// Q7: 全ジャンルで「読了」数が2件になる
test('Q7: 全ジャンルで「読了」数が2件になる', async () => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: beforeEach でセットアップ済み

  const statValues = await statsPage.getStatValues(); // Act: 集計カード「読了」の値を取得

  await expect(Number(statValues.finished)).toBe(2);　　// Assert: 集計カードの「読了」数が2件であることを検証
});

// Q8: 全ジャンルで「読書中」数が2件になる
test('Q8: 全ジャンルで「読書中」数が2件になる', async () => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: beforeEach でセットアップ済み

  const statValues = await statsPage.getStatValues();　// Act: 集計カード「読書中」の値を取得

  expect(Number(statValues.reading)).toBe(2);   // Assert: 集計カードの「読書中」数が2件であることを検証
});

// Q9: 全ジャンルで「未読」数が2件になる
test('Q9: 全ジャンルで「未読」数が2件になる', async () => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: beforeEach でセットアップ済み

  const statValues = await statsPage.getStatValues(); // Act: 集計カード「未読」の値を取得

  await expect(Number(statValues.unread)).toBe(2);  // Assert: 集計カードの「未読」数が2件であることを検証
});

// Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる
test('Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）

  await statsPage.filterByGenre('tech');   // Act: ジャンルを「tech」で絞り込み、行数を取得
  await statsPage.filterByAuthor('山田');   // Act: 著者を「山田」で絞り込み、行数を取得
  const rowCount = await statsPage.getStatsRowCount();  // Act: テーブルの行数を取得
  
  await expect(rowCount).toBe(1);   // Assert: 1件であることを検証

});

// Q11: ジャンル「manga」で絞り込むと1件になる
test('Q11: ジャンル「manga」で絞り込むと1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  await statsPage.filterByGenre('manga');   // Act: ジャンルを「manga」で絞り込む
  const rowCount = await statsPage.getStatsRowCount();   // 絞り込み後の行数を取得
  
  await expect(rowCount).toBe(1);   // Assert: 1件であることを検証
});

// Q12: エクスポートボタンをクリックするとトーストが表示される
test('Q12: エクスポートボタンをクリックするとトーストが表示される', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  await statsPage.exportStats();   // Act: エクスポートボタンをクリック

  await expect(page.getByText('エクスポートしました（CSV）')).toBeVisible();   // Assert: トーストメッセージが表示されることを検証
});

// Q13: ジャンル「non-fiction」で絞り込むと2件になる
test('Q13: ジャンル「non-fiction」で絞り込むと2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  await statsPage.filterByGenre('non-fiction');   // Act: ジャンルを「non-fiction」で絞り込む
  const rowCount = await statsPage.getStatsRowCount();   // 絞り込み後の行数を取得
  
  await expect(rowCount).toBe(2);   // Assert: 2件であることを検証
});

// Q14: 著者「中村」で絞り込むと1件になる
test('Q14: 著者「中村」で絞り込むと1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  await statsPage.filterByAuthor('中村');   // Act: 著者を「中村」で絞り込む
  const rowCount = await statsPage.getStatsRowCount();   // 絞り込み後の行数を取得
  
  await expect(rowCount).toBe(1);   // Assert: 1件であることを検証
});

// Q15: ジャンル「all」に戻すとテーブルが6件に戻る
test('Q15: ジャンル「all」に戻すとテーブルが6件に戻る', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  await statsPage.filterByGenre('tech');   // Act: ジャンルを「tech」で絞り込み、行数を取得
  await statsPage.filterByGenre('すべて');   // Act: ジャンルを「すべて」に戻し、行数を取得
  const rowCount = await statsPage.getStatsRowCount();  // Act: テーブルの行数を取得 

  await expect(rowCount).toBe(6);   // Assert: 6件であることを検証
});
