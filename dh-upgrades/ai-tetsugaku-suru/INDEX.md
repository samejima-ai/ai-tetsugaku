# INDEX.md — ai--tetsugaku-suru site

Master (かげろう) の哲学発信サイト。dialog-harness の利用者プロジェクトとして位置づけ、
dh-upgrades/ai-tetsugaku-suru/ 配下に仕様一式、リポジトリ root の `site/` 配下に実装を置く。

## ドキュメント構成

| ファイル | 役割 |
|---|---|
| `INDEX.md` | 本ファイル。全体構成図 |
| `SPEC.md` | 何を作るか（コンテンツ・機構・dialogues 機構の Phase 移行）、サイト名と著者表記の意味論 |
| `DONT.md` | 何をやらないか（スコープ外明示） |
| `REGIME.md` | モード / dev_mode / persona / LC |
| `DESIGN.md` | 視覚仕様（色調・タイポ・レイアウト思想・シェイプ言語） |
| `CLAUDE.md` | AI 開発時の指針（このサイト固有） |

## 実装側のディレクトリ（リポジトリ root 直下、本 SPEC では参照のみ）

```
ai-tetsugaku/
├── dh-upgrades/ai-tetsugaku-suru/   ← 本 SPEC 群（仕様の住処）
├── site/                            ← Astro 実装本体（コードの住処）
│   ├── src/
│   │   ├── pages/
│   │   ├── content/
│   │   │   ├── philosophy/          ← 思索記事 (MDX)
│   │   │   └── dialogues/           ← Master ↔ Ignis 対話 (Markdown + frontmatter)
│   │   ├── components/
│   │   └── layouts/
│   ├── public/
│   ├── astro.config.mjs
│   └── package.json
└── .github/workflows/               ← Cloudflare Pages デプロイ用
```

## 関連ドキュメント（DH 本体側、本サイト独立性のため参照のみ）

- `/.claude/skills/layer0-spec-architect/references/philosophy.md` — DH 哲学 6 条
- `/.claude/skills/crosscut-council/history/COUNCIL-LOG.md` — dialogues 機構 止揚案合意
- `/templates/personas/ignis.persona.md` — Ignis persona（本サイトの dialogues に登場）

## Phase ロードマップ

| Phase | 概要 | dialogues 形態 | 自動化レベル |
|---|---|---|---|
| 0 | 立ち上げ。philosophy 記事 3-5 本 + dialogues archive footer のみ | 手動 commit (B1) | local_only 相当 |
| 1 | dialogues page を独立追加。SessionEnd hook で書き出し | hook + Master 選別 commit (B2) | github_assisted |
| 2 | Ignis 解題を併設。3 形態併存（生 + 短文要約 + 解題） | 半自動 + 解題生成 (B3) | github_assisted |
