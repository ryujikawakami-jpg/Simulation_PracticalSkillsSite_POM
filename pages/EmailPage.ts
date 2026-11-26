import { Page, Locator } from '@playwright/test';

export class EmailPage {

    //-- ロケーター --
  readonly page: Page;
  readonly navEmail: Locator;
  readonly saveSuccessMessage: Locator;
  readonly emailCurrent: Locator;
  readonly emailNew: Locator;
  readonly emailConfirm: Locator;
  readonly emailPassword: Locator;
  readonly emailNewError: Locator;
  readonly emailConfirmError: Locator;
  readonly emailPasswordError: Locator;
  readonly emailPasswordWrong: Locator;
  readonly saveEmailButton: Locator;
  readonly cancelEmailButton: Locator;

   constructor(page: Page) {
  this.page               = page;
  this.navEmail           = page.getByTestId('nav-email');
  this.emailCurrent       = page.getByRole('textbox',{name: '現在のメールアドレス'});
  this.emailNew           = page.getByRole('textbox', { name: '新しいメールアドレス', exact: true });
  this.emailConfirm       = page.getByRole('textbox', { name: '新しいメールアドレス（確認）', exact: true });
  this.saveSuccessMessage = page.getByText('メールアドレスを変更しました', { exact: true });
  this.emailPassword      = page.getByTestId('email-password');
    //-- エラー系 --
  this.emailNewError      = page.locator('#email-new-error');
  this.emailConfirmError  = page.locator('#email-confirm-error');
  this.emailPasswordError = page.locator('#email-password-error');
  this.emailPasswordWrong = page.locator('#email-password-wrong');
    //-- ボタン --
  this.saveEmailButton    = page.getByTestId('save-email-btn');
  this.cancelEmailButton  = page.getByTestId('cancel-email-btn');

   }

    // -- 操作メソッド --

    async navigate() {
  await this.navEmail.click();
}

  // 新しいメールアドレス入力
  async fillEmailNew(email: string) {
    await this.emailNew.fill(email);
  }

  // 確認用メールアドレス入力
  async fillEmailConfirm(email: string) {
    await this.emailConfirm.fill(email);
  }

  // パスワード入力
  async fillEmailPassword(password: string) {
    await this.emailPassword.fill(password);
  }

  // メールアドレス変更
  async save() {
    await this.saveEmailButton.click();
  }

  // メールアドレス変更キャンセル
  async cancel() {
    await this.cancelEmailButton.click();
  }
}
