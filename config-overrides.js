module.exports = function override(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "path": require.resolve("path-browserify"),
    };
    return config;
  };

module.exports = function override(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "os": require.resolve("os-browserify/browser"),
    };
    return config;
  };
  