/**
 * Git initialization utility
 *
 * Initializes git repo and creates first commit.
 */

import { execSync } from 'node:child_process';

function isGitAvailable() {
  try {
    execSync('git --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function runGit(args, targetDir) {
  try {
    execSync(`git ${args}`, {
      cwd: targetDir,
      stdio: ['ignore', 'ignore', 'pipe'],
    });
  } catch (error) {
    const stderr = error.stderr?.toString().trim();
    const detail = stderr || error.message;
    throw new Error(`\`git ${args}\` failed: ${detail}`);
  }
}

export async function initGit(targetDir) {
  if (!isGitAvailable()) {
    throw new Error('Git is not installed');
  }

  runGit('init', targetDir);
  runGit('branch -M main', targetDir);
  runGit('add .', targetDir);
  runGit('commit -m "chore: initial project setup with AI DevSeed"', targetDir);
}
