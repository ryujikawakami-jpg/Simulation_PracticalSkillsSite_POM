import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DisplayPage } from '../pages/DisplayPage';
import { EmailPage } from '../pages/EmailPage';

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

// 表示設定

test('Q1: 表示設定ページに遷移できる', async () => {
  // Arrange: beforeEachでログインを行う

  // Act: 表示設定ページへ移動する
  await displayPage.navigate();

  // Assert: ダークモードの操作ラベルが表示されることを検証する
  await expect(displayPage.darkModeLabel).toBeVisible();
});

test('Q2: デフォルトでコンパクト表示・表紙表示・評価表示がONになっている', async () => {
  // Arrange: beforeEachでログインを行う

  // Act: 表示設定ページへ移動する
  await displayPage.navigate();

  // Assert: 初期トグル状態を検証する
  await expect(displayPage.compactToggle).toBeChecked();
  await expect(displayPage.coverToggle).toBeChecked();
  await expect(displayPage.ratingToggle).toBeChecked();
  await expect(displayPage.darkModeToggle).not.toBeChecked();
  await expect(displayPage.animationToggle).not.toBeChecked();
});

test('Q3: ダークモードをONにして保存できる', async () => {
  // Arrange: 表示設定ページを開く
  await displayPage.navigate();

  // Act: ダークモードをONにして保存する
  await displayPage.setDarkMode(true);
  await displayPage.save();

  // Assert: 保存完了のトーストが表示されることを検証する
  await expect(displayPage.saveToast).toBeVisible();
});

test('Q4: リセットするとトグルが初期状態に戻る', async () => {
  // Arrange: 表示設定を開き、ダークモードをONにして保存する
  await displayPage.navigate();
  await displayPage.setDarkMode(true);
  await displayPage.save();

  // Act: 表示設定を初期状態に戻す
  await displayPage.reset();

  // Assert: すべてのトグルが初期状態であることを検証する
  await expect(displayPage.darkModeToggle).not.toBeChecked();
  await expect(displayPage.compactToggle).toBeChecked();
  await expect(displayPage.coverToggle).toBeChecked();
  await expect(displayPage.ratingToggle).toBeChecked();
  await expect(displayPage.animationToggle).not.toBeChecked();
});

test('Q5: 保存した設定がページ遷移後も保持される', async () => {
  // Arrange: ダークモードをONにして保存する
  await displayPage.navigate();
  await displayPage.setDarkMode(true);
  await displayPage.save();

  // Act: 書籍一覧へ移動してから表示設定ページを再度開く
  await displayPage.navigateToBooks();
  await displayPage.navigate();

  // Assert: ダークモードがONのまま保持されることを検証する
  await expect(displayPage.darkModeToggle).toBeChecked();
});

test('Q6: アニメーションをONにして保存できる', async () => {
  // Arrange: 表示設定ページを開く
  await displayPage.navigate();

  // Act: アニメーションをONにして保存する
  await displayPage.setAnimation(true);
  await displayPage.save();

  // Assert: 保存完了のトーストが表示されることを検証する
  await expect(displayPage.saveToast).toBeVisible();
});

test('Q7: 全トグルをONにしてリセットすると初期値に戻る', async () => {
  // Arrange: 表示設定を開き、全トグルをONにして保存する
  await displayPage.navigate();
  await displayPage.setDarkMode(true);
  await displayPage.setCompact(true);
  await displayPage.setCover(true);
  await displayPage.setRating(true);
  await displayPage.setAnimation(true);
  await displayPage.save();

  // Act: 表示設定を初期状態に戻す
  await displayPage.reset();

  // Assert: すべてのトグルが初期値に戻ったことを検証する
  await expect(displayPage.darkModeToggle).not.toBeChecked();
  await expect(displayPage.compactToggle).toBeChecked();
  await expect(displayPage.coverToggle).toBeChecked();
  await expect(displayPage.ratingToggle).toBeChecked();
  await expect(displayPage.animationToggle).not.toBeChecked();
});

