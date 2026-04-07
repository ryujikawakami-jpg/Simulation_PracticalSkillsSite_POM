import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// ============================================================
// Practice 3: POM 新規作成 — DisplayPage / EmailPage
// ============================================================
// DisplayPage.ts と EmailPage.ts を新規作成してから、
// 各テストを test.fixme() → test() に変更してテストを完成させてください。
//
// --- DisplayPage に必要な要素 ---
// ナビゲーション: nav-display
// トグル（CSS hidden checkbox — locator.evaluate(el => el.click()) で操作）:
//   - display-darkmode   : ダークモード（デフォルト OFF）
//   - display-compact    : コンパクト表示（デフォルト ON）
//   - display-cover      : 表紙表示（デフォルト ON）
//   - display-rating     : 評価表示（デフォルト ON）
//   - display-animation  : アニメーション（デフォルト OFF）
// ボタン:
//   - save-display-btn   : 保存 → トースト "表示設定を保存しました"
//   - reset-display-btn  : リセット → デフォルトに戻る
//
// --- EmailPage に必要な要素 ---
// ナビゲーション: nav-email
// フィールド:
//   - email-current   : 現在のメール（readonly, "admin@example.com"）
//   - email-new       : 新しいメールアドレス
//   - email-confirm   : 確認用メールアドレス
//   - email-password  : パスワード
// エラー:
//   - #email-new-error      : "正しいメールアドレスを入力してください"
//   - #email-confirm-error  : "メールアドレスが一致しません"
//   - #email-password-error : "パスワードを入力してください"
//   - #email-password-wrong : "パスワードが正しくありません"
// ボタン:
//   - save-email-btn   : 保存 → トースト "メールアドレスを変更しました" + フィールドクリア
//   - cancel-email-btn : キャンセル → 全フィールドクリア

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginAsAdmin();
});

// ========================
// 表示設定（Display Settings）Q1〜Q8
// ========================

// Q1: 表示設定ページに遷移できる
test.fixme('Q1: 表示設定ページに遷移できる', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Act: DisplayPage.navigate()
  // Assert: ページ内にトグルが表示されていることを検証
});

// Q2: デフォルトでコンパクト表示・表紙表示・評価表示がONになっている
test.fixme('Q2: デフォルトでコンパクト表示・表紙表示・評価表示がONになっている', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Act: navigate()
  // Assert: compact, cover, rating が checked であることを検証
});

// Q3: ダークモードトグルをONにして保存できる
test.fixme('Q3: ダークモードトグルをONにして保存できる', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Act: navigate() → darkmode トグルをクリック → save()
  // Assert: トースト "表示設定を保存しました" が表示される
});

// Q4: リセットするとトグルが初期状態に戻る
test.fixme('Q4: リセットするとトグルが初期状態に戻る', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Arrange: navigate() → darkmode をON → save()
  // Act: reset()
  // Assert: darkmode が OFF、compact/cover/rating が ON
});

// Q5: トグルをONにして保存後、ページを再表示しても設定が保持されている
test.fixme('Q5: 保存した設定がページ遷移後も保持される', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Arrange: navigate() → darkmode をON → save()
  // Act: 別ページに遷移 → 再度 navigate()
  // Assert: darkmode が ON のままであることを検証
});

// Q6: アニメーショントグルをONにして保存できる
test.fixme('Q6: アニメーショントグルをONにして保存できる', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Act: navigate() → animation トグルをクリック → save()
  // Assert: トースト "表示設定を保存しました" が表示される
});

// Q7: 全トグルをONにしてリセットすると初期値に戻る
test.fixme('Q7: 全トグルをONにしてリセットすると初期値に戻る', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Arrange: navigate() → 全トグルをON → save()
  // Act: reset()
  // Assert: darkmode=OFF, compact=ON, cover=ON, rating=ON, animation=OFF
});

// Q8: コンパクト表示をOFFにして保存できる
test.fixme('Q8: コンパクト表示をOFFにして保存できる', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Act: navigate() → compact トグルをクリック（OFF にする）→ save()
  // Assert: トーストが表示され、compact が OFF であることを検証
});

// ========================
// メールアドレス変更（Email Change）Q9〜Q15
// ========================

// Q9: メールアドレス変更ページに遷移できる
test.fixme('Q9: メールアドレス変更ページに遷移できる', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Act: EmailPage.navigate()
  // Assert: 現在のメールが "admin@example.com" であることを検証
});

// Q10: 正しい情報を入力してメールアドレスを変更できる
test.fixme('Q10: 正しい情報を入力してメールアドレスを変更できる', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Act: navigate() → 新メール・確認・パスワードを入力 → save()
  // Assert: トースト "メールアドレスを変更しました" が表示される
});

// Q11: 何も入力せず変更ボタンを押すとエラーが表示される
test.fixme('Q11: 何も入力せず変更ボタンを押すとエラーが表示される', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Act: navigate() → save()
  // Assert: エラーメッセージが表示される
});

// Q12: パスワードが間違っているとエラーが表示される
test.fixme('Q12: パスワードが間違っているとエラーが表示される', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Act: 正しいメールを入力し、間違ったパスワードで save()
  // Assert: #email-password-wrong "パスワードが正しくありません" が表示される
});

// Q13: 新しいメールアドレスと確認用が一致しないとエラーが表示される
test.fixme('Q13: メールアドレスが一致しないとエラーが表示される', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Act: 異なるメールアドレスを入力して save()
  // Assert: #email-confirm-error "メールアドレスが一致しません" が表示される
});

// Q14: 不正なメールアドレス形式だとエラーが表示される
test.fixme('Q14: 不正なメールアドレス形式だとエラーが表示される', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Act: "invalid-email" を入力して save()
  // Assert: #email-new-error "正しいメールアドレスを入力してください" が表示される
});

// Q15: キャンセルボタンを押すと入力内容がクリアされる
test.fixme('Q15: キャンセルボタンを押すと入力内容がクリアされる', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Arrange: navigate() → フィールドに値を入力
  // Act: cancel()
  // Assert: 全フィールドが空になっていることを検証
});
