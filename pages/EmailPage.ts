import { Page, Locator } from '@playwright/test';

export class EmailPage {
  // A：プロパティ（持ち物）の宣言
  readonly page: Page;
  readonly currentEmailInput: Locator;
  readonly newEmailInput: Locator ;
  readonly confirmEmailInput: Locator;
  readonly passwordInput: Locator;
  readonly saveButton: Locator;
  readonly newEmailError: Locator;
  readonly passwordError: Locator;
  readonly passwordWrongError: Locator;
  readonly confirmEmailError: Locator;
  readonly cancelButton: Locator;

  // B：constructor（初期準備）
  constructor(page: Page) {
    this.page = page;
    this.currentEmailInput = page.getByTestId('email-current');
    this.newEmailInput = page.getByTestId('email-new');
    this.confirmEmailInput = page.getByTestId('email-confirm');
    this.passwordInput = page.getByTestId('email-password');
    this.saveButton = page.getByTestId('save-email-btn');
    this.newEmailError = page.locator('#email-new-error');
    this.passwordError = page.locator('#email-password-error');
    this.passwordWrongError = page.locator('#email-password-wrong');
    this.confirmEmailError = page.locator('#email-confirm-error');
    this.cancelButton = page.getByTestId('cancel-email-btn');
  }

  // C：メソッド（処理）の定義
  async navigate() {
    await this.page.getByTestId('nav-email').click();
  }
  async fillNewEmail(email: string) {
  await this.newEmailInput.fill(email);
}

async fillConfirmEmail(email: string) {
  await this.confirmEmailInput.fill(email);
}

async fillPassword(password: string) {
  await this.passwordInput.fill(password);
}

async save() {
  await this.saveButton.click();
}
async cancel() {
  await this.cancelButton.click();
}
}