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
  readonly darkmodeToggle : Locator;
  readonly compactToggle : Locator;

  constructor(page: Page) {
    this.page = page;
    this.darkmodeToggle = page.getByTestId('display-darkmode');
    this.compactToggle = page.getByTestId('display-compact');
  }

  async navigate() {
    await this.page.getByTestId('nav-stats').click();
  }

}
