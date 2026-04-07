import { Page, Locator } from '@playwright/test';

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
    this.darkmodeToggle  = page.getByTestId('display-darkmode');
    this.compactToggle   = page.getByTestId('display-compact');
    this.coverToggle     = page.getByTestId('display-cover');
    this.ratingToggle    = page.getByTestId('display-rating');
    this.animationToggle = page.getByTestId('display-animation');
    this.saveButton      = page.getByTestId('save-display-btn');
    this.resetButton     = page.getByTestId('reset-display-btn');
  }

  async navigate() {
    await this.page.getByTestId('nav-display').click();
  }

  async toggleDarkmode() {
    await this.darkmodeToggle.evaluate((el) => (el as HTMLInputElement).click());
  }

  async toggleCompact() {
    await this.compactToggle.evaluate((el) => (el as HTMLInputElement).click());
  }

  async toggleCover() {
    await this.coverToggle.evaluate((el) => (el as HTMLInputElement).click());
  }

  async toggleRating() {
    await this.ratingToggle.evaluate((el) => (el as HTMLInputElement).click());
  }

  async toggleAnimation() {
    await this.animationToggle.evaluate((el) => (el as HTMLInputElement).click());
  }

  async save() {
    await this.saveButton.click();
  }

  async reset() {
    await this.resetButton.click();
  }

  async isDarkmodeChecked(): Promise<boolean> {
    return await this.darkmodeToggle.isChecked();
  }

  async isCompactChecked(): Promise<boolean> {
    return await this.compactToggle.isChecked();
  }

  async isCoverChecked(): Promise<boolean> {
    return await this.coverToggle.isChecked();
  }

  async isRatingChecked(): Promise<boolean> {
    return await this.ratingToggle.isChecked();
  }

  async isAnimationChecked(): Promise<boolean> {
    return await this.animationToggle.isChecked();
  }
}
