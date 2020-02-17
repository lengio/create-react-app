'use strict';

const fs = require('fs-extra');
const chalk = require('react-dev-utils/chalk');
const path = require('path');
const paths = require('../../config/paths');
const isInGitRepository = require('./isInGitRepository');

const GIT_HOOKS_PATH = path.join('.git', 'hooks');

module.exports = () => {
  const prettierHookDir = path.join(paths.appPath, GIT_HOOKS_PATH);
  const prettierHookFileDir = path.join(prettierHookDir, 'prettier.sh');

  // exit if not in git repository
  if (!isInGitRepository()) {
    process.exit(0);
  }
  // exit if the hook is already created
  if (fs.existsSync(prettierHookDir) && fs.existsSync(prettierHookFileDir)) {
    console.log(`Prettier hook exist in ${chalk.cyan(prettierHookFileDir)}`);
    process.exit(0);
  }

  fs.ensureFileSync(prettierHookFileDir);
  fs.writeFileSync(prettierHookFileDir, 'TODO: get content from husky hooks');
  console.log(`Prettier hook added to ${chalk.cyan(prettierHookFileDir)}`);
};
