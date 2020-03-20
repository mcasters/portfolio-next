/* eslint-disable no-undef */
require('dotenv').config();

module.exports = {
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
  serverRuntimeConfig: {
    // API Gateway
    // API URL to be used in the server-side code
    serverUrl:
      process.env.API_SERVER_URL ||
      `http://localhost:${process.env.PORT || 3000}`,
  },

  // Available on both server and client
  publicRuntimeConfig: {
    // API Gateway
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    apiUrl:
      process.env.API_SERVER_URL ||
      `http://localhost:${process.env.PORT || 3000}/api/graphql`,

    ls_key: 'admin',
    ls_value: 'key',
    staticFolder: '/static',
  },

  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time

    // Database
    DATABASE_NAME: 'develop',
    DATABASE_USERNAME: 'root',
    DATABASE_PASSWORD: 'root',
    DATABASE_HOST: 'localhost',
    DATABASE_URL: 'mysql:database.mysql',

    // Library
    PHOTOS_PATH: './../../photo-files',

    // Authentication
    JWT_SECRET: 'secret' || '15htDn-7uU-620Ghhwz',

  },
};
