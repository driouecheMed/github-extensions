const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const config = {
    entry: {
      defaultPopup: './src/index.ts',
      serviceWorker: './src/serviceWorker.ts',
      contentScript: './src/contentScript.ts',
    },
    mode: isProduction ? 'development' : 'production',
    devtool: 'source-map',
    output: {
      filename: '[name].bundle.js',
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
    }
  }

  if (isProduction) {
    config.optimization = {
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
    };
    config.plugins = [
      new CompressionPlugin({
        algorithm: 'gzip',    // Use gzip compression
        test: /\.js$|\.ts$/,  // Compress JavaScript and TypeScript files
        threshold: 10240,     // Only compress files larger than 10KB
      }),
    ];
  }
  return config;
};
