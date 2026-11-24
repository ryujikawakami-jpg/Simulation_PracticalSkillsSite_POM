import { Page, Locator } from '@playwright/test';

export class BookModal {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly genreSelect: Locator;
  readonly authorSelect: Locator;
  readonly ratingSelect: Locator;
  readonly pagesInput: Locator;
  readonly noteInput: Locator;
  readonly saveButton: Locator;
  readonly wishlistButton: Locator;
  readonly titleError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput     = page.getByTestId('book-title-input');
    this.genreSelect    = page.getByTestId('book-genre-input');
    this.authorSelect   = page.getByTestId('book-author-input');
    this.ratingSelect   = page.getByTestId('book-rating-input');
    this.pagesInput     = page.getByTestId('book-pages-input');
    this.noteInput      = page.getByTestId('book-note-input');
    this.saveButton     = page.getByTestId('modal-save');
    this.wishlistButton = page.getByTestId('modal-wishlist');
    this.titleError     = page.locator('#book-title-error');
  }

  // 書籍タイトルを入力する
  async fillTitle(title: string) {
    await this.titleInput.fill(title);
  }

  // ジャンルを選択する
  async selectGenre(genre: string) {
    await this.genreSelect.selectOption(genre);
  }

  // 著者を選択する
  async selectAuthor(author: string) {
    await this.authorSelect.selectOption(author);
  }

  // 評価（1〜5）を選択する
  async selectRating(rating: number) {
    await this.ratingSelect.selectOption(String(rating));
  }

  // ページ数を入力する
  async fillPages(pages: string) {
    await this.pagesInput.fill(pages);
  }

  // メモを入力する
  async fillNote(note: string) {
    await this.noteInput.fill(note);
  }

  // 書籍を保存する
  async save() {
    await this.saveButton.click();
  }

  // ウィッシュリストとして保存する（ステータスが「未読」になる）
  async saveWishlist() {
    await this.wishlistButton.click();
  }
}
