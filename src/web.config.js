module.exports = {
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify"),
      },
    },
  };
  
module.exports = {
    resolve: {
        fallback: {
            "os": require.resolve("os-browserify/browser"),
        },
    },
};
  