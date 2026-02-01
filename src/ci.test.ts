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

  it('should not specify pnpm version in workflow if packageManager is defined in package.json', () => {
    const workflowPath = path.join(process.cwd(), '.github/workflows/ci.yml');
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    
    const workflowContent = fs.readFileSync(workflowPath, 'utf8');
    const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
    const packageJson = JSON.parse(packageJsonContent);

    if (packageJson.packageManager && packageJson.packageManager.startsWith('pnpm')) {
      const parts = workflowContent.split('pnpm/action-setup');
      if (parts.length > 1) {
        // Check the immediate block following the setup action
        // It shouldn't contain an explicit version if packageManager defines it
        const nextStepIndex = parts[1].search(/- (uses|run|name):/);
        const setupBlock = nextStepIndex !== -1 ? parts[1].substring(0, nextStepIndex) : parts[1];
        
        expect(setupBlock).not.toContain('version:');
      }
    }
  });
});
