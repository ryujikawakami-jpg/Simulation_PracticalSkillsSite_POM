import { Page, Locator } from '@playwright/test';

export class BookModal {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly genreSelect: Locator;
  readonly authorSelect: Locator;
  readonly statusSelect: Locator;
  readonly ratingSelect: Locator;
  readonly pagesInput: Locator;
  readonly noteInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly closeButton: Locator;
  readonly wishlistButton: Locator;
  readonly titleError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput     = page.getByTestId('book-title-input');
    this.genreSelect    = page.getByTestId('book-genre-input');
    this.authorSelect   = page.getByTestId('book-author-input');
    this.statusSelect   = page.getByTestId('book-status-input');
    this.ratingSelect   = page.getByTestId('book-rating-input');
    this.pagesInput     = page.getByTestId('book-pages-input');
    this.noteInput      = page.getByTestId('book-note-input');
    this.saveButton     = page.getByTestId('modal-save');
    this.cancelButton   = page.locator('#modal-cancel');
    this.closeButton    = page.locator('#modal-close');
    this.wishlistButton = page.getByTestId('modal-wishlist');
    this.titleError     = page.locator('#book-title-error');
  }

  async fillTitle(title: string) {
    await this.titleInput.fill(title);
  }

  async selectGenre(genre: string) {
    await this.genreSelect.selectOption(genre);
  }

  async selectAuthor(author: string) {
    await this.authorSelect.selectOption(author);
  }

  async selectStatus(status: 'unread' | 'reading' | 'finished') {
    await this.statusSelect.selectOption(status);
  }

  async selectRating(rating: number) {
    await this.ratingSelect.selectOption(String(rating));
  }

  async fillPages(pages: string) {
    await this.pagesInput.fill(pages);
  }

  async fillNote(note: string) {
    await this.noteInput.fill(note);
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async saveWishlist() {
    await this.wishlistButton.click();
  }

  async isTitleErrorVisible(): Promise<boolean> {
    return await this.titleError.isVisible();
  }
}
