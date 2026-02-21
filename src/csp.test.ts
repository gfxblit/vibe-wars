import { describe, it, expect } from 'vitest';
import { Window } from 'happy-dom';
import * as fs from 'fs';
import * as path from 'path';

describe('Content Security Policy', () => {
  it('should have a strict CSP meta tag in index.html', () => {
    // Read index.html from the root of the project
    const htmlPath = path.resolve(process.cwd(), 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');

    // Parse the HTML using happy-dom
    const window = new Window();
    const document = window.document;
    document.write(html);

    // Find the CSP meta tag
    const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');

    // Assert it exists
    expect(meta).not.toBeNull();

    // Get the content attribute
    const content = meta?.getAttribute('content');

    // Verify the directives
    expect(content).toBeDefined();
    expect(content).toContain("default-src 'self'");
    expect(content).toContain("script-src 'self' 'unsafe-inline' 'unsafe-eval'");
    expect(content).toContain("style-src 'self' 'unsafe-inline'");
    expect(content).toContain("img-src 'self' data: blob:");
    expect(content).toContain("connect-src 'self' ws: wss:");
  });
});
