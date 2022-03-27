'use strict';

const path = require('path');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  scripts: path.resolve(__dirname, '../src/scripts'),
  styles: path.resolve(__dirname, '../src/style'),
  build: path.resolve(__dirname, '../build'),
};

module.exports = PATHS;
