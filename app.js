import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import Chalk from 'chalk';
import opn from 'opn';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

const port = process.env.PORT || 8000;
const app = express();

app.use(favicon(path.resolve(__dirname, 'favicon.ico')));

// links express with webpack middleware
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

// File server
app.use(express.static('dist'));

// Routes
app.get('/', function(req, res){
  res.sendFile('index.html', {root: path.resolve(__dirname, 'dist')});
});

app.listen(port, function(err){
  console.log(Chalk.green('Server created on port: ') + Chalk.red(port));
});

// Opens the url in the default browser
opn(`http://localhost:${port}/`);
