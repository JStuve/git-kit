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