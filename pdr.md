# Playwright 社内資格試験 模擬練習環境 — PDR（Product Design Review）

> **本ドキュメントは自主学習用の模擬練習環境に関するPDRです。本番試験とは別のサイト・別のリポジトリを使用します。**

---

## 1. 目的と背景

### 1-1. 練習環境の目的

Playwright社内資格試験の受験前に、試験と同等の形式で自主練習を行うための環境。
本番試験と同じ3つの観点（AAA設計・POM編集・POM作成）を、異なるドメイン（書籍管理）で練習できる。

| 観点 | 練習カテゴリ | テスト対象 | 問題数 | 内容 |
|------|-------------|-----------|--------|------|
| 観点1: AAA設計 | 練習1 | 統計ページ | 15問 | 提供済みPOMを使い、AAAパターンでテストを書く |
| 観点2: POM編集 | 練習2 | 書籍一覧ページ | 15問 | 既存POMにlocator・メソッドを追加し、テストを完成させる |
| 観点3: POM作成 | 練習3 | 表示設定・メール変更 | 15問 | 新規POMを作成し、テストを書く |

### 1-2. 本番試験との差異

| 項目 | 本番試験（TaskFlow） | 模擬練習（BookShelf） |
|------|---------------------|---------------------|
| サイト名 | TaskFlow | BookShelf（書籍管理アプリ） |
| ドメイン | タスク管理 | 書籍管理 |
| 配色 | 青系 | オレンジ／アンバー系 |
| 問題数 | 各課題 7〜12問 | 各カテゴリ 15問 |
| 採点 | あり（100点満点） | なし（自己採点） |
| Firebase | 本番用プロジェクト | 練習専用プロジェクト（別プロジェクト） |

### 1-3. アーキテクチャ判断

| 判断事項 | 結論 | 理由 |
|---------|------|------|
| バックエンド | **不要** | 全データはブラウザタブごとにJS変数で管理。Playwrightはテストごとに新しいブラウザコンテキストを生成するため、テスト間で状態は衝突しない |
| ホスティング | **Firebase Hosting（Sparkプラン＝無料）** | 単一HTMLファイルの静的配信。本番試験とは別プロジェクトで運用 |
| データ永続化 | **不要** | ページリロードで初期状態にリセットされる仕様が、テストの冪等性を保証する |

---

## 2. テスト対象サイト仕様 — BookShelf

### 2-1. 技術構成

| 項目 | 仕様 |
|------|------|
| 実装 | HTML / CSS / Vanilla JS（単一ファイル `public/index.html`） |
| バックエンド | なし |
| 外部依存 | なし |
| ブラウザ対応 | Chromium最新版 |
| 配色 | オレンジ／アンバー系 |

### 2-2. 認証

| 項目 | 仕様 |
|------|------|
| 方式 | フロントエンドのみ（固定アカウント） |
| ユーザー名 | `admin` |
| パスワード | `password` |
| 未入力エラー | ユーザー名・パスワードそれぞれ個別に表示 |
| 認証失敗メッセージ | 「ユーザー名またはパスワードが正しくありません」 |
| ログイン後遷移 | 書籍一覧ページ |
| ログアウト | ナビバーのボタン → ログイン画面に戻る |

### 2-3. 共通レイアウト

- ログイン後：上部ナビゲーションバー ＋ 左サイドバー ＋ メインコンテンツの3ペイン
- サイドバーから各ページに遷移（アクティブ項目はハイライト）

### 2-4. トースト通知

- 保存・削除・送信等の操作完了時に表示
- 2.5秒後に自動消去
- `role="status"` 属性を付与

### 2-5. data-testid 命名規則

全インタラクティブ要素に `data-testid` を付与する。
命名規則：`[要素種別]-[対象名]-[id]`（例：`book-title-1`、`edit-btn-1`）

---

## 3. ページ別仕様

### 3-1. ログインページ

**URL**：`/`

| data-testid | 要素 |
|-------------|------|
| `username-input` | ユーザー名入力 |
| `password-input` | パスワード入力 |
| `login-btn` | ログインボタン |

