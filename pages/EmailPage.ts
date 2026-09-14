import { Page, Locator } from '@playwright/test';

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

export class EmailPage {
  readonly page: Page;
  readonly currentEmail : Locator;
  readonly newEmail : Locator;
  readonly confirmEmail : Locator;
  readonly password : Locator;
  readonly newError : Locator;
  readonly confirmError : Locator;
  readonly passwordError : Locator;
  readonly passwordWrong : Locator;
  readonly saveButton : Locator;
  readonly cancelButton : Locator;
  readonly toast : Locator;

  constructor(page: Page) {
    this.page = page;
    this.currentEmail = page.getByTestId('email-current');
    this.newEmail = page.getByTestId('email-new');
    this.confirmEmail = page.getByTestId('email-confirm');
    this.password = page.getByTestId('email-password');
    this.newError = page.locator('#email-new-error');
    this.confirmError = page.locator('#email-confirm-error');
    this.passwordError = page.locator('#email-password-error');
    this.passwordWrong = page.locator('#email-password-wrong');
    this.saveButton = page.getByTestId('save-email-btn');
    this.cancelButton = page.getByTestId('cancel-email-btn');
    this.toast = page.locator('#toast');
  }

  async navigate() {
    await this.page.getByTestId('nav-email').click();
  }

  async save(){
    await this.saveButton.click();
 }

  async cancel(){
    await this.cancelButton.click();
 }
}
