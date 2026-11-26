import { Page, Locator } from '@playwright/test';

export class BookModal {
  readonly page: Page;

  // --- 提供済みロケーター ---
  readonly titleInput: Locator;
  readonly genreSelect: Locator;
  readonly statusSelect: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly closeButton: Locator;
  readonly titleError: Locator;

  // --- TODO: 以下のロケーターを追加してください ---
  // readonly authorSelect: Locator;    // test-id: book-author-input
  // readonly ratingSelect: Locator;    // test-id: book-rating-input
  // readonly pagesInput: Locator;      // test-id: book-pages-input
  // readonly noteInput: Locator;       // test-id: book-note-input
  // readonly wishlistButton: Locator;  // test-id: modal-wishlist

  constructor(page: Page) {
    this.page = page;

    // 提供済み
    this.titleInput   = page.getByTestId('book-title-input');
    this.genreSelect  = page.getByTestId('book-genre-input');
    this.statusSelect = page.getByTestId('book-status-input');
    this.saveButton   = page.getByTestId('modal-save');
    this.cancelButton = page.locator('#modal-cancel');
    this.closeButton  = page.locator('#modal-close');
    this.titleError   = page.locator('#book-title-error');

    // TODO: 以下のロケーターを初期化してください
    // this.authorSelect  = ???;
    // this.ratingSelect  = ???;
    // this.pagesInput    = ???;
    // this.noteInput     = ???;
    // this.wishlistButton = ???;
  }

  // --- 提供済みメソッド ---

  async fillTitle(title: string) {
    await this.titleInput.fill(title);
  }

  async selectGenre(genre: string) {
    await this.genreSelect.selectOption(genre);
  }

  async selectStatus(status: 'unread' | 'reading' | 'finished') {
    await this.statusSelect.selectOption(status);
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async isTitleErrorVisible(): Promise<boolean> {
    return await this.titleError.isVisible();
  }

  // --- TODO: 以下のメソッドを実装してください ---

  // TODO Q1: 著者を選択する
  // async selectAuthor(author: string) { ... }

  // TODO Q2: 評価を選択する（1〜5）
  // async selectRating(rating: number) { ... }

  // TODO Q3: ページ数を入力する
  // async fillPages(pages: string) { ... }

  // TODO Q4: メモを入力する
  // async fillNote(note: string) { ... }

  // TODO Q5: ウィッシュリストとして保存する（ステータスが強制的に「未読」になる）
  // async saveWishlist() { ... }
}