**バリデーション**

| 条件 | エラー要素 |
|------|-----------|
| ユーザー名が空 | `#username-error` |
| パスワードが空 | `#password-error` |
| 認証失敗 | `#login-error` |

---

### 3-2. 書籍一覧ページ（練習2の対象）

**サイドバー**：`nav-books`

#### 一覧表示

- カード形式で一覧表示
- 各カード：書籍タイトル・ジャンルバッジ・著者名・レーティング・ステータスバッジ・ページ数・メモ（入力時のみ）

#### 検索・フィルター

| 機能 | data-testid | 仕様 |
|------|-------------|------|
| キーワード検索 | `search-input` | タイトル・メモ対象、リアルタイム絞り込み |
| ジャンルフィルター | `filter-genre` | all / tech / fiction / non-fiction / manga |
| 著者フィルター | `filter-author` | all / 山田 / 中村 / 高橋 |

- フィルターは組み合わせ適用
- 該当なし → `#empty-state` 表示

#### ステータス値

| 値 | 表示 |
|----|------|
| `finished` | 読了 |
| `reading` | 読書中 |
| `unread` | 未読 |

#### レーティング値

| 値 | 表示 |
|----|------|
| `5` | ★★★★★ |
| `4` | ★★★★☆ |
| `3` | ★★★☆☆ |

#### 読了トグル

- `read-check-{id}` クリックで `finished` ↔ `unread` 切り替え

#### 書籍追加・編集モーダル

| フィールド | data-testid | 必須 | 備考 |
|-----------|-------------|------|------|
| タイトル | `book-title-input` | ○ | 空 → `#book-title-error` |
| ジャンル | `book-genre-input` | ○ | select |
| 著者 | `book-author-input` | — | select（山田/中村/高橋） |
| ステータス | `book-status-input` | ○ | select |
| レーティング | `book-rating-input` | — | select（1〜5） |
| ページ数 | `book-pages-input` | — | テキスト（数値） |
| メモ | `book-note-input` | — | textarea |

| ボタン | data-testid | 動作 |
|--------|-------------|------|
| 保存する | `modal-save` | 書籍を保存 |
| ウィッシュリスト | `modal-wishlist` | ステータスを強制的に `unread` にして保存 |
| キャンセル | `#modal-cancel` | モーダルを閉じる |

- 追加ボタン：`add-book-btn` / 編集ボタン：`edit-btn-{id}`
- `role="dialog"` / `aria-modal="true"` / オーバーレイクリックで閉じる

#### 書籍削除

- `delete-btn-{id}` → 確認モーダル（対象書籍名を表示）
- `confirm-delete` で削除実行

#### カード要素の data-testid

| testid | 内容 |
|--------|------|
| `book-card` | カード全体 |
| `book-title-{id}` | 書籍タイトル |
| `book-genre-{id}` | ジャンルバッジ |
| `book-author-{id}` | 著者名 |
| `book-rating-{id}` | レーティング |
| `book-status-{id}` | ステータスバッジ |
| `book-pages-{id}` | ページ数 |
| `book-note-{id}` | メモ（入力時のみ） |
| `read-check-{id}` | 読了チェック |
| `edit-btn-{id}` | 編集ボタン |
| `delete-btn-{id}` | 削除ボタン |

#### 初期データ

| id | タイトル | ジャンル | 著者 | ステータス | レーティング | ページ数 | メモ |
|----|---------|---------|------|-----------|------------|---------|------|
| 1 | JavaScript入門 | tech | 山田 | finished | 4 | 320 | 初心者におすすめ |
| 2 | デザインパターン | tech | 中村 | reading | 5 | 480 | （なし） |
| 3 | 銀河鉄道の夜 | fiction | 高橋 | finished | 5 | 180 | 名作 |
| 4 | データ分析入門 | non-fiction | 山田 | unread | 3 | 250 | （なし） |
| 5 | ワンピース100巻 | manga | （なし） | reading | 4 | 200 | （なし） |
| 6 | AI時代の教育 | non-fiction | 高橋 | unread | 3 | 300 | 最新の教育論 |

