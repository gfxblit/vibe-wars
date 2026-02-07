import { describe, it, expect, beforeAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('CI/CD Workflow', () => {
  const prWorkflowPath = path.join(process.cwd(), '.github/workflows/pr.yml');
  const ciWorkflowPath = path.join(process.cwd(), '.github/workflows/ci.yml');

  it('should have a pr.yml file in .github/workflows', () => {
    expect(fs.existsSync(prWorkflowPath)).toBe(true);
  });

  it('should not have a ci.yml file in .github/workflows', () => {
    expect(fs.existsSync(ciWorkflowPath)).toBe(false);
  });

  describe('file content', () => {
    let content: string;

    beforeAll(() => {
      if (fs.existsSync(prWorkflowPath)) {
        content = fs.readFileSync(prWorkflowPath, 'utf8');
      } else if (fs.existsSync(ciWorkflowPath)) {
        content = fs.readFileSync(ciWorkflowPath, 'utf8');
      }
    });

    it('should have the correct triggers', () => {
      expect(content).toContain('push:');
      expect(content).toContain('pull_request:');
      expect(content).toContain('branches: [main]');
    });

    it('should use pnpm', () => {
      expect(content).toContain('pnpm/action-setup');
      expect(content).toContain('pnpm install');
    });

    it('should exclude dist-new from deletion in production deploy', () => {
      expect(content).toContain("-not -name 'dist-new'");
    });

    it('should not specify pnpm version in workflow if packageManager is defined in package.json', () => {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
      const packageJson = JSON.parse(packageJsonContent);

      if (packageJson.packageManager && packageJson.packageManager.startsWith('pnpm')) {
        const parts = content.split('pnpm/action-setup');
        if (parts.length > 1) {
          // Check the immediate block following the setup action
          // It shouldn't contain an explicit version if packageManager defines it
          const nextStepIndex = parts[1].search(/- (uses|run|name):/);
          const setupBlock = nextStepIndex !== -1 ? parts[1].substring(0, nextStepIndex) : parts[1];
          
          expect(setupBlock).not.toContain('version:');
        }
      }
    });

    it('should have concurrency control configured', () => {
      expect(content).toMatch(
        /concurrency:\s+group: \$\{\{ github\.workflow \}\}-\$\{\{ github\.ref \}\}\s+cancel-in-progress: true/
      );
    });

    it('should use git pull --rebase before pushing to gh-pages', () => {
      expect(content).toMatch(/git pull --rebase origin gh-pages/);
    });

    it('should include timestamp (in Pacific Time) and SHA in PR comment', () => {
      expect(content).toMatch(
        /const date = new Date\(\)\.toLocaleString\('en-US', \{\s+timeZone: 'America\/Los_Angeles',\s+timeZoneName: 'short'\s+\}\);\s+const sha = context\.sha\.substring\(0, 7\);\s+const body = `🚀 Preview available at: \$\{url\}\\n\\nLast updated: \$\{date\}\\nCommit: \$\{sha\}`;/
      );
    });
  });
});
