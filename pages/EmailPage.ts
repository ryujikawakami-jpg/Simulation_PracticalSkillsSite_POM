import { Page, Locator } from '@playwright/test';

export class EmailPage {
  readonly page: Page;
  readonly currentEmail: Locator;
  readonly newEmailInput: Locator;
  readonly confirmEmailInput: Locator;
  readonly passwordInput: Locator;
  readonly newEmailError: Locator;
  readonly confirmEmailError: Locator;
  readonly passwordError: Locator;
  readonly incorrectPasswordError: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly saveToast: Locator;

  // メール変更画面のロケーターを初期化する
  constructor(page: Page) {
    this.page = page;
    this.currentEmail = page.getByTestId('email-current');
    this.newEmailInput = page.getByTestId('email-new');
    this.confirmEmailInput = page.getByTestId('email-confirm');
    this.passwordInput = page.getByTestId('email-password');
    this.newEmailError = page.locator('#email-new-error');
    this.confirmEmailError = page.locator('#email-confirm-error');
    this.passwordError = page.locator('#email-password-error');
    this.incorrectPasswordError = page.locator('#email-password-wrong');
    this.saveButton = page.getByTestId('save-email-btn');
    this.cancelButton = page.getByTestId('cancel-email-btn');
    this.saveToast = page.getByText('メールアドレスを変更しました');
  }

  // メールアドレス変更ページへ移動する
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

  // アカウントパスワードを入力する
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  // メール変更フォームを入力して送信する
  async submitEmailChange(newEmail: string, confirmEmail: string, password: string) {
    await this.fillNewEmail(newEmail);
    await this.fillConfirmEmail(confirmEmail);
    await this.fillPassword(password);
    await this.save();
  }

  // メールアドレス変更を送信する
  async save() {
    await this.saveButton.click();
  }

  // 入力内容を破棄してフォームをクリアする
  async cancel() {
    await this.cancelButton.click();
  }
}