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
  // loginPage = new LoginPage(page);
  // statsPage = new StatsPage(page);
  // await loginPage.goto();
  // await loginPage.loginAsAdmin();
  // await statsPage.navigate();
});

// Q1: 全ジャンルで統計テーブルに6件表示される
test.fixme('Q1: 全ジャンルで統計テーブルに6件表示される', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  // Act: テーブルの行数を取得
  // Assert: 6件であることを検証
});

// Q2: ジャンル「tech」で絞り込むとテーブルが2件になる
test.fixme('Q2: ジャンル「tech」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Arrange: （beforeEach でセットアップ済み）
  // Act: ジャンルを「tech」で絞り込み、行数を取得
  // Assert: 2件であることを検証
});

// Q3: ジャンル「fiction」で絞り込むとテーブルが1件になる
test.fixme('Q3: ジャンル「fiction」で絞り込むとテーブルが1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
});

// Q4: 著者「山田」で絞り込むとテーブルが2件になる
test.fixme('Q4: 著者「山田」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
});

// Q5: 著者「高橋」で絞り込むとテーブルが2件になる
test.fixme('Q5: 著者「高橋」で絞り込むとテーブルが2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
});

// Q6: 集計カードの「総冊数」がテーブルの行数と一致する
test.fixme('Q6: 集計カードの「総冊数」がテーブルの行数と一致する', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: getStatValues() と getStatsRowCount() を使う
});

// Q7: 全ジャンルで「読了」数が2件になる
test.fixme('Q7: 全ジャンルで「読了」数が2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: getStatValues().finished を使う
});

// Q8: 全ジャンルで「読書中」数が2件になる
test.fixme('Q8: 全ジャンルで「読書中」数が2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
});

// Q9: 全ジャンルで「未読」数が2件になる
test.fixme('Q9: 全ジャンルで「未読」数が2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
});

// Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる
test.fixme('Q10: ジャンル「tech」＋著者「山田」で絞り込むと1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: filterByGenre と filterByAuthor を両方使う
});

// Q11: ジャンル「manga」で絞り込むと1件になる
test.fixme('Q11: ジャンル「manga」で絞り込むと1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
});

// Q12: エクスポートボタンをクリックするとトーストが表示される
test.fixme('Q12: エクスポートボタンをクリックするとトーストが表示される', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: exportStats() を呼んだ後、トーストメッセージを検証
  // トーストメッセージ: "エクスポートしました（CSV）"
});

// Q13: ジャンル「non-fiction」で絞り込むと2件になる
test.fixme('Q13: ジャンル「non-fiction」で絞り込むと2件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
});

// Q14: 著者「中村」で絞り込むと1件になる
test.fixme('Q14: 著者「中村」で絞り込むと1件になる', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
});

// Q15: ジャンル「all」に戻すとテーブルが6件に戻る
test.fixme('Q15: ジャンル「all」に戻すとテーブルが6件に戻る', async ({ page }) => {
  // TODO: AAA パターンでテストを書いてください
  // Hint: まず別のジャンルで絞り込んでから「all」に戻す
});
