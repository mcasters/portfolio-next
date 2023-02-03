/* eslint-disable no-undef */

module.exports = (phase, { defaultConfig }) => {
  return {
    /* config options here */
    // Only be available on the server side
    serverRuntimeConfig: {},

    // Available on both server and client
    publicRuntimeConfig: {
      ls_key: 'admin',
      ls_value: 'key',
    },
  };
};
