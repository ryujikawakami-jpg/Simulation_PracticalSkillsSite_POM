import { Page, Locator } from '@playwright/test';

export class DisplayPage {
  readonly page: Page;
  readonly darkmodeToggle: Locator;
  readonly saveButton: Locator;

 // A：持ち物を宣言する
  readonly compactToggle: Locator;
  readonly coverToggle: Locator;
  readonly ratingToggle: Locator;
  readonly resetButton: Locator;
  readonly darkmodeCheckbox: Locator;
  readonly animationToggle: Locator;
  readonly compactLabel: Locator;
  readonly coverLabel: Locator;
  readonly ratingLabel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.darkmodeToggle = page.locator(
      'label:has([data-testid="display-darkmode"])'
    );
    this.saveButton = page.getByTestId('save-display-btn');

    // B：具体的な操作対象を代入する
    this.compactToggle = page.getByTestId('display-compact');
    this.coverToggle = page.getByTestId('display-cover');
    this.ratingToggle = page.getByTestId('display-rating');
    this.resetButton = page.getByTestId('reset-display-btn');
    this.darkmodeCheckbox = page.getByTestId('display-darkmode');
    this.animationToggle = page.locator('label:has([data-testid="display-animation"])');
    this.compactLabel = page.locator('label:has([data-testid="display-compact"])');
    this.coverLabel = page.locator('label:has([data-testid="display-cover"])');
    this.ratingLabel = page.locator('label:has([data-testid="display-rating"])');
  }

  async navigate() {
    await this.page.getByTestId('nav-display').click();
  }

  async setDarkmode(checked: boolean) {
  await this.darkmodeToggle.setChecked(checked);
}

  async save() {
  await this.saveButton.click();
}

async reset() {
  await this.resetButton.click();
}

async setAnimation(checked: boolean) {
  await this.animationToggle.setChecked(checked);
}
async setCompact(checked: boolean) {
  await this.compactLabel.setChecked(checked);
}

async setCover(checked: boolean) {
  await this.coverLabel.setChecked(checked);
}

async setRating(checked: boolean) {
  await this.ratingLabel.setChecked(checked);
}

}