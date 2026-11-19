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

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginAsAdmin();
});

// ========================
// 表示設定（Display Settings）Q1〜Q8
// ========================

// Q1: 表示設定ページに遷移できる
test('Q1: 表示設定ページに遷移できる', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Act: DisplayPage.navigate()
  const displayPage = new DisplayPage(page);

  await displayPage.navigate();
  // Assert: ページ内にトグルが表示されていることを検証

  await expect(displayPage.displayDarkmode).toBeVisible();
});

// Q2: デフォルトでコンパクト表示・表紙表示・評価表示がONになっている
test('Q2: デフォルトでコンパクト表示・表紙表示・評価表示がONになっている', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Act: navigate()
  const displayPage = new DisplayPage(page);
  await displayPage.navigate();
  // Assert: compact, cover, rating が checked であることを検証
  await expect(displayPage.displayCompact).toBeChecked();
  await expect(displayPage.displayCover).toBeChecked();
  await expect(displayPage.displayRating).toBeChecked();
});

// Q3: ダークモードトグルをONにして保存できる
test('Q3: ダークモードトグルをONにして保存できる', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Act: navigate() → darkmode トグルをクリック → save()
  const displayPage = new DisplayPage(page);
  await displayPage.navigate();

  await displayPage.darkmode(true);
  await displayPage.save();
  // Assert: トースト "表示設定を保存しました" が表示される
  await expect(page.getByText('表示設定を保存しました', {exact: true})).toBeVisible();
});

// Q4: リセットするとトグルが初期状態に戻る
test('Q4: リセットするとトグルが初期状態に戻る', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Arrange: navigate() → darkmode をON → save()
  const displayPage = new DisplayPage(page);
  await displayPage.navigate();

  await displayPage.darkmode(true);
  await displayPage.save();

  // Act: reset()
  await displayPage.reset();

  // Assert: darkmode が OFF、compact/cover/rating が ON
  await expect(displayPage.displayDarkmode).not.toBeChecked();
  await expect(displayPage.displayCompact).toBeChecked();
  await expect(displayPage.displayCover).toBeChecked();
  await expect(displayPage.displayRating).toBeChecked();
  await expect(displayPage.displayAnimation).not.toBeChecked();
});

// Q5: トグルをONにして保存後、ページを再表示しても設定が保持されている
test('Q5: 保存した設定がページ遷移後も保持される', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Arrange: navigate() → darkmode をON → save()
  const displayPage = new DisplayPage(page);
  await displayPage.navigate();

  await displayPage.darkmode(true);
  await displayPage.save();

  // Act: 別ページに遷移 → 再度 navigate()
  await page.getByTestId('nav-stats').click();
  await displayPage.navigate();

  // Assert: darkmode が ON のままであることを検証
  await expect(displayPage.displayDarkmode).toBeChecked();
});

// Q6: アニメーショントグルをONにして保存できる
test('Q6: アニメーショントグルをONにして保存できる', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Act: navigate() → animation トグルをクリック → save()
  const displayPage = new DisplayPage(page);
  await displayPage.navigate();

  await displayPage.animation(true);
  await displayPage.save();

  // Assert: トースト "表示設定を保存しました" が表示される
  await expect(page.getByText('表示設定を保存しました', {exact: true})).toBeVisible();
});

// Q7: 全トグルをONにしてリセットすると初期値に戻る
test('Q7: 全トグルをONにしてリセットすると初期値に戻る', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Arrange: navigate() → 全トグルをON → save()
  const displayPage = new DisplayPage(page);
  await displayPage.navigate();

  await displayPage.darkmode(true);
  await displayPage.animation(true);
  await displayPage.save();

  // Act: reset()
  await displayPage.reset();

  // Assert: darkmode=OFF, compact=ON, cover=ON, rating=ON, animation=OFF
  await expect(displayPage.displayDarkmode).not.toBeChecked();
  await expect(displayPage.displayCompact).toBeChecked();
  await expect(displayPage.displayCover).toBeChecked();
  await expect(displayPage.displayRating).toBeChecked();
  await expect(displayPage.displayAnimation).not.toBeChecked();
});

// Q8: コンパクト表示をOFFにして保存できる
test('Q8: コンパクト表示をOFFにして保存できる', async ({ page }) => {
  // TODO: DisplayPage POM を作成して使用
  // Act: navigate() → compact トグルをクリック（OFF にする）→ save()
  const displayPage = new DisplayPage(page);
  await displayPage.navigate();

  await displayPage.compact(false);
  await displayPage.save();

  // Assert: トーストが表示され、compact が OFF であることを検証
  await expect(page.getByText('表示設定を保存しました', {exact: true})).toBeVisible();
  await expect(displayPage.displayCompact).not.toBeChecked();
});

// ========================
// メールアドレス変更（Email Change）Q9〜Q15
// ========================

