module.exports = {
    entry: ['babel-polyfill', './client/index.js'],
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    context: __dirname,
    devtool: 'source-map',
    module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          }
        ]
      }
  }