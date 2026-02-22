import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Window } from 'happy-dom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Content Security Policy', () => {
  it('should be present in index.html with correct directives', () => {
    const htmlPath = path.resolve(__dirname, '../index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');

    const window = new Window();
    const document = window.document;
    document.write(html);

    const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    expect(meta, 'CSP meta tag is missing').not.toBeNull();

    const content = meta?.getAttribute('content') || '';

    // Check essential directives
    expect(content).toContain("default-src 'self'");
    expect(content).toContain("script-src 'self' 'unsafe-inline' 'unsafe-eval'");
    expect(content).toContain("style-src 'self' 'unsafe-inline'");
    expect(content).toContain("img-src 'self' data:");
    expect(content).toContain("font-src 'self' data:");
    expect(content).toContain("connect-src 'self' ws: wss:");
  });
});