// Q9: メールアドレス変更ページに遷移できる
test('Q9: メールアドレス変更ページに遷移できる', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Act: EmailPage.navigate()
  const emailPage = new EmailPage(page);
  await emailPage.navigate();

  // Assert: 現在のメールが "admin@example.com" であることを検証
  const emailcurrent = emailPage.emailCurrent;
  await expect(emailcurrent).toHaveValue('admin@example.com');
});

// Q10: 正しい情報を入力してメールアドレスを変更できる
test('Q10: 正しい情報を入力してメールアドレスを変更できる', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Act: navigate() → 新メール・確認・パスワードを入力 → save()
  const emailPage = new EmailPage(page);
  await emailPage.navigate();

  const newEmail = 'admin.test@example.com'
  await emailPage.emailnew(newEmail);
  await emailPage.emailconfirm(newEmail);
  await emailPage.emailpassword('password');
  await emailPage.saveemail();

  // Assert: トースト "メールアドレスを変更しました" が表示される
  await expect(page.getByText('メールアドレスを変更しました' , {exact : true})).toBeVisible();
});

// Q11: 何も入力せず変更ボタンを押すとエラーが表示される
test('Q11: 何も入力せず変更ボタンを押すとエラーが表示される', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Act: navigate() → save()
  const emailPage = new EmailPage(page);
  await emailPage.navigate();

  await emailPage.saveemail();

  // Assert: エラーメッセージが表示される
  await expect(emailPage.emailNewError).toBeVisible();
  await expect(emailPage.emailNewError).toHaveText('正しいメールアドレスを入力してください');
  await expect(emailPage.emailPasswordError).toBeVisible();
  await expect(emailPage.emailPasswordError).toHaveText('パスワードを入力してください');
});

// Q12: パスワードが間違っているとエラーが表示される
test('Q12: パスワードが間違っているとエラーが表示される', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Act: 正しいメールを入力し、間違ったパスワードで save()
  const emailPage = new EmailPage(page);
  await emailPage.navigate();

  const newEmail = 'admin.test@example.com'
  await emailPage.emailnew(newEmail);
  await emailPage.emailconfirm(newEmail);
  await emailPage.emailpassword('wrongpass');
  await emailPage.saveemail();

  // Assert: #email-password-wrong "パスワードが正しくありません" が表示される
  await expect(emailPage.emailPasswordWrong).toBeVisible();
  await expect(emailPage.emailPasswordWrong).toHaveText('パスワードが正しくありません');
});

// Q13: 新しいメールアドレスと確認用が一致しないとエラーが表示される
test('Q13: メールアドレスが一致しないとエラーが表示される', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Act: 異なるメールアドレスを入力して save()
  const emailPage = new EmailPage(page);
  await emailPage.navigate();

  const newEmail = 'admin.test@example.com'
  const wrongEmail = 'wrongemail'
  await emailPage.emailnew(newEmail);
  await emailPage.emailconfirm(wrongEmail);
  await emailPage.emailpassword('password');
  await emailPage.saveemail();

  // Assert: #email-confirm-error "メールアドレスが一致しません" が表示される
  await expect(emailPage.emailConfirmError).toBeVisible();
  await expect(emailPage.emailConfirmError).toHaveText('メールアドレスが一致しません');
});

// Q14: 不正なメールアドレス形式だとエラーが表示される
test('Q14: 不正なメールアドレス形式だとエラーが表示される', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Act: "invalid-email" を入力して save()
  const emailPage = new EmailPage(page);
  await emailPage.navigate();

  const email = 'invalid-email'
  await emailPage.emailnew(email);
  await emailPage.emailconfirm(email);
  await emailPage.emailpassword('password');
  await emailPage.saveemail();

  // Assert: #email-new-error "正しいメールアドレスを入力してください" が表示される
  await expect(emailPage.emailNewError).toBeVisible();
  await expect(emailPage.emailNewError).toHaveText('正しいメールアドレスを入力してください');

});

// Q15: キャンセルボタンを押すと入力内容がクリアされる
test('Q15: キャンセルボタンを押すと入力内容がクリアされる', async ({ page }) => {
  // TODO: EmailPage POM を作成して使用
  // Arrange: navigate() → フィールドに値を入力
  const emailPage = new EmailPage(page);
  await emailPage.navigate();

  const newEmail = 'admin.test@example.com'
  await emailPage.emailnew(newEmail);
  await emailPage.emailconfirm(newEmail);
  await emailPage.emailpassword('password');
  await emailPage.cancelemail();

  // Assert: 全フィールドが空になっていることを検証
  await expect(emailPage.emailNew).toHaveValue('');
  await expect(emailPage.emailConfirm).toHaveValue('');
  await expect(emailPage.emailPassword).toHaveValue('');
});
