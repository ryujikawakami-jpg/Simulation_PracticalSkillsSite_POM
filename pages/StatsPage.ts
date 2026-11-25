import { Page, Locator } from '@playwright/test';

export class StatsPage {
  readonly page: Page;
  readonly genreFilter: Locator;
  readonly authorFilter: Locator;
  readonly exportButton: Locator;
  readonly statsGrid: Locator;
  readonly statsTable: Locator;
  readonly exportToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.genreFilter  = page.getByTestId('stats-genre');
    this.authorFilter = page.getByTestId('stats-author');
    this.exportButton = page.getByTestId('stats-export-btn');
    this.statsGrid    = page.locator('#stats-grid');
    this.statsTable   = page.getByTestId('stats-table');
    this.exportToast  = page.getByText('エクスポートしました（CSV）');
  }

  // 統計ページへ移動する
  async navigate() {
    await this.page.getByTestId('nav-stats').click();
  }

  // ジャンルで統計を絞り込む
  async filterByGenre(genre: string) {
    await this.genreFilter.selectOption(genre);
  }

  // 著者で統計を絞り込む
  async filterByAuthor(author: string) {
    await this.authorFilter.selectOption(author);
  }

  // 統計テーブルの行数を取得する
  async getStatsRowCount(): Promise<number> {
    // data-testid="stats-table" が付いているのは <table> ではなく <tbody> なので、
    // ここからさらに tbody を探すと 0 件になる
    return await this.statsTable.locator('tr').count();
  }

  // 書籍IDに対応する統計行を取得する
  async getStatsRowByBookId(id: number): Promise<Locator> {
    return this.page.getByTestId(`stats-row-${id}`);
  }

  // 集計カードの各数値を取得する
  async getStatValues(): Promise<{ total: string; finished: string; reading: string; unread: string }> {
    const nums = this.statsGrid.locator('.stat-num');
    return {
      total:    await nums.nth(0).textContent() ?? '',
      finished: await nums.nth(1).textContent() ?? '',
      reading:  await nums.nth(2).textContent() ?? '',
      unread:   await nums.nth(3).textContent() ?? '',
    };
  }

  // 統計データをエクスポートする
  async exportStats() {
    await this.exportButton.click();
  }
}
