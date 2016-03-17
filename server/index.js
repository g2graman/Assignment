'use strict';

const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const path = require('path');
const express = require('express');
const app = express();

const conf = require('../webpack.dev.config');
const compiler = webpack(conf);

app.use(
  devMiddleware(compiler, {
    noInfo: true,
    publicPath: conf.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })
);

app.use(require('webpack-hot-middleware')(compiler));

require('./routes')(app);
require('./db');

app.listen(8001, '0.0.0.0', () => {
  console.log('Listening on port 8001');
});
