const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
    entry: '/client/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      proxy: {
        '/': 'http://localhost:3000',
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: '/client/index.html',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/i,
          exclude: /(node_modules)/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.png|svg|jpg|gif$/,
          use: ['file-loader'],
        },
      ],
    },  
};