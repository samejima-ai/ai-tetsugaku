# REGIME.md — ai--tetsugaku-suru site

> 本プロジェクト固有の運用体制（モード / dev_mode / persona / LC / sub-phase）。
> DH 本体の `philosophy.md` 6 条と整合させる。

---

## 1. 基本情報

| key | value | 備考 |
|---|---|---|
| project | ai--tetsugaku-suru | Master (かげろう) の思考遊技場（過程が本体・結晶は区切り、§9） |
| created_at | 2026-05-20 | LC=0 で着手 |
| current_phase | 0 | 立ち上げフェーズ |
| LC (Lifecycle Counter) | 1 | Phase 0 scaffold (PR #2) で L1 第 1 サイクル実施済み。v1→v2 存在論転換を本 L0 で実施（§9） |
| upstream | dialog-harness v5.x | DH の dialogues 機構を Ignis persona 経由で利用 |

---

## 2. 開発モード

```yaml
mode: M1
```

| 候補 | 採用 | 理由 |
|---|---|---|
| **M1** (単一ドメイン、L0/L1 単独) | ✓ | 静的サイト、ドメイン単一、レビュー不要レベルの個人サイト |
| M2 (L1 + independent-reviewer 必須) | × | 過剰。個人サイト規模では coverage 価値が低い |
| L2 (複数 L1 並列 + orchestrator) | × | 完全に過剰 |

### 2.1 M2 昇格条件（将来）

以下のいずれかが発生したら M2 への昇格を検討：

- かげろう 以外の contributor が継続的に参加
- 訪問者 form / 認証等の dynamic 要素が SPEC に追加
- セキュリティ要件（PII 取扱い等）が発生

---

## 3. dev_mode

```yaml
dev_mode: github_assisted
autonomous_scope: null   # autonomous でないため適用なし
```

| 候補 | 採用 | 理由 |
|---|---|---|
| local_only | × | Cloudflare Pages デプロイに GitHub Actions を使う |
| **github_assisted** | ✓ | GitHub Actions で build + deploy、Issue 化は手動、AI 自動 PR なし |
| autonomous | × | Phase 0/1 では過剰。Phase 2 以降で再評価 |

### 3.1 CTL (Continuous Trust Level)

```yaml
ctl: 0
```

CTL 0: 検証層自動還流なし。Phase 0 では verifier 系横断機構を起動しない（必要なら かげろう 明示起動）。

---

## 4. persona

```yaml
persona:
  active: ignis
  override_state: null
```

理由: 本サイト自体が「Ignis との対話の場」を含むため、L0 spec-architect の対話相手としても
Ignis persona を採用するのが自然。かげろう (Master) と Ignis の対話関係を仕様策定段階から維持する。

persona ファイル: `/templates/personas/ignis.persona.md` (DH 同梱)

---

## 5. Sub-phase 起動

L0 spec-architect の処理フローにおける sub-phase 起動可否：

| Sub-phase | 起動 | 理由 |
|---|---|---|
| L0-2 ドメインモデル | 軽量起動 | SPEC §2.4 に Process/Crystal/DialogueLog + 不変条件を明記（v2 追加） |
| L0-3 API 設計 | スキップ | 静的サイト、外部 API なし |
| L0-4 状態遷移 | 軽量起動 | 過程ライフサイクル（flowing→punctuated→継続 / suspended）。SPEC §2.3 状態フィールド + §3.4 + §7 に内包 |
| L0-5 認可設計 | スキップ | public 公開のみ、認可なし |

---

## 6. 振り返り儀式（spec-architect §1.5）

LC=1。2026-05-25 の L0 セッションで振り返り儀式レベル 2 を実施（過去 INTENT と矛盾する欲求 = v2 存在論転換を検出 → 1→2 格上げ）。F2 で v1「発信サイト」framing と v2「過程が本体」の矛盾を検出、Master 承認で merge/flip を確定（§9）。

---

## 7. 関連 horizontal 機構の active 状態

| 機構 | active | 備考 |
|---|---|---|
| crosscut-council | ✓ (起動済) | ai--tetsugaku-suru dialogues 機構の止揚案がここで合意 |
| crosscut-issue-dispatcher | × | dev_mode が github_assisted だが SPEC 差分から Issue 化は当面手動 |
| crosscut-verifier-drift | × | CTL 0 のため inactive |
| crosscut-verifier-philosophy | × | v5.0.0 では発動禁止 |
| crosscut-continuous-learning | × | CTL 0 のため inactive |
| crosscut-hook-observer | optional | Phase 1 で SessionEnd hook 導入時に enable |
| autonomous-drive | × | dev_mode が autonomous でない |

---

## 8. Phase 移行時の REGIME.md 改訂

| 移行 | 改訂対象 |
|---|---|
| Phase 0 → 1 | `current_phase: 1`、`hook-observer: enabled`、SessionEnd hook 設定追加 |
| Phase 1 → 2 | `current_phase: 2`、Ignis 解題生成 SOP 追記、AI コスト中立性運用ガイドライン |
| M1 → M2 | `mode: M2`、independent-reviewer 起動条件、coverage 目標値 |

---

## 9. v2 存在論転換記録（2026-05-25 L0）

### 9.1 転換内容

Claude.ai からの HANDOFF v2 を起点に、本サイトの存在論を反転した。

| 軸 | v1（〜2026-05-21） | v2（2026-05-25〜） |
|---|---|---|
| 性格 | 哲学**発信**サイト | **思考遊技場**（現代のアカデメイア） |
| 過程と結晶 | philosophy / dialogues 二経路対等 | **過程が本体、結晶は過程の区切り（飛び石）** |
| 読者 | 対象読者（一般）を置く | **開放的孤独**（読者を狙わない / 扉は開く） |
| ホーム IA | 最新 philosophy 3 件 | **過程ストリーム（思考の河）が主役** |

### 9.2 統合戦略 = 接合して反転（merge/flip）

v1 資産は保持し、framing / IA / 結晶概念のみ反転・追加。保持: 命名 `--` / Ignis / コスト中立 / dialogues 機構内部（3 形態・マスク・B1-B3）/ Astro+Cloudflare / M1+github_assisted / Council 止揚案。

### 9.3 確定した 4 決定（L0 対話）

1. 統合: 接合して反転
2. 論点L（過程の素材性）: **最小整形**（時系列保持・マスク・改行正規化のみ、発話無改変）
3. 論点M（区切り発生条件）: **人間判断・skill 実行**（Master が区切り宣言、skill が結晶を彫る）
4. 論点N（過程公開ゲート）: **段階的＋承認ゲート**（B1→B2→B3、skill が機械作業、Master が公開承認）

### 9.4 Council-equiv 記録

SPEC §3.4.4 placement 昇格（過程ストリームを Phase 0 ホーム主役へ）は DONT §3.6 / CLAUDE §4 の Council 保護境界に該当。philosophy 第 6 条「人間 ≒ Council」に基づき、Master の承認を Council-equivalent とみなして確定（2026-05-25）。dialogues 機構の内部は無改変のため「根幹改変」ではなく「placement 昇格」と分類。

### 9.5 未決定論点（次サイクルへ繰越）

- 格助詞 5 値（と/が/で/の/を）の URL 構造化（`/wo/` 等）— SPEC §0.5、保留
- `philosophy` collection の物理改名（→ `crystals`）— 接合方針で当面据え置き、望めば L1
- 結晶の視覚言語（思想ごと可変）の具体 — DESIGN §11.1 次サイクル課題
- アカデメイアの"門"の設計（完全開放 / 思想的門 / 構造的門）
