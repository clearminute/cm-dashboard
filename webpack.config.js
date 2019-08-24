const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const isDebug = process.env.NODE_ENV !== 'production';

console.log('NODE_ENV...', process.env.NODE_ENV);
console.log('Debug mode: ' + isDebug);

module.exports = {
  name: 'clearminute app',
  target: 'web',
  entry: {
    browser: ['babel-polyfill', './src/client.jsx'],
  },
  output: {
    path: path.resolve(__dirname + '/build'),
    publicPath: isDebug ? '/' : '/',
    filename: 'react.bundle.[hash].js',
    chunkFilename: '[id].[hash].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      clearminute: `${__dirname}/src`,
    },
  },
  mode: isDebug ? 'development' : 'production',
  module: {
    rules: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src')],
        // TODO: Move those options in .babelrc
        options: {
          cacheDirectory: isDebug,
          babelrc: false,
          presets: [
            [
              'env',
              {
                targets: {
                  browsers: ['last 2 versions'],
                },
                modules: false,
              },
            ],
            'react',
            ...(isDebug ? [] : ['react-optimize']),
          ],
          plugins: [
            ['transform-object-rest-spread']
          ],
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.scss$/,
        include: [path.normalize(`${__dirname}/src/styles/clearminute.scss`)],
        use: [{
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
      },
    ],
  },
  bail: !isDebug,
  cache: isDebug,
  stats: {
    colors: true,
    reasons: isDebug,
    timings: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ENV_TYPE': JSON.stringify(process.env.ENV_TYPE),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'development',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: 'body',
      chunks: ['browser'],
    }),
  ],
  devtool: isDebug ? 'cheap-module-source-map' : false,
};
