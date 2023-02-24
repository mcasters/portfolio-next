const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    // Available on both server and client
    publicRuntimeConfig: {
      ls_key: 'admin',
      ls_value: 'key',
    },
  };

  return withBundleAnalyzer(nextConfig);
};
