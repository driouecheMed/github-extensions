const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './src/entry.ts',
  mode: 'development', // Change to 'production' for production builds
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
          compress: true,
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',    // Use gzip compression
      test: /\.js$|\.ts$/,  // Compress JavaScript and TypeScript files
      threshold: 10240,     // Only compress files larger than 10KB
    }),
  ],
};
