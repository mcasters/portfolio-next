/* eslint-disable no-undef */
const dotEnvResult = require('dotenv').config();
const withImage = require('next-images');

if (dotEnvResult.error) {
  throw dotEnvResult.error;
}

module.exports = withImage({
  // Only be available on the server side
  serverRuntimeConfig: {},

  // Available on both server and client
  publicRuntimeConfig: {
    ls_key: 'admin',
    ls_value: 'key',
  },

  // Reference a variable that was defined in the .env file and make it available at Build Time
  env: {
    BACKEND_URL: process.env.BACKEND_URL,

    // Database
    DATABASE_NAME: 'develop',
    DATABASE_USERNAME: 'root',
    DATABASE_PASSWORD: 'root',
    DATABASE_HOST: 'localhost',
    DATABASE_URL: 'mysql:database.mysql',

    // Library
    PHOTOS_PATH: process.env.PHOTOS_PATH,

    // Authentication
    JWT_SECRET: 'secret' || '15htDn-7uU-620Ghhwz',
  },

  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }
    return config;
  },
});
