const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './app/initialize.js',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'app.js'
  },
  resolve: {
    extensions: [ '', '.js', '.css' ]
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?modules=true'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: [ 'es2015', 'react', 'stage-1' ]
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        {
          from: /^.*$/,
          to: function() {
            return 'index.html';
          }
        }
      ]
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    })
  ]
};
