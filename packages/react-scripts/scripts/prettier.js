'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const os = require('os');
const chalk = require('react-dev-utils/chalk');
const execSync = require('child_process').execSync;
const ensurePrettierGitHook = require('./utils/ensurePrettierGitHook');

// Adds prettier to pre-commit hook in git repositories
ensurePrettierGitHook();

const rules = [
  '--print-width 100',
  '--tab-width 2',
  '--single-quote',
  '--trailing-comma all',
  '--no-bracket-spacing',
  '--arrow-parens always',
];

// Get staged files on git
const gitDiffCmd = `git diff --cached --name-only --diff-filter=ACMR "*.js" "*.jsx" "*.ts" "*.tsx" "*.css"`;
function getStagedFiles() {
  return execSync(gitDiffCmd)
    .toString()
    .split(os.EOL)
    .join(' ');
};

const targetFiles = process.argv.includes('--all')
  ? '"**/*.{ts,tsx,js,jsx,css}"'
  : getStagedFiles();

// Exit if no targetFiles
if (!targetFiles) {
  process.exit(0);
}

// Run prettier on the staged files
execSync(`prettier ${rules.join(' ')} --write ${targetFiles}`);

// Add files back to the commit after running prettier
if (!process.argv.includes('--all')) {
  execSync(`git add ${getStagedFiles()}`);
}

console.log(`\n${chalk.cyan('✓')} Prettier finished\n`);
