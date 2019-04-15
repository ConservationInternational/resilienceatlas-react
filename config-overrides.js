const path = require('path');

module.exports = {
  webpack(config, env) {
    // Aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@modules': path.resolve(__dirname, 'src/state/modules/'),
      '@components': path.resolve(__dirname, 'src/views/components/'),
      '@shared': path.resolve(__dirname, 'src/views/shared'),
      '@utilities': path.resolve(__dirname, 'src/utilities/'),
    };

    return config;
  },
};
