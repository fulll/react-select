const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  
  entry: './src/lib/index.js',

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  output: {
    filename: 'react-select.min.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    library: 'reactSelect',
    libraryTarget: 'umd'
  },
  
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: resolve(__dirname, './src'),
        use: 'babel-loader',
      },
    ],
  },
  
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  
  externals: [
    'react',
    'react-dom',
    'styled-components'
  ]
}