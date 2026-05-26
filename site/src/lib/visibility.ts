// 公開ゲート（SPEC: draft の可視性）。
// draft は「本番（Vercel production）でのみ隠す」。プレビュー（VERCEL_ENV=preview）では
// 表示し、公開前のレビューを可能にする。公開は draft:false への明示反転に一本化される。
//
// fail-closed 設計: 「preview と明示されたとき」だけ draft を見せる。
// 本番は VERCEL_ENV='production'（≠'preview'）なので必ず隠れる。env 名が想定外でも
// 「見えない」側に倒れるため、センシティブな下書きが本番へ漏れることはない。
const SHOW_DRAFTS = process.env.VERCEL_ENV === 'preview';

export function isPublic(data: { draft?: boolean }): boolean {
  return SHOW_DRAFTS || !data.draft;
}
