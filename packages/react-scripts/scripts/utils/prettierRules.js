'use strict';

const API_RULES = {
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
  bracketSpacing: false,
};

const CLI_RULES = [
  `--print-width ${API_RULES.printWidth}`,
  `--trailing-comma ${API_RULES.trailingComma}`,
  ...(API_RULES.singleQuote && ['--single-quote']),
  ...(!API_RULES.bracketSpacing && ['--no-bracket-spacing']),
];

module.exports = { API_RULES, CLI_RULES };
