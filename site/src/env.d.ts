/// <reference path="../.astro/types.d.ts" />

// @types/node を導入していないため、ビルド時に参照する process.env を最小限宣言する。
declare const process: {
  readonly env: Record<string, string | undefined>;
};