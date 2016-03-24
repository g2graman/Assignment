'use strict';

const webpack = require('webpack');
const express = require('express');

require('express-resource');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

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

server.listen(3000, '0.0.0.0', () => {
  console.log('Listening on port 3000');

  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
});