test('Q8: コンパクト表示をOFFにして保存できる', async () => {
  // Arrange: 表示設定ページを開く
  await displayPage.navigate();

  // Act: コンパクト表示をOFFにして保存する
  await displayPage.setCompact(false);
  await displayPage.save();

  // Assert: 保存完了のトーストとOFF状態を検証する
  await expect(displayPage.saveToast).toBeVisible();
  await expect(displayPage.compactToggle).not.toBeChecked();
});

// メールアドレス変更

test('Q9: メールアドレス変更ページに遷移できる', async () => {
  // Arrange: beforeEachでログインを行う

  // Act: メールアドレス変更ページへ移動する
  await emailPage.navigate();

  // Assert: 現在のメールアドレスが管理者のものと一致することを検証する
  await expect(emailPage.currentEmail).toHaveValue('admin@example.com');
});

test('Q10: 正しい情報を入力してメールアドレスを変更できる', async () => {
  // Arrange: メールアドレス変更ページを開く
  await emailPage.navigate();

  // Act: 有効な新しいメールアドレスとパスワードで送信する
  await emailPage.submitEmailChange('new@example.com', 'new@example.com', 'password');

  // Assert: 変更完了のトーストと入力欄のクリアを検証する
  await expect(emailPage.saveToast).toBeVisible();
  await expect(emailPage.newEmailInput).toHaveValue('');
  await expect(emailPage.confirmEmailInput).toHaveValue('');
  await expect(emailPage.passwordInput).toHaveValue('');
});

test('Q11: 必須情報が未入力の場合にエラーが表示される', async () => {
  // Arrange: メールアドレス変更ページを開く
  await emailPage.navigate();

  // Act: 空欄のまま保存する
  await emailPage.save();

  // Assert: メールアドレスとパスワードの必須エラーを検証する
  await expect(emailPage.newEmailError).toBeVisible();
  await expect(emailPage.passwordError).toBeVisible();
});

test('Q12: パスワードが間違っている場合にエラーが表示される', async () => {
  // Arrange: メールアドレス変更ページを開く
  await emailPage.navigate();

  // Act: 有効なメールアドレスと誤ったパスワードで送信する
  await emailPage.submitEmailChange('new@example.com', 'new@example.com', 'wrongpassword');

  // Assert: パスワードエラーの内容を検証する
  await expect(emailPage.incorrectPasswordError).toBeVisible();
  await expect(emailPage.incorrectPasswordError).toContainText('パスワードが正しくありません');
});

test('Q13: メールアドレスが一致しない場合にエラーが表示される', async () => {
  // Arrange: メールアドレス変更ページを開く
  await emailPage.navigate();

  // Act: 確認用と異なるメールアドレスを入力して送信する
  await emailPage.submitEmailChange('new@example.com', 'different@example.com', 'password');

  // Assert: 確認用メールアドレスのエラーを検証する
  await expect(emailPage.confirmEmailError).toBeVisible();
  await expect(emailPage.confirmEmailError).toContainText('メールアドレスが一致しません');
});

test('Q14: 不正なメールアドレス形式の場合にエラーが表示される', async () => {
  // Arrange: メールアドレス変更ページを開く
  await emailPage.navigate();

  // Act: 不正な形式のメールアドレスを入力して送信する
  await emailPage.submitEmailChange('invalid-email', 'invalid-email', 'password');

  // Assert: メールアドレス形式のエラーを検証する
  await expect(emailPage.newEmailError).toBeVisible();
  await expect(emailPage.newEmailError).toContainText('正しいメールアドレスを入力してください');
});

test('Q15: キャンセルすると入力内容がクリアされる', async () => {
  // Arrange: メールアドレス変更ページを開いて入力する
  await emailPage.navigate();
  await emailPage.fillNewEmail('test@example.com');
  await emailPage.fillConfirmEmail('test@example.com');
  await emailPage.fillPassword('password');

  // Act: 入力内容をキャンセルする
  await emailPage.cancel();

  // Assert: すべての編集可能な入力欄が空であることを検証する
  await expect(emailPage.newEmailInput).toHaveValue('');
  await expect(emailPage.confirmEmailInput).toHaveValue('');
  await expect(emailPage.passwordInput).toHaveValue('');
});
