# DONT.md — hide-philosophy site

> 本サイトで **やらないこと** を明示する。スコープ膨張を防ぐ防波堤。
> 例外を入れたい場合は SPEC.md を改訂して移送する（DONT に書いたまま例外運用しない）。

---

## 1. コンテンツ / 機能の禁止事項

### 1.1 訪問者向け live AI 対話 UI を作らない

Council 止揚案 5 で確定。理由は AI コスト中立性 (§6) 違反になるため。
ブラウザ上で Ignis に話しかけられる体験は本サイトのスコープ外。
やりたくなったら別プロジェクトを切り出す。

### 1.2 訪問者からの form 入力を受け付けない

- お問い合わせフォーム
- コメント欄
- ニュースレター購読フォーム

理由: プライバシー責任を負わない、static のままに留める、攻撃面を増やさない。
連絡手段は about ページに `mailto:` か外部 SNS リンクのみ。

### 1.3 アクセス解析・トラッキングを入れない（Phase 0/1）

Google Analytics / Hotjar / PostHog 等は入れない。
Phase 2 以降で必要に応じて Cloudflare Analytics (cookie-less) のみ検討可。
入れる場合は ADR + SPEC §4.3 改訂が必須。

### 1.4 動的機能を入れない

- search API（クライアント側 fuse.js は OK、サーバ API は NG）
- いいね / お気に入り / シェアカウント
- 認証 / ログイン
- リアルタイム更新 (websocket / SSE)

理由: 静的サイトの設計前提を崩す。AI コスト中立性違反のリスク。

---

## 2. dialogues 機構の禁止事項

### 2.1 マスクなし dialogues の公開を禁ずる

`masked: true` frontmatter が無い記事は build を失敗させる。
公開後に発覚した場合は即座に該当記事を non-published に戻し、マスク後再公開。

### 2.2 Master の承認なしでの dialogues 自動公開を禁ずる

SessionEnd hook が transcript を `.dh/dialogues/staging/` に書き出すまでは自動でよいが、
**`site/src/content/dialogues/` への移動 = 公開判断は Master が行う**。
hook が直接公開ディレクトリに書き込む実装は禁止（philosophy 第 6 条「人間最終承認」）。

### 2.3 Ignis 解題の自動バッチ生成を禁ずる

Phase 2 で導入する Ignis 解題は **Master の通常作業セッション中の DH 経由生成に限る**。
過去対話を一括で API に投げて解題を量産する pipeline は禁止。
AI コスト中立性 (SPEC §3.4.6) 違反。

### 2.4 他者の発話を Ignis dialogues として公開しない

dialogues に登場する人間側発話は Master 本人のもののみ。
他 LLM サービス (ChatGPT 等) との対話を「Ignis との対話」として混ぜない。
形式上の混同を避けるため。

---

## 3. 開発 / 運用の禁止事項

### 3.1 secrets を git に commit しない

- `CLOUDFLARE_API_TOKEN` 等は GitHub Secrets のみ
- `.env` は `.gitignore` に必ず含める
- 過去 commit に漏れたら revoke + rewrite history（rewrite は Master 判断で）

### 3.2 main ブランチへの直接 push を避ける（Phase 1+）

Phase 0 は単独運用で OK だが、Phase 1 以降は PR 経由を原則とする。
Cloudflare Pages の preview URL を確認してから merge。

### 3.3 サードパーティ JS の無自覚な追加を禁ずる

- analytics / ads / chat widget 等を `<script>` で追加しない
- npm 追加時は bundle size 増分を確認

### 3.4 dh-upgrades/hide-philosophy/ 配下に実装コードを置かない

本ディレクトリは **仕様文書のみ**。実装は `site/` 配下。
SPEC と実装の住み分けを守る（DH 本体の onboarding/archeo に倣う）。

---

## 4. スコープ膨張の典型パターン（事前禁止）

### 4.1 「ついでに」CMS 化しない

Notion / Contentful / microCMS 等の headless CMS との連携は本 SPEC スコープ外。
記事は MDX ファイルとして git で管理する。

### 4.2 「ついでに」blog 機能を盛らない

- RSS feed: Phase 1 で検討可（簡素な実装に限定）
- tag page / archive by year: Phase 1 で検討可
- 関連記事レコメンド: 入れない（Phase 2 以降で再検討）

### 4.3 「ついでに」多言語化しない

英語版 / 多言語化は Phase 0/1 スコープ外。
やる場合は SPEC §1 改訂 + i18n 機構の別 ADR が必須。

### 4.4 「ついでに」Master 以外の著者を入れない

ゲスト寄稿 / 共同執筆は本 SPEC スコープ外。
「hide-philosophy」の固有名性を保つため。
