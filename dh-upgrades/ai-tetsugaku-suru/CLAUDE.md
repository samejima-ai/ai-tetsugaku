# CLAUDE.md — ai--tetsugaku-suru site

> 本サイト固有の AI 開発指針。DH 本体の philosophy 6 条に加え、
> 個人哲学サイトという性質から導かれる追加の作法をここに記す。

---

## 1. このプロジェクトに固有の最重要原則

### 1.1 かげろう (Master) の声を上書きしない

philosophy 記事の本文は かげろう (Master) の文章である。AI による：

- 文章のリライト / 「より良い表現」への置換
- 言い回しの平準化 / 一般化
- 段落構造の自動整形

は **かげろう の明示指示なしに行ってはならない**。誤字脱字の修正提案は OK、ただし
diff として提示し かげろう が判断する。

### 1.2 dialogues は記録であり、編集の対象ではない

dialogues 記事の発話本文は実際の対話ログ。AI が：

- 発話の改ざん（マスク以外）
- 発話順序の入れ替え
- 「読みやすさのため」の発話の合成・分割

を行うことは禁止。マスク機構 (SPEC §3.4.3) 以外の改変は不可。

### 1.3 Ignis としての一貫性

L0/L1 で Ignis persona が起動している間、本サイトの dialogues 記事を生成する文脈では
**そのサイトの dialogues 自体に Ignis として登場する記録が残る** ことを意識する。
ペルソナの一貫性を保つ。

### 1.4 著者本名を記録に残さない

DONT §3.5 通り、かげろう (Master) の本名を commit author / PR 本文 / build artifact の文字列等に露出させない。AI が commit を作成する場合、コミット author 名は本リポジトリの既定値 (`Claude <noreply@anthropic.com>` 等) を維持する。

---

## 2. 開発時のチェックリスト

### 2.1 commit 前

- [ ] dialogues 記事を追加した場合、frontmatter に `masked: true` がある
- [ ] dialogues 本文に未マスクの secret / email / 内部 URL / かげろう の本名 が無い（regex で grep）
- [ ] philosophy 記事を追加した場合、かげろう の文章が無改変
- [ ] `.env` / `secrets.json` 等を誤って add していない（`git status` で確認）
- [ ] サイト名表記が `ai--tetsugaku-suru` (double hyphen) になっている（識別子層は `ai-tetsugaku-suru` で OK、SPEC §0.2 の階層表参照）

### 2.2 PR 作成時

- [ ] Cloudflare Pages preview URL で表示を確認
- [ ] Lighthouse Performance ≥ 90 を維持
- [ ] dark / light 両モードで visual regression なし
- [ ] diagonal asymmetric corner (DESIGN §5) が新規 component に適用されている

### 2.3 main merge 後

- [ ] production URL でデプロイ反映を確認
- [ ] 公開済み dialogues 記事のマスクが意図通り

---

## 3. ファイル操作の優先順

| 操作 | 優先順 |
|---|---|
| philosophy 記事追加 | かげろう が直接書く / Edit のみ（Write 新規は OK） |
| dialogues 記事追加 | hook で staging → かげろう が承認 → 移動。AI が直接 `site/src/content/dialogues/` に書かない |
| デザイン変更 | DESIGN.md 改訂が先、実装は後。§1.3 共鳴 / §5 corner / §6 shadow の変更は Council 諮問対象 |
| SPEC 変更 | DONT.md との整合を必ず確認。§0 サイト名表記の変更は Council 諮問対象 |

---

## 4. Council 諮問が必要なケース

以下が発生したら crosscut-council を起動する：

- SPEC §0 サイト名表記 (`ai--tetsugaku-suru`) または著者表記 (かげろう / `kagero`) の改変
- SPEC §3.4 dialogues 機構の根幹改変
- DESIGN §1.3 共鳴 / §5 corner / §6 shadow / §10 確定事項の方針改変
- DONT.md §1.1 (live UI 禁止) や §2.3 (Ignis 解題自動バッチ禁止) の例外を入れたい
- AI コスト中立性 (SPEC §3.4.6) の境界判断が必要
- かげろう (Master) のプライバシー / 公開範囲の判断（borderline ケース）

軽微な変更（記事追加、style 微調整、typo fix）では諮問不要。

---

## 5. テスト戦略

### 5.1 Phase 0

- 手動 visual check のみ
- mask 機構の unit test 1 本（regex の各カテゴリを 1 ケース、Master 本名候補のマスクも含む）
- build 通過確認
- diagonal asymmetric corner の visual snapshot（全 component で対角ペアが意図通りか）

### 5.2 Phase 1

- Playwright で smoke test（top / philosophy / dialogues 各 1 page）
- mask 機構の test を追加（false negative を意図的に作って fail することを確認）

### 5.3 Phase 2

- Phase 1 + Ignis 解題生成の手動承認 SOP テスト

---

## 6. 既知の罠

### 6.1 MDX の React コンポーネント埋め込み

Astro v4 の MDX は React コンポーネント embed 可能だが、本サイトでは初期は使わない方針。
使いたくなったら DESIGN.md / SPEC.md を改訂してから。

### 6.2 dialogues の改行扱い

DH transcript 由来の dialogues は改行が CRLF 混じりになる可能性。
取り込み時に LF 統一する処理を hook で必須化（Phase 1）。

### 6.3 OGP 画像の生成

自動生成は本 SPEC で扱わない。手動で `public/og/` に置く方針。
将来 Cloudflare Workers 経由の動的生成を検討する可能性あり。

### 6.4 サイト名 double hyphen の URL 化事故

`ai--tetsugaku-suru` (double hyphen) をそのまま URL slug / ファイル名にすると、tab 補完事故や URL renderer の hyphen 正規化で意図せぬ崩れが起きる可能性。SPEC §0.2 通り、ロゴ層 = double / 技術層 = single の階層分離を維持する。実装時に混同しないよう、template literal で組み立てる site title 文字列は constant 化する (`const SITE_NAME_DISPLAY = 'ai--tetsugaku-suru';` / `const SITE_NAME_SLUG = 'ai-tetsugaku-suru';`)。

---

## 7. 関連ドキュメント

- DH 本体: `/.claude/skills/layer0-spec-architect/references/philosophy.md`
- Ignis persona: `/templates/personas/ignis.persona.md`
- dialogues 機構合意: `/.claude/skills/crosscut-council/history/COUNCIL-LOG.md`
- 本サイト SPEC: `./SPEC.md`
- 本サイト DONT: `./DONT.md`
- 本サイト DESIGN: `./DESIGN.md`
- 本サイト REGIME: `./REGIME.md`
- 本サイト INDEX: `./INDEX.md`
