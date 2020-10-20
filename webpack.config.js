const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
    //     // { from: './src/css', to: './css' },
        { from: './src/js/', to: './' },
    //     // { from: './fonts/', to: './fonts' },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'ThreeJS',
      template: 'src/index.html'
    }),
  ],
  resolve: {
    extensions: ['.js', '.css'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    moduleIds: 'hashed',
    minimize: false,
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    // minimizer: [new TerserPlugin({
    //   // include: /\.js/,
    // })],
  },

};