---

### 3-3. 著者ページ

**サイドバー**：`nav-authors`

#### 著者一覧

| data-testid | 内容 |
|-------------|------|
| `author-list` | 一覧コンテナ |
| `author-card-{id}` | 著者カード |
| `author-name-{id}` | 著者名 |
| `author-genre-{id}` | 得意ジャンル |
| `author-detail-btn-{id}` | 詳細ボタン |
| `author-search` | 著者検索入力 |
| `add-author-btn` | 著者追加ボタン |

#### 著者詳細モーダル

| data-testid | 内容 |
|-------------|------|
| `author-modal-email` | メールアドレス |
| `author-modal-bookcount` | 担当書籍数（例：`2件`） |
| `author-modal-remove` | 著者削除ボタン |

#### 著者追加

| data-testid | 内容 |
|-------------|------|
| `new-author-name` | 著者名入力 |
| `new-author-genre` | 得意ジャンル選択 |
| `author-add-send` | 追加送信ボタン |

- 著者名が空 → `#author-name-error`
- 成功時トースト「著者を追加しました」

---

### 3-4. 統計ページ（練習1の対象）

**サイドバー**：`nav-stats`

#### フィルター

| data-testid | 選択肢 |
|-------------|--------|
| `stats-genre` | all / tech / fiction / non-fiction / manga |
| `stats-author` | all / 山田 / 中村 / 高橋 |

#### 集計カード

`#stats-grid` 内に集計カードを表示。
全書籍数・読了・読書中・未読の4区分で件数を表示。

#### 統計テーブル

- `stats-table`（tbody）/ `stats-row-{id}`（行）
- 列：タイトル・著者・ジャンル・ステータス・レーティング・ページ数

#### エクスポートボタン

- `stats-export-btn` → トースト「エクスポートしました（CSV）」（ファイル出力は不要）

---

### 3-5. 表示設定ページ（練習3の対象）

**サイドバー**：`nav-display`

#### トグル一覧

| data-testid | トグル名 | デフォルト |
|-------------|---------|-----------|
| `display-darkmode` | ダークモード | OFF |
| `display-compact` | コンパクト表示 | ON |
| `display-cover` | 表紙表示 | ON |
| `display-rating` | レーティング表示 | ON |
| `display-animation` | アニメーション | OFF |

#### ボタン

| data-testid | 動作 |
|-------------|------|
| `save-display-btn` | トースト「表示設定を保存しました」 |
| `reset-display-btn` | 全トグルをデフォルト値に戻す |

- 保存後、別ページに遷移して戻っても設定が保持される

---

### 3-6. メール変更ページ（練習3の対象）

**サイドバー**：`nav-email`

#### 入力フィールド

| data-testid | フィールド | 備考 |
|-------------|-----------|------|
| `email-current` | 現在のメールアドレス | 読み取り専用（`readonly`） |
| `email-new` | 新しいメールアドレス | |
| `email-confirm` | 新しいメールアドレス（確認） | |
| `email-password` | パスワード確認 | |

#### バリデーション

| 条件 | エラー要素 | メッセージ |
|------|-----------|-----------|
| 新メールアドレスが空または形式不正 | `#email-new-error` | 有効なメールアドレスを入力してください |
| 確認メールアドレスが不一致 | `#email-confirm-error` | メールアドレスが一致しません |
| パスワードが空 | `#email-password-error` | パスワードを入力してください |
| パスワードが不一致 | `#email-password-wrong` | パスワードが正しくありません |

#### ボタン

| data-testid | 動作 |
|-------------|------|
| `save-email-btn` | バリデーション通過後にメール更新、トースト「メールアドレスを変更しました」 |
| `cancel-email-btn` | 全フィールドクリア、エラー表示リセット |

- 変更後のメールアドレスはセッション中有効（リロードでリセット）

---

