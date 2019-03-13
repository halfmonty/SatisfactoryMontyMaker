const path = require('path');
var pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
var phaser = path.join(pathToPhaser, 'dist/phaser.js');

module.exports = {
  entry: './src/app.ts',
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: '/node_modules/'},
      { test: /phaser\.js$/, loader: 'expose-loader?Phaser' }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ],
    alias: {
      phaser: phaser
    }
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    publicPath: '/dist/',
    host: '127.0.0.1',
    port: 8080,
    open: true
  }
};