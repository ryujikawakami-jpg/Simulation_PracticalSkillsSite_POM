import { Locator, Page } from '@playwright/test';

export class DisplayPage {
  readonly page: Page;
  readonly darkmodeToggle: Locator;
  readonly compactToggle: Locator;
  readonly coverToggle: Locator;
  readonly ratingToggle: Locator;
  readonly animationToggle: Locator;
  readonly saveButton: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.darkmodeToggle = page.getByTestId('display-darkmode');
    this.compactToggle = page.getByTestId('display-compact');
    this.coverToggle = page.getByTestId('display-cover');
    this.ratingToggle = page.getByTestId('display-rating');
    this.animationToggle = page.getByTestId('display-animation');
    this.saveButton = page.getByTestId('save-display-btn');
    this.resetButton = page.getByTestId('reset-display-btn');
  }

  async navigate() {
    await this.page.getByTestId('nav-display').click();
  }

  private async setToggle(testId: string, checked: boolean) {
    await this.page.locator(`label:has([data-testid="${testId}"])`).setChecked(checked);
  }

  async setDarkmode(checked: boolean) {
    await this.setToggle('display-darkmode', checked);
  }

  async setCompact(checked: boolean) {
    await this.setToggle('display-compact', checked);
  }

  async setCover(checked: boolean) {
    await this.setToggle('display-cover', checked);
  }

  async setRating(checked: boolean) {
    await this.setToggle('display-rating', checked);
  }

  async setAnimation(checked: boolean) {
    await this.setToggle('display-animation', checked);
  }

  async save() {
    await this.saveButton.click();
  }

  async reset() {
    await this.resetButton.click();
  }

  async isDarkmodeChecked(): Promise<boolean> {
    return this.darkmodeToggle.isChecked();
  }

  async isCompactChecked(): Promise<boolean> {
    return this.compactToggle.isChecked();
  }

  async isCoverChecked(): Promise<boolean> {
    return this.coverToggle.isChecked();
  }

  async isRatingChecked(): Promise<boolean> {
    return this.ratingToggle.isChecked();
  }

  async isAnimationChecked(): Promise<boolean> {
    return this.animationToggle.isChecked();
  }
}
