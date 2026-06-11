#!/usr/bin/env node

/**
 * AI DevSeed CLI
 *
 * 🌱 Plant the seed for AI-collaborative solo development
 *
 * Usage:
 *   npx ai-devseed init my-app
 *   npx ai-devseed --help
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from '../src/commands/init.js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));

const program = new Command();

// ASCII banner
const banner = `
${chalk.green('  🌱 AI DevSeed')} ${chalk.gray(`v${pkg.version}`)}
${chalk.gray('  Plant the seed for AI-collaborative solo development')}
`;

program
  .name('ai-devseed')
  .description('🌱 Plant the seed for AI-collaborative solo development')
  .version(pkg.version, '-v, --version', 'Output version number')
  .addHelpText('beforeAll', banner);

// init command
program
  .command('init [project-name]')
  .description('Create a new AI-collaborative project')
  .option('-t, --template <type>', 'Template type (base, mobile-rn, web-react)', 'base')
  .option('--no-git', 'Skip Git initialization')
  .option('-y, --yes', 'Skip prompts and use defaults')
  .action(async (projectName, options) => {
    console.log(banner);
    try {
      await initCommand(projectName, options);
    } catch (error) {
      console.error(chalk.red('\n❌ Error:'), error.message);
      if (process.env.DEBUG) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

// list templates command
program
  .command('list')
  .description('List available templates')
  .action(async () => {
    console.log(banner);
    console.log(chalk.bold('\n📦 Available Templates:\n'));
    console.log(`  ${chalk.green('base')}        Generic project (any language/framework)`);
    console.log(`  ${chalk.green('mobile-rn')}   Mobile app (React Native + Expo + TypeScript)`);
    console.log(`  ${chalk.green('web-react')}   Web app (React + Vite + TypeScript)`);
    console.log(chalk.gray('\nMore templates coming soon!'));
  });

// help if no command
if (process.argv.length === 2) {
  console.log(banner);
  program.help();
}

program.parse(process.argv);
