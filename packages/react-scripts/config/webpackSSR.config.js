'use strict';

const paths = require('./paths');
const configFactory = require('../config/webpack.config');

const ManifestPlugin = require('webpack-manifest-plugin');

const defaultProductionWebpackConfig = configFactory('production');

const serverWebpackConfig = {
  target: 'node',
  entry: [paths.appSrcServer],
  output: {
    filename: 'server/[name].[contenthash:8].js',
    chunkFilename: 'server/[name].[contenthash:8].chunk.js',
    path: paths.appBuild,
    publicPath: paths.publicUrlOrPath,
  },
  externals: {
    express: 'commonjs express',
  },
  plugins: [
    new ManifestPlugin({
      fileName: 'server-manifest.json',
      publicPath: paths.publicUrlOrPath,
    }),
  ],
};

module.exports = Object.assign(
  defaultProductionWebpackConfig,
  serverWebpackConfig
);
