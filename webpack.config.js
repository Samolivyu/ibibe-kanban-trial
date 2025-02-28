const path = require('path');

module.exports = {
  mode: 'production', // or 'development' depending on your needs
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      // Babel loader for JavaScript/JSX files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // This tells Babel to infer whether a file is a module or not
            sourceType: 'unambiguous',
            // Using your internal organization preset instead of the public one, if available.
            presets: [require.resolve('@ibibe/internal-babel-preset-react-app')]
          }
        }
      },
      // Loader to handle source maps (optional but useful for debugging)
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  // Optional: devServer configuration if you run a local server
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../build')
    },
    compress: true,
    port: 3000,
    historyApiFallback: true
  }
};