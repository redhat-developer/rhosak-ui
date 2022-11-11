module.exports = {
  appUrl: "/application-services",
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
  plugins: [],
  _unstableHotReload: process.env.HOT === "true",
  resolve: {
    fallback: {
      http: false,
      https: false,
      "follow-redirects/http": "http",
      "follow-redirects/https": "https",
    },
  },
};
