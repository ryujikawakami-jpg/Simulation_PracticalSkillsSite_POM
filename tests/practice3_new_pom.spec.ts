import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DisplayPage } from '../pages/DisplayPage';
import { EmailPage } from '../pages/EmailPage';

// ============================================================
// Practice 3: POM 新規作成 — DisplayPage / EmailPage
// ============================================================
// DisplayPage.ts と EmailPage.ts を新規作成してから、
// 各テストを test.fixme() → test() に変更してテストを完成させてください。
//
// --- DisplayPage に必要な要素 ---
// ナビゲーション: nav-display
// トグル（CSS で隠れた checkbox。input 自体は visible=false なので直接 click() できない）:
//   囲っている <label> を掴んで setChecked(true/false) で操作する
//     page.locator('label:has([data-testid="display-darkmode"])').setChecked(true)
//   ※ evaluate(el => el.click()) でも動くが、Playwright のチェックを全部飛ばすため
//     「押せないはずのときも押せてしまう」。テストとしては上の書き方を使うこと
//   ※ toggle（反転）ではなく setChecked（状態を指定）にすると、実行順に依存しなくなる
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
let displayPage: DisplayPage;
let emailPage: EmailPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  displayPage = new DisplayPage(page);
  emailPage = new EmailPage(page);
  await loginPage.goto();
  await loginPage.loginAsAdmin();
});

// ========================
// 表示設定（Display Settings）Q1〜Q8
// ========================

// Q1: 表示設定ページに遷移できる
test('Q1: 表示設定ページに遷移できる', async ({ page }) => {
  // Arrange: beforeEach でログイン済み
  // Act
  await displayPage.navigate();
  // Assert
  await expect(displayPage.saveButton).toBeVisible();
});

// Q2: デフォルトでコンパクト表示・表紙表示・評価表示がONになっている
test('Q2: デフォルトでコンパクト表示・表紙表示・評価表示がONになっている', async ({ page }) => {
  // Arrange: beforeEach でログイン済み
  // Act
  await displayPage.navigate();
  // Assert
  expect(await displayPage.isCompactChecked()).toBe(true);
  expect(await displayPage.isCoverChecked()).toBe(true);
  expect(await displayPage.isRatingChecked()).toBe(true);
  expect(await displayPage.isDarkmodeChecked()).toBe(false);
  expect(await displayPage.isAnimationChecked()).toBe(false);
});

// Q3: ダークモードトグルをONにして保存できる
test('Q3: ダークモードトグルをONにして保存できる', async ({ page }) => {
  // Arrange
  await displayPage.navigate();
  // Act
  await displayPage.setDarkmode(true);
  await displayPage.save();
  // Assert
  await expect(page.getByText('表示設定を保存しました')).toBeVisible();
});

// Q4: リセットするとトグルが初期状態に戻る
test('Q4: リセットするとトグルが初期状態に戻る', async ({ page }) => {
  // Arrange
  await displayPage.navigate();
  await displayPage.setDarkmode(true);
  await displayPage.save();
  // Act
  await displayPage.reset();
  // Assert
  expect(await displayPage.isDarkmodeChecked()).toBe(false);
  expect(await displayPage.isCompactChecked()).toBe(true);
  expect(await displayPage.isCoverChecked()).toBe(true);
  expect(await displayPage.isRatingChecked()).toBe(true);
});

// Q5: トグルをONにして保存後、ページを再表示しても設定が保持されている
test('Q5: 保存した設定がページ遷移後も保持される', async ({ page }) => {
  // Arrange
  await displayPage.navigate();
  await displayPage.setDarkmode(true);
  await displayPage.save();
  // Act
  await page.getByTestId('nav-books').click();
  await displayPage.navigate();
  // Assert
  expect(await displayPage.isDarkmodeChecked()).toBe(true);
});

// Q6: アニメーショントグルをONにして保存できる
test('Q6: アニメーショントグルをONにして保存できる', async ({ page }) => {
  // Arrange
  await displayPage.navigate();
  // Act
  await displayPage.setAnimation(true);
  await displayPage.save();
  // Assert
  await expect(page.getByText('表示設定を保存しました')).toBeVisible();
});

