import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DisplayPage } from '../pages/DisplayPage';
import { EmailPage } from '../pages/EmailPage';

const ADMIN_PASSWORD = 'password';

let loginPage: LoginPage;
let displayPage: DisplayPage;
let emailPage: EmailPage;

test.beforeEach(async ({ page }) => {
  loginPage   = new LoginPage(page);
  displayPage = new DisplayPage(page);
  emailPage   = new EmailPage(page);
  await loginPage.goto();
  await loginPage.loginAsAdmin();
});

// ========================
// 表示設定（Display Settings）Q1〜Q8
// ========================

// Q1: 表示設定ページに遷移できる
test('Q1: 表示設定ページに遷移できる', async () => {
  // Arrange: beforeEachでログイン済み
  // Act: 表示設定ページへ遷移する
  await displayPage.navigate();
  // Assert: ページ内にトグルが表示されていることを検証する
  await expect(displayPage.darkmodeLabel).toBeVisible();
});

// Q2: デフォルトでコンパクト表示・表紙表示・評価表示がONになっている
test('Q2: デフォルトでコンパクト表示・表紙表示・評価表示がONになっている', async () => {
  // Arrange: beforeEachでログイン済み
  // Act: 表示設定ページへ遷移する
  await displayPage.navigate();
  // Assert: コンパクト表示・表紙表示・評価表示がONになっていることを検証する
  await expect(displayPage.compactInput).toBeChecked();
  await expect(displayPage.coverInput).toBeChecked();
  await expect(displayPage.ratingInput).toBeChecked();
});

// Q3: ダークモードトグルをONにして保存できる
test('Q3: ダークモードトグルをONにして保存できる', async () => {
  // Arrange: 表示設定ページへ遷移する
  await displayPage.navigate();
  // Act: ダークモードをONにして保存する
  await displayPage.setDarkmode(true);
  await displayPage.save();
  // Assert: 保存完了のトーストが表示されることを検証する
  await expect(displayPage.toast).toContainText('表示設定を保存しました');
});

// Q4: リセットするとトグルが初期状態に戻る
test('Q4: リセットするとトグルが初期状態に戻る', async () => {
  // Arrange: 表示設定ページでダークモードをONにして保存する
  await displayPage.navigate();
  await displayPage.setDarkmode(true);
  await displayPage.save();
  // Act: リセットボタンを押す
  await displayPage.reset();
  // Assert: ダークモードがOFF、コンパクト・表紙・評価表示がONに戻ることを検証する
  await expect(displayPage.darkmodeInput).not.toBeChecked();
  await expect(displayPage.compactInput).toBeChecked();
  await expect(displayPage.coverInput).toBeChecked();
  await expect(displayPage.ratingInput).toBeChecked();
});

// Q5: トグルをONにして保存後、ページを再表示しても設定が保持されている
test('Q5: 保存した設定がページ遷移後も保持される', async () => {
  // Arrange: 表示設定ページでダークモードをONにして保存する
  await displayPage.navigate();
  await displayPage.setDarkmode(true);
  await displayPage.save();
  // Act: 別ページ（メール変更）に遷移してから再度表示設定ページへ戻る
  await emailPage.navigate();
  await displayPage.navigate();
  // Assert: ダークモードがONのまま保持されていることを検証する
  await expect(displayPage.darkmodeInput).toBeChecked();
});

// Q6: アニメーショントグルをONにして保存できる
test('Q6: アニメーショントグルをONにして保存できる', async () => {
  // Arrange: 表示設定ページへ遷移する
  await displayPage.navigate();
  // Act: アニメーションをONにして保存する
  await displayPage.setAnimation(true);
  await displayPage.save();
  // Assert: 保存完了のトーストが表示されることを検証する
  await expect(displayPage.toast).toContainText('表示設定を保存しました');
});

// Q7: 全トグルをONにしてリセットすると初期値に戻る
test('Q7: 全トグルをONにしてリセットすると初期値に戻る', async () => {
  // Arrange: 表示設定ページで全トグルをONにして保存する
  await displayPage.navigate();
  await displayPage.enableAllToggles();
  await displayPage.save();
  // Act: リセットボタンを押す
  await displayPage.reset();
  // Assert: すべてのトグルが初期状態に戻ることを検証する
  await expect(displayPage.darkmodeInput).not.toBeChecked();
  await expect(displayPage.compactInput).toBeChecked();
  await expect(displayPage.coverInput).toBeChecked();
  await expect(displayPage.ratingInput).toBeChecked();
  await expect(displayPage.animationInput).not.toBeChecked();
});

