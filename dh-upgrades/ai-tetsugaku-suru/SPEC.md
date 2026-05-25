# SPEC.md — ai--tetsugaku-suru site

> Master (かげろう) の**思考遊技場**——考えることそれ自体を目的とする場。
> dialog-harness 開発を通じて醸成された AI 観・存在論・対話論を、ひとつの
> **過程（思考の河）** として流し続ける。**過程が本体であり、結晶（区切り）は
> その河に打たれる飛び石**である。発信・読者獲得を目的とせず（開放的孤独）、
> 「現代のアカデメイア」——対話の過程そのものが本体だったプラトン的対話の場を
> AI 時代に再現する。
>
> 二つの現れ方を持つ:
> 1. **過程 (process / dialogues)**: Master ↔ Ignis の対話ストリーム。**サイトの本体**
> 2. **結晶 (crystal)**: 過程が区切りに達したとき彫る思想構造。低頻度の節目（旧 philosophy 記事はこの一形態）

- 関連: `INDEX.md` / `DONT.md` / `REGIME.md` / `DESIGN.md` / `CLAUDE.md`
- Council 諮問起点: `/.claude/skills/crosscut-council/history/COUNCIL-LOG.md` の ai--tetsugaku-suru dialogues 諮問 (council-2026-05-20T21:37:17Z-h7f3k2)
- 存在論転換: v1「発信サイト・二経路対等」→ v2「過程が本体・結晶は区切り」(2026-05-25 L0、REGIME §9 参照)
- LC: 1

---

## 0. サイト名と表記

### 0.1 正式表記

- **サイト名**: `ai--tetsugaku-suru` （double hyphen、意図的）
- **読み**: 「えーあい てつがくする」
- **意味**: 「AI〇哲学する」の `〇` を二重ハイフン `--` で表象する。`AI` と `tetsugaku-suru` の間にある `--` は、両者を結びつけない / 切断しない / 関係子そのものを「余白」として現前させる装置である
- **著者**: かげろう（Master の呼称。PII 観点で本名は公開しない）
- **著者英 slug**: `kagero`（Hepburn 母音省略、frontmatter / URL 等で使用）

### 0.2 表記の階層

| 層 | 表記 | 用途 |
|---|---|---|
| ロゴ・サイト名・本文中の言及 | `ai--tetsugaku-suru` (double hyphen) | 表記として正式 |
| 識別子・URL slug・ディレクトリ名 | `ai-tetsugaku-suru` (single hyphen) | 技術的整合 |
| 著者名（表示） | かげろう | dialogues 表示・著者欄 |
| 著者名（slug） | `kagero` | frontmatter / data 層 |

「ロゴ層」と「技術層」を分離することで、サイトの意味的表象を保ちつつシステム的扱いやすさを担保する。

### 0.3 著者プライバシー

Master の本名は本サイトに **一切記載しない**。GitHub アカウント名・コミット author も「かげろう」由来表記で統一する方針（Phase 0 で確定）。Master 自身の判断による例外のみ許容。

### 0.4 視覚デザインとの共鳴

サイト名 `ai--tetsugaku-suru` の `--`（結合しなさを置く記号）は、視覚レイヤーでは **diagonal asymmetric corner** (対角の二隅のみ rounded、残り対角は square) と同型である。詳細は `DESIGN.md §1.3 / §5`。

### 0.5 〇（格助詞）の哲学的射程

`--` が表象する `〇` は、本来「AI〇哲学する」の格助詞スロット。5 値が異なる哲学的射程を持つ。
メイン軸は `を`（哲学者として AI を対象に思考する）、他 4 つは派生視点。

| 〇 | 射程 | サイトでの相 |
|---|---|---|
| **を**（中核） | AI を対象として人間が哲学する | メタ視点・批評 |
| と | AI と人間の対話論 | 関係性 |
| が | AI が主体になりうるか | 主体性論 |
| で | AI を道具/環境として使う | 方法論・実践 |
| の | AI 自身の哲学はあるか | 内在的哲学 |

- 現時点の主題は `AI` 固定・動詞は `哲学する` 固定。可変なのは格助詞 1 文字
- URL 構造（`/wo/` `/to/` 等のパス階層化）は **未決定論点**として保留（REGIME §9.5、将来の L0 で決定）
- `の` の文法破格（`AIの哲学する`）は意図的破格 ないし名詞句例外として扱う（実装時 CC 判断）

---

## 1. 目的とスコープ

### 1.1 目的

**考えること自体が目的**。アウトプットは思考の副産物であって、目標ではない。
DH 開発を通じて Master の中に醸成された AI 観・存在論・対話論を、ひとつの
**過程（思考の河）** として流し続ける場をつくる。

