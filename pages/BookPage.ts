import { Page, Locator } from '@playwright/test';

export class BookPage {
  readonly page: Page;
  readonly filterGenre: Locator;
  readonly filterAuthor: Locator;
  readonly addBookButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterGenre   = page.getByTestId('filter-genre');
    this.filterAuthor  = page.getByTestId('filter-author');
    this.addBookButton = page.getByTestId('add-book-btn');
  }

  // 書籍一覧ページへ遷移する
  async navigate() {
    await this.page.getByTestId('nav-books').click();
  }

  // 書籍追加モーダルを開く
  async openAddModal() {
    await this.addBookButton.click();
  }

  // ジャンルフィルターで書籍を絞り込む
  async filterByGenre(genre: string) {
    await this.filterGenre.selectOption(genre);
  }

  // 著者フィルターで書籍を絞り込む
  async filterByAuthor(author: string) {
    await this.filterAuthor.selectOption(author);
  }

  // 表示されている書籍の件数を取得する
  async getBookCount(): Promise<number> {
    return await this.page.getByTestId('book-card').count();
  }

  // 指定IDの書籍ステータス要素を取得する
  getBookStatusLocator(id: number): Locator {
    return this.page.getByTestId(`book-status-${id}`);
  }

  // 指定IDの書籍の著者名要素を取得する
  getBookAuthorLocator(id: number): Locator {
    return this.page.getByTestId(`book-author-${id}`);
  }

  // 指定IDの書籍のメモ要素を取得する
  getBookNoteLocator(id: number): Locator {
    return this.page.getByTestId(`book-note-${id}`);
  }

  // 指定IDの書籍の評価要素を取得する
  getBookRatingLocator(id: number): Locator {
    return this.page.getByTestId(`book-rating-${id}`);
  }

  // 指定IDの書籍のページ数要素を取得する
  getBookPagesLocator(id: number): Locator {
    return this.page.getByTestId(`book-pages-${id}`);
  }
}
