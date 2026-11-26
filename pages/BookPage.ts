import { Page, Locator } from '@playwright/test';

export class BookPage {
  readonly page: Page;

  // --- 提供済みロケーター ---
  readonly searchInput: Locator;
  readonly filterGenre: Locator;
  readonly addBookButton: Locator;
  readonly bookList: Locator;
  readonly emptyState: Locator;

  // --- TODO: 以下のロケーターを追加してください ---
  // readonly filterAuthor: Locator;  // test-id: filter-author

  constructor(page: Page) {
    this.page = page;

    // 提供済み
    this.searchInput   = page.getByTestId('search-input');
    this.filterGenre   = page.getByTestId('filter-genre');
    this.addBookButton = page.getByTestId('add-book-btn');
    this.bookList      = page.getByTestId('book-list');
    this.emptyState    = page.locator('#empty-state');

    // TODO: filterAuthor のロケーターを初期化してください
    // this.filterAuthor = ???;
  }

  // --- 提供済みメソッド ---

  async navigate() {
    await this.page.getByTestId('nav-books').click();
  }

  async search(keyword: string) {
    await this.searchInput.fill(keyword);
  }

  async filterByGenre(genre: string) {
    await this.filterGenre.selectOption(genre);
  }

  async getBookCount(): Promise<number> {
    return await this.page.getByTestId('book-card').count();
  }

  async getBookTitle(id: number): Promise<string> {
    return (await this.page.getByTestId(`book-title-${id}`).textContent()) ?? '';
  }

  async getBookStatus(id: number): Promise<string> {
    return (await this.page.getByTestId(`book-status-${id}`).textContent()) ?? '';
  }

  async clickEdit(id: number) {
    await this.page.getByTestId(`edit-btn-${id}`).click();
  }

  async clickDelete(id: number) {
    await this.page.getByTestId(`delete-btn-${id}`).click();
  }

  async confirmDelete() {
    await this.page.getByRole('button', { name: '削除' }).click();
  }

  // --- TODO: 以下のメソッドを実装してください ---

  // TODO Q1: 著者フィルターで絞り込む
  // async filterByAuthor(author: string) { ... }

  // TODO Q2: 書籍の著者名を取得する
  // async getBookAuthor(id: number): Promise<string> { ... }

  // TODO Q3: 書籍のメモを取得する
  // async getBookNote(id: number): Promise<string> { ... }

  // TODO Q4: 書籍の評価を取得する
  // async getBookRating(id: number): Promise<string> { ... }

  // TODO Q5: 書籍のページ数を取得する
  // async getBookPages(id: number): Promise<string> { ... }
}
