import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DisplayPage } from './pages/DisplayPage.answer';
import { EmailPage } from './pages/EmailPage.answer';

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
test('Q1: 表示設定ページに遷移できる', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
  // Act
  await displayPage.navigate();
  // Assert
  await expect(displayPage.saveButton).toBeVisible();
});

// Q2: デフォルトでコンパクト表示・表紙表示・評価表示がONになっている
test('Q2: デフォルトでコンパクト表示・表紙表示・評価表示がONになっている', async ({ page }) => {
  // Arrange: （beforeEach でセットアップ済み）
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
  await displayPage.toggleDarkmode();
  await displayPage.save();
  // Assert
  await expect(page.getByText('表示設定を保存しました')).toBeVisible();
});

// Q4: リセットするとトグルが初期状態に戻る
test('Q4: リセットするとトグルが初期状態に戻る', async ({ page }) => {
  // Arrange
  await displayPage.navigate();
  await displayPage.toggleDarkmode();
  await displayPage.save();
  // Act
  await displayPage.reset();
  // Assert
  expect(await displayPage.isDarkmodeChecked()).toBe(false);
  expect(await displayPage.isCompactChecked()).toBe(true);
  expect(await displayPage.isCoverChecked()).toBe(true);
  expect(await displayPage.isRatingChecked()).toBe(true);
});

// Q5: 保存した設定がページ遷移後も保持される
test('Q5: 保存した設定がページ遷移後も保持される', async ({ page }) => {
  // Arrange
  await displayPage.navigate();
  await displayPage.toggleDarkmode();
  await displayPage.save();
  // Act: 別のページに遷移して戻る
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
  await displayPage.toggleAnimation();
  await displayPage.save();
  // Assert
  await expect(page.getByText('表示設定を保存しました')).toBeVisible();
});

// Q7: 全トグルをONにしてリセットすると初期値に戻る
test('Q7: 全トグルをONにしてリセットすると初期値に戻る', async ({ page }) => {
  // Arrange
  await displayPage.navigate();
  await displayPage.toggleDarkmode();    // OFF → ON
  await displayPage.toggleAnimation();   // OFF → ON
  // compact, cover, rating are already ON
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
  await displayPage.toggleCompact();  // ON → OFF
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
  // Arrange: （beforeEach でセットアップ済み）
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

// Q13: メールアドレスが一致しないとエラーが表示される
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
  // Arrange
  await emailPage.navigate();
  await emailPage.fillNewEmail('test@example.com');
  await emailPage.fillConfirmEmail('test@example.com');
  await emailPage.fillPassword('password');
  // Act
  await emailPage.cancel();
  // Assert
  await expect(emailPage.newEmail).toHaveValue('');
  await expect(emailPage.confirmEmail).toHaveValue('');
  await expect(emailPage.password).toHaveValue('');
});
