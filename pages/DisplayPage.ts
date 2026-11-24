import { Page, Locator } from '@playwright/test';

export class DisplayPage {
  readonly page: Page;
  readonly darkmodeLabel: Locator;
  readonly compactLabel: Locator;
  readonly coverLabel: Locator;
  readonly ratingLabel: Locator;
  readonly animationLabel: Locator;
  readonly darkmodeInput: Locator;
  readonly compactInput: Locator;
  readonly coverInput: Locator;
  readonly ratingInput: Locator;
  readonly animationInput: Locator;
  readonly saveButton: Locator;
  readonly resetButton: Locator;
  readonly toast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.darkmodeLabel  = page.locator('label:has([data-testid="display-darkmode"])');
    this.compactLabel   = page.locator('label:has([data-testid="display-compact"])');
    this.coverLabel     = page.locator('label:has([data-testid="display-cover"])');
    this.ratingLabel    = page.locator('label:has([data-testid="display-rating"])');
    this.animationLabel = page.locator('label:has([data-testid="display-animation"])');

    this.darkmodeInput  = page.getByTestId('display-darkmode');
    this.compactInput   = page.getByTestId('display-compact');
    this.coverInput     = page.getByTestId('display-cover');
    this.ratingInput    = page.getByTestId('display-rating');
    this.animationInput = page.getByTestId('display-animation');

    this.saveButton     = page.getByTestId('save-display-btn');
    this.resetButton    = page.getByTestId('reset-display-btn');
    this.toast          = page.locator('#toast');
  }

  // 表示設定ページへ遷移する
  async navigate() {
    await this.page.getByTestId('nav-display').click();
  }

  // ダークモードのON/OFFを設定する
  async setDarkmode(checked: boolean) {
    await this.darkmodeLabel.setChecked(checked);
  }

  // コンパクト表示のON/OFFを設定する
  async setCompact(checked: boolean) {
    await this.compactLabel.setChecked(checked);
  }

  // 表紙表示のON/OFFを設定する
  async setCover(checked: boolean) {
    await this.coverLabel.setChecked(checked);
  }

  // 評価表示のON/OFFを設定する
  async setRating(checked: boolean) {
    await this.ratingLabel.setChecked(checked);
  }

  // アニメーションのON/OFFを設定する
  async setAnimation(checked: boolean) {
    await this.animationLabel.setChecked(checked);
  }

  // すべての表示設定トグルをONにする
  async enableAllToggles() {
    await this.setDarkmode(true);
    await this.setCompact(true);
    await this.setCover(true);
    await this.setRating(true);
    await this.setAnimation(true);
  }

  // 表示設定を保存する
  async save() {
    await this.saveButton.click();
  }

  // 表示設定を初期値にリセットする
  async reset() {
    await this.resetButton.click();
  }
}