// Q8: コンパクト表示をOFFにして保存できる
test('Q8: コンパクト表示をOFFにして保存できる', async () => {
  // Arrange: 表示設定ページへ遷移する
  await displayPage.navigate();
  // Act: コンパクト表示をOFFにして保存する
  await displayPage.setCompact(false);
  await displayPage.save();
  // Assert: トーストが表示され、コンパクト表示がOFFになっていることを検証する
  await expect(displayPage.toast).toContainText('表示設定を保存しました');
  await expect(displayPage.compactInput).not.toBeChecked();
});

// ========================
// メールアドレス変更（Email Change）Q9〜Q15
// ========================

// Q9: メールアドレス変更ページに遷移できる
test('Q9: メールアドレス変更ページに遷移できる', async () => {
  // Arrange: beforeEachでログイン済み
  // Act: メールアドレス変更ページへ遷移する
  await emailPage.navigate();
  // Assert: 現在のメールアドレスが「admin@example.com」であることを検証する
  await expect(emailPage.currentEmailInput).toHaveValue('admin@example.com');
});

// Q10: 正しい情報を入力してメールアドレスを変更できる
test('Q10: 正しい情報を入力してメールアドレスを変更できる', async () => {
  // Arrange: メールアドレス変更ページへ遷移する
  await emailPage.navigate();
  // Act: 新メール・確認用メール・正しいパスワードを入力して保存する
  await emailPage.fillEmailForm('newadmin@example.com', 'newadmin@example.com', ADMIN_PASSWORD);
  await emailPage.save();
  // Assert: 変更完了のトーストが表示されることを検証する
  await expect(emailPage.toast).toContainText('メールアドレスを変更しました');
});

// Q11: 何も入力せず変更ボタンを押すとエラーが表示される
test('Q11: 何も入力せず変更ボタンを押すとエラーが表示される', async () => {
  // Arrange: メールアドレス変更ページへ遷移する
  await emailPage.navigate();
  // Act: 何も入力せずに保存ボタンを押す
  await emailPage.save();
  // Assert: 入力エラーメッセージが表示されることを検証する
  await expect(emailPage.newEmailError).toBeVisible();
});

// Q12: パスワードが間違っているとエラーが表示される
test('Q12: パスワードが間違っているとエラーが表示される', async () => {
  // Arrange: メールアドレス変更ページへ遷移する
  await emailPage.navigate();
  // Act: 正しいメールアドレスと間違ったパスワードを入力して保存する
  await emailPage.fillEmailForm('newadmin@example.com', 'newadmin@example.com', 'wrongpass');
  await emailPage.save();
  // Assert: パスワード誤りのエラーメッセージが表示されることを検証する
  await expect(emailPage.passwordWrongError).toHaveText('パスワードが正しくありません');
});

// Q13: 新しいメールアドレスと確認用が一致しないとエラーが表示される
test('Q13: メールアドレスが一致しないとエラーが表示される', async () => {
  // Arrange: メールアドレス変更ページへ遷移する
  await emailPage.navigate();
  // Act: 異なるメールアドレスを入力して保存する
  await emailPage.fillEmailForm('new1@example.com', 'new2@example.com', ADMIN_PASSWORD);
  await emailPage.save();
  // Assert: メールアドレス不一致のエラーメッセージが表示されることを検証する
  await expect(emailPage.confirmEmailError).toHaveText('メールアドレスが一致しません');
});

// Q14: 不正なメールアドレス形式だとエラーが表示される
test('Q14: 不正なメールアドレス形式だとエラーが表示される', async () => {
  // Arrange: メールアドレス変更ページへ遷移する
  await emailPage.navigate();
  // Act: 不正な形式のメールアドレスを入力して保存する
  await emailPage.fillEmailForm('invalid-email', 'invalid-email', ADMIN_PASSWORD);
  await emailPage.save();
  // Assert: メール形式エラーのメッセージが表示されることを検証する
  await expect(emailPage.newEmailError).toHaveText('正しいメールアドレスを入力してください');
});

// Q15: キャンセルボタンを押すと入力内容がクリアされる
test('Q15: キャンセルボタンを押すと入力内容がクリアされる', async () => {
  // Arrange: メールアドレス変更ページで各フィールドに値を入力する
  await emailPage.navigate();
  await emailPage.fillEmailForm('newadmin@example.com', 'newadmin@example.com', ADMIN_PASSWORD);
  // Act: キャンセルボタンを押す
  await emailPage.cancel();
  // Assert: 入力した3つのフィールドがすべて空になっていることを検証する
  await expect(emailPage.newEmailInput).toHaveValue('');
  await expect(emailPage.confirmEmailInput).toHaveValue('');
  await expect(emailPage.passwordInput).toHaveValue('');
});
