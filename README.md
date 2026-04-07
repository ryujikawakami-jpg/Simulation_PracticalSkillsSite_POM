# BookShelf — Playwright E2E テスト練習環境

本番試験（TaskFlow）と同じ構造の練習用環境です。  
BookShelf（書籍管理サイト）を題材に、POM パターンと AAA パターンを練習できます。

## セットアップ

```bash
npm install
npx playwright install chromium
```

## ローカルサーバーの起動

BookShelf アプリを `http://localhost:8080` で起動してください。

## テストの実行

### 練習問題（test.fixme で全てスキップ状態）

```bash
npx playwright test
```

### 模範解答の実行

```bash
npm run test:answers
```

## 構成

| ディレクトリ | 内容 |
|---|---|
| `pages/` | POM ファイル（LoginPage, StatsPage は完成済み、BookPage, BookModal は TODO あり） |
| `tests/` | 練習問題（15問 x 3ファイル = 45問） |
| `answers/` | 模範解答 |

## 練習内容

1. **practice1_aaa** — AAA パターンで StatsPage のテストを書く（POM は完成済み）
2. **practice2_edit_pom** — BookPage / BookModal の TODO を埋めてテストを書く
3. **practice3_new_pom** — DisplayPage / EmailPage の POM を新規作成してテストを書く
