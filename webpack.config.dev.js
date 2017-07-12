const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/example/index.js',

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devServer: {
    hot: true,
    contentBase: resolve(__dirname),
    publicPath: '/'
  },
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: resolve(__dirname, './src'),
        use: 'babel-loader',
      },
    ],
  }
}