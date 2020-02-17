'use strict';
// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const execSync = require('child_process').execSync;
const ensurePrettierGitHook = require('./utils/ensurePrettierGitHook');

// Adds prettier to pre-commit hook in git repositories
ensurePrettierGitHook();

const rules = [
  '--print-width 100',
  '--tab-width 2',
  '--single-quote',
  '--trailing-comma es5',
  '--no-bracket-spacing',
  '--arrow-parens always',
];

// prettier scripts
const prettierCss = `prettier ${rules.join(' ')} --write "**/*.css"`;
const prettierJs = `prettier ${rules.join(
  ' '
)} --write "{*.json,**/*.{js,jsx}}"`;
const prettierTs = `prettier ${rules.join(' ')} --write "**/*.{ts,tsx}"`;

execSync(prettierCss + ' && ' + prettierJs + ' && ' + prettierTs);
