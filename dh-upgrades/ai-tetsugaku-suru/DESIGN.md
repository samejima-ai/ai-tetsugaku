# DESIGN.md — ai--tetsugaku-suru site

> 視覚仕様。色調・タイポグラフィ・レイアウト思想・シェイプ言語・コンポーネント階層。
> SPEC.md と並列。実装は `site/src/` で展開。

---

## 1. デザイン思想

### 1.1 三つの柱

1. **抑制 (restraint)**: 装飾を増やさない。読まれることを邪魔しない
2. **沈黙 (silence)**: 余白を恐れない。情報密度より呼吸
3. **対話の場 (dialogic space)**: philosophy と dialogues の二経路を視覚的に分けすぎず、しかし混同もしない

### 1.2 やらない設計

- ヒーローセクションの大画像 / 派手なアニメーション
- 強いグラデーション
- スクロール連動アニメーション（reduced-motion 配慮）
- ポップアップ / モーダル
- カラフルな emphasis color
- 装飾目的の常時 shadow（§6 で部分使用に限定）

### 1.3 形式とテクストの共鳴 — `--` と対角の余白

本サイトのデザイン言語は、サイト名 `ai--tetsugaku-suru` の構造と **同型** に組み立てられる。これは偶然ではなく、構造的決定 (structural resonance) として明文化する。

| 層 | 表象 | 意味 |
|---|---|---|
| サイト名 | `ai` `--` `tetsugaku-suru` | 両端を **結びつけない / 切断しない**、関係子そのものを「余白」として現前 |
| シェイプ言語 | 対角の二隅のみ rounded、残り二隅は square (詳細 §5) | 「決定されない関係」「対角の余白」を全 component で figure 化 |
| カラー | Light = muted (昼の静けさ) / Dark = vivid 中程度 (夜の最小限の輝き) (§2) | 「条件によって現れる像」= modal-dependent な現象 |
| Shadow | 静止状態 flat / hover 時のみ薄く浮かぶ (§6) | 「触れたときだけ応答が現れる」= 対話への呼応性 |
| タイポ | 見出し + dialogues = Shippori Mincho、本文 = Noto Sans JP (§3) | 思考の跡 (Mincho の線質) と日常の発話 (Sans) の対 |

サイト全体の visual identity は、`ai--tetsugaku-suru` という名のテクスト構造を、シェイプと色と影と書体の四層で figure 化したものに他ならない。

---

## 2. カラーパレット

ライト / ダーク両モード対応。OS 設定優先 + 手動切替 toggle（footer に小さく、Phase 0 では暫定 OS 優先のみで省略可）。

### 2.1 ダブル採り戦略

Master 諮問 (2026-05-21) で確定:

- **Light mode**: muted (彩度抑制、紙のような静けさ)
- **Dark mode**: vivid 中程度 (彩度残存、夜の最小限の輝き、Ignis の青毛先と呼応)

両モードで同じ役割の token が同じ意味性を持つ (= 「primary は常にリンク」) が、彩度プロファイルが mode で異なる。哲学的解釈: 「条件 (昼/夜) によって現れる像」= 陽炎の揺らぎ。

### 2.2 Light mode

| token | hex | 用途 |
|---|---|---|
| `--bg` | `#fafaf7` | 紙のような薄いオフホワイト |
| `--fg` | `#1a1a1a` | 本文 |
| `--muted` | `#6b6b66` | 補助テキスト・メタ情報 |
| `--primary` | `#3a5a8c` | リンク・accent（deep muted blue、抑制的） |
| `--primary-hover` | `#1f3a6b` | リンク hover |
| `--border` | `#e0e0d8` | 罫線 |
| `--ignis-tint` | `#c5d4e8` | dialogues セクション・card hover 時の bg |
| `--shadow-card-hover` | `0 2px 8px rgba(26,26,26,0.06)` | card hover 限定 (§6) |

### 2.3 Dark mode