### 3-7. プロフィールページ

**サイドバー**：`nav-profile`

#### 入力フィールド

| data-testid | フィールド | バリデーション |
|-------------|-----------|--------------|
| `profile-name` | 表示名 | 空 → `#profile-name-error` |
| `profile-email` | メールアドレス | 形式不正 → `#profile-email-error` |
| `profile-bio` | 自己紹介 | なし |

#### ボタン

| data-testid | 動作 |
|-------------|------|
| `save-profile-btn` | バリデーション通過後に保存、ナビバー表示名を更新、トースト「プロフィールを保存しました」 |
| `cancel-profile-btn` | 保存前の値に戻す |

- アバターは表示名の頭文字（大文字）を表示

---

## 4. 練習構成

### 4-1. 練習1: AAA設計（統計ページ — 15問）

**概要**：提供済みの `StatsPage.ts` POMを使い、統計ページのテストをAAAパターンで作成する。POMの編集は不要。

**前提**：
- `StatsPage.ts` は完成済みPOMとして提供（`LoginPage.ts` と同様、編集不可）
- テストファイルにはTODOコメントでテストケースの概要のみ記載

**想定テストケース例**（15問）：
- 統計ページへの遷移確認
- ジャンルフィルターで絞り込むとテーブルの行数が変わる
- 著者フィルターで絞り込むとテーブルの行数が変わる
- フィルターの組み合わせ適用
- 集計カードの件数がフィルター結果と一致する
- エクスポートボタンをクリックするとトーストが表示される
- テーブルに正しいカラムが表示される
- 全件表示でテーブル行数が6件
- ジャンル「tech」フィルターで2件に絞り込み
- 著者「山田」フィルターで2件に絞り込み
- フィルター解除で全件に戻る
- 集計カードの読了件数が正しい
- 集計カードの読書中件数が正しい
- 集計カードの未読件数が正しい
- フィルター後にエクスポート可能

**練習のポイント**：
- Arrange（beforeEach でのログイン・遷移 / テストデータ準備）
- Act（1テスト1操作の原則）
- Assert（操作結果に対する適切なアサーション）
- `test.describe` によるグループ化
- テスト名が結果を表す命名

---

### 4-2. 練習2: POM編集（書籍一覧ページ — 15問）

**概要**：提供済みの `BookPage.ts` と `BookModal.ts` に不足しているlocator・メソッドを追加し、テストを完成させる

#### BookPage.ts への追加項目

| 追加対象 | 種別 | 説明 |
|---------|------|------|
| `filterGenre` | locator | ジャンルフィルター（`filter-genre`） |
| `filterByGenre()` | メソッド | ジャンルで絞り込み |
| `filterByAuthor()` | メソッド | 著者で絞り込み |
| `getBookAuthor()` | メソッド | 書籍の著者名を取得 |
| `getBookNote()` | メソッド | 書籍のメモを取得 |
| `getBookRating()` | メソッド | 書籍のレーティングを取得 |
| `getBookPages()` | メソッド | 書籍のページ数を取得 |

#### BookModal.ts への追加項目

| 追加対象 | 種別 | 説明 |
|---------|------|------|
| `authorSelect` | locator | 著者選択（`book-author-input`） |
| `selectAuthor()` | メソッド | 著者を選択 |
| `noteInput` | locator | メモ入力（`book-note-input`） |
| `fillNote()` | メソッド | メモを入力 |
| `ratingSelect` | locator | レーティング選択（`book-rating-input`） |
| `selectRating()` | メソッド | レーティングを選択 |
| `pagesInput` | locator | ページ数入力（`book-pages-input`） |
| `fillPages()` | メソッド | ページ数を入力 |
| `wishlistButton` | locator | ウィッシュリストボタン（`modal-wishlist`） |
| `saveWishlist()` | メソッド | ウィッシュリストに保存 |

