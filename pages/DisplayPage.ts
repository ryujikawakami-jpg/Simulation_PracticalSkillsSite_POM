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
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.darkmodeToggle = page.locator('label:has([data-testid="display-darkmode"])');
    this.compactToggle = page.locator('label:has([data-testid="display-compact"])');
    this.coverToggle = page.locator('label:has([data-testid="display-cover"])');
    this.ratingToggle = page.locator('label:has([data-testid="display-rating"])');
    this.animationToggle = page.locator('label:has([data-testid="display-animation"])');
    this.saveButton = page.getByTestId('save-display-btn');
    this.resetButton = page.getByTestId('reset-display-btn');
    this.successToast = page.getByRole('status');
  }

  async navigate() {
    await this.page.getByTestId('nav-display').click();
  }

  async navigateToBooks() {
    await this.page.getByTestId('nav-books').click();
  }

  async setDarkmode(on: boolean) {
    await this.darkmodeToggle.setChecked(on);
  }

  async setCompact(on: boolean) {
    await this.compactToggle.setChecked(on);
  }

  async setCover(on: boolean) {
    await this.coverToggle.setChecked(on);
  }

  async setRating(on: boolean) {
    await this.ratingToggle.setChecked(on);
  }

  async setAnimation(on: boolean) {
    await this.animationToggle.setChecked(on);
  }

  async save() {
    await this.saveButton.click();
  }

  async reset() {
    await this.resetButton.click();
  }
}
