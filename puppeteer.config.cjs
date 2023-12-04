const {join} = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};

module.exports = {
    launch: {
      headless: process.env.CI === "true",
      ignoreDefaultArgs: ["--disable-extensions"],
      args: ["--no-sandbox"],
      executablePath: "chrome.exe"
    }
  };

  module.exports = {
    launch: {},
    server: {
      command: "npm run serve",
      port: 9000,
      launchTimeout: 180000
    }
  };

  module.exports = {
    preset: "jest-puppeteer"
    // The rest of your file...
  };