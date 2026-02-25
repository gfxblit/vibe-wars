import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { Window } from 'happy-dom';

describe('Content Security Policy', () => {
  it('should have a strict CSP meta tag in index.html', () => {
    const htmlPath = path.resolve(__dirname, '../index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const window = new Window();
    const document = window.document;
    document.write(html);

    const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    expect(meta).not.toBeNull();

    const content = meta?.getAttribute('content') || '';
    expect(content).toContain("default-src 'self'");
    expect(content).toContain("script-src 'self' 'unsafe-inline' 'unsafe-eval'");
    expect(content).toContain("object-src 'none'");
  });
});
