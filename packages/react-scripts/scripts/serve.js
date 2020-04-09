'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const express = require('express');
const path = require('path');
const paths = require('../config/paths');
const chalk = require('react-dev-utils/chalk');
const app = express();

app.use(express.static(paths.appBuild));

app.get('/*', function(req, res) {
  res.sendFile(path.join(paths.appBuild, 'index.html'));
});

const port = process.env.PORT || 9000;

app.listen(port);

console.log(`Server started! ${chalk.cyan('✓')}`);
console.log(`→ app listening at port: ${chalk.cyan(port)}`);
console.log('Press CTRL-C to stop');
