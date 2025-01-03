const webpack = require('webpack');

module.exports = {
  webpack: (config) => {
    config.plugins.push(new webpack.ProvidePlugin({
      process: 'process/browser',
    }));
    return config;
  },
};
