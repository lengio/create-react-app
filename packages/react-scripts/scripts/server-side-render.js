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

const fs = require('fs-extra');
const path = require('path');
const paths = require('../config/paths');
const chalk = require('react-dev-utils/chalk');

// Exit process if no server file found on the build
if (!fs.pathExistsSync(paths.appSrcServer)) {
  console.log(`No server file was found in ${chalk.cyan(paths.appSrcServer)}`);
  console.log(chalk.red('Process will be terminated ✗'));
  process.exit(1);
}

const compression = require('compression');
const cookieParse = require('cookie-parser');
const morgan = require('morgan');
const express = require('express');
const sslRedirect = require('heroku-ssl-redirect');
const mobxReact = require('mobx-react'); // TODO: move this to the app
const proxy = require('http-proxy-middleware');
const minimist = require('minimist');
const httpProxy = require('./utils/httpProxy');

const app = express();
// Decreases the downloadable amount of data that’s served to users.
// Improve the performance of our applications as our payload size is reduced drastically.
app.use(compression());
// Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(cookieParse());
// HTTP request logger middleware
app.user(morgan('dev'));
// Redirect users to the SSL version of the app
app.use(sslRedirect());
// HACK: This is a temporary proxy used for client-side image exports which require that all
// assets be from the same origin:
app.use(httpProxy.s3.route, proxy(httpProxy.s3.config));
app.use(httpProxy.cdn.route, proxy(httpProxy.cdn.config));

app.use('/build', express.static(paths.appBuild));
app.use('/static', express.static(path.join(paths.appBuild, 'static')));

app.set('views', paths.appBuild);

app.disable('etag');

// When using server side rendering, normal lifecycle hooks of React components are not fired,
// as the components are rendered only once. Since components are never unmounted, observer
// components would in this case leak memory when being rendered server side.
// To avoid leaking memory, call useStaticRendering(true) when using server side rendering.
mobxReact.useStaticRendering(true);

const argv = minimist(process.argv.slice(2));
const host = argv.host || process.env.HOST || undefined;
const port = argv.port || process.env.PORT || 3000;

const htmlTemplate = require(path.join(paths.appBuild, 'index.html'));
const assetManifest = require(path.join(paths.appBuild, 'asset-manifest.json'));
const serverManifest = require(path.join(
  paths.appBuild,
  'server-manifest.json'
));

app.get('*', async (request, response) => {
  const render = require(paths.join(paths.appBuild), serverManifest['main.js']);
});

async function initialize() {
  app.listen(port, host, error => {
    if (error) {
      console.log(chalk.red('Error! ✗'));
      return;
    }

    const url = `http://${host || 'localhost'}:${port}`;

    console.log(`Server started! ${chalk.cyan('✓')}`);
    console.log(`→ ${chalk.cyan(url)}`);
    console.log('Press CTRL-C to stop');
  });
}

initialize();
