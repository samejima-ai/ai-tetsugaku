// Rehype plugin: classify dialogue / philosophy blockquotes by "voice" so CSS can
// style them monochromatically (utterance / annotation / callout). The markdown
// source stays plain; classification is purely presentational and runs at build.
//
// Recognised conventions (kept stable across all dialogues):
//   - 解説フェーズ:   blockquote whose text begins with 【論点注釈】        → .dq-note
//   - 発言 (型A):     `**かげろう**:` 段落 + 直後の blockquote               → label .dq-say__label / body .dq-say
//   - 発言 (型B):     `> **かげろう**「…」`（話者ラベルが引用内）            → .dq-say
//   - 発言 (インライン): `**かげろう → ignis**: 「…」`（引用が同段落内）       → .dq-say-inline
//   - 枠組みノート:   その他の太字ラベル始まりの blockquote（位置づけ/留保/中心命題） → .dq-callout
//   - それ以外の引用:                                                        → .dq-plain

const SPEAKERS = { 'かげろう': 'kagero', 'ignis': 'ignis' };
const NOTE_MARKER = '【論点注釈】';

function getText(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (node.children) return node.children.map(getText).join('');
  return '';
}

function addClass(node, ...classes) {
  if (!node.properties) node.properties = {};
  let list = node.properties.className;
  if (typeof list === 'string') list = list.split(/\s+/).filter(Boolean);
  if (!Array.isArray(list)) list = [];
  for (const c of classes) if (c && !list.includes(c)) list.push(c);
  node.properties.className = list;
}

function isElement(node, tagName) {
  return !!node && node.type === 'element' && (!tagName || node.tagName === tagName);
}

// First child that is an element, skipping whitespace-only text. Returns null if
// meaningful text appears before any element (so a strong is truly "leading").
function firstElementChild(node) {
  if (!node || !node.children) return null;
  for (const c of node.children) {
    if (c.type === 'text' && /^\s*$/.test(c.value)) continue;
    if (c.type === 'element') return c;
    return null;
  }
  return null;
}

function leadingStrong(node) {
  const first = firstElementChild(node);
  return isElement(first, 'strong') ? first : null;
}

function findChild(node, tagName) {
  if (!node || !node.children) return null;
  for (const c of node.children) if (isElement(c, tagName)) return c;
  return null;
}

function matchSpeaker(text) {
  const t = (text || '').trim();
  for (const name in SPEAKERS) if (t.startsWith(name)) return SPEAKERS[name];
  return null;
}

function classifyBlockquote(bq) {
  const fp = firstElementChild(bq);
  const strong = fp ? leadingStrong(fp) : null;
  const strongText = strong ? getText(strong).trim() : '';
  const text = getText(bq).trim();

  if (strongText.startsWith(NOTE_MARKER) || text.startsWith(NOTE_MARKER)) {
    addClass(bq, 'dq-note');
    if (strong) addClass(strong, 'dq-note__label');
    return;
  }

  if (strong) {
    const sp = matchSpeaker(strongText);
    if (sp) {
      addClass(bq, 'dq-say', `dq-say--${sp}`);
      addClass(strong, 'dq-say__tag', `dq-say__tag--${sp}`);
      return;
    }
    addClass(bq, 'dq-callout');
    addClass(strong, 'dq-callout__label');
    return;
  }

  addClass(bq, 'dq-plain');
}

// 各 <td> にヘッダ見出しを data-label として写し、狭幅では縦積みカード化できるようにする。
function decorateTable(table) {
  const thead = findChild(table, 'thead');
  const headRow = thead ? findChild(thead, 'tr') : null;
  const labels = [];
  if (headRow) {
    for (const th of headRow.children) if (isElement(th)) labels.push(getText(th).trim());
  }
  const tbody = findChild(table, 'tbody');
  if (!tbody) return;
  for (const tr of tbody.children) {
    if (!isElement(tr, 'tr')) continue;
    let ci = 0;
    for (const td of tr.children) {
      if (!isElement(td)) continue;
      const label = labels[ci];
      if (label) {
        if (!td.properties) td.properties = {};
        td.properties.dataLabel = label;
      }
      ci++;
    }
  }
}

// 横スクロール用の wrapper で表を包む。
function wrapTable(table) {
  return {
    type: 'element',
    tagName: 'div',
    properties: { className: ['table-scroll'] },
    children: [table],
  };
}

function walk(node) {
  if (!node || !node.children) return;
  const kids = node.children;
  for (let i = 0; i < kids.length; i++) {
    const c = kids[i];
    if (!isElement(c)) continue;

    if (c.tagName === 'p') {
      const strong = leadingStrong(c);
      const sp = strong ? matchSpeaker(getText(strong)) : null;
      if (sp) {
        const labelText = getText(c).trim();
        const labelOnly = /[:：]\s*$/.test(labelText); // ラベルのみ（引用は次ブロック）
        let paired = false;
        if (labelOnly) {
          let j = i + 1;
          while (j < kids.length && !isElement(kids[j])) j++;
          const next = kids[j];
          if (isElement(next, 'blockquote') && !getText(next).trim().startsWith(NOTE_MARKER)) {
            addClass(c, 'dq-say__label', `dq-say__label--${sp}`);
            addClass(strong, 'dq-say__tag', `dq-say__tag--${sp}`);
            addClass(next, 'dq-say', `dq-say--${sp}`, 'dq-say--labeled');
            next.__dqClassified = true;
            paired = true;
          }
        }
        if (!paired) {
          addClass(c, 'dq-say-inline', `dq-say-inline--${sp}`);
          addClass(strong, 'dq-say__tag', `dq-say__tag--${sp}`);
        }
      }
    } else if (c.tagName === 'blockquote' && !c.__dqClassified) {
      classifyBlockquote(c);
    } else if (c.tagName === 'table') {
      decorateTable(c);
      kids[i] = wrapTable(c);
    }

    walk(c);
  }
}

export default function rehypeDialogueVoices() {
  return (tree) => walk(tree);
}
