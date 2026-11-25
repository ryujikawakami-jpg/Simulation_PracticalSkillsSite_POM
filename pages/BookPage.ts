import { Page, Locator } from '@playwright/test';

export class BookPage {
  readonly page: Page;
  readonly filterGenre: Locator;
  readonly filterAuthor: Locator;
  readonly addBookButton: Locator;
  readonly bookCards: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterGenre = page.getByTestId('filter-genre');
    this.filterAuthor = page.getByTestId('filter-author');
    this.addBookButton = page.getByTestId('add-book-btn');
    this.bookCards = page.getByTestId('book-card');
  }

  // 書籍一覧ページへ移動する
  async navigate() {
    await this.page.getByTestId('nav-books').click();
  }

  // ジャンルで書籍を絞り込む
  async filterByGenre(genre: string) {
    await this.filterGenre.selectOption(genre);
  }

  // 著者で書籍を絞り込む
  async filterByAuthor(author: string) {
    await this.filterAuthor.selectOption(author);
  }

  // 指定した書籍の著者を取得する
  bookAuthor(id: number): Locator {
    return this.page.getByTestId(`book-author-${id}`);
  }

  // 指定した書籍のステータスを取得する
  bookStatus(id: number): Locator {
    return this.page.getByTestId(`book-status-${id}`);
  }

  // 指定した書籍のメモを取得する
  bookNote(id: number): Locator {
    return this.page.getByTestId(`book-note-${id}`);
  }

  // 指定した書籍の評価を取得する
  bookRating(id: number): Locator {
    return this.page.getByTestId(`book-rating-${id}`);
  }

  // 指定した書籍のページ数を取得する
  bookPages(id: number): Locator {
    return this.page.getByTestId(`book-pages-${id}`);
  }
}
