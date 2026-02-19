import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { Window } from 'happy-dom';

describe('Security Configuration', () => {
  it('should enforce a Content Security Policy', () => {
    const htmlPath = path.resolve(__dirname, '../index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');

    const window = new Window();
    const document = window.document;
    document.write(html);

    const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    expect(meta, 'CSP meta tag is missing').toBeTruthy();

    const content = meta?.getAttribute('content') || '';

    // Core protections
    expect(content).toContain("default-src 'self'");
    expect(content).toContain("script-src 'self' 'unsafe-inline' 'unsafe-eval'"); // Vite requirements
    expect(content).toContain("style-src 'self' 'unsafe-inline'");
    expect(content).toContain("img-src 'self' data:");
    expect(content).toContain("connect-src 'self' ws:"); // Vite HMR uses ws
  });
});
