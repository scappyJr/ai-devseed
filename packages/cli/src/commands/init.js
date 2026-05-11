/**
 * `ai-devseed init` command
 *
 * Creates a new project from templates with interactive prompts.
 */

import { input, select, confirm } from '@inquirer/prompts';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { copyTemplate } from '../utils/copy-template.js';
import { replacePlaceholders } from '../utils/placeholders.js';
import { initGit } from '../utils/git.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, '..', '..', 'templates');

/**
 * Validate project name (npm naming rules)
 */
function validateProjectName(name) {
  if (!name || name.trim() === '') {
    return 'Project name is required';
  }
  if (!/^[a-z0-9][a-z0-9-_]*$/.test(name)) {
    return 'Use lowercase letters, numbers, hyphens, or underscores. Must start with letter/number.';
  }
  if (name.length > 50) {
    return 'Project name must be 50 characters or less';
  }
  return true;
}

/**
 * Main init command
 */
export async function initCommand(projectName, options) {
  // ========== STEP 1: Gather project info ==========
  const config = await gatherProjectInfo(projectName, options);

  // ========== STEP 2: Validate target directory ==========
  const targetDir = path.resolve(process.cwd(), config.projectName);
  if (await fs.pathExists(targetDir)) {
    const files = await fs.readdir(targetDir);
    if (files.length > 0) {
      throw new Error(
        `Directory "${config.projectName}" already exists and is not empty.`
      );
    }
  }

  console.log(); // spacing

  // ========== STEP 3: Copy template ==========
  const spinner = ora('Creating project structure...').start();

  try {
    // Copy base template first (always)
    const baseTemplatePath = join(TEMPLATES_DIR, 'base');
    await copyTemplate(baseTemplatePath, targetDir);

    // Copy specific template if not 'base'
    if (config.template !== 'base') {
      const specificTemplatePath = join(TEMPLATES_DIR, config.template);
      if (await fs.pathExists(specificTemplatePath)) {
        await copyTemplate(specificTemplatePath, targetDir, { overwrite: true });
      }
    }

    spinner.succeed('Project structure created');
  } catch (error) {
    spinner.fail('Failed to create project structure');
    throw error;
  }

  // ========== STEP 4: Replace placeholders ==========
  const placeholderSpinner = ora('Customizing for your project...').start();
  try {
    await replacePlaceholders(targetDir, {
      PROJECT_NAME: config.projectName,
      PROJECT_DESCRIPTION: config.description,
      AUTHOR: config.author,
      YEAR: new Date().getFullYear(),
      DATE: new Date().toISOString().split('T')[0],
    });
    placeholderSpinner.succeed('Project customized');
  } catch (error) {
    placeholderSpinner.fail('Failed to customize project');
    throw error;
  }

  // ========== STEP 5: Initialize Git ==========
  if (config.initGit) {
    const gitSpinner = ora('Initializing Git...').start();
    try {
      await initGit(targetDir);
      gitSpinner.succeed('Git initialized with first commit');
    } catch (error) {
      gitSpinner.warn('Git initialization skipped: ' + error.message);
    }
  }

  // ========== STEP 6: Success message ==========
  printSuccessMessage(config);
}

/**
 * Gather project info via prompts
 */
async function gatherProjectInfo(initialName, options) {
  const config = {};

  // Project name
  if (initialName) {
    const validation = validateProjectName(initialName);
    if (validation !== true) {
      throw new Error(validation);
    }
    config.projectName = initialName;
  } else {
    config.projectName = await input({
      message: 'Project name:',
      default: 'my-app',
      validate: validateProjectName,
    });
  }

  // Skip rest if --yes flag
  if (options.yes) {
    return {
      ...config,
      description: 'A new AI-collaborative project',
      author: '',
      template: options.template,
      initGit: options.git !== false,
    };
  }

  // Description
  config.description = await input({
    message: 'Project description:',
    default: 'A new AI-collaborative project',
  });

  // Author (optional)
  config.author = await input({
    message: 'Author name (optional):',
    default: '',
  });

  // Template (use option if provided, else ask)
  if (options.template && options.template !== 'base') {
    config.template = options.template;
  } else {
    config.template = await select({
      message: 'Project type:',
      choices: [
        {
          name: '📦 Generic / Custom (any language)',
          value: 'base',
          description: 'Pure documentation + workflow setup',
        },
        {
          name: '📱 Mobile App (React Native + Expo + TypeScript)',
          value: 'mobile-rn',
          description: 'Includes RN-specific structure and tools',
        },
        {
          name: '🌐 Web App (React + Vite + TypeScript)',
          value: 'web-react',
          description: 'Includes Vite-based React setup',
        },
      ],
    });
  }

  // Git
  config.initGit =
    options.git === false
      ? false
      : await confirm({
          message: 'Initialize Git repository?',
          default: true,
        });

  return config;
}

/**
 * Print success message with next steps
 */
function printSuccessMessage(config) {
  console.log('\n' + chalk.green.bold('✨ Project created successfully!\n'));

  console.log(chalk.bold('📁 Next steps:\n'));
  console.log(`  ${chalk.cyan(`cd ${config.projectName}`)}`);

  if (config.template === 'mobile-rn') {
    console.log(`  ${chalk.cyan('npm install')}`);
    console.log(`  ${chalk.cyan('npm start')}        ${chalk.gray('# Start Expo')}`);
  } else if (config.template === 'web-react') {
    console.log(`  ${chalk.cyan('npm install')}`);
    console.log(`  ${chalk.cyan('npm run dev')}      ${chalk.gray('# Start dev server')}`);
  }

  console.log(`  ${chalk.cyan('claude')}            ${chalk.gray('# Start Claude Code')}`);

  console.log('\n' + chalk.bold('📚 Useful commands:\n'));
  console.log(`  ${chalk.cyan('/daily start')}      ${chalk.gray('# Start your day')}`);
  console.log(`  ${chalk.cyan('/add-decision')}     ${chalk.gray('# Document a decision')}`);
  console.log(`  ${chalk.cyan('/review')}           ${chalk.gray('# Self code review')}`);

  console.log('\n' + chalk.bold('💡 Read first:\n'));
  console.log(`  ${chalk.cyan('CLAUDE.md')}                  ${chalk.gray('# Project context for AI')}`);
  console.log(`  ${chalk.cyan('docs/workflow-guide.md')}     ${chalk.gray('# Daily workflow')}`);

  console.log('\n' + chalk.gray('━'.repeat(50)));
  console.log(chalk.green('🌱 Happy coding!'));
  console.log(chalk.gray(`   Star us: https://github.com/scappyJr/ai-devseed`));
  console.log();
}
