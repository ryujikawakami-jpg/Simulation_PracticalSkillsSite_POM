import { Page, Locator } from '@playwright/test';

export class DisplayPage {
  readonly page: Page;
  
  readonly darkMode: Locator;
  readonly compact: Locator;
  readonly cover: Locator;
  readonly rating: Locator;
  readonly animation: Locator;

  readonly saveButton: Locator;
  readonly resetButton: Locator;
  readonly successToast: Locator;


  constructor(page: Page) {
    this.page         = page;

    this.darkMode     = page.locator('label:has([data-testid="display-darkmode"])');
    this.compact      = page.locator('label:has([data-testid="display-compact"])');
    this.cover        = page.locator('label:has([data-testid="display-cover"])');
    this.rating       = page.locator('label:has([data-testid="display-rating"])');
    this.animation    = page.locator('label:has([data-testid="display-animation"])');
    this.saveButton   = page.getByTestId('save-display-btn');
    this.resetButton  = page.getByTestId('reset-display-btn');
    this.successToast = page.getByText('表示設定を保存しました', { exact: true });
  }

  // 表示設定画面に遷移する
  async navigate() {
    await this.page.getByTestId('nav-display').click();
  }
  
  // ダークモードのON/OFFを設定する
  async setDarkMode(checked: boolean) {
    await this.darkMode.setChecked(checked);
  }

  // コンパクト表示のON/OFFを設定する
  async setCompact(checked: boolean) {
    await this.compact.setChecked(checked);
  }
  
  // 表紙表示のON/OFFを設定する
  async setCover(checked: boolean) {
    await this.cover.setChecked(checked);
  }
  
  // 評価表示のON/OFFを設定する
  async setRating(checked: boolean) {
    await this.rating.setChecked(checked);
  }
  
  // アニメーションのON/OFFを設定する
  async setAnimation(checked: boolean) {
    await this.animation.setChecked(checked);
  }
  
  // 保存ボタンをクリックする
  async save() {
    await this.saveButton.click();
  }
  
  // リセットボタンをクリックする
  async reset() {
    await this.resetButton.click();
  }
  
  // ダークモードのチェック状態を取得する
  async isDarkModeChecked(): Promise<boolean> {
    return await this.page.getByTestId('display-darkmode').isChecked();
}
  
  // コンパクト表示のチェック状態を取得する
  async isCompactChecked(): Promise<boolean> {
    return await this.page.getByTestId('display-compact').isChecked();
}

  // 表紙表示のチェック状態を取得する
  async isCoverChecked(): Promise<boolean> {
    return await this.page.getByTestId('display-cover').isChecked();
}
  
  // 評価表示のチェック状態を取得する
  async isRatingChecked(): Promise<boolean> {
    return await this.page.getByTestId('display-rating').isChecked();
}

  // アニメーションのチェック状態を取得する
  async isAnimationChecked(): Promise<boolean> {
    return await this.page.getByTestId('display-animation').isChecked();
}
}