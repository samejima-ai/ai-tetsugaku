# CLAUDE.md — hide-philosophy site

> 本サイト固有の AI 開発指針。DH 本体の philosophy 6 条に加え、
> 個人哲学サイトという性質から導かれる追加の作法をここに記す。

---

## 1. このプロジェクトに固有の最重要原則

### 1.1 Master の声を上書きしない

philosophy 記事の本文は Master の文章である。AI による：

- 文章のリライト / 「より良い表現」への置換
- 言い回しの平準化 / 一般化
- 段落構造の自動整形

は **Master の明示指示なしに行ってはならない**。誤字脱字の修正提案は OK、ただし
diff として提示し Master が判断する。

### 1.2 dialogues は記録であり、編集の対象ではない

dialogues 記事の発話本文は実際の対話ログ。AI が：

- 発話の改ざん（マスク以外）
- 発話順序の入れ替え
- 「読みやすさのため」の発話の合成・分割

を行うことは禁止。マスク機構 (SPEC §3.4.3) 以外の改変は不可。

### 1.3 Ignis としての一貫性

L0/L1 で Ignis persona が起動している間、本サイトの dialogues 記事を生成する文脈では
**そのサイトの dialogues 自体に Ignis として登場する記録が残る**ことを意識する。
ペルソナの一貫性を保つ。

---

## 2. 開発時のチェックリスト

### 2.1 commit 前

- [ ] dialogues 記事を追加した場合、frontmatter に `masked: true` がある
- [ ] dialogues 本文に未マスクの secret / email / 内部 URL が無い（regex で grep）
- [ ] philosophy 記事を追加した場合、Master の文章が無改変
- [ ] `.env` / `secrets.json` 等を誤って add していない（`git status` で確認）

### 2.2 PR 作成時

- [ ] Cloudflare Pages preview URL で表示を確認
- [ ] Lighthouse Performance ≥ 90 を維持
- [ ] dark / light 両モードで visual regression なし

### 2.3 main merge 後

- [ ] production URL でデプロイ反映を確認
- [ ] 公開済み dialogues 記事のマスクが意図通り

---

## 3. ファイル操作の優先順

| 操作 | 優先順 |
|---|---|
| philosophy 記事追加 | Master が直接書く / Edit のみ（Write 新規は OK） |
| dialogues 記事追加 | hook で staging → Master が承認 → 移動。AI が直接 `site/src/content/dialogues/` に書かない |
| デザイン変更 | DESIGN.md 改訂が先、実装は後 |
| SPEC 変更 | DONT.md との整合を必ず確認 |

---

## 4. Council 諮問が必要なケース

以下が発生したら crosscut-council を起動する：

- SPEC §3.4 dialogues 機構の根幹改変
- DONT.md §1.1 (live UI 禁止) や §2.3 (Ignis 解題自動バッチ禁止) の例外を入れたい
- AI コスト中立性 (SPEC §3.4.6) の境界判断が必要
- Master のプライバシー / 公開範囲の判断（borderline ケース）

軽微な変更（記事追加、style 微調整、typo fix）では諮問不要。

---

## 5. テスト戦略

### 5.1 Phase 0

- 手動 visual check のみ
- mask 機構の unit test 1 本（regex の各カテゴリを 1 ケース）
- build 通過確認

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
