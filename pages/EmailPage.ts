import { Page, Locator } from '@playwright/test';

export class EmailPage {
  readonly page: Page;
  readonly currentEmail: Locator;
  readonly newEmail: Locator;
  readonly newEmailConfirm: Locator;
  readonly currentPassword: Locator;
  readonly newEmailError: Locator;
  readonly newEmailConfError: Locator;
  readonly passwordError: Locator;
  readonly passwordWrong: Locator; 
  readonly saveButton: Locator;
  readonly cancelButton: Locator;  
  readonly saveMessage: Locator;


  constructor(page: Page) {
    this.page = page;
    this.currentEmail = page.getByTestId('email-current'); //現在のメールアドレス
    this.newEmail = page.getByTestId('email-new'); //新メールアドレス
    this.newEmailConfirm   = page.getByTestId('email-confirm'); //新メールアドレス確認
    this.currentPassword = page.getByTestId('email-password'); //現在PW入力
    this.newEmailError    = page.locator('#email-new-error'); // "正しいメールアドレスを入力してください"
    this.newEmailConfError = page.locator('#email-confirm-error'); // "メールアドレスが一致しません"
    this.passwordError = page.locator('#email-password-error'); //"パスワードを入力してください"
    this.passwordWrong = page.locator('#email-password-wrong'); //"パスワードが正しくありません"
    this.saveButton = page.getByTestId('save-email-btn');  // 保存ボタン
    this.cancelButton = page.getByTestId('cancel-email-btn'); //キャンセルボタン
    this.saveMessage = page.getByText('メールアドレスを変更しました', { exact: true }); //保存の際のメッセージ表示
  }


  async navigate() {
    await this.page.getByTestId('nav-email').click();
  }

  async fillChangeEmailForm(newEmail: string, newEmailConf: string, password: string) {
    await this.newEmail.fill(newEmail);
    await this.newEmailConfirm.fill(newEmailConf);
    await this.currentPassword.fill(password);
  }
  
  async saveEmail(){
    await this.saveButton.click();
  }

  async cancelEmail() {
    await this.cancelButton.click();
  }
}
