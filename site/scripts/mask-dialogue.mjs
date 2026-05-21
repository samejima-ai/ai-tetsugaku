#!/usr/bin/env node
// SPEC §3.4.3 マスク機構の実装。stdin から markdown を読み、マスク後を stdout に出す。
// 使用例: node scripts/mask-dialogue.mjs < input.md > output.md

import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const SECRETS_PATH = resolve(dirname(fileURLToPath(import.meta.url)), 'secrets', 'master-names.json');

function loadMasterNames() {
  if (!existsSync(SECRETS_PATH)) return [];
  try {
    const raw = readFileSync(SECRETS_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string' && s.length > 0) : [];
  } catch {
    return [];
  }
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const MASK_RULES = [
  { name: 'email', pattern: /[\w.+-]+@[\w.-]+\.\w+/g, replace: '<email>' },
  { name: 'internal-url', pattern: /https?:\/\/[^/\s]*\.(local|internal)[^\s]*/g, replace: '<internal-url>' },
  { name: 'home-path', pattern: /\/home\/[^/\s]+\//g, replace: '/home/<user>/' },
  { name: 'github-token', pattern: /gh[pousr]_[A-Za-z0-9]{36,}/g, replace: '<github-token>' },
  { name: 'secret-key', pattern: /(sk-|api[_-]?key)[A-Za-z0-9_-]{20,}/g, replace: '<secret>' },
];

export function maskText(text, masterNames = []) {
  let out = text;
  for (const rule of MASK_RULES) {
    out = out.replace(rule.pattern, rule.replace);
  }
  for (const name of masterNames) {
    out = out.replace(new RegExp(escapeRegex(name), 'g'), 'かげろう');
  }
  return out;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = readFileSync(0, 'utf-8');
  const masterNames = loadMasterNames();
  process.stdout.write(maskText(input, masterNames));
}