二つの現れ方（主従がある）：

1. **過程 (dialogues)** — **本体**: Master ↔ Ignis (DH の Ignis persona) の対話ストリーム。
   思考の流れそのもの。常時・高頻度。多くの過程は結晶に達さず流れ続けてよい（「気が済んだらやめる」を許す）
2. **結晶 (crystal)** — **過程の区切り**: 思考が節目に達したとき彫る思想構造（§3.5）。
   飛び石。低頻度。Master 自身の文章（旧 philosophy 記事）はこの一形態

### 1.2 読者スタンス（開放的孤独）

読者獲得・SEO・収益化は **設計目標に含めない**（書くときの制約にしない）。
だが扉は閉ざさない——来訪者が思考に触れる余地（可読性・導線）は確保する。
「孤独に書かれた、しかし誰でも読める」二重性を保つ。

- **最重要読者 = Master 自身**（Most Important Reader。思考の整理と再訪のため）
- 来訪しうる他者: AI / 哲学に関心ある人、dialog-harness 利用者——ただし **想定はするが狙わない**

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
| ホスティング | Vercel | 無料枠（Hobby、非商用）で十分、グローバル CDN、Git 連携が容易（ADR-0001） |
| デプロイ | Vercel Git 連携（Root Directory = `site/`） | master push で本番・PR で preview 自動。build に mask ゲート同梱 |
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
participants: ["kagero", "ignis"]   # data 層 slug。表示層では「かげろう」「ignis」
format: raw | summary | exegesis    # 3 形態のどれか
related: [<slug>, ...]      # 任意。raw ↔ summary ↔ exegesis のリンク
masked: true                # C2 regex マスク済みを示す（必須）
draft: false
---
```

#### 状態フィールド（v2 追加）

過程・結晶の状態を frontmatter で表す（§2.4 ドメインモデル）。

- dialogues（過程）: `state: flowing | punctuated | suspended`（進行中 / 区切り済 / 中断）。既定 `flowing`
- crystal（結晶）: `processRef: <dialogue-slug>`（紐づく過程。**必須**、§2.4 不変条件）

---

### 2.4 ドメインモデル（L0-2 軽量）

自然言語 SPEC で完結する軽量ドメイン。3 概念と不変条件のみ明示する。

| 概念 | 定義 | 役割 |
|---|---|---|
| **Process（過程）** | 時系列の対話ストリーム | サイトの **本体** |
| **Crystal（結晶）** | 過程の区切りに彫る思想構造（§3.5） | 飛び石。低頻度 |
| **DialogueLog（対話ログ）** | 過程を構成する対話ターンの素材 | 過程の最小単位 |

不変条件（L0-6 相当、Gherkin 化は将来）：

- **過程は結晶に達しなくても公開可能**（多くの過程は流れ続けてよい）
- **結晶は必ず過程に紐づく**（`processRef` 必須。孤立した結晶を作らない）
- **中断した過程も流れとして残る**（`state: suspended` でも削除しない）

---

## 3. 機能仕様

### 3.1 トップページ (`/`) — 思考の河

ホームの主役は **過程ストリーム（思考の河）**。最新 philosophy 記事一覧ではない。

- サイトタイトル `ai--tetsugaku-suru` + 一行説明
- **過程ストリーム**: 最新の対話（過程）エントリを時系列で（新しい順）。サイトの本体として前面に置く
- ストリーム中に打たれた **結晶（区切り）** は飛び石として視覚的に標識し、結晶ページへ導線（§3.5）
- かげろう の極短い自己紹介 → about へのリンク（控えめに）

> placement 補記: 過程ストリームを Phase 0 からホーム主役に昇格させる本決定は、
> DONT §3.6 / CLAUDE §4 の Council 保護境界に該当する。philosophy 第 6 条「人間 ≒ Council」
> に基づき Master の承認を Council-equiv とみなして確定（2026-05-25、REGIME §9）。
> dialogues 機構の内部（3 形態 / マスク / 承認ゲート / コスト中立性）は無改変。

### 3.2 philosophy ページ

- `/philosophy/`: 公開記事の時系列リスト（新しい順）
- `/philosophy/[slug]/`: 記事本文。前後記事へのリンク、footer

### 3.3 about ページ (`/about/`)

- かげろう の自己紹介（本名は出さない、§0.3）
- このサイトの思想（philosophy + dialogues の二経路の意味、サイト名 `--` の意味論 §0.1）
- dialog-harness へのリンク（GitHub）
- Ignis 紹介（簡素）

### 3.4 dialogues 機構（Council 止揚案準拠）

止揚案合意の 6 要素を本 SPEC に展開する。

#### 3.4.1 3 形態併存 (止揚案 A1) — north star

| 形態 | 内容 | Phase で導入 |
|---|---|---|
| **raw** | 生 transcript。かげろう と Ignis の発話を改変せず掲載（マスクのみ適用） | Phase 0 から |
| **summary** | 短文要約。かげろう が書く 200-400 字程度の "この対話の眼目" | Phase 0 から |
| **exegesis** | Ignis 解題。対話を Ignis 視点で文脈化した解説。AI コスト中立性の制約下で生成 | Phase 2 から |

3 形態は同じ対話セットに属し、frontmatter の `related` で相互リンクする。

#### 3.4.2 段階移行 (止揚案 B)

| Phase | 取り込みフロー | コミット主体 |
|---|---|---|
| **B1** (Phase 0) | かげろう が手動で対話ログを `site/src/content/dialogues/<slug>.md` に貼り付け | かげろう |
| **B2** (Phase 1) | DH の SessionEnd hook が transcript を `.dh/dialogues/staging/` に書き出し → かげろう が選別 → commit | hook + かげろう |
| **B3** (Phase 2) | 半自動。かげろう の承認後、Ignis 解題生成も含めパイプライン化 | hook + かげろう + Ignis |

#### 3.4.3 マスク機構 (止揚案 C2) — 全 Phase 必須

公開前に regex マスクを適用する。マスク対象パターン（最低限）：

| カテゴリ | パターン | 置換 |
|---|---|---|
| メールアドレス | `[\w.+-]+@[\w.-]+\.\w+` | `<email>` |
| URL（プライベートなもの） | `https?://[^/]*\.(local|internal)[^\s]*` | `<internal-url>` |
| パス（home 配下） | `/home/[^/\s]+/` | `/home/<user>/` |
| GitHub token 風 | `gh[pousr]_[A-Za-z0-9]{36,}` | `<github-token>` |
| 秘密キー風 | `(sk-|api[_-]?key)[A-Za-z0-9_-]{20,}` | `<secret>` |
| Master 本名候補リスト | （非公開、scripts 内で定義） | `かげろう` |

