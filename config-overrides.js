// const path = require('path');
// const globImporter = require('node-sass-glob-importer');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// module.exports = {
//   webpack(config, env) {
//     // Loaders
//     config.module.rules.push({
//       test: /\.scss$/,
//       use: [
//         // 'style-loader',
//         {
//           loader: MiniCssExtractPlugin.loader,
//           options: {
//             publicPath: process.env.PUBLIC_URL,
//           },
//         },
//         'css-loader',
//         {
//           loader: require.resolve('sass-loader'),
//           options: {
//             importer: globImporter(),
//             data: '@import "mixins", "variables";',
//             includePaths: [
//               path.resolve(__dirname, 'node_modules'),
//               path.resolve(__dirname, 'src/views/styles'),
//             ],
//           },
//         },
//       ],
//       // include: path.join(__dirname, 'src/views/styles'),
//     });

//     // Plugins
//     config.plugins.push(
//       new MiniCssExtractPlugin({
//         filename: '[name].css',
//         chunkFilename: '[id].css',
//       }),
//     );

//     // Aliases
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       '@modules': path.resolve(__dirname, 'src/state/modules/'),
//       '@components': path.resolve(__dirname, 'src/views/components/'),
//       '@utilities': path.resolve(__dirname, 'src/utilities/'),
//     };

//     return config;
//   },
// };
