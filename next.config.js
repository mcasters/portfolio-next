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
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    TEST_VAR: process.env.TEST_VAR,
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'mysql:database.mysql',
  databaseName: process.env.DATABASE_NAME || 'develop',
  databaseUsername: process.env.DATABASE_USERNAME || 'root',
  databasePassword: process.env.DATABASE_PASSWORD || 'root',
  databaseHost: process.env.DATABASE_HOST || 'localhost',

  // Photos files
  libraryPath: `${process.env.PHOTOS_PATH}`,
  paintingsPath: `${process.env.PHOTOS_PATH}/paintings`,
  paintingsMDPath: `${process.env.PHOTOS_PATH}/paintings/md`,
  paintingsSMPath: `${process.env.PHOTOS_PATH}/paintings/sm`,
  sculpturesPath: `${process.env.PHOTOS_PATH}/sculptures`,
  sculpturesMDPath: `${process.env.PHOTOS_PATH}/sculptures/md`,
  sculpturesSMPath: `${process.env.PHOTOS_PATH}/sculptures/sm`,
  drawingsPath: `${process.env.PHOTOS_PATH}/drawings`,
  drawingsMDPath: `${process.env.PHOTOS_PATH}/drawings/md`,
  drawingsSMPath: `${process.env.PHOTOS_PATH}/drawings/sm`,
  miscellaneousPath: `${process.env.PHOTOS_PATH}/miscellaneous`,

  // Authentication
  auth: {
    jwt: {
      name: process.env.JWT_NAME || 'auth-token',
      secret: process.env.JWT_SECRET || '15htDn-7uU-620Ghhwz',
    },
  },
};
