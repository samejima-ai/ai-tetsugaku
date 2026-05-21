# ai--tetsugaku-suru — site (Phase 0)

Master (かげろう) の哲学発信サイト。Astro + Tailwind の静的サイト。

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

`.github/workflows/deploy-site.yml` は Cloudflare Pages 用の雛形を含むが、
`CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` が GitHub Secrets に設定されるまで
deploy step は gated (no-op)。Master が secret を設定して `if: ${{ false }}` を外すと有効化。
