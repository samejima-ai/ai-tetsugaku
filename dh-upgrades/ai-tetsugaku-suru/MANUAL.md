# MANUAL.md — ai--tetsugaku-suru 人間作業手順書

> 本書は Master (かげろう) が手元で実行する手順の運用マニュアル。
> SPEC 群は AI 開発者向けの仕様書、本書は Phase 進行中に **人間でなければ実行できない作業**
> (account 操作、PII 判断、最終公開承認、本名混入チェック、Lighthouse 計測など) を
> 時系列でまとめる。

- 仕様の住処: 同階層の `SPEC.md` / `DONT.md` / `REGIME.md` / `DESIGN.md` / `CLAUDE.md` / `INDEX.md`
- 実装の住処: リポジトリ root の `site/` 配下
- **v2 存在論転換 (2026-05-25, REGIME §9)**: ホームの主役は **過程ストリーム（思考の河）**（SPEC §3.1）。
  下記 §3 のコンテンツ投入手順（記事・対話の操作自体）は不変だが、サイト上の主従は
  「過程（対話）= 本体 / 結晶（旧 philosophy 記事）= 区切り」。過程ストリームをホーム主役にする
  IA 実装は次サイクル (L1, `site/`) で行い、その実装時に本書 §3 の順序を再整序する

---

## Phase 0 — 立ち上げ完了までの作業

### 0. 前提確認

- [ ] master ブランチに PR #1 (SPEC 確定) と PR #2 (scaffold) が merge 済
- [ ] ローカルに `git clone git@github.com:samejima-ai/ai-tetsugaku.git` 済
- [ ] Node v20+ / pnpm v10+ がインストールされている (`node -v` / `pnpm -v`)

### 1. 初回 install + dev サーバ起動確認

```bash
cd site/
pnpm install     # 初回のみ、約 8 秒で 510 packages
pnpm dev         # http://localhost:4321 を開いて表示確認
```

確認ポイント (visual check):

- top page (`/`) に「ai--tetsugaku-suru」 + tagline が **Shippori Mincho** で表示
- philosophy / dialogues セクションが「まだ公開された記事はありません」となっている
  (サンプルは `draft: true` のため意図通り)
- footer に "dialogues archive" と "repo" リンク
- `/about/` を踏んで about page が表示、サイト名 `--` の意味論が記述されている
- カードや button の hover で **対角の二隅だけ角丸** (左上 + 右下) になっているか
  (現状 card は draft なので、後で 3.1 完了後に確認)
- ブラウザの OS / DevTools で color-scheme を `dark` に切替 → bg/fg/primary が反転、
  primary が Ignis 青毛先の `#4ab3ee` (vivid mid blue) に変わる

問題があれば PR を起こして DESIGN/SPEC との差分を Council 諮問。

### 2. Vercel 準備（Git 連携。ADR-0001）

#### 2.1 Vercel に repo を import

1. https://vercel.com にログイン (GitHub account でサインイン可)
2. **Add New… > Project** > GitHub の `samejima-ai/ai-tetsugaku` を import
3. project 設定:
   - **Root Directory: `site/`** ← 最重要（リポジトリ root ではなく site/ を指定）
   - Framework Preset: **Astro**（自動検出されるはず）
   - Build / Output: `site/vercel.json` が `buildCommand: pnpm test && pnpm build` / `outputDirectory: dist` を持つので **dashboard では空欄のままで良い**（vercel.json が優先）
   - Production Branch: `master`
4. Deploy を実行

> GitHub Secrets の設定は **不要**（Git 連携は Vercel 側で完結。token を GitHub に置かない、DONT §3.1）。

#### 2.2 解析を入れない（ガードレール）

Vercel dashboard の **Web Analytics / Speed Insights は有効化しない**（script 注入になり DONT §1.3 違反）。

#### 2.3 初回 deploy 確認

import 時に初回 deploy が走る。以後は **`master` push で本番・PR で preview** が自動生成される。
build は `pnpm test && pnpm build`（mask ゲート同梱）で走り、未マスク dialogues があれば deploy が落ちる (DONT §2.1)。

成功したら Vercel dashboard に deployment URL が表示される (`https://ai-tetsugaku-suru.vercel.app` 系)。

### 3. 実コンテンツ投入

#### 3.1 philosophy 記事 1 本目

