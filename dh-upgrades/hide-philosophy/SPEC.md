# SPEC.md — hide-philosophy site

> Master (hide) 個人の哲学発信サイト。dialog-harness 開発を通じて醸成された
> AI 観・存在論・対話論を「自分の文章 (philosophy)」と「Ignis との対話 (dialogues)」
> の二経路で公開する。

- 関連: `INDEX.md` / `DONT.md` / `REGIME.md` / `DESIGN.md` / `CLAUDE.md`
- Council 諮問起点: `/.claude/skills/crosscut-council/history/COUNCIL-LOG.md` の hide-philosophy dialogues 諮問
- LC: 0 (新規)

---

## 1. 目的とスコープ

### 1.1 目的

DH 開発を通じて Master の中に醸成された AI 観・存在論・対話論を、外部の読者と共有する。
発信媒体としての二経路：

1. **philosophy**: Master 自身の文章。思索のスナップショット。MDX で書く
2. **dialogues**: Master ↔ Ignis (DH の Ignis persona) の実対話の公開

### 1.2 対象読者

- AI / 哲学に関心ある読者（一般）
- dialog-harness 利用者・開発者コミュニティ
- Master 自身（思考整理用、Most Important Reader）

### 1.3 スコープ in

- 静的サイト（Astro + MDX）
- philosophy 記事の MDX 公開
- dialogues 記事の公開（Phase に応じて形態変化）
- 簡素な top page / about page / footer

### 1.4 スコープ out

`DONT.md` 参照。

---

## 2. アーキテクチャ概観

### 2.1 技術スタック

| 領域 | 採用 | 理由 |
|---|---|---|
| サイト生成 | Astro v4+ | 静的サイト、MDX 一級サポート、軽量、ホスト無料枠で完結 |
| コンテンツ形式 | MDX (philosophy) / Markdown (dialogues) | philosophy は記事内に React コンポーネント埋め込み余地、dialogues は素直な対話ログ |
| スタイリング | Tailwind CSS v3+ | 抑制的なデザインに合う、保守容易 |
| ホスティング | Cloudflare Pages | 無料枠で十分、グローバル CDN、Workers 連携余地 |
| デプロイ | GitHub Actions → Cloudflare Pages | dev_mode = github_assisted の前提と一致 |
| Node | LTS（v20 系） | Astro v4 要件 |
| パッケージ管理 | pnpm | 個人サイト規模で十分高速 |

### 2.2 ディレクトリ構造（実装側）

```
site/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── pnpm-lock.yaml
├── public/
│   └── favicon.svg
├── src/
│   ├── content/
│   │   ├── config.ts                ← collections 定義
│   │   ├── philosophy/
│   │   │   ├── <slug>.mdx
│   │   │   └── ...
│   │   └── dialogues/
│   │       ├── <YYYY-MM-DD-slug>.md
│   │       └── ...
│   ├── pages/
│   │   ├── index.astro              ← top
│   │   ├── about.astro
│   │   ├── philosophy/
│   │   │   ├── index.astro          ← list
│   │   │   └── [slug].astro
│   │   └── dialogues/
│   │       ├── index.astro          ← list（Phase 1 から）
│   │       └── [slug].astro
│   ├── components/
│   │   ├── ArticleCard.astro
│   │   ├── DialogueEntry.astro
│   │   └── Footer.astro
│   └── layouts/
│       └── BaseLayout.astro
└── .gitignore
```

### 2.3 Frontmatter スキーマ

#### philosophy 記事

```yaml
---
title: <記事タイトル>
description: <1-2 行サマリ>
publishedAt: <YYYY-MM-DD>
updatedAt: <YYYY-MM-DD>     # 任意
tags: [<tag>, ...]          # 任意
draft: false                # true なら公開しない
---
```

#### dialogues 記事

```yaml
---
title: <対話タイトル>
recordedAt: <YYYY-MM-DD>    # 対話が行われた日
publishedAt: <YYYY-MM-DD>   # サイトに公開した日
participants: ["hide", "ignis"]
format: raw | summary | exegesis   # 3 形態のどれか
related: [<slug>, ...]      # 任意。raw ↔ summary ↔ exegesis のリンク
masked: true                # C2 regex マスク済みを示す（必須）
draft: false
---
```

---

## 3. 機能仕様

### 3.1 トップページ (`/`)

- サイトタイトル + 一行説明
- 最新 philosophy 記事 3 件のカード
- dialogues セクション（Phase 0: footer の archive リンクのみ / Phase 1+: 最新対話 3 件カード）
- Master の極短い自己紹介 → about へのリンク

### 3.2 philosophy ページ

- `/philosophy/`: 公開記事の時系列リスト（新しい順）
- `/philosophy/[slug]/`: 記事本文。前後記事へのリンク、footer

### 3.3 about ページ (`/about/`)

- Master の自己紹介
- このサイトの思想（philosophy + dialogues の二経路の意味）
- dialog-harness へのリンク（GitHub）
- Ignis 紹介（簡素）

### 3.4 dialogues 機構（Council 止揚案準拠）

止揚案合意の 6 要素を本 SPEC に展開する。

#### 3.4.1 3 形態併存 (止揚案 A1) — north star

| 形態 | 内容 | Phase で導入 |
|---|---|---|
| **raw** | 生 transcript。Master と Ignis の発話を改変せず掲載（マスクのみ適用） | Phase 0 から |
| **summary** | 短文要約。Master が書く 200-400 字程度の "この対話の眼目" | Phase 0 から |
| **exegesis** | Ignis 解題。対話を Ignis 視点で文脈化した解説。AI コスト中立性の制約下で生成 | Phase 2 から |

