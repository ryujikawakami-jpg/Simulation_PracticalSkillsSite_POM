# BookShelf — Playwright E2E テスト練習環境

本番試験（TaskFlow）と同じ構造の練習用環境です。
BookShelf（書籍管理サイト）を題材に、POM パターンと AAA パターンを練習できます。

## テスト対象サイト

**https://bookshelf-practice-site.web.app**

公開済みなので、ローカルでサーバーを立てる必要はありません。ログインも不要です。
`playwright.config.ts` の `baseURL` がこのURLを既定にしているので、そのまま `npx playwright test` で動きます。

まずブラウザでこのサイトを開いて触ってみてください。
どんな画面があるのかを掴んでからテストを書き始めた方が、意味のあるテストになります。

## セットアップ

```bash
npm install
npx playwright install chromium
```

## テストの実行

### 練習問題（すべて `test.fixme` でスキップ状態）

```bash
npx playwright test
```

各問題は `test.fixme(...)` になっています。`test(...)` に書き換えて中身を埋めると実行されます。

### 模範解答の実行

```bash
npm run test:answers
```

## 構成

| ディレクトリ | 内容 |
|---|---|
| `pages/` | POM ファイル（`LoginPage` `StatsPage` は完成済み。`BookPage` `BookModal` は TODO あり） |
| `tests/` | 練習問題（15問 × 3ファイル = 全45問） |
| `answers/` | 模範解答（テスト3ファイル ＋ `answers/pages/` にPOM 4ファイル） |

## 練習内容

1. **practice1_aaa** — AAA パターンで `StatsPage` のテストを書く（POM は完成済み）
2. **practice2_edit_pom** — `BookPage` / `BookModal` の TODO を埋めてテストを書く
3. **practice3_new_pom** — `DisplayPage` / `EmailPage` の POM を新規作成してテストを書く

この順に進めると、無理なく難易度が上がります。

## 模範解答を見るタイミング

`answers/` に模範解答が入っていますが、**自分で書いて Pull Request を出したあとに見てください。**
先に見ると「読めば分かる」で終わってしまい、書けるようにはなりません。
30分考えて手が止まったときは、解答を見るよりOJT担当者に声をかけた方が早く進みます。

## 提出のしかた

`main` に直接コミットせず、自分の名前などでブランチを切って Pull Request を出してください。
PRの説明に「どの問題を解いたか」「詰まった箇所」を書いておくと、レビューが早く終わります。

提出したら、SkillCheck の「模擬試験 → Playwright社内試験 → 実技模擬」のページで
**「PRを提出した」**を押しておいてください。OJT担当者がレビューに入りやすくなります。

## ローカルで動かしたい場合（任意）

別のURLに対して実行したいときは `BASE_URL` を渡します。

```bash
BASE_URL=http://localhost:8080 npx playwright test
```
