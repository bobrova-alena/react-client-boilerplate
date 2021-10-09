/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const styledComponentsTransformer = require('typescript-plugin-styled-components').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const appPath = require('../utils/path');
const resolveRelativeAppRoot = require('../utils/resolvePath').resolveRelativeAppRoot;

const DEV_MODE = process.env.MODE_ENV === 'development';

module.exports = {
  context: appPath.root,
  entry: {
    mobileApp: appPath.mobileAppTsx,
    webApp: appPath.webAppTsx,
  },
  output: {
    path: appPath.clientDist,
    clean: true,
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.tsx', '.js'],
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
  target: 'web',
  performance: {
    hints: DEV_MODE ? false : 'warning',
  },
  devtool: DEV_MODE ? 'inline-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  styledComponentsTransformer({
                    getDisplayName: (filePath, componentName) =>
                      `${path.parse(filePath).name}_${componentName}`,
                  }),
                ],
              }),
            },
          },
          'stylelint-custom-processor-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|svg|ttf)$/i,
        loader: 'file-loader',
      },
    ],
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
    new HtmlWebpackPlugin({
      template: appPath.htmlTemplate,
      chunks: ['vendor', 'mobileApp'],
      filename: 'mobile.html',
    }),
    new HtmlWebpackPlugin({
      template: appPath.htmlTemplate,
      chunks: ['vendor', 'webApp'],
      filename: 'web.html',
    }),
  ].filter(Boolean),
};
