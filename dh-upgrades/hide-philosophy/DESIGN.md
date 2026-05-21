# DESIGN.md — hide-philosophy site

> 視覚仕様。色調・タイポグラフィ・レイアウト思想・コンポーネント階層。
> SPEC.md と並列。実装は `site/src/` で展開。

---

## 1. デザイン思想

### 1.1 三つの柱

1. **抑制（restraint）**: 装飾を増やさない。読まれることを邪魔しない
2. **沈黙（silence）**: 余白を恐れない。情報密度より呼吸
3. **対話の場（dialogic space）**: philosophy と dialogues の二経路を視覚的に分けすぎず、しかし混同もしない

### 1.2 やらない設計

- ヒーローセクションの大画像 / アニメーション
- 派手なグラデーション / shadow
- スクロール連動アニメーション（reduced-motion 配慮）
- ポップアップ / モーダル
- カラフルな emphasis color

---

## 2. カラーパレット

ライト / ダーク両モード対応。OS 設定優先 + 手動切替 toggle（footer に小さく）。

### 2.1 Light mode

| token | hex | 用途 |
|---|---|---|
| `--bg` | `#fafaf7` | 紙のような薄いオフホワイト |
| `--fg` | `#1a1a1a` | 本文 |
| `--muted` | `#6b6b66` | 補助テキスト・メタ情報 |
| `--accent` | `#3a5a8c` | リンク（青系、抑制的） |
| `--accent-hover` | `#1f3a6b` | リンク hover |
| `--border` | `#e0e0d8` | 罫線 |
| `--ignis-tint` | `#c5d4e8` | dialogues セクション専用、ごく薄く |

### 2.2 Dark mode

| token | hex | 用途 |
|---|---|---|
| `--bg` | `#13141a` | 沈んだ夜の色 |
| `--fg` | `#e8e6e0` | 本文 |
| `--muted` | `#8a8a85` | 補助テキスト |
| `--accent` | `#9bb5d8` | リンク（淡い青、Ignis の青毛先と通ずる） |
| `--accent-hover` | `#c0d2eb` | リンク hover |
| `--border` | `#2a2c34` | 罫線 |
| `--ignis-tint` | `#1f2a3a` | dialogues セクション専用 |

dark mode の accent は Ignis persona の「青い毛先」と意図的に呼応させる。

---

## 3. タイポグラフィ

### 3.1 フォントファミリー

| 用途 | 採用 | フォールバック |
|---|---|---|
| 本文（日本語） | Noto Sans JP (variable) | system-ui, sans-serif |
| 本文（欧文） | Inter (variable) | -apple-system, BlinkMacSystemFont, sans-serif |
| 見出し | 本文と同じ。weight でメリハリ | — |
| 引用 / dialogues 発話 | Noto Serif JP (variable) | Georgia, serif |
| 等幅（コード） | JetBrains Mono | ui-monospace, monospace |

`Noto Serif JP` を dialogues の発話ブロックに当てて、philosophy 記事との視覚的差をつける。

### 3.2 サイズスケール（rem ベース、modular scale 1.25）

| token | rem | px (16 base) | 用途 |
|---|---|---|---|
| `text-xs` | 0.75 | 12 | meta |
| `text-sm` | 0.875 | 14 | 補助 |
| `text-base` | 1.0 | 16 | 本文 |
| `text-lg` | 1.125 | 18 | 強調 |
| `text-xl` | 1.25 | 20 | 小見出し |
| `text-2xl` | 1.5 | 24 | h3 |
| `text-3xl` | 1.875 | 30 | h2 |
| `text-4xl` | 2.25 | 36 | h1 (article title) |
| `text-5xl` | 3.0 | 48 | site title (top page) |

### 3.3 行間・字間

- 本文 `line-height: 1.85`（日本語前提でゆったり）
- 見出し `line-height: 1.4`
- 字間 `letter-spacing: 0.01em`（CJK でわずか）

---

## 4. レイアウト