| token | hex | 用途 |
|---|---|---|
| `--bg` | `#13141a` | 沈んだ夜の色 |
| `--fg` | `#e8e6e0` | 本文 |
| `--muted` | `#8a8a85` | 補助テキスト |
| `--primary` | `#4ab3ee` | リンク・accent（vivid blue、明度高め。夜の最小限の輝き） |
| `--primary-hover` | `#7ac8f0` | リンク hover |
| `--border` | `#2a2c34` | 罫線 |
| `--ignis-tint` | `#1f2a3a` | dialogues セクション・card hover 時の bg |
| `--shadow-card-hover` | `0 2px 8px rgba(0,0,0,0.4)` | card hover 限定 (§6) |

dark mode の primary は Ignis persona の「青い毛先」と意図的に呼応する。Master upload で示された vivid 値 (`#0092f5` 系) を 1 段明度上げて、ライトボックス効果での網膜刺激を回避しつつ「中程度の vivid」を保つ調整。

---

## 3. タイポグラフィ

### 3.1 フォントファミリー (三族体制)

| 用途 | 採用 | フォールバック |
|---|---|---|
| 見出し (h1-h6) | Shippori Mincho (variable) | Noto Serif JP, Georgia, serif |
| dialogues 発話本文 | Shippori Mincho (variable) | Noto Serif JP, Georgia, serif |
| 本文（日本語） | Noto Sans JP (variable) | system-ui, sans-serif |
| 本文（欧文） | Inter (variable) | -apple-system, BlinkMacSystemFont, sans-serif |
| 等幅（コード・マスク済み slot） | JetBrains Mono | ui-monospace, monospace |

哲学整合: Shippori Mincho の線質を「思考の跡」「発話の重み」として、**見出しと dialogues 発話の両方** に当てる。dialogues 発話は記事内の小見出しと同格の重みで現前する = 対話自体が哲学行為であることの視覚化。本文 Noto Sans JP は「日常の言語」を担当し、見出し/発話との対比を生む。

### 3.2 サイズスケール（16px base、modular scale 1.2）

| token | rem | px | 用途 |
|---|---|---|---|
| `text-xs` | 0.694 | 11.1 | caption / footnote |
| `text-sm` | 0.833 | 13.3 | meta / tag |
| `text-base` | 1.000 | 16.0 | 本文 |
| `text-md` | 1.200 | 19.2 | h4 / 強調 |
| `text-lg` | 1.440 | 23.0 | h3 |
| `text-xl` | 1.728 | 27.6 | h2 |
| `text-2xl` | 2.074 | 33.2 | h1 (article title) |
| `text-3xl` | 2.488 | 39.8 | site title (top page) |

Master 諮問 (2026-05-21) で base 16px 確定（哲学長文の可読性最優先）。modular scale は 1.2 (minor third) — 1.25 (major third) より控えめで「抑制」の柱と整合。

### 3.3 行間・字間

- 本文 `line-height: 1.85`（日本語前提でゆったり）
- 見出し `line-height: 1.4`
- dialogues 発話 `line-height: 1.8`（Mincho、わずかに本文より詰める）
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
[ai--tetsugaku-suru (text-3xl, Shippori Mincho)]
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
[title (text-2xl, Shippori Mincho)]
[meta: publishedAt, tags] (text-sm muted)
─── (細罫線) ───

[本文 (text-base, Noto Sans JP, line-height 1.85)]

─── (細罫線) ───
[prev / next nav]
```

### 4.5 dialogues page の発話レイアウト

```
かげろう:
  > 発話本文（Shippori Mincho, text-base, line-height 1.8）
  > インデント 0.5rem、左罫線 2px（--border）

ignis:
  > 発話本文（Shippori Mincho, text-base, line-height 1.8）
  > インデント 0.5rem、左罫線 2px（--primary、薄く）
  > 発話者名は --primary 色
