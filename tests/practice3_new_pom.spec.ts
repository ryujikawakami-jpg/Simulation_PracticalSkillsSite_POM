import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BookPage } from '../pages/BookPage';
import { DisplayPage } from '../pages/DisplayPage';
import { EmailPage } from '../pages/EmailPage';

// ============================================================
// Practice 3: POM 新規作成 — DisplayPage / EmailPage
// ============================================================

let loginPage: LoginPage;
let bookPage: BookPage;
let displayPage: DisplayPage;
let emailPage: EmailPage;


test.beforeEach(async ({ page }) => {
  loginPage   = new LoginPage(page);
  bookPage    = new BookPage(page);
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
  // Arrange: beforeEachでセットアップ済み
  // Act: DisplayPage.navigate()
  await displayPage.navigate();
  // Assert: ページ内にトグルが表示されていることを検証
  await expect(displayPage.darkMode).toBeVisible();
  await expect(displayPage.compact).toBeVisible();
  await expect(displayPage.cover).toBeVisible();
  await expect(displayPage.rating).toBeVisible();
  await expect(displayPage.animation).toBeVisible();  
});

// Q2: デフォルトでコンパクト表示・表紙表示・評価表示がONになっている
test('Q2: デフォルトでコンパクト表示・表紙表示・評価表示がONになっている', async ({ page }) => {
  // Arrange: beforeEachでセットアップ済み
  // Act: navigate()
  await displayPage.navigate();
  const compact = await displayPage.isCompactChecked();
  const cover = await displayPage.isCoverChecked();
  const rating = await displayPage.isRatingChecked();
  // Assert: compact, cover, rating が checked であることを検証
  expect(compact).toBe(true);
  expect(cover).toBe(true);
  expect(rating).toBe(true);
});

// Q3: ダークモードトグルをONにして保存できる
test('Q3: ダークモードトグルをONにして保存できる', async ({ page }) => {
  // Arrange: beforeEachでセットアップ済み
  // Act: navigate() → darkmode トグルをクリック → save()
  await displayPage.navigate();
  await displayPage.setDarkMode(true);
  await displayPage.save();
  // Assert: トースト "表示設定を保存しました" が表示される
  await expect(displayPage.successToast).toBeVisible();
  const darkMode = await displayPage.isDarkModeChecked();
  expect(darkMode).toBe(true);
});

// Q4: リセットするとトグルが初期状態に戻る
test('Q4: リセットするとトグルが初期状態に戻る', async ({ page }) => {
  // Arrange: navigate() → darkmode をON → save()
  await displayPage.navigate();
  await displayPage.setDarkMode(true);
  await displayPage.save();
  expect(await displayPage.isDarkModeChecked()).toBe(true);
  // Act: reset()
  await displayPage.reset();
  // Assert: darkmode が OFF、compact/cover/rating が ON
  const darkMode = await displayPage.isDarkModeChecked();
  const compact = await displayPage.isCompactChecked();
  const cover = await displayPage.isCoverChecked();
  const rating = await displayPage.isRatingChecked();
  expect(darkMode).toBe(false);
  expect(compact).toBe(true);
  expect(cover).toBe(true);
  expect(rating).toBe(true);
});

// Q5: トグルをONにして保存後、ページを再表示しても設定が保持されている
test('Q5: 保存した設定がページ遷移後も保持される', async ({ page }) => {
  // Arrange: beforeEachでセットアップ済み
  // Arrange: navigate() → darkmode をON → save()
  await displayPage.navigate();
  await displayPage.setDarkMode(true);
  await displayPage.save();
  // Act: 別ページに遷移 → 再度 navigate()
  await bookPage.navigate();
  await displayPage.navigate();
  // Assert: darkmode が ON のままであることを検証
  const darkMode = await displayPage.isDarkModeChecked();
  expect(darkMode).toBe(true);
});

// Q6: アニメーショントグルをONにして保存できる
test('Q6: アニメーショントグルをONにして保存できる', async ({ page }) => {
  // Arrange: beforeEachでセットアップ済み
  // Act: navigate() → animation トグルをクリック → save()
  await displayPage.navigate();
  await displayPage.setAnimation(true);
  await displayPage.save();
  // Assert: トースト "表示設定を保存しました" が表示される
  await expect(displayPage.successToast).toBeVisible();
  const animation = await displayPage.isAnimationChecked();
  expect(animation).toBe(true);
});

// Q7: 全トグルをONにしてリセットすると初期値に戻る
test('Q7: 全トグルをONにしてリセットすると初期値に戻る', async ({ page }) => {
  // Arrange: navigate() → 全トグルをON → save()
  await displayPage.navigate();
  await displayPage.setDarkMode(true);
  await displayPage.setCompact(true);
  await displayPage.setCover(true);
  await displayPage.setRating(true);
  await displayPage.setAnimation(true);
  await displayPage.save();
  // Act: reset()
  await displayPage.reset();
  // Assert: darkmode=OFF, compact=ON, cover=ON, rating=ON, animation=OFF
  const darkMode = await displayPage.isDarkModeChecked();
  const compact = await displayPage.isCompactChecked();
  const cover = await displayPage.isCoverChecked();
  const rating = await displayPage.isRatingChecked();
  const animation = await displayPage.isAnimationChecked();
  expect(darkMode).toBe(false);
  expect(compact).toBe(true);
  expect(cover).toBe(true);
  expect(rating).toBe(true);
  expect(animation).toBe(false);
});