**想定テストケース例**（15問）：
- ジャンルフィルターで「tech」に絞り込み → 2件表示
- 著者フィルターで「山田」に絞り込み → 2件表示
- フィルターの組み合わせ（ジャンル＋著者）
- 書籍の著者名を取得して確認
- 書籍のメモを取得して確認
- 書籍のレーティングを取得して確認
- 書籍のページ数を取得して確認
- 著者付きで新しい書籍を追加
- メモ付きで新しい書籍を追加
- レーティング指定で新しい書籍を追加
- ページ数指定で新しい書籍を追加
- ウィッシュリスト保存（ステータスが `unread` になる）
- 全フィールド入力で書籍追加
- タイトル空でバリデーションエラー（AAAパターンの実例として提供）
- フィルター後に該当なし → `#empty-state` 表示

---

### 4-3. 練習3: POM新規作成（表示設定・メール変更 — 15問）

**概要**：`LoginPage.ts` を雛形として `DisplayPage.ts` と `EmailPage.ts` を新規作成し、テストを完成させる

#### 表示設定ページ（7問）

| 問 | テスト内容 |
|----|-----------|
| 3-1 | 表示設定ページへの遷移 |
| 3-2 | トグルの初期状態確認（darkmode:OFF, compact:ON, cover:ON, rating:ON, animation:OFF） |
| 3-3 | ダークモードトグルをONにして保存 → トースト確認 |
| 3-4 | 複数トグルを変更して保存 |
| 3-5 | リセットでトグルが初期状態に戻る |
| 3-6 | 保存→別ページ遷移→戻る→設定保持の確認 |
| 3-7 | 全トグルをONにして保存→リセット→デフォルトに戻る |

#### メール変更ページ（8問）

| 問 | テスト内容 |
|----|-----------|
| 3-8 | メール変更ページへの遷移 |
| 3-9 | 現在のメールアドレスが読み取り専用 |
| 3-10 | 正常系：メール変更成功 → トースト確認 |
| 3-11 | 新メールアドレスが空 → エラー表示 |
| 3-12 | 確認メールアドレスが不一致 → エラー表示 |
| 3-13 | パスワードが空 → エラー表示 |
| 3-14 | パスワードが不一致 → エラー表示 |
| 3-15 | キャンセルで入力クリア |

---

## 5. リポジトリ構成

```
practice-pom/
├── pages/                                # Page Object Models
│   ├── LoginPage.ts                      # 【提供済み・編集不可】模範POM
│   ├── StatsPage.ts                      # 【提供済み・編集不可】練習1で使用する完成済みPOM
│   ├── BookPage.ts                       # 【練習2】TODOに従いlocator・メソッドを追加
│   └── BookModal.ts                      # 【練習2】TODOに従いlocator・メソッドを追加
│
├── tests/
│   ├── practice1_aaa.spec.ts             # 【練習1】AAAパターンで統計ページのテストを実装
│   ├── practice2_edit_pom.spec.ts        # 【練習2】TODOに従いテストコードを実装
│   └── practice3_new_pom.spec.ts         # 【練習3】TODOに従いテストコードを実装
│
├── answers/                              # 模範解答
│   ├── pages/
│   │   ├── BookPage.answer.ts
│   │   ├── BookModal.answer.ts
│   │   ├── DisplayPage.answer.ts
│   │   └── EmailPage.answer.ts
│   ├── practice1_aaa.answer.spec.ts
│   ├── practice2_edit_pom.answer.spec.ts
│   └── practice3_new_pom.answer.spec.ts
│
├── public/
│   └── index.html                        # テスト対象サイト（Firebase Hostingにもデプロイ）
│
├── playwright.config.ts
├── package.json
├── firebase.json
├── .firebaserc
└── pdr.md                                # 本ドキュメント
```

---

## 付録: data-testid 一覧

### ログインページ

| data-testid | 要素 |
|-------------|------|
| `username-input` | ユーザー名入力 |
| `password-input` | パスワード入力 |
| `login-btn` | ログインボタン |
| `#username-error` | ユーザー名エラー |
| `#password-error` | パスワードエラー |
| `#login-error` | 認証エラー |

