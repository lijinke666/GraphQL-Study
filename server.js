//使用babel-node 启动 server.js  即可使用 import 语法
import express from 'express';
import graphQLHTTP from 'express-graphql';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {schema} from './data/schema';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

// Expose a GraphQL endpoint
const server = express();
server.use('/', graphQLHTTP({schema, pretty: true}));
server.listen(GRAPHQL_PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
));

// Serve the Relay app
const compiler = webpack({
  entry: path.resolve(__dirname,"src",'app.js'),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js$/,
      },
    ],
  },
  output: {filename: 'app.js', path: '/'},
});

const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/graphql': `http://localhost:${GRAPHQL_PORT}`},           //graphql可视化开发界面代理
  publicPath: '/js/',
  stats: {colors: true},
});
// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});