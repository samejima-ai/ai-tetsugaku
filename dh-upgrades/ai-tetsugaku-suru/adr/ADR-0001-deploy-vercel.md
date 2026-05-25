# ADR-0001: デプロイ先を Cloudflare Pages から Vercel に変更

- Status: Accepted
- Date: 2026-05-25
- Deciders: かげろう (Master) / Ignis (L1 build)
- Context-LC: 1 / Phase 0

## Context

v1/v2 SPEC §5 はホスティングを Cloudflare Pages + GitHub Actions（wrangler-action）で deploy する前提だった（`deploy-site.yml` が build→Cloudflare、`if: false` で gate 中、`CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` を要求）。

Phase 0 立ち上げにあたり Master から「Vercel デプロイが個人的にハードルが低い」との表明。実際の deploy をまだ一度も通していない段階での platform 選択であり、切替コストは最小。

## Decision

ホスティングを **Vercel** に変更し、**Git 連携（GitHub import, Root Directory = `site/`）** で deploy する。

- `master` push → 本番デプロイ、PR → preview デプロイ（Vercel が自動生成）
- build は `site/vercel.json` の `buildCommand: pnpm test && pnpm build` で実行し、**mask ゲート（未マスク dialogues で build 失敗、DONT §2.1）を維持**
- 静的出力（adapter 無し）。Vercel の Astro preset が `dist/` を配信
- GitHub Actions の deploy 責務は廃止。`deploy-site.yml` を削除し、build + mask test のみの GitHub 側ゲート `site-ci.yml` に置換（deploy はしない、二重化による defense-in-depth）
- GitHub Secrets（`CLOUDFLARE_*`）は不要。Git 連携のため deploy token を GitHub に置かない

## Consequences

### 良い点

- Master の運用ハードルが下がる（dashboard import + Root Directory 指定のみ。token 発行・Secrets 設定が不要）
- PR preview が Vercel ネイティブで自動。CLAUDE §2.2 / DONT §3.2 の「preview 確認後 merge」が容易
- AI コスト中立性（SPEC §3.4.6）・非商用方針（DONT §1.5）と Vercel Hobby（無料・非商用）が整合

### 留意点 / ガードレール

- **Vercel Web Analytics / Speed Insights は入れない**（script 注入になり DONT §1.3 違反）。解析が必要になれば Phase 2+ で cookie-less 手段を別 ADR で検討
- production URL は connect 後に確定（`https://ai-tetsugaku-suru.vercel.app` を暫定値として `astro.config.mjs` に設定。独自ドメイン化時は MANUAL §4 の手順で更新）
- mask ゲートは Vercel build（vercel.json）と GitHub `site-ci.yml` の二重で担保

## 影響を受けた文書

SPEC §2.1 / §4.1 / §4.3 / §4.4 / §5、MANUAL §2 / §4、DONT §1.3 / §3.1 / §3.2、CLAUDE §2.2 / §6.3、REGIME §3 / §9.2、INDEX、`site/README.md`、`site/astro.config.mjs`、`site/vercel.json`（新規）、`.github/workflows/`（`deploy-site.yml` 削除 → `site-ci.yml`）
