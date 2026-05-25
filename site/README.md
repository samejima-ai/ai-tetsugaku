# ai--tetsugaku-suru — site (Phase 0)

Master (かげろう) の思考遊技場（過程が本体・結晶は区切り）。Astro + Tailwind の静的サイト。

仕様は `/dh-upgrades/ai-tetsugaku-suru/` 配下を参照:

- `SPEC.md` (§0 サイト名と表記、§3.4 dialogues 機構)
- `DONT.md` / `REGIME.md` / `DESIGN.md` / `CLAUDE.md` / `INDEX.md`

## 開発

```bash
cd site/
pnpm install     # 初回 (or npm install)
pnpm dev         # http://localhost:4321
```

## ビルド

```bash
pnpm build       # astro check + astro build, output to dist/
pnpm preview     # serve dist/ locally
```

## テスト

```bash
pnpm test        # vitest (scripts/mask-dialogue.mjs の unit test)
```

## マスク機構

`scripts/mask-dialogue.mjs` が SPEC §3.4.3 の regex マスクを実装する。
`frontmatter.masked === true` でない dialogues 記事は build を失敗させる (content collections schema `z.literal(true)`)。

Master 本名候補リストは `scripts/secrets/master-names.json` (gitignore) に置く方式。
ファイルが無くても動く (空配列扱い)。

## Phase 0 のサンプル記事

- `src/content/philosophy/2026-05-21-resonance-note.mdx` — AI 起草の placeholder (draft: true)
- `src/content/dialogues/2026-05-20-template.md` — dialogues template (draft: true)

両方とも `draft: true` のため公開されず、build / routing 確認用のみ。
Master が実コンテンツを入れた時点で `draft: false` にする。

## デプロイ

**Vercel（Git 連携）** でデプロイする。Vercel dashboard で repo を import し、
**Root Directory = `site/`** を指定すれば、`master` push で本番・PR で preview が自動生成される。
build は `site/vercel.json`（`buildCommand: pnpm test && pnpm build`）で mask ゲートごと走るため、
未マスク dialogues があれば deploy も落ちる。GitHub Secrets は不要。
詳細手順は `/dh-upgrades/ai-tetsugaku-suru/MANUAL.md §2`。

`.github/workflows/site-ci.yml` は GitHub 側の build + mask test ゲート（deploy はしない）。