### 4.1 グリッド

- max-width `680px`（読みもの主体、measure 重視）
- side padding `1.5rem`（mobile）/ `2rem`（desktop）
- 中央寄せ（CSS Grid + max-width）

### 4.2 ページ構造

```
┌─────────────────────────────────┐
│ Header (細い、site name のみ)   │
├─────────────────────────────────┤
│                                 │
│   Main (max-width 680px)        │
│                                 │
├─────────────────────────────────┤
│ Footer (細い、archive 等リンク) │
└─────────────────────────────────┘
```

### 4.3 トップページの構成

```
[site title (text-5xl)]
[one-line tagline (text-base, muted)]

  ─── philosophy ───
  [latest 3 articles cards]

  ─── dialogues ───  (Phase 0 は footer link only / Phase 1+ は最新 3 件)
  [latest 3 dialogues cards or "→ archive"]

  ─── about ───
  [3-4 sentences self-intro] → about page link
```

セクション間は `4rem` 程度の縦余白。区切りは細い罫線 + 小見出し（text-sm, muted, uppercase 風）。

### 4.4 article ページの構成

```
[breadcrumb: philosophy / dialogues]
[title (text-4xl)]
[meta: publishedAt, tags] (text-sm muted)
─── (細罫線) ───

[本文 (text-base, line-height 1.85)]

─── (細罫線) ───
[prev / next nav]
```

### 4.5 dialogues page の発話レイアウト

```
hide:
  > 発話本文（Noto Serif JP）
  > インデント 0.5rem、左罫線 2px（--border）

ignis:
  > 発話本文（Noto Serif JP）
  > インデント 0.5rem、左罫線 2px（--accent、薄く）
  > 発話者名は accent 色
```

- 発話間に `1.5rem` の縦余白
- マスク済み箇所 `<email>` 等は `--muted` 色 + 等幅フォントで表示

---

## 5. コンポーネント

### 5.1 BaseLayout.astro

- HTML head（title / description / favicon / OGP）
- Header / Main slot / Footer
- color-scheme meta、prefers-color-scheme 対応

### 5.2 ArticleCard.astro

```
[title (text-xl, fg)]
[description (text-base, muted, 2 行で truncate)]
[meta: publishedAt (text-xs, muted)]
```

カード自体は罫線のみで枠囲み。hover で `--ignis-tint` を bg にうっすら。

### 5.3 DialogueEntry.astro

- §4.5 のレイアウトを実装
- format バッジ（raw / summary / exegesis）を meta に小さく

### 5.4 Footer.astro

- copyright (Master 名 + 年)
- archive へのリンク
- dialog-harness リポジトリへのリンク
- color-scheme toggle（Phase 0 では暫定 OS 設定優先のみで省略可）

---

## 6. レスポンシブ

| breakpoint | width | 変化点 |
|---|---|---|
| mobile | ≤ 640px | side padding 1.5rem、header 文字小 |
| tablet | 641-1024px | レイアウト変えず、padding 拡張 |
| desktop | ≥ 1025px | max-width 680px を中央寄せのまま維持 |

PC 用 wide layout（sidebar 等）は本 SPEC スコープ外。

---

## 7. アクセシビリティ

- 色のみで情報伝達しない（リンク = underline + color）
- focus-visible で明確な outline（accent 色、2px）
- skip-to-content リンク（header に視覚非表示で配置）
- `prefers-reduced-motion: reduce` で transition 系を無効化

---

## 8. 暫定で確定しない事項（Master 確認待ち）

以下は Master のフィードバックを受けて確定する：

1. **サイトタイトルの正式表記**（「hide-philosophy」「hide / 哲学」「hide.dev」等）
2. **OGP 画像のスタイル**（テキストのみ / 単色背景 / 装飾なし、を推定）
3. **dark mode をデフォルトにするか light モードか**（OS 優先を推奨）
4. **Master の表記**（「hide」「Hide」「ヒデ」等）
