import { describe, it, expect } from 'vitest';
import { maskText } from '../scripts/mask-dialogue.mjs';

describe('maskText', () => {
  it('masks email addresses', () => {
    expect(maskText('contact: foo@example.com end')).toBe('contact: <email> end');
  });

  it('masks internal URLs', () => {
    expect(maskText('see http://api.internal/x')).toBe('see <internal-url>');
  });

  it('masks home paths', () => {
    expect(maskText('cd /home/user/work')).toBe('cd /home/<user>/work');
  });

  it('masks GitHub tokens', () => {
    expect(maskText('token: ghp_' + 'a'.repeat(40))).toBe('token: <github-token>');
  });

  it('masks secret keys (sk- prefix)', () => {
    expect(maskText('key=sk-' + 'a'.repeat(30))).toBe('key=<secret>');
  });

  it('masks master names when provided', () => {
    expect(maskText('My name is RealName here', ['RealName'])).toBe('My name is かげろう here');
  });

  it('does not alter innocuous text', () => {
    expect(maskText('普通の本文 with normal words')).toBe('普通の本文 with normal words');
  });

  it('handles multiple masks in one input', () => {
    const input = 'foo@bar.com and /home/me/x';
    expect(maskText(input)).toBe('<email> and /home/<user>/x');
  });
});
