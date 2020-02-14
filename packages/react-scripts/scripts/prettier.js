// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const execSync = require('child_process').execSync;

// prettier scripts
const prettierCss = 'prettier --write "**/*.css"';
const prettierJs = 'prettier --write "{*.json,**/*.{js,jsx}}"';
const prettierTs = 'prettier --write "**/*.{ts,tsx}"';

execSync(prettierCss + ' && ' + prettierJs + ' && ' + prettierTs);