1. `site/src/content/philosophy/2026-05-21-resonance-note.mdx` を開く
2. 本文を **Master 自身の文章で書き換える**、または別ファイル (`YYYY-MM-DD-<slug>.mdx`) で新規作成
   - AI 起草の文章は **削除するか書き換える**。Master の声を上書きしない (CLAUDE §1.1)
3. frontmatter:
   - `draft: true` を削除する (or `draft: false` に変更)
   - `publishedAt` を実際の公開日に更新
4. 確認:

   ```bash
   pnpm dev    # /philosophy/<slug>/ で表示確認
   pnpm build  # build pass を確認
   ```

5. **公開前チェックリスト** (CLAUDE §2.1 整合):
   - [ ] 本文に Master 本名 / 内部 email / 個人特定情報が混入していない
   - [ ] 誤字脱字を Master 自身で確認 (AI に提案させた場合は diff で必ず確認)
6. commit + push (Phase 1+ では PR 経由が原則、Phase 0 は master 直 push 可)

#### 3.2 dialogues 記事 1 本目

1. DH (dialog-harness) のセッションで Ignis と対話する
2. transcript を手元に取得
   (Phase 0 は手動 copy、Phase 1 で SessionEnd hook 化される)
3. **本名候補リスト** をマスクに含めたい場合、`site/scripts/secrets/master-names.json` を作成 (gitignore で保護):

   ```json
   ["本名候補1", "本名候補2"]
   ```

   このファイルは git に上がらない、各端末でローカル管理する。

4. mask script に通す:

   ```bash
   pnpm mask < raw-transcript.txt > masked.md
   ```

   実行例 (動作確認):

   ```bash
   echo 'foo@bar.com /home/me/x token ghp_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' | pnpm mask
   # → foo@bar.com → <email>, /home/me/ → /home/<user>/, ghp_... → <github-token>
   ```

5. `site/src/content/dialogues/<YYYY-MM-DD>-<slug>.md` を作成、frontmatter (日付は **必ず文字列で quote**):

   ```yaml
   ---
   title: "<対話タイトル>"
   recordedAt: "2026-05-XX"
   publishedAt: "2026-05-XX"
   participants: ["kagero", "ignis"]
   format: raw
   masked: true        # 必須、無いと build が fail (DONT §2.1)
   draft: false
   ---
   ```

6. 本文に masked transcript を `かげろう:` / `ignis:` の発話ブロックで構成
7. (任意) `format: summary` の短文要約 (200-400 字) を別ファイルで作成
   - frontmatter で `related: ["<raw 記事の slug>"]` を相互リンク
8. **公開前 grep 確認**:

   ```bash
   grep -r '<本名候補>' site/src/content/  # 0 件であること
   grep -E '@[[:alnum:]_.-]+\.[[:alnum:]]+' site/src/content/dialogues/  # email 残ってないか (POSIX 文字クラス)
   ```

9. build pass 確認:

   ```bash
   pnpm build
   ```

   `masked: true` が無いと content collections schema (`z.literal(true)`) で fail する。

10. commit + push

注意:
- 他 LLM (ChatGPT 等) との対話を Ignis dialogue として混ぜない (DONT §2.4)
- 過去の対話を一括処理する自動パイプラインは禁止 (DONT §2.3)

### 4. Production URL の確定と反映

1. Vercel の URL が確定したら (例: `https://ai-tetsugaku-suru.vercel.app` または独自ドメイン)
2. 以下を実 URL に更新:
   - `site/astro.config.mjs` の `site:` フィールド (現状 `https://ai-tetsugaku-suru.vercel.app` 暫定値)
   - `dh-upgrades/ai-tetsugaku-suru/SPEC.md` §5.1 の production 行
3. 更新を 1 commit にまとめて master push

### 5. Lighthouse 計測 (Phase 0 受け入れ最終項目)

1. Chrome で production URL を開く
2. DevTools (F12) > Lighthouse タブ
3. Mode: **Navigation**, Device: **Desktop**, Categories: **Performance**
4. Analyze page load
5. **Performance score ≥ 90** が SPEC §4.1 の目標値
6. もし 90 未満:
   - 画像最適化 / フォント preconnect の効果確認 / unused JS の確認
   - 必要なら本書改訂 + 修正 PR で改善
7. スコアスクリーンショットを Master 手元で保管 (任意、git には commit 不要)

### Phase 0 完了判定