```

- 発話間に `1.5rem` の縦余白
- マスク済み箇所 `<email>` 等は `--muted` 色 + 等幅フォント (JetBrains Mono) で表示
- 発話者表示: data 上は slug (`kagero` / `ignis`)、表示層では「かげろう」「ignis」と日本語/小文字英で

---

## 5. シェイプ言語 — diagonal asymmetric corner

Master 諮問 (2026-05-21) で「全コンポーネント適用」確定。サイト固有の visual identity の核。

### 5.1 適用方針

すべての rounded を持つ component に対し:

- **top-left + bottom-right の対角ペアのみ rounded**
- **top-right + bottom-left の対角ペアは square (radius 0)**

CSS 表現例:

```css
.card {
  border-top-left-radius: 18px;
  border-bottom-right-radius: 18px;
  border-top-right-radius: 0;
  border-bottom-left-radius: 0;
}
```

実装は `@layer utilities` で `.corner-asym-sm` `.corner-asym-md` `.corner-asym-lg` `.corner-asym-xl` `.corner-asym-2xl` `.corner-asym-full` を定義し、各 component で当てる（border-radius shorthand `TL TR BR BL` の順では対角指定がやや読みづらいため、4 プロパティ個別指定を utility に閉じ込める方式）。

### 5.2 各 component の rounded サイズ

| component | TL & BR | TR & BL | utility class |
|---|---|---|---|
| input | 6px | 0 | `corner-asym-sm` |
| button | 12px | 0 | `corner-asym-md` |
| badge | 9999px (full) | 0 → 葉形 / 半月形 | `corner-asym-full` |
| card (ArticleCard, DialogueEntry) | 18px | 0 | `corner-asym-lg` |
| image frame | 24px | 0 | `corner-asym-xl` |
| hero block (top tagline 周り) | 32px | 0 | `corner-asym-2xl` |

### 5.3 例外（適用外）

以下には asymmetric corner を適用しない:

- `<body>` / `<main>` のページ枠（画面全体への asymmetry は読書視線を歪める）
- 本文 text block 内の inline element（`<code>` 等は無装飾 or 全四隅 4px の対称 rounded で許容）
- 罫線 (`<hr>`) や divider
- focus ring（§9 アクセシビリティ、意味の sign として symmetric を保つ）

### 5.4 哲学的読解

対角の二隅だけ角を丸めることは、対角の二隅を square に残すことと不可分である。「決定されない関係」が、四隅の四つの選択肢のうち **どの組み合わせを取ったかではなく、どの組み合わせを取らなかったか** によって現れる。これは `ai--tetsugaku-suru` の `--` が、`AI` と `tetsugaku-suru` を結合する記号ではなく、両者の間に **結合しなさ** を置く記号であることと同型である (§1.3)。

---

## 6. Shadow 方針 — 部分使用

Master 諮問 (2026-05-21) で「card hover 時のみ」確定。

### 6.1 適用範囲

| 対象 / 状態 | shadow | 値 |
|---|---|---|
| card 静止 | なし | flat |
| card hover | shadow-sm | `--shadow-card-hover` (§2.2 / §2.3) |
| button (全状態) | なし | flat |
| input (全状態) | なし | flat |
| modal / dropdown | 不使用 | (本 SPEC に modal/dropdown なし。DONT.md §1.4 動的機能禁止に整合) |

### 6.2 意味論

- 静止状態 = flat = 「沈黙」(§1.1) の視覚化
- hover で初めて layer が現れる = 「触れたときだけ応答が浮かぶ」 = 対話の呼応性
- shadow は装飾ではなく **状態変化の sign**

### 6.3 transition

```css
.card {
  transition: box-shadow 200ms ease, background-color 200ms ease;
}
```

`prefers-reduced-motion: reduce` 時は transition を即時化 (§9 アクセシビリティ)。

---

## 7. コンポーネント

### 7.1 BaseLayout.astro

- HTML head（title / description / favicon / OGP）
- Header / Main slot / Footer
- color-scheme meta、prefers-color-scheme 対応
- フォント preconnect (Google Fonts: Shippori Mincho / Noto Sans JP / Inter / JetBrains Mono)
- font-display: swap で FOIT 回避

### 7.2 ArticleCard.astro

```
[title (text-md, Shippori Mincho, fg)]
[description (text-base, Noto Sans JP, muted, 2 行で truncate)]
[meta: publishedAt (text-xs, muted)]
```

- card 自体は border 1px (`--border`) で枠囲み
- corner: `corner-asym-lg` (TL & BR 18px、TR & BL 0)
- 静止: bg = transparent、shadow = none
- hover: bg = `--ignis-tint` (薄く)、shadow = `--shadow-card-hover` (§6)

### 7.3 DialogueEntry.astro

- §4.5 のレイアウトを実装
- format バッジ（raw / summary / exegesis）を meta に小さく
  - badge: `corner-asym-full` (TL & BR 9999px、TR & BL 0 = 葉形 / 半月形)
  - bg: `--ignis-tint` (薄く)、text: `--primary`
- 発話者名 (`かげろう` / `ignis`) の表示。data 層 slug (`kagero`) → 表示層日本語の変換は component 内 map で

### 7.4 Footer.astro

- copyright (かげろう + 年)
- archive へのリンク
- dialog-harness リポジトリへのリンク
- color-scheme toggle（Phase 0 では暫定 OS 設定優先のみで省略可）

---

## 8. レスポンシブ

| breakpoint | width | 変化点 |
|---|---|---|
| mobile | ≤ 640px | side padding 1.5rem、header 文字小、site title text-2xl にダウングレード |
| tablet | 641-1024px | レイアウト変えず、padding 拡張 |
| desktop | ≥ 1025px | max-width 680px を中央寄せのまま維持 |

PC 用 wide layout（sidebar 等）は本 SPEC スコープ外。

---

## 9. アクセシビリティ

- 色のみで情報伝達しない（リンク = underline + color）
- focus-visible で明確な outline（primary 色、2px）— corner は symmetric を使う（focus ring は意味の sign、asymmetric corner と混同させない、§5.3 例外）
- skip-to-content リンク（header に視覚非表示で配置）
- `prefers-reduced-motion: reduce` で transition 系を無効化（card hover の shadow 変化も即時化）
- WCAG AA 目標。Light mode primary `#3a5a8c` on `#fafaf7` は contrast 約 7.0:1 (AAA 達成)。Dark mode primary `#4ab3ee` on `#13141a` は約 8.5:1 (AAA)
- Shippori Mincho は variable font だが、本文 weight は 400 を固定（細すぎ回避）

