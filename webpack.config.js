'use strict';
require('babel-polyfill');

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
var nodeExternals = require('webpack-node-externals');

function globEntries(globPath) {
  var files = glob.sync(globPath);
  var entries = {};

  for (var i = 0; i < files.length; i++) {
    var entry = files[i];
    console.log(entry)
    entries[path.basename(entry, path.extname(entry))] = './' + entry;
  }

  return entries;
}

module.exports = {
  entry: globEntries('./src/**/*.js'),
  target: 'node',
  devtool: 'source-map',
  externals: [nodeExternals()],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: __dirname,
      exclude: /node_modules/,
    }]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, './dist/'),
    filename: '[name].js'
  }
};
