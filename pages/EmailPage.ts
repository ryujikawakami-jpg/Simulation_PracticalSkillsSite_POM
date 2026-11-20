import { Page, Locator } from '@playwright/test';

export class EmailPage {
  readonly page: Page;
  readonly currentEmailInput: Locator;
  readonly newEmailInput: Locator;
  readonly confirmEmailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly cancelButton: Locator;
  readonly newEmailError: Locator;
  readonly confirmEmailError: Locator;
  readonly passwordError: Locator;
  readonly passwordWrongError: Locator;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.currentEmailInput = page.getByTestId('email-current');
    this.newEmailInput = page.getByTestId('email-new');
    this.confirmEmailInput = page.getByTestId('email-confirm');
    this.passwordInput = page.getByTestId('email-password');
    this.submitButton = page.getByTestId('save-email-btn');
    this.cancelButton = page.getByTestId('cancel-email-btn');
    this.newEmailError = page.locator('#email-new-error');
    this.confirmEmailError = page.locator('#email-confirm-error');
    this.passwordError = page.locator('#email-password-error');
    this.passwordWrongError = page.locator('#email-password-wrong');
    this.toastMessage = page.getByText('メールアドレスを変更しました');
  }

  async navigate() {
    await this.page.getByTestId('nav-email').click();
  }

  async fillNewEmail(email: string) {
    await this.newEmailInput.fill(email);
  }

  async fillConfirmEmail(email: string) {
    await this.confirmEmailInput.fill(email);
  }

  async fillCurrentPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async fillEmailForm(newEmail: string, confirmEmail: string, currentPassword: string) {
    await this.newEmailInput.fill(newEmail);
    await this.confirmEmailInput.fill(confirmEmail);
    await this.passwordInput.fill(currentPassword);
  }

  async submitEmailChange() {
    await this.submitButton.click();
  }

  async cancelEmailChange() {
    await this.cancelButton.click();
  }
}