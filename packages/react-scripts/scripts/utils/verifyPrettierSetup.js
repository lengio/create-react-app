'use strict';

const chalk = require('react-dev-utils/chalk');
const fs = require('fs-extra');
const path = require('path');
const paths = require('../../config/paths');
const os = require('os');
const rules = require('./prettierRules');

function verifyPrettierSetup() {
  const prettierConfigPath = path.join(paths.appPath, '.prettierrc.json');

  // Make sure the prettierrc file exist before reading/writing
  // from it (this will create the file if it doesn't exist)
  fs.ensureFileSync(prettierConfigPath);

  const config = fs.readFileSync(prettierConfigPath, 'utf8');

  if (config.match(new RegExp(rules.API_RULES))) {
    console.log(`prettierrc file found in ${chalk.cyan(prettierConfigPath)}`);
    return;
  }

  fs.writeFileSync(
    prettierConfigPath,
    JSON.stringify(rules.API_RULES, null, 2) + os.EOL
  );
  fs.chmodSync(prettierConfigPath, '755');

  console.log(`Prettier hook added to ${chalk.cyan(prettierConfigPath)}`);
}

module.exports = verifyPrettierSetup;
