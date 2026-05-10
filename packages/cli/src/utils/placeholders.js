/**
 * Replace placeholders in template files
 *
 * Supports patterns like {{PROJECT_NAME}}, {{AUTHOR}}, etc.
 */

import fs from 'fs-extra';
import path from 'node:path';

// File extensions to process (avoid binary files)
const TEXT_EXTENSIONS = [
  '.md',
  '.txt',
  '.json',
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.html',
  '.css',
  '.scss',
  '.yml',
  '.yaml',
  '.sh',
  '.bash',
  '.toml',
  '.gitignore',
  '.env.example',
];

/**
 * Check if file is text-based (should process placeholders)
 */
function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const basename = path.basename(filePath);

  // Files without extension that are commonly text
  if (basename === 'CLAUDE.md' || basename === 'README' || basename === '.gitignore') {
    return true;
  }

  return TEXT_EXTENSIONS.includes(ext);
}

/**
 * Replace placeholders in a single file
 */
async function replaceInFile(filePath, replacements) {
  let content = await fs.readFile(filePath, 'utf-8');
  let changed = false;

  for (const [key, value] of Object.entries(replacements)) {
    const pattern = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
    if (pattern.test(content)) {
      content = content.replace(pattern, value);
      changed = true;
    }
  }

  if (changed) {
    await fs.writeFile(filePath, content);
  }
}

/**
 * Walk directory and replace placeholders in all text files
 *
 * @param {string} targetDir - Project directory
 * @param {object} replacements - Map of placeholder name to value
 */
export async function replacePlaceholders(targetDir, replacements) {
  const walk = async (dir) => {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip node_modules and other ignored
        if (entry.name === 'node_modules' || entry.name === '.git') {
          continue;
        }
        await walk(fullPath);
      } else if (entry.isFile() && isTextFile(fullPath)) {
        await replaceInFile(fullPath, replacements);
      }
    }
  };

  await walk(targetDir);
}
