import { Page, Locator } from '@playwright/test';

export class DisplayPage {

    //-- ロケーター　--
  readonly page: Page;
  readonly navDisplay: Locator;
  readonly saveSuccessMessage: Locator;
  readonly displayDarkMode: Locator;
  readonly displayCompact: Locator;
  readonly displayCover: Locator;
  readonly displayRating: Locator;
  readonly displayAnimation: Locator;
  readonly saveDisplayButton: Locator;
  readonly resetDisplayButton: Locator;



 constructor(page: Page) {
  this.page               = page;
  this.navDisplay         = page.getByTestId('nav-display');
  this.saveSuccessMessage = page.getByText('表示設定を保存しました', { exact: true });
  this.displayDarkMode    = page.locator('label:has([data-testid="display-darkmode"])');    //デフォルトOFF
  this.displayCompact     = page.locator('label:has([data-testid="display-compact"])');     //デフォルトON
  this.displayCover       = page.locator('label:has([data-testid="display-cover"])');       //デフォルトON
  this.displayRating      = page.locator('label:has([data-testid="display-rating"])');      //デフォルトON
  this.displayAnimation   = page.locator('label:has([data-testid="display-animation"])');   //デフォルトOFF
     //-- ボタン --
  this.saveDisplayButton = page.getByTestId('save-display-btn');
  this.resetDisplayButton = page.getByTestId('reset-display-btn');

 }


    //-- 操作メソッド --

  async navigate() {
    await this.navDisplay.click()
  }
  
    //-- ダークモード --
  async setDarkMode(checked: boolean) {
    await this.displayDarkMode.setChecked(checked);
  }

    //-- コンパクト表示 --
  async setCompact(checked: boolean) {
    await this.displayCompact.setChecked(checked);
  }

    //-- 表紙表示 --
  async setCover(checked: boolean) {
    await this.displayCover.setChecked(checked);
  }

    //-- 評価表示 --
  async setRating(checked: boolean) {
    await this.displayRating.setChecked(checked);
  }

    //-- アニメーション --
  async setAnimation(checked: boolean) {
    await this.displayAnimation.setChecked(checked);
  }

    //-- 保存する --
  async save() {
    await this.saveDisplayButton.click();
  }

    //-- リセット --
  async reset() {
    await this.resetDisplayButton.click();
  }

}