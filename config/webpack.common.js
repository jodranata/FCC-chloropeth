const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/index.js'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
