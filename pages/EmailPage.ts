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

import { Page, Locator } from '@playwright/test';

export class EmailPage {

  readonly page: Page;
  readonly currentEmailInput: Locator;
  readonly newEmailInput: Locator;
  readonly cofirmEmailInput: Locator;
  readonly passwordInput: Locator;
  readonly newEmailError: Locator;
  readonly confirmEmailError: Locator;
  readonly emptyPasswordError: Locator;
  readonly wrongPasswordError: Locator;
  readonly emailSaveButton: Locator;
  readonly emailCancelButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.currentEmailInput = page.getByTestId('email-current');
    this.newEmailInput = page.getByTestId('email-new');
    this.cofirmEmailInput = page.getByTestId('email-confirm');
    this.passwordInput = page.getByTestId('email-password');
    this.newEmailError = page.getByTestId('#email-new-error');
    this.confirmEmailError = page.getByTestId('#email-confirm-error');
    this.emptyPasswordError = page.getByTestId('#email-password-error');
    this.wrongPasswordError = page.getByTestId('#email-password-wrong');
    this.emailSaveButton = page.getByTestId('save-email-btn');
    this.emailCancelButton  = page.getByTestId('cancel-email-btn');
  }

  //メールアドレス変更ページに遷移
  async navigate() {
    await this.page.getByTestId('nav-email').click();
  }

  //新しいメールアドレスを入力
  async setNewEmail(keyword: string) {
    await this.newEmailInput.fill(keyword);
  }

  //確認用のメールアドレスを入力
  async comfirmNewEmail(keyword: string) {
    await this.cofirmEmailInput.fill(keyword);
  }

  //パスワードを入力
  async currentPassword(keyword: string) {
    await this.passwordInput.fill(keyword);
  }

  //保存する
  async save() {
    await this.emailSaveButton.click();
  }

  //変更をキャンセルする
  async cancel() {
    await this.emailCancelButton.click();
  }
}