// Q8: コンパクト表示をOFFにして保存できる
test('Q8: コンパクト表示をOFFにして保存できる', async ({ page }) => {
  // Act: navigate() → compact トグルをクリック（OFF にする）→ save()
  await displayPage.navigate();
  await displayPage.setCompact(false);
  await displayPage.save();
  // Assert: トーストが表示され、compact が OFF であることを検証
  await expect(displayPage.successToast).toBeVisible();
  const compact = await displayPage.isCompactChecked();
  expect(compact).toBe(false);
});

// ========================
// メールアドレス変更（Email Change）Q9〜Q15
// ========================

// Q9: メールアドレス変更ページに遷移できる
test('Q9: メールアドレス変更ページに遷移できる', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Act: EmailPage.navigate()
  await emailPage.navigate();
  // Assert: 現在のメールが "admin@example.com" であることを検証
  const currentEmail = await emailPage.getCurrentEmail();
  expect(currentEmail).toBe('admin@example.com');
});

// Q10: 正しい情報を入力してメールアドレスを変更できる
test('Q10: 正しい情報を入力してメールアドレスを変更できる', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  //Arrange
  await emailPage.navigate();
  const newEmail = 'new@example.com';
  const password = 'password';
  // Act: navigate() → 新メール・確認・パスワードを入力 → save()
  await emailPage.fillNewEmail(newEmail);
  await emailPage.fillConfirmEmail(newEmail);
  await emailPage.fillPassword(password);
  await emailPage.save();
  // Assert: トースト "メールアドレスを変更しました" が表示される
  await expect(emailPage.successToast).toBeVisible();
  const newEmailValue = await emailPage.getNewEmail();
  const confirmEmailValue = await emailPage.getConfirmEmail();
  const passwordValue = await emailPage.getPassword();
  expect(newEmailValue).toBe('');
  expect(confirmEmailValue).toBe('');
  expect(passwordValue).toBe('');
});

// Q11: 何も入力せず変更ボタンを押すとエラーが表示される
test('Q11: 何も入力せず変更ボタンを押すとエラーが表示される', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Act: navigate() → save()
  await emailPage.navigate();
  await emailPage.save();
  // Assert: エラーメッセージが表示される
  await expect(emailPage.newEmailError)
    .toHaveText('正しいメールアドレスを入力してください');
  await expect(emailPage.passwordError)
    .toHaveText('パスワードを入力してください');
});

// Q12: パスワードが間違っているとエラーが表示される
test('Q12: パスワードが間違っているとエラーが表示される', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  //Arrange
  await emailPage.navigate();
  const newEmail = 'new@example.com';
  const wrongPassword = 'wrongpassword';
  // Act: 正しいメールを入力し、間違ったパスワードで save()
  await emailPage.fillNewEmail(newEmail);
  await emailPage.fillConfirmEmail(newEmail);
  await emailPage.fillPassword(wrongPassword);
  await emailPage.save();
  // Assert: #email-password-wrong "パスワードが正しくありません" が表示される
  await expect(emailPage.passwordWrong)
    .toHaveText('パスワードが正しくありません');
});

// Q13: 新しいメールアドレスと確認用が一致しないとエラーが表示される
test('Q13: メールアドレスが一致しないとエラーが表示される', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  //Arange
  await emailPage.navigate();
  const newEmail = 'new@example.com';
  const confirmEmail = 'other@example.com';
  const password = 'password';
  // Act: 異なるメールアドレスを入力して save()
  await emailPage.fillNewEmail(newEmail);
  await emailPage.fillConfirmEmail(confirmEmail);
  await emailPage.fillPassword(password);
  await emailPage.save();
  // Assert: #email-confirm-error "メールアドレスが一致しません" が表示される
  await expect(emailPage.confirmEmailError)
    .toHaveText('メールアドレスが一致しません');
});

// Q14: 不正なメールアドレス形式だとエラーが表示される
test('Q14: 不正なメールアドレス形式だとエラーが表示される', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  //Arrange
  await emailPage.navigate();
  const invalidEmail = 'invalid-email';
  const password = 'password';
  // Act: "invalid-email" を入力して save()
  await emailPage.fillNewEmail(invalidEmail);
  await emailPage.fillConfirmEmail(invalidEmail);
  await emailPage.fillPassword(password);
  await emailPage.save();
  // Assert: #email-new-error "正しいメールアドレスを入力してください" が表示される
  await expect(emailPage.newEmailError)
    .toHaveText('正しいメールアドレスを入力してください');
});

// Q15: キャンセルボタンを押すと入力内容がクリアされる
test('Q15: キャンセルボタンを押すと入力内容がクリアされる', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Arrange: navigate() → フィールドに値を入力
  await emailPage.navigate();
  const newEmail = 'new@example.com';
  const password = 'password';
  await emailPage.fillNewEmail(newEmail);
  await emailPage.fillConfirmEmail(newEmail);
  await emailPage.fillPassword(password);
  // Act: cancel()
  await emailPage.cancel();
  // Assert: 全フィールドが空になっていることを検証
  const newEmailValue = await emailPage.getNewEmail();
  const confirmEmailValue = await emailPage.getConfirmEmail();
  const passwordValue = await emailPage.getPassword();
  expect(newEmailValue).toBe('');
  expect(confirmEmailValue).toBe('');
  expect(passwordValue).toBe('');
});
