import { Page, Locator } from '@playwright/test';

export class EmailPage {
  readonly page: Page;
  readonly currentEmail: Locator;
  readonly newEmail: Locator;
  readonly confirmEmail: Locator;
  readonly password: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly newEmailError: Locator;
  readonly confirmError: Locator;
  readonly passwordError: Locator;
  readonly passwordWrong: Locator;

  constructor(page: Page) {
    this.page = page;
    this.currentEmail  = page.getByTestId('email-current');
    this.newEmail      = page.getByTestId('email-new');
    this.confirmEmail  = page.getByTestId('email-confirm');
    this.password      = page.getByTestId('email-password');
    this.saveButton    = page.getByTestId('save-email-btn');
    this.cancelButton  = page.getByTestId('cancel-email-btn');
    this.newEmailError = page.locator('#email-new-error');
    this.confirmError  = page.locator('#email-confirm-error');
    this.passwordError = page.locator('#email-password-error');
    this.passwordWrong = page.locator('#email-password-wrong');
  }

  async navigate() {
    await this.page.getByTestId('nav-email').click();
  }

  async fillNewEmail(email: string) {
    await this.newEmail.fill(email);
  }

  async fillConfirmEmail(email: string) {
    await this.confirmEmail.fill(email);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async changeEmail(newEmail: string, confirmEmail: string, password: string) {
    await this.fillNewEmail(newEmail);
    await this.fillConfirmEmail(confirmEmail);
    await this.fillPassword(password);
    await this.save();
  }
}