SPEC §6 受け入れ条件 7 項目すべてに ✓ が付いたら Phase 0 完了。
完了したら本書末尾の「Phase 完了記録」に日付を記入し、REGIME.md の `current_phase` 更新の判断材料とする。

ただし **Phase 1 移行はすぐでなくて良い**。Master が「dialogues 記事が累積 5 本程度、手動運用に手間を感じ始めた」 (SPEC §7) と感じた時点で移行検討。

---

## Phase 0 → 1 移行作業 (将来用 placeholder)

引き金: dialogues 記事 5 本程度、手動 commit に手間を感じる。

主な作業 (詳細は移行時に本書を改訂して埋める):

1. `dh-upgrades/ai-tetsugaku-suru/REGIME.md` の `current_phase` を 0 → 1、`hook-observer: enabled` に変更
2. DH 側の SessionEnd hook を設定して transcript を `.dh/dialogues/staging/` に書き出す
3. staging から `site/src/content/dialogues/` への移動承認 SOP を確立 (Master 手作業、philosophy 第 6 条「人間最終承認」)
4. `/dialogues/` トップ page (一覧 + format 別の入り口) を実装 (SPEC §3.4.4)
5. Phase 1 用の deploy workflow に SessionEnd hook 連携を追加 (必要なら)
6. Playwright で smoke test 追加 (CLAUDE §5.2)

---

## Phase 1 → 2 移行作業 (将来用 placeholder)

引き金: dialogues 形式が安定、Ignis 解題を試したい欲求。

主な作業:

1. REGIME.md `current_phase` を 1 → 2
2. Ignis 解題生成 SOP の策定 (Master 通常 DH セッション中の生成に限る、DONT §2.3)
3. 3 形態 (raw / summary / exegesis) 併存 routing の確認
4. AI コスト中立性の境界判断ガイドライン (SPEC §3.4.6) を運用ドキュメント化

---

## 共通の運用 tips

### git / GitHub 運用

- Phase 0 は master 直 push 許可、Phase 1 以降は PR 経由 (DONT §3.2)
- secrets を誤って commit したら revoke + rewrite history (DONT §3.1)
- commit author に Master 本名を入れない (DONT §3.5、AI commit は既定の `Claude <noreply@anthropic.com>` のまま)

### AI への依頼境界

軽微変更 (typo fix、style 微調整、記事追加) は AI に任せて良い。
以下は Master 自身が決定 (CLAUDE §4):

- SPEC §0 サイト名表記 / 著者表記の改変
- SPEC §3.4 dialogues 機構の根幹改変
- DESIGN §1.3 共鳴 / §5 corner / §6 shadow / §10 確定事項の方針改変
- DONT §1.1 (live UI 禁止) や §2.3 (Ignis 解題自動バッチ禁止) の例外導入
- AI コスト中立性 (SPEC §3.4.6) の境界判断

これらが必要になったら AI に **Council 諮問の起動を指示** する (「Council にかけて」)。

### Master 本名混入の検査

随時 (commit 前、PR 前、merge 前):

```bash
# Master 本名候補リストが scripts/secrets/master-names.json にあれば:
grep -r -f <(jq -r '.[]' site/scripts/secrets/master-names.json) site/src/ site/public/ 2>/dev/null
# (本名候補が site/ 配下のどこにも含まれていないことを確認)
```

混入が見つかったら即座に該当箇所を修正、既に push 済なら revert + 再度 mask、過去 commit に残っていれば rewrite history (要 Master 判断、force push になるため独立で検討)。

---

## Phase 完了記録

Master が完了判定したら日付を記入:

| Phase | 完了日 | 主要マイルストーン |
|---|---|---|
| 0 | (未) | SPEC §6 受け入れ 7 項目クリア |
| 1 | (未) | dialogues 記事 5 本以上、SessionEnd hook 稼働 |
| 2 | (未) | Ignis 解題が 3 形態併存 routing で公開 |

---

## 改訂履歴

| 日付 | 改訂内容 |
|---|---|
| 2026-05-21 | 初版 (Phase 0 手順を中心に、Phase 1/2 は placeholder) |
| 2026-05-25 | v2 存在論転換 (過程が本体・結晶は区切り) を反映。intro に v2 note 追加、ホーム = 過程ストリーム主役を明記 (REGIME §9 / SPEC §3.1)。§3 手順本体は不変、IA 実装は次サイクル |
