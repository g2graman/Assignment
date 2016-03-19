'use strict';

const webpack = require('webpack');
const express = require('express');

require('express-resource');

const app = express();

const conf = require('../webpack.dev.config');
const compiler = webpack(conf);

app.use(
  require('webpack-dev-middleware')(compiler, {
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
require('./db')(app);

app.listen(8001, '0.0.0.0', () => {
  console.log('Listening on port 8001');
});