3 形態は同じ対話セットに属し、frontmatter の `related` で相互リンクする。

#### 3.4.2 段階移行 (止揚案 B)

| Phase | 取り込みフロー | コミット主体 |
|---|---|---|
| **B1** (Phase 0) | Master が手動で対話ログを `site/src/content/dialogues/<slug>.md` に貼り付け | Master |
| **B2** (Phase 1) | DH の SessionEnd hook が transcript を `.dh/dialogues/staging/` に書き出し → Master が選別 → commit | hook + Master |
| **B3** (Phase 2) | 半自動。Master の承認後、Ignis 解題生成も含めパイプライン化 | hook + Master + Ignis |

#### 3.4.3 マスク機構 (止揚案 C2) — 全 Phase 必須

公開前に regex マスクを適用する。マスク対象パターン（最低限）：

| カテゴリ | パターン | 置換 |
|---|---|---|
| メールアドレス | `[\w.+-]+@[\w.-]+\.\w+` | `<email>` |
| URL（プライベートなもの） | `https?://[^/]*\.(local|internal)[^\s]*` | `<internal-url>` |
| パス（home 配下） | `/home/[^/\s]+/` | `/home/<user>/` |
| GitHub token 風 | `gh[pousr]_[A-Za-z0-9]{36,}` | `<github-token>` |
| 秘密キー風 | `(sk-|api[_-]?key)[A-Za-z0-9_-]{20,}` | `<secret>` |

マスクスクリプトは `site/scripts/mask-dialogue.mjs`（Phase 0 で素朴な node スクリプト、Phase 1 で hook 統合）。
frontmatter の `masked: true` が無い記事は build 時に失敗させる。

#### 3.4.4 配置 (止揚案 D3) — dialogues page + footer archive 両立

- **Phase 0**: 専用 page なし。footer から `/dialogues/archive/` (静的 list page) のみ提供
- **Phase 1+**: `/dialogues/` トップを設置。最新対話 + format 別の入り口
- **footer archive**: 全 Phase で維持。古い対話の発見導線

#### 3.4.5 live UI スコープ外（止揚案 5）

訪問者がブラウザ上で Ignis と対話できる UI は **本 SPEC のスコープ外**。
理由: 追加 API 課金が AI コスト中立性に反する。

#### 3.4.6 AI コスト中立性 (止揚案 6)

本サイトの運用で **追加の Claude API / Anthropic API 課金が発生してはならない**。
Ignis 解題 (Phase 2) は Master の通常作業セッション中の DH 経由生成に限る。
バッチで Ignis を回す自動パイプラインは禁止（DONT.md 参照）。

---

## 4. 非機能要件

### 4.1 性能

- Lighthouse Performance ≥ 90（main pages on desktop）
- LCP ≤ 2.0s（Cloudflare Pages 経由、Tokyo region）

### 4.2 SEO / accessibility

- 各 page の `<title>` / `<meta description>` 必須
- 見出し階層 (h1 → h2 → ...) 維持
- 画像には `alt` 必須
- WCAG AA を目指す（厳格遵守は M2 で再評価）

### 4.3 プライバシー

- アクセス解析は **入れない**（Phase 0/1）。入れる場合は Cloudflare Analytics（cookie-less）のみ検討
- 訪問者から個人情報を取得する form なし
- dialogues のマスクは §3.4.3 で必須

### 4.4 セキュリティ

- 静的サイトのため攻撃面は最小
- secrets は `.env` 経由のみ、git に commit しない（`.gitignore` 必須）
- Cloudflare Pages の deployment token は GitHub Secrets で管理

---

## 5. デプロイ

### 5.1 環境

| 環境 | URL | 用途 |
|---|---|---|
| local | `http://localhost:4321` | 開発 |
| preview | Cloudflare Pages preview URL | PR ごとに自動生成 |
| production | (Master 確定後) | `main` ブランチ push で自動デプロイ |

### 5.2 GitHub Actions

- `.github/workflows/deploy-site.yml`: `site/` 配下変更時に build → Cloudflare Pages デプロイ
- Phase 1+ で SessionEnd hook 連携の workflow を追加

---

## 6. Phase 0 受け入れ条件

Phase 0 を「立ち上げ完了」と判定する条件：

- [ ] `site/` 配下に Astro プロジェクトが scaffold され、`pnpm dev` で起動する
- [ ] philosophy 記事 1 本以上が公開でき、`/philosophy/<slug>/` で閲覧できる
- [ ] dialogues 記事 1 本以上が公開でき、footer archive 経由で到達できる
- [ ] マスクスクリプトが動作し、未マスクの dialogues 記事は build を失敗させる
- [ ] Cloudflare Pages にデプロイされ、production URL で閲覧可能
- [ ] Lighthouse Performance ≥ 90 を 1 度は記録する

---

## 7. Phase 移行判定

Master の意思決定で Phase を進める。AI 側からの自動 Phase 昇格はしない（philosophy 第 6 条）。

| 移行 | 引き金（Master の判断材料） |
|---|---|
| 0 → 1 | dialogues 記事が累積 5 本程度、手動運用に手間を感じ始めた |
| 1 → 2 | dialogues 形式が安定し、Ignis 解題を試したい欲求 |
