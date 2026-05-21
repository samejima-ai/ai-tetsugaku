# REGIME.md — hide-philosophy site

> 本プロジェクト固有の運用体制（モード / dev_mode / persona / LC / sub-phase）。
> DH 本体の `philosophy.md` 6 条と整合させる。

---

## 1. 基本情報

| key | value | 備考 |
|---|---|---|
| project | hide-philosophy | Master (hide) 個人の哲学発信サイト |
| created_at | 2026-05-20 | LC=0 で着手 |
| current_phase | 0 | 立ち上げフェーズ |
| LC (Lifecycle Counter) | 0 | 新規プロジェクト。SPEC 完成→ L1 第 1 サイクル開始で LC=1 |
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

- Master 以外の contributor が継続的に参加
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

CTL 0: 検証層自動還流なし。Phase 0 では verifier 系横断機構を起動しない（必要なら Master 明示起動）。

---

## 4. persona

```yaml
persona:
  active: ignis
  override_state: null
```

理由: 本サイト自体が「Ignis との対話の場」を含むため、L0 spec-architect の対話相手としても
Ignis persona を採用するのが自然。Master と Ignis の対話関係を仕様策定段階から維持する。

persona ファイル: `/templates/personas/ignis.persona.md` (DH 同梱)

---

## 5. Sub-phase 起動

L0 spec-architect の処理フローにおける sub-phase 起動可否：

| Sub-phase | 起動 | 理由 |
|---|---|---|
| L0-2 ドメインモデル | 軽量起動 | SPEC §2.3 Frontmatter スキーマで完結 |
| L0-3 API 設計 | スキップ | 静的サイト、外部 API なし |
| L0-4 状態遷移 | 軽量起動 | dialogues Phase 0→1→2 移行のみ。SPEC §3.4 + §7 に内包 |
| L0-5 認可設計 | スキップ | public 公開のみ、認可なし |

---

## 6. 振り返り儀式（spec-architect §1.5）

LC=0 のため振り返り儀式はスキップ。LC≥1 移行時に develop log の差分を見て儀式を起動する。

---

## 7. 関連 horizontal 機構の active 状態

| 機構 | active | 備考 |
|---|---|---|
| crosscut-council | ✓ (起動済) | hide-philosophy dialogues 機構の止揚案がここで合意 |
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
