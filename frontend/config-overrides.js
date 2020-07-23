const path = require("path");

module.exports = function override(config, env) {
  config["resolve"] = {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      scenes: path.resolve(__dirname, "src/scenes"),
      services: path.resolve(__dirname, "src/services"),
      store: path.resolve(__dirname, "src/services/store"),
      security: path.resolve(__dirname, "src/services/security"),
      routes: path.resolve(__dirname, "src/services/routes"),
      utils: path.resolve(__dirname, "src/utils"),
      assets: path.resolve(__dirname, "src/assets"),
    },
    extensions: [".js"],
  };
  return config;
};
