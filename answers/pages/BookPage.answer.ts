import { Page, Locator } from '@playwright/test';

export class BookPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly filterGenre: Locator;
  readonly filterAuthor: Locator;
  readonly addBookButton: Locator;
  readonly bookList: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput   = page.getByTestId('search-input');
    this.filterGenre   = page.getByTestId('filter-genre');
    this.filterAuthor  = page.getByTestId('filter-author');
    this.addBookButton = page.getByTestId('add-book-btn');
    this.bookList      = page.getByTestId('book-list');
    this.emptyState    = page.locator('#empty-state');
  }

  async navigate() {
    await this.page.getByTestId('nav-books').click();
  }

  async search(keyword: string) {
    await this.searchInput.fill(keyword);
  }

  async filterByGenre(genre: string) {
    await this.filterGenre.selectOption(genre);
  }

  async filterByAuthor(author: string) {
    await this.filterAuthor.selectOption(author);
  }

  async getBookCount(): Promise<number> {
    return await this.page.getByTestId('book-card').count();
  }

  async getBookTitle(id: number): Promise<string> {
    return (await this.page.getByTestId(`book-title-${id}`).textContent()) ?? '';
  }

  async getBookAuthor(id: number): Promise<string> {
    return (await this.page.getByTestId(`book-author-${id}`).textContent()) ?? '';
  }

  async getBookStatus(id: number): Promise<string> {
    return (await this.page.getByTestId(`book-status-${id}`).textContent()) ?? '';
  }

  async getBookNote(id: number): Promise<string> {
    return (await this.page.getByTestId(`book-note-${id}`).textContent()) ?? '';
  }

  async getBookRating(id: number): Promise<string> {
    return (await this.page.getByTestId(`book-rating-${id}`).textContent()) ?? '';
  }

  async getBookPages(id: number): Promise<string> {
    return (await this.page.getByTestId(`book-pages-${id}`).textContent()) ?? '';
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
}
