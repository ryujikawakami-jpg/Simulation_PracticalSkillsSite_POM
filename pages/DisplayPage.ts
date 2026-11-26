import { Page, Locator } from '@playwright/test';

export class DisplayPage {
  readonly page: Page;

  readonly saveButton: Locator;
  readonly resetButton: Locator;
  readonly darkModeSwitch: Locator;
  readonly compactShowSwitch: Locator;
  readonly coverShowSwitch: Locator;
  readonly ratingShowSwitch: Locator;
  readonly animationShowSwitch: Locator;
  readonly flashMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.saveButton = page.getByTestId('save-display-btn');  // 保存ボタン
    this.resetButton = page.getByTestId('reset-display-btn'); //定リセットボタン
    this.darkModeSwitch = page.getByTestId('display-darkmode');
    this.compactShowSwitch = page.getByTestId('display-compact');
    this.coverShowSwitch = page.getByTestId('display-cover');
    this.ratingShowSwitch = page.getByTestId('display-rating');
    this.animationShowSwitch = page.getByTestId('display-animation');
    this.flashMessage = page.getByText('表示設定を保存しました', { exact: true });

  }

  async navigate() {
    await this.page.getByTestId('nav-display').click();
  }

  private async setSwitch(testId: string, checked: boolean) {
    await this.page
      .locator(`label:has([data-testid="${testId}"])`)
      .setChecked(checked);
  }

  async setDarkMode(checked: boolean) {
    await this.setSwitch('display-darkmode', checked);
  }

  async setCompactShow(checked: boolean) {
    await this.setSwitch('display-compact', checked);
  }

  async setCoverShow(checked: boolean) {
    await this.setSwitch('display-cover', checked);
  }

  async setRatingShow(checked: boolean) {
    await this.setSwitch('display-rating', checked);
  }

  async setAnimation(checked: boolean) {
    await this.setSwitch('display-animation', checked);
  }

  async isDarkModeChecked(): Promise<boolean> {
    return await this.darkModeSwitch.isChecked();
  }

  async isCompactShowChecked(): Promise<boolean> {
    return await this.compactShowSwitch.isChecked();
  }

  async isCoverShowChecked(): Promise<boolean> {
    return await this.coverShowSwitch.isChecked();
  }

  async isRatingShowChecked(): Promise<boolean> {
    return await this.ratingShowSwitch.isChecked();
  }

  async isAnimationChecked(): Promise<boolean> {
    return await this.animationShowSwitch.isChecked();
  }

  async save() {
   await this.saveButton.click();
   
  } 

  async reset(){
    await this.resetButton.click();
  }
}