マスクスクリプトは `site/scripts/mask-dialogue.mjs`（Phase 0 で素朴な node スクリプト、Phase 1 で hook 統合）。
frontmatter の `masked: true` が無い記事は build 時に失敗させる。

#### 3.4.4 配置 (止揚案 D3 / v2 placement 昇格) — 過程ストリームがホーム主役

v2 存在論転換により、過程ストリームをサイトの本体としてホーム前面に置く（§3.1）。

- **Phase 0**: トップ (`/`) に過程ストリーム（最新の対話エントリ時系列）を設置。
  併せて footer から `/dialogues/archive/` (静的 list page) を提供
- **Phase 1+**: `/dialogues/` に format 別の入り口を増設。ホームのストリームは維持
- **footer archive**: 全 Phase で維持。古い過程の発見導線
- 内部機構（§3.4.1 3 形態 / §3.4.3 マスク / §3.4.6 コスト中立）は v1 から無改変

#### 3.4.5 live UI スコープ外（止揚案 5）

訪問者がブラウザ上で Ignis と対話できる UI は **本 SPEC のスコープ外**。
理由: 追加 API 課金が AI コスト中立性に反する。

#### 3.4.6 AI コスト中立性 (止揚案 6)

本サイトの運用で **追加の Claude API / Anthropic API 課金が発生してはならない**。
Ignis 解題 (Phase 2) は かげろう の通常作業セッション中の DH 経由生成に限る。
バッチで Ignis を回す自動パイプラインは禁止（DONT.md 参照）。

---

### 3.5 結晶 (Crystal) — 過程の区切り

過程が節目に達したとき、思想構造を彫った **結晶** を打つ。結晶はゴールではなく、
河に打たれる飛び石。多くの過程は結晶に達さず流れ続けてよい。

#### 3.5.1 発生条件（論点M: 人間判断・skill 実行）

- 区切るかどうかの判断は **Master が宣言**する（人間専権、philosophy 第 6 条）
- 彫る作業（構造化・HTML 化・投稿）は **skill が担う**（Master は対話と区切り宣言のみ）
- skill 側からの自動結晶化・自動区切り提案はしない（Phase 0/1）

#### 3.5.2 構造文法（再利用可能パターン）

身体化意識仮説 HTML から抽出した結晶の構造文法。毎回全要素を使うわけではない。

