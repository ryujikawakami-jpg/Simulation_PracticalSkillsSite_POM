import { Page, Locator } from '@playwright/test';

export class EmailPage {
  readonly page: Page;

  readonly currentEmail: Locator;
  readonly newEmail: Locator;
  readonly confirmEmail: Locator;
  readonly password: Locator;
  readonly newEmailError: Locator;
  readonly confirmEmailError: Locator;
  readonly passwordError: Locator;
  readonly passwordWrong: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly successToast: Locator;

constructor(page: Page) {
  this.page         = page;
    
  this.currentEmail = page.getByTestId('email-current');
  this.newEmail = page.getByTestId('email-new');
  this.confirmEmail = page.getByTestId('email-confirm');
  this.password = page.getByTestId('email-password');
  this.newEmailError = page.locator('#email-new-error');
  this.confirmEmailError = page.locator('#email-confirm-error');
  this.passwordError = page.locator('#email-password-error');
  this.passwordWrong = page.locator('#email-password-wrong');
  this.saveButton = page.getByTestId('save-email-btn');
  this.cancelButton = page.getByTestId('cancel-email-btn');
  this.successToast = page.getByText('メールアドレスを変更しました', { exact: true });
 }


  // メール変更画面に遷移する
 async navigate() {
   await this.page.getByTestId('nav-email').click();
 }
 
  // 新しいメールアドレスを入力する
 async fillNewEmail(email: string) {
   await this.newEmail.fill(email);
 }

  // 確認用メールアドレスを入力する
 async fillConfirmEmail(email: string) {
   await this.confirmEmail.fill(email);
 }

  // パスワードを入力する
 async fillPassword(password: string) {
   await this.password.fill(password);
 }

  // 保存ボタンをクリックする
 async save() {
   await this.saveButton.click();
 }

  // キャンセルボタンをクリックする
 async cancel() {
   await this.cancelButton.click();
 }

  // 現在のメールアドレスを取得する
 async getCurrentEmail(): Promise<string> {
   return await this.currentEmail.inputValue();
 }

  // 新しいメールアドレスの入力値を取得する
 async getNewEmail(): Promise<string> {
   return await this.newEmail.inputValue();
 }

  // 確認用メールアドレスの入力値を取得する
 async getConfirmEmail(): Promise<string> {
   return await this.confirmEmail.inputValue();
 }

  // パスワードの入力値を取得する
 async getPassword(): Promise<string> {
   return await this.password.inputValue();
 }
}