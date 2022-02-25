const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/app.ts',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
      // {
      //   test: /\.ts(x?)$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/
      // }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: false,
          test: /\.ts(\?.*)?$/i
        }
      })
    ]
  }
};
