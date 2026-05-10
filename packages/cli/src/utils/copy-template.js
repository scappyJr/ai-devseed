/**
 * Copy template files to target directory
 *
 * Filters out files that shouldn't be copied (e.g., node_modules)
 */

import fs from 'fs-extra';
import path from 'node:path';

const IGNORE_PATTERNS = [
  'node_modules',
  '.git',
  '.DS_Store',
  '*.log',
  'dist',
  'build',
  '.next',
];

/**
 * Check if path should be ignored
 */
function shouldIgnore(filePath) {
  const basename = path.basename(filePath);
  return IGNORE_PATTERNS.some((pattern) => {
    if (pattern.startsWith('*')) {
      return basename.endsWith(pattern.slice(1));
    }
    return basename === pattern;
  });
}

/**
 * Copy template directory recursively
 *
 * @param {string} source - Source template path
 * @param {string} target - Target project path
 * @param {object} options
 */
export async function copyTemplate(source, target, options = {}) {
  if (!(await fs.pathExists(source))) {
    throw new Error(`Template not found: ${source}`);
  }

  await fs.ensureDir(target);

  await fs.copy(source, target, {
    overwrite: options.overwrite ?? false,
    errorOnExist: !options.overwrite,
    filter: (src) => !shouldIgnore(src),
  });
}
