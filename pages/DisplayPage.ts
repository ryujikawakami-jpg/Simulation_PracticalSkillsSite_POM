import { Page, Locator } from '@playwright/test';

export class DisplayPage {
  readonly page: Page;
  readonly darkModeToggle: Locator;
  readonly compactViewToggle: Locator;
  readonly coverImageToggle: Locator;
  readonly ratingDisplayToggle: Locator;
  readonly animationToggle: Locator;
  readonly saveButton: Locator;
  readonly resetButton: Locator;
  readonly toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.darkModeToggle = page.locator('label:has([data-testid="display-darkmode"])');
    this.compactViewToggle = page.locator('label:has([data-testid="display-compact"])');
    this.coverImageToggle = page.locator('label:has([data-testid="display-cover"])');
    this.ratingDisplayToggle = page.locator('label:has([data-testid="display-rating"])');
    this.animationToggle = page.locator('label:has([data-testid="display-animation"])');
    this.saveButton = page.getByTestId('save-display-btn');
    this.resetButton = page.getByTestId('reset-display-btn');
    this.toastMessage = page.getByText('表示設定を保存しました');
  }

  async navigate() {
    await this.page.getByTestId('nav-display').click();
  }

  async setDarkMode(checked: boolean) {
    await this.darkModeToggle.setChecked(checked);
  }

  async setCompactView(checked: boolean) {
    await this.compactViewToggle.setChecked(checked);
  }

  async setCoverImage(checked: boolean) {
    await this.coverImageToggle.setChecked(checked);
  }

  async setRatingDisplay(checked: boolean) {
    await this.ratingDisplayToggle.setChecked(checked);
  }

  async setAnimation(checked: boolean) {
    await this.animationToggle.setChecked(checked);
  }

  async saveSettings() {
    await this.saveButton.click();
  }

  async resetSettings() {
    await this.resetButton.click();
  }
}
