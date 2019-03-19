const path = require('path');
const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  webpack(config, env) {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        // 'style-loader',
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: require.resolve('sass-loader'),
          options: {
            importer: globImporter(),
            data: '@import "mixins", "variables";',
            includePaths: [path.resolve(__dirname, 'src/views/styles')],
          },
        },
      ],
      // include: path.join(__dirname, 'src/views/styles'),
    });

    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
    );

    return config;
  },
};
