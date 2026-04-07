import { Page, Locator } from '@playwright/test';

export class StatsPage {
  readonly page: Page;
  readonly genreFilter: Locator;
  readonly authorFilter: Locator;
  readonly exportButton: Locator;
  readonly statsGrid: Locator;
  readonly statsTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.genreFilter  = page.getByTestId('stats-genre');
    this.authorFilter = page.getByTestId('stats-author');
    this.exportButton = page.getByTestId('stats-export-btn');
    this.statsGrid    = page.locator('#stats-grid');
    this.statsTable   = page.getByTestId('stats-table');
  }

  async navigate() {
    await this.page.getByTestId('nav-stats').click();
  }

  async filterByGenre(genre: string) {
    await this.genreFilter.selectOption(genre);
  }

  async filterByAuthor(author: string) {
    await this.authorFilter.selectOption(author);
  }

  async getStatsRowCount(): Promise<number> {
    return await this.statsTable.locator('tbody tr').count();
  }

  async getStatsRowByBookId(id: number): Promise<Locator> {
    return this.page.getByTestId(`stats-row-${id}`);
  }

  async getStatValues(): Promise<{ total: string; finished: string; reading: string; unread: string }> {
    const nums = this.statsGrid.locator('.stat-num');
    return {
      total:    await nums.nth(0).textContent() ?? '',
      finished: await nums.nth(1).textContent() ?? '',
      reading:  await nums.nth(2).textContent() ?? '',
      unread:   await nums.nth(3).textContent() ?? '',
    };
  }

  async exportStats() {
    await this.exportButton.click();
  }
}
