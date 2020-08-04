/* eslint-disable no-undef */
const withOffline = require('next-offline');

module.exports = withOffline({
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }
    return config;
  },
  // Only be available on the server side
  serverRuntimeConfig: {},

  // Available on both server and client
  publicRuntimeConfig: {
    ls_key: 'admin',
    ls_value: 'key',
  },
});
