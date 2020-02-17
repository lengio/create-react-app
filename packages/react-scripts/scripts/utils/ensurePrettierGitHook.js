'use strict';

const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const chalk = require('react-dev-utils/chalk');
const paths = require('../../config/paths');
const isInGitRepository = require('./isInGitRepository');

const GIT_HOOKS_PATH = path.join('.git', 'hooks');

module.exports = () => {
  // Exit if not in git repository
  if (!isInGitRepository()) {
    process.exit(0);
  }

  const gitHooksDir = path.join(paths.appPath, GIT_HOOKS_PATH);
  const preCommitHookPath = path.join(gitHooksDir, 'pre-commit.sh');
  const cmd = 'exec yarn react-scripts prettier';

  // Make sure the pre-commit file exist before reading/writing
  // from it (this will create the file if it doesn't exist)
  fs.ensureFileSync(preCommitHookPath);

  const content = fs.readFileSync(preCommitHookPath, 'utf8');

  // Exit if cmd already exits in pre-commit
  if (content.match(new RegExp(cmd))) {
    console.log(`Prettier hook exist in ${chalk.cyan(preCommitHookPath)}`);
    process.exit(0);
  }

  fs.writeFileSync(preCommitHookPath, content + os.EOL + cmd + os.EOL);
  console.log(`Prettier hook added to ${chalk.cyan(preCommitHookPath)}`);
};
