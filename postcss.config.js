// eslint-disable-next-line no-undef
module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    // PostCSS Preset Env, which allows you easily to use all the features in cssdb.
    // See what features in which stage in https://preset-env.cssdb.org/features
    // https://github.com/csstools/postcss-preset-env
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    'postcss-custom-properties': {},
    // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
    // https://github.com/postcss/postcss-custom-media
    'postcss-custom-media': {
      "importFrom": "src/pages/styles/media.module.css"
    },
    // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
    // https://github.com/postcss/postcss-custom-selectors
    'postcss-custom-selectors': {},
    // Allows you to nest one style rule inside another
    // https://github.com/jonathantneal/postcss-nesting
    'postcss-nesting': {},
    // Unwraps nested rules like how Sass does it
    // https://github.com/postcss/postcss-nested
    'postcss-nested': {},
  },
};