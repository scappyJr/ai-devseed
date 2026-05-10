/**
 * Git initialization utility
 *
 * Initializes git repo and creates first commit.
 */

import { execSync } from 'node:child_process';

/**
 * Check if git is available
 */
function isGitAvailable() {
  try {
    execSync('git --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Initialize git repository with first commit
 */
export async function initGit(targetDir) {
  if (!isGitAvailable()) {
    throw new Error('Git is not installed');
  }

  const cwd = { cwd: targetDir, stdio: 'ignore' };

  // Initialize
  execSync('git init', cwd);
  execSync('git branch -M main', cwd);

  // First commit
  execSync('git add .', cwd);
  execSync(
    'git commit -m "chore: initial project setup with AI DevSeed"',
    cwd
  );
}
