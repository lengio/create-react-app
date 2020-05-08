'use strict';

const API_RULES = {
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: false,
  arrowParens: 'always',
};

const CLI_RULES = [
  `--print-width ${API_RULES.printWidth}`,
  `--tab-width ${API_RULES.tabWidth}`,
  `--trailing-comma ${API_RULES.trailingComma}`,
  `--arrow-parens ${API_RULES.arrowParens}`,
  ...(API_RULES.singleQuote && ['--single-quote']),
  ...(!API_RULES.bracketSpacing && ['--no-bracket-spacing']),
];

module.exports = { API_RULES, CLI_RULES };
