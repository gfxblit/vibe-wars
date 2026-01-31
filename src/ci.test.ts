import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('CI/CD Workflow', () => {
  it('should have a ci.yml file in .github/workflows', () => {
    const workflowPath = path.join(process.cwd(), '.github/workflows/ci.yml');
    expect(fs.existsSync(workflowPath)).toBe(true);
  });

  it('should have the correct triggers', () => {
    const workflowPath = path.join(process.cwd(), '.github/workflows/ci.yml');
    const content = fs.readFileSync(workflowPath, 'utf8');
    expect(content).toContain('push:');
    expect(content).toContain('pull_request:');
    expect(content).toContain('branches: [main]');
  });

  it('should use pnpm', () => {
    const workflowPath = path.join(process.cwd(), '.github/workflows/ci.yml');
    const content = fs.readFileSync(workflowPath, 'utf8');
    expect(content).toContain('pnpm/action-setup');
    expect(content).toContain('pnpm install');
  });
});
