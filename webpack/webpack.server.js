/* eslint-disable @typescript-eslint/no-var-requires */
const NodemonPlugin = require('nodemon-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const appPath = require('../utils/path');
const { resolveRelativeAppRoot } = require('../utils/resolvePath');

const DEV_MODE = process.env.MODE_ENV === 'development';

module.exports = {
  context: appPath.root,
  entry: {
    server: appPath.serverAppTs,
  },
  output: {
    path: appPath.serverDist,
    clean: true,
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.js'],
  },
  target: 'node',
  devtool: 'source-map',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /.ts/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  performance: {
    hints: DEV_MODE ? false : 'warning',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name(module, chunks, cacheGroupKey) {
            return cacheGroupKey;
          },
        },
      },
    },
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: DEV_MODE,
      formatter: 'basic',
      eslint: {
        files: resolveRelativeAppRoot('src/**/*.{ts,tsx}'),
      },
    }),
    DEV_MODE &&
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: false,
      }),
    new NodemonPlugin({
      watch: appPath.dist,
    }),
  ].filter(Boolean),
};
