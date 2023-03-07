const webpack = require("webpack");

module.exports = {
  appUrl: "/application-services/streams",
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  /**
   * Change to false after your app is registered in configuration files
   */
  interceptChromeConfig: false,
  /**
   * Add additional webpack plugins
   */
  plugins: [
    new webpack.EnvironmentPlugin({
      API_URL: process.env.API_URL || "",
    }),
  ],
  _unstableHotReload: process.env.HOT === "true",
  sassPrefix: ".rhosakUi",
  // localChrome:
  //   "/Users/riccardoforina/Code/bf2fc6cc711aee1a0c2a/insights-chrome/build",
  routes: {
    "/config": {
      host: "http://localhost:8889",
    },
    "/beta/config": {
      host: "http://localhost:8889",
    },
  },
  moduleFederation: {
    shared: [
      {
        "react-router-dom": {
          singleton: false,
          requiredVersion: "5.3.4",
        },
        history: {
          singleton: false,
          requiredVersion: "4.10.1",
        },
        "@rhoas/app-services-ui-shared": {
          singleton: true,
          requiredVersion: "*",
        },
        "react-i18next": {
          singleton: true,
          requiredVersion: "*",
        },
      },
    ],
  },
};
