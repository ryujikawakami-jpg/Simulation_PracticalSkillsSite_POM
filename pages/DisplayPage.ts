// --- DisplayPage に必要な要素 ---
// ナビゲーション: nav-display
// トグル（CSS で隠れた checkbox。input 自体は visible=false なので直接 click() できない）:
//   囲っている <label> を掴んで setChecked(true/false) で操作する
//     page.locator('label:has([data-testid="display-darkmode"])').setChecked(true)
//   ※ evaluate(el => el.click()) でも動くが、Playwright のチェックを全部飛ばすため
//     「押せないはずのときも押せてしまう」。テストとしては上の書き方を使うこと
//   ※ toggle（反転）ではなく setChecked（状態を指定）にすると、実行順に依存しなくなる
//   - display-darkmode   : ダークモード（デフォルト OFF）
//   - display-compact    : コンパクト表示（デフォルト ON）
//   - display-cover      : 表紙表示（デフォルト ON）
//   - display-rating     : 評価表示（デフォルト ON）
//   - display-animation  : アニメーション（デフォルト OFF）
// ボタン:
//   - save-display-btn   : 保存 → トースト "表示設定を保存しました"
//   - reset-display-btn  : リセット → デフォルトに戻る

import { Page, Locator } from '@playwright/test';

export class DisplayPage {
  readonly page: Page;
  readonly darkModeToggle: Locator;
  readonly compactToggle: Locator;
  readonly coverToggle: Locator;
  readonly rateToggle: Locator;
  readonly animationToggle: Locator;
  readonly saveButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.darkModeToggle = page.getByTestId('display-darkmode');
    this.compactToggle = page.getByTestId('display-compact');
    this.coverToggle = page.getByTestId('display-cover');
    this.rateToggle = page.getByTestId('display-rating');
    this.animationToggle = page.getByTestId('display-animation');
    this.saveButton = page.getByTestId('save-display-btn');
    this.resetButton = page.getByTestId('reset-display-btn');
  }

  //表示設定ページへ移動
  async navigate() {
    await this.page.getByTestId('nav-display').click();
  }

  //ダークモードをONにする
  async darkModeON() {
    await this.page.locator('label:has([data-testid="display-darkmode"])').setChecked(true)
  }

  //アニメーションをONにする
  async animationON() {
    await this.page.locator('label:has([data-testid="display-animation"])').setChecked(true)
  }

  //コンパクト表示をONにする
  async compactON() {
    await this.page.locator('label:has([data-testid="display-compact"])').setChecked(true)
  }
  
  //評価表示をONにする
  async rateON() {
    await this.page.locator('label:has([data-testid="display-rating"])').setChecked(true)
  }

  //壁紙表示をONにする
  async coverON() {
    await this.page.locator('label:has([data-testid="display-cover"])').setChecked(true)
  }
  
    //ダークモードをOFFにする
  async darkModeOFF() {
    await this.page.locator('label:has([data-testid="display-darkmode"])').setChecked(false)
  }

  //アニメーションをOFFにする
  async animationOFF() {
    await this.page.locator('label:has([data-testid="display-animation"])').setChecked(false)
  }

  //コンパクト表示をOFFにする
  async compactOFF() {
    await this.page.locator('label:has([data-testid="display-compact"])').setChecked(false)
  }
  
  //評価表示をOFFにする
  async rateOFF() {
    await this.page.locator('label:has([data-testid="display-rating"])').setChecked(false)
  }

  //壁紙表示をOFFにする
  async coverOFF() {
    await this.page.locator('label:has([data-testid="display-cover"])').setChecked(false)
  }

  //保存する
  async save() {
    await this.saveButton.click();
  }

  //初期状態にリセットする
  async reset() {
    await this.resetButton.click();
  }
}