### 書籍一覧ページ

| data-testid | 要素 |
|-------------|------|
| `search-input` | キーワード検索 |
| `filter-genre` | ジャンルフィルター |
| `filter-author` | 著者フィルター |
| `book-card` | カード全体 |
| `book-title-{id}` | 書籍タイトル |
| `book-genre-{id}` | ジャンルバッジ |
| `book-author-{id}` | 著者名 |
| `book-rating-{id}` | レーティング |
| `book-status-{id}` | ステータスバッジ |
| `book-note-{id}` | メモ |
| `book-pages-{id}` | ページ数 |
| `read-check-{id}` | 読了チェック |
| `edit-btn-{id}` | 編集ボタン |
| `delete-btn-{id}` | 削除ボタン |
| `add-book-btn` | 書籍追加ボタン |
| `#empty-state` | 該当なし表示 |

### 書籍モーダル

| data-testid | 要素 |
|-------------|------|
| `book-title-input` | タイトル入力 |
| `book-genre-input` | ジャンル選択 |
| `book-author-input` | 著者選択 |
| `book-status-input` | ステータス選択 |
| `book-rating-input` | レーティング選択 |
| `book-pages-input` | ページ数入力 |
| `book-note-input` | メモ入力 |
| `modal-save` | 保存ボタン |
| `modal-wishlist` | ウィッシュリストボタン |
| `#modal-cancel` | キャンセルボタン |
| `#book-title-error` | タイトルエラー |

### 著者ページ

| data-testid | 要素 |
|-------------|------|
| `author-list` | 一覧コンテナ |
| `author-card-{id}` | 著者カード |
| `author-name-{id}` | 著者名 |
| `author-genre-{id}` | 得意ジャンル |
| `author-detail-btn-{id}` | 詳細ボタン |
| `author-search` | 著者検索 |
| `author-modal-email` | メールアドレス |
| `author-modal-bookcount` | 担当書籍数 |
| `author-modal-remove` | 著者削除ボタン |
| `add-author-btn` | 著者追加ボタン |
| `new-author-name` | 新著者名入力 |
| `new-author-genre` | 新著者ジャンル選択 |
| `author-add-send` | 追加送信ボタン |
| `#author-name-error` | 著者名エラー |

### 統計ページ

| data-testid | 要素 |
|-------------|------|
| `stats-genre` | ジャンルフィルター |
| `stats-author` | 著者フィルター |
| `#stats-grid` | 集計カードグリッド |
| `stats-table` | 統計テーブル |
| `stats-row-{id}` | テーブル行 |
| `stats-export-btn` | エクスポートボタン |

### 表示設定ページ

| data-testid | 要素 |
|-------------|------|
| `display-darkmode` | ダークモードトグル |
| `display-compact` | コンパクト表示トグル |
| `display-cover` | 表紙表示トグル |
| `display-rating` | レーティング表示トグル |
| `display-animation` | アニメーショントグル |
| `save-display-btn` | 保存ボタン |
| `reset-display-btn` | リセットボタン |

### メール変更ページ

| data-testid | 要素 |
|-------------|------|
| `email-current` | 現在のメールアドレス（readonly） |
| `email-new` | 新しいメールアドレス |
| `email-confirm` | 確認メールアドレス |
| `email-password` | パスワード確認 |
| `save-email-btn` | 保存ボタン |
| `cancel-email-btn` | キャンセルボタン |
| `#email-new-error` | 新メールエラー |
| `#email-confirm-error` | 確認メールエラー |
| `#email-password-error` | パスワード空エラー |
| `#email-password-wrong` | パスワード不一致エラー |

### プロフィールページ

| data-testid | 要素 |
|-------------|------|
| `profile-name` | 表示名 |
| `profile-email` | メールアドレス |
| `profile-bio` | 自己紹介 |
| `save-profile-btn` | 保存ボタン |
| `cancel-profile-btn` | キャンセルボタン |
| `#profile-name-error` | 表示名エラー |
| `#profile-email-error` | メールエラー |