| 構成要素 | 機能 | 役割 |
|---|---|---|
| Cover（落款） | 思想の旗 | 一行で立場を宣言 |
| Thesis（反転背景） | 中心命題 | 結論先行 |
| 番号付き Section | 思考の階層展開 | 論理の積み上げ |
| `.chain`（連結ノード） | 因果の一本道 | 「一本の線として閉じる」 |
| `.ab`（A/B 二枚） | 概念の分離 | 対比 |
| `.obj`（反論ブロック） | ディベート構造 | 「どの刀で斬るか」 |
| `.kin`（知的系譜） | 参照点の提示 | 既存哲学は参照点に留める（哲学学者でない証） |
| `.caveat`（留保） | 知的誠実性 | 「正しい理論ではなく強力な仮説」 |

- **構造文法は固定、視覚言語（色・モチーフ）は思想ごとに可変**。
  意識論は朱と落款が似合うが、別の思想は別の視覚言語を持つ（DESIGN §11.1）
- 結晶は紐づく過程（区切り元のストリーム）を必ず持つ（§2.4 不変条件）
- 「身体化意識仮説 HTML」は結晶の **一表現**であって、サイトの主形態ではない（主形態は過程）

#### 3.5.3 旧 philosophy 記事との関係

旧 philosophy collection（Master 自身の MDX 文章）は **結晶の一形態**として位置づけ直す。
collection 名の物理改名（`philosophy` → `crystals`）は接合方針（churn 最小）のため当面行わず、
意味づけのみ更新する。改名は望めば次サイクル（L1）で実施。

---

## 4. 非機能要件

### 4.1 性能

- Lighthouse Performance ≥ 90（main pages on desktop）
- LCP ≤ 2.0s（Vercel Edge Network 経由）

### 4.2 SEO / accessibility

- 各 page の `<title>` / `<meta description>` 必須
- 見出し階層 (h1 → h2 → ...) 維持
- 画像には `alt` 必須
- WCAG AA を目指す（厳格遵守は M2 で再評価）

### 4.3 プライバシー

- アクセス解析は **入れない**（Phase 0/1）。Vercel Web Analytics / Speed Insights も script 注入のため入れない。必要なら Phase 2+ で cookie-less 手段を ADR 付きで検討
- 訪問者から個人情報を取得する form なし
- dialogues のマスクは §3.4.3 で必須
- 著者 (かげろう) の本名は §0.3 通り一切記載しない

### 4.4 セキュリティ

- 静的サイトのため攻撃面は最小
- secrets は `.env` 経由のみ、git に commit しない（`.gitignore` 必須）
- Vercel は Git 連携のため deploy token を GitHub に置かない（GitHub Actions 経由にする場合のみ `VERCEL_TOKEN` 等を GitHub Secrets で管理）

---

## 5. デプロイ

### 5.1 環境

| 環境 | URL | 用途 |
|---|---|---|
| local | `http://localhost:4321` | 開発 |
| preview | Vercel preview URL | PR ごとに自動生成（Git 連携） |
| production | (かげろう 確定後) | `master` ブランチ push で自動デプロイ |

### 5.2 GitHub Actions

- デプロイは Vercel（Git 連携）が担う。GitHub Actions では deploy しない
- `.github/workflows/site-ci.yml`: `site/` 配下変更時（push / PR）に build + mask test を回す GitHub 側ゲート
- `site/vercel.json`: Vercel の `buildCommand` に `pnpm test && pnpm build` を指定し mask ゲートを維持
- Phase 1+ で SessionEnd hook 連携の workflow を追加

---

## 6. Phase 0 受け入れ条件

Phase 0 を「立ち上げ完了」と判定する条件：

- [ ] `site/` 配下に Astro プロジェクトが scaffold され、`pnpm dev` で起動する
- [ ] **トップ (`/`) に過程ストリーム（最新の対話エントリ時系列）が主役として表示される**（§3.1）
- [ ] dialogues（過程）記事 1 本以上が最小整形（時系列保持・マスク・改行正規化のみ、発話無改変）で公開できる
- [ ] 結晶（過程の区切り）1 本以上が、過程に紐づいた形で公開でき、ストリームから飛び石導線で到達できる
- [ ] マスクスクリプトが動作し、未マスクの dialogues 記事は build を失敗させる
- [ ] Vercel にデプロイされ、production URL で閲覧可能
- [ ] Lighthouse Performance ≥ 90 を 1 度は記録する
- [ ] DESIGN.md §5 diagonal asymmetric corner が全 component で実装されている (visual check)

---

## 7. Phase 移行判定

かげろう (Master) の意思決定で Phase を進める。AI 側からの自動 Phase 昇格はしない（philosophy 第 6 条）。

| 移行 | 引き金（かげろう の判断材料） |
|---|---|
| 0 → 1 | dialogues 記事が累積 5 本程度、手動運用に手間を感じ始めた |
| 1 → 2 | dialogues 形式が安定し、Ignis 解題を試したい欲求 |
