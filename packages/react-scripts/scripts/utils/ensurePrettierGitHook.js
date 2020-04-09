'use strict';

const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const chalk = require('react-dev-utils/chalk');
const paths = require('../../config/paths');
const isInGitRepository = require('./isInGitRepository');

const GIT_HOOKS_PATH = path.join('.git', 'hooks');

module.exports = () => {
  // Return if not in git repository
  if (!isInGitRepository()) {
    return;
  }

  const gitHooksDir = path.join(paths.appPath, GIT_HOOKS_PATH);
  const preCommitHookPath = path.join(gitHooksDir, 'pre-commit');
  const cmd = 'exec yarn react-scripts prettier';

  console.log('Trying to add prettier pre-commit hook...');

  // Make sure the pre-commit file exist before reading/writing
  // from it (this will create the file if it doesn't exist)
  fs.ensureFileSync(preCommitHookPath);

  const content = fs.readFileSync(preCommitHookPath, 'utf8');

  // Return if cmd already exits in pre-commit
  if (content.match(new RegExp(cmd))) {
    console.log(
      `Prettier hook already exist in ${chalk.cyan(preCommitHookPath)}`
    );
    return;
  }

  fs.writeFileSync(preCommitHookPath, content + os.EOL + cmd + os.EOL);
  fs.chmodSync(preCommitHookPath, '755');

  console.log(`Prettier hook added to ${chalk.cyan(preCommitHookPath)}`);
};
