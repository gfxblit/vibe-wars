import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { Window } from 'happy-dom';

describe('Content Security Policy', () => {
  it('should be present in index.html with correct directives', () => {
    // Read index.html from project root
    const htmlPath = path.resolve(process.cwd(), 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Parse HTML
    const window = new Window();
    const document = window.document;
    document.write(htmlContent);

    // Check for meta tag
    const meta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    expect(meta).not.toBeNull();

    const content = meta?.getAttribute('content') || '';

    // Verify critical directives
    expect(content).toContain("default-src 'self'");
    expect(content).toContain("script-src 'self' 'unsafe-inline' 'unsafe-eval'"); // Vite dev requirement
    expect(content).toContain("style-src 'self' 'unsafe-inline'"); // Vite CSS injection
    expect(content).toContain("connect-src 'self' ws: wss:"); // Vite HMR
    expect(content).toContain("img-src 'self' data:"); // Local images
    expect(content).toContain("font-src 'self' data:"); // Local fonts
  });
});
