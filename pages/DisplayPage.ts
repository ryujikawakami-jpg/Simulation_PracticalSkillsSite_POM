import { Page, Locator } from '@playwright/test';

// ナビゲーション: nav-display
// トグル（CSS hidden checkbox — locator.evaluate(el => el.click()) で操作）:
//   - display-darkmode   : ダークモード（デフォルト OFF）
//   - display-compact    : コンパクト表示（デフォルト ON）
//   - display-cover      : 表紙表示（デフォルト ON）
//   - display-rating     : 評価表示（デフォルト ON）
//   - display-animation  : アニメーション（デフォルト OFF）
// ボタン:
//   - save-display-btn   : 保存 → トースト "表示設定を保存しました"
//   - reset-display-btn  : リセット → デフォルトに戻る

export class DisplayPage {
  readonly page: Page;
  readonly darkmode : Locator;
  readonly compactDisplay : Locator;
  readonly coverDisplay : Locator;
  readonly ratingDisplay : Locator
  readonly animationDisplay : Locator;
  readonly saveButton : Locator;
  readonly resetButton : Locator;
  readonly toast : Locator;

  constructor(page: Page) {
    this.page = page;
    this.darkmode = page.getByTestId('display-darkmode').locator('..');
    this.compactDisplay = page.getByTestId('display-compact').locator('..');
    this.coverDisplay = page.getByTestId('display-cover').locator('..');
    this.ratingDisplay = page.getByTestId('display-rating').locator('..');
    this.animationDisplay = page.getByTestId('display-animation').locator('..');
    this.saveButton = page.getByTestId('save-display-btn');
    this.resetButton = page.getByTestId('reset-display-btn');
    this.toast = page.locator('#toast');
  }

  async navigate() {
    await this.page.getByTestId('nav-display').click();
  }

  async setDarkmode(enable:boolean){
    await this.darkmode.setChecked(enable);
  }

  async setCompact(enable:boolean){
    await this.compactDisplay.setChecked(enable);
  }

  async setCover(enable:boolean){
    await this.coverDisplay.setChecked(enable);
  }

  async setRating(enable:boolean){
    await this.ratingDisplay.setChecked(enable);
  }

  async setAnimation(enable:boolean){
    await this.animationDisplay.setChecked(enable);
  }

  async save(){
    await this.saveButton.click();
  }

  async reset(){
    await this.resetButton.click();
  }

  async setAllSettings(enable: boolean) {
    await  this.setDarkmode(enable);
    await  this.setCompact(enable);
    await  this.setCover(enable);
    await  this.setRating(enable);
    await  this.setAnimation(enable);
  }

}
