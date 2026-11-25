import { Page, Locator } from '@playwright/test';

export class DisplayPage {
  readonly page: Page;
  readonly darkModeToggle: Locator;
  readonly compactToggle: Locator;
  readonly coverToggle: Locator;
  readonly ratingToggle: Locator;
  readonly animationToggle: Locator;
  readonly darkModeLabel: Locator;
  readonly saveButton: Locator;
  readonly resetButton: Locator;
  readonly saveToast: Locator;
  private readonly compactLabel: Locator;
  private readonly coverLabel: Locator;
  private readonly ratingLabel: Locator;
  private readonly animationLabel: Locator;

  // 表示設定画面のロケーターを初期化する
  constructor(page: Page) {
    this.page = page;
    this.darkModeToggle = page.getByTestId('display-darkmode');
    this.compactToggle = page.getByTestId('display-compact');
    this.coverToggle = page.getByTestId('display-cover');
    this.ratingToggle = page.getByTestId('display-rating');
    this.animationToggle = page.getByTestId('display-animation');
    this.darkModeLabel = page.locator('label:has([data-testid="display-darkmode"])');
    this.compactLabel = page.locator('label:has([data-testid="display-compact"])');
    this.coverLabel = page.locator('label:has([data-testid="display-cover"])');
    this.ratingLabel = page.locator('label:has([data-testid="display-rating"])');
    this.animationLabel = page.locator('label:has([data-testid="display-animation"])');
    this.saveButton = page.getByTestId('save-display-btn');
    this.resetButton = page.getByTestId('reset-display-btn');
    this.saveToast = page.getByText('表示設定を保存しました');
  }

  // 表示設定ページへ移動する
  async navigate() {
    await this.page.getByTestId('nav-display').click();
  }

  // 書籍一覧へ移動する
  async navigateToBooks() {
    await this.page.getByTestId('nav-books').click();
  }

  // ダークモードを指定した状態にする
  async setDarkMode(enabled: boolean) {
    await this.darkModeLabel.setChecked(enabled);
  }

  // コンパクト表示を指定した状態にする
  async setCompact(enabled: boolean) {
    await this.compactLabel.setChecked(enabled);
  }

  // 表紙表示を指定した状態にする
  async setCover(enabled: boolean) {
    await this.coverLabel.setChecked(enabled);
  }

  // 評価表示を指定した状態にする
  async setRating(enabled: boolean) {
    await this.ratingLabel.setChecked(enabled);
  }

  // アニメーションを指定した状態にする
  async setAnimation(enabled: boolean) {
    await this.animationLabel.setChecked(enabled);
  }

  // 表示設定を保存する
  async save() {
    await this.saveButton.click();
  }

  // 表示設定を初期状態に戻す
  async reset() {
    await this.resetButton.click();
  }
}