---

## 10. 確定事項一覧 (Master 諮問 2026-05-21)

| 項目 | 確定値 | 出典 |
|---|---|---|
| サイト名表記 | `ai--tetsugaku-suru` (double hyphen) | Master 確定 (SPEC §0) |
| 著者表記 | かげろう (slug: `kagero`) | Master 確定 (SPEC §0) |
| Primary color (Light) | `#3a5a8c` (deep muted) | 諮問 A |
| Primary color (Dark) | `#4ab3ee` (vivid mid) | 諮問 A (ダブル採り) |
| Base font size | 16px | 諮問 B |
| Modular scale | 1.2 (minor third) | 諮問 B |
| Shadow 方針 | card hover 時のみ | 諮問 C (部分使用) |
| Corner 方針 | 全 component 対角 asymmetric (TL+BR rounded, TR+BL square) | 諮問 D (全面化) |
| 見出し typeface | Shippori Mincho | Master upload |
| dialogues 発話 typeface | Shippori Mincho (見出しと統一) | 残擦り合わせ C |

---

## 11. 次サイクル課題

- OGP 画像の具体的なデザイン（背景色 + サイト名のみのテキストレンダリング案、Shippori Mincho 使用）
- favicon（検討: `--` を視覚化した極小ロゴ、または「〇」シンボル）
- color-scheme toggle のアイコン (Phase 1+)
- Shippori Mincho の variable weight 軸の活用（h1-h6 で weight 段階を変える案）

### 11.1 v2 存在論転換に伴う視覚課題（2026-05-25 追加）

§1〜§10 の確定事項（特に §1.3 共鳴 / §5 corner / §6 shadow / §10）は **無改変**。以下は追加検討のみ。

- **思考の河（過程ストリーム）の視覚**: ホーム主役となった過程ストリーム（SPEC §3.1）を「流れ」として
  感じさせる時系列レイアウト。既存の抑制・沈黙の柱（§1.1）を崩さない範囲で
- **結晶＝飛び石の標識**: ストリーム中の結晶（区切り、SPEC §3.5）を河に打たれた飛び石として
  視覚的に標識する控えめなマーカー。既定の corner / shadow 言語を流用する
- **結晶の視覚言語は思想ごと可変**: 結晶 HTML の色・モチーフは思想ごとに変わる（意識論 = 朱と落款 等、
  SPEC §3.5.2）。サイト共通トークンとの関係（どこまで結晶に独自色を許すか）を次サイクルで設計
