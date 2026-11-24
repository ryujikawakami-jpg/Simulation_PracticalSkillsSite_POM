import { Page, Locator } from '@playwright/test';

export class EmailPage {
  readonly page: Page;
  readonly currentEmailInput: Locator;
  readonly newEmailInput: Locator;
  readonly confirmEmailInput: Locator;
  readonly passwordInput: Locator;
  readonly newEmailError: Locator;
  readonly confirmEmailError: Locator;
  readonly passwordWrongError: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly toast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.currentEmailInput  = page.getByTestId('email-current');
    this.newEmailInput      = page.getByTestId('email-new');
    this.confirmEmailInput  = page.getByTestId('email-confirm');
    this.passwordInput      = page.getByTestId('email-password');
    this.newEmailError      = page.locator('#email-new-error');
    this.confirmEmailError  = page.locator('#email-confirm-error');
    this.passwordWrongError = page.locator('#email-password-wrong');
    this.saveButton         = page.getByTestId('save-email-btn');
    this.cancelButton       = page.getByTestId('cancel-email-btn');
    this.toast              = page.locator('#toast');
  }

  // メールアドレス変更ページへ遷移する
  async navigate() {
    await this.page.getByTestId('nav-email').click();
  }

  // 新しいメールアドレスを入力する
  async fillNewEmail(email: string) {
    await this.newEmailInput.fill(email);
  }

  // 確認用メールアドレスを入力する
  async fillConfirmEmail(email: string) {
    await this.confirmEmailInput.fill(email);
  }

  // パスワードを入力する
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  // メールアドレス変更フォームの3項目をまとめて入力する
  async fillEmailForm(newEmail: string, confirmEmail: string, password: string) {
    await this.fillNewEmail(newEmail);
    await this.fillConfirmEmail(confirmEmail);
    await this.fillPassword(password);
  }

  // メールアドレス変更を保存する
  async save() {
    await this.saveButton.click();
  }

  // 入力内容をキャンセルしてクリアする
  async cancel() {
    await this.cancelButton.click();
  }
}