// Q7: 全トグルをONにしてリセットすると初期値に戻る
test('Q7: 全トグルをONにしてリセットすると初期値に戻る', async ({ page }) => {
  // Arrange
  await displayPage.navigate();
  await displayPage.setDarkmode(true);
  await displayPage.setCompact(true);
  await displayPage.setCover(true);
  await displayPage.setRating(true);
  await displayPage.setAnimation(true);
  await displayPage.save();
  // Act
  await displayPage.reset();
  // Assert
  expect(await displayPage.isDarkmodeChecked()).toBe(false);
  expect(await displayPage.isCompactChecked()).toBe(true);
  expect(await displayPage.isCoverChecked()).toBe(true);
  expect(await displayPage.isRatingChecked()).toBe(true);
  expect(await displayPage.isAnimationChecked()).toBe(false);
});

// Q8: コンパクト表示をOFFにして保存できる
test('Q8: コンパクト表示をOFFにして保存できる', async ({ page }) => {
  // Arrange
  await displayPage.navigate();
  // Act
  await displayPage.setCompact(false);
  await displayPage.save();
  // Assert
  await expect(page.getByText('表示設定を保存しました')).toBeVisible();
  expect(await displayPage.isCompactChecked()).toBe(false);
});

// ========================
// メールアドレス変更（Email Change）Q9〜Q15
// ========================

// Q9: メールアドレス変更ページに遷移できる
test('Q9: メールアドレス変更ページに遷移できる', async ({ page }) => {
  // Arrange: beforeEach でログイン済み
  // Act
  await emailPage.navigate();
  // Assert
  await expect(emailPage.currentEmail).toHaveValue('admin@example.com');
});

// Q10: 正しい情報を入力してメールアドレスを変更できる
test('Q10: 正しい情報を入力してメールアドレスを変更できる', async ({ page }) => {
  // Arrange
  await emailPage.navigate();
  // Act
  await emailPage.changeEmail('new@example.com', 'new@example.com', 'password');
  // Assert
  await expect(page.getByText('メールアドレスを変更しました')).toBeVisible();
});

// Q11: 何も入力せず変更ボタンを押すとエラーが表示される
test('Q11: 何も入力せず変更ボタンを押すとエラーが表示される', async ({ page }) => {
  // Arrange
  await emailPage.navigate();
  // Act
  await emailPage.save();
  // Assert
  await expect(emailPage.newEmailError).toBeVisible();
  await expect(emailPage.passwordError).toBeVisible();
});

// Q12: パスワードが間違っているとエラーが表示される
test('Q12: パスワードが間違っているとエラーが表示される', async ({ page }) => {
  // Arrange
  await emailPage.navigate();
  // Act
  await emailPage.changeEmail('new@example.com', 'new@example.com', 'wrongpassword');
  // Assert
  await expect(emailPage.passwordWrong).toBeVisible();
  await expect(emailPage.passwordWrong).toContainText('パスワードが正しくありません');
});

// Q13: 新しいメールアドレスと確認用が一致しないとエラーが表示される
test('Q13: メールアドレスが一致しないとエラーが表示される', async ({ page }) => {
  // Arrange
  await emailPage.navigate();
  // Act
  await emailPage.changeEmail('new@example.com', 'different@example.com', 'password');
  // Assert
  await expect(emailPage.confirmError).toBeVisible();
  await expect(emailPage.confirmError).toContainText('メールアドレスが一致しません');
});

// Q14: 不正なメールアドレス形式だとエラーが表示される
test('Q14: 不正なメールアドレス形式だとエラーが表示される', async ({ page }) => {
  // Arrange
  await emailPage.navigate();
  // Act
  await emailPage.fillNewEmail('invalid-email');
  await emailPage.fillConfirmEmail('invalid-email');
  await emailPage.fillPassword('password');
  await emailPage.save();
  // Assert
  await expect(emailPage.newEmailError).toBeVisible();
  await expect(emailPage.newEmailError).toContainText('正しいメールアドレスを入力してください');
});

// Q15: キャンセルボタンを押すと入力内容がクリアされる
test('Q15: キャンセルボタンを押すと入力内容がクリアされる', async ({ page }) => {
  // Arrange: navigate() → フィールドに値を入力
  await emailPage.navigate();
  await emailPage.fillNewEmail('test@example.com');
  await emailPage.fillConfirmEmail('test@example.com');
  await emailPage.fillPassword('password');
  // Act: cancel()
  await emailPage.cancel();
  // Assert: 全フィールドが空になっていることを検証
  await expect(emailPage.newEmail).toHaveValue('');
  await expect(emailPage.confirmEmail).toHaveValue('');
  await expect(emailPage.password).toHaveValue('');
});
