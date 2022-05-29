const express = require("express");
const app = express();
const port = 8000;
const browserObject = require("./browser");
const pageScraper = require("./pageScraper");
let browserInstance = browserObject.startBrowser();

let scrapeAll = async (browserInstance) => {
  let browser;
  try {
    browser = await browserInstance;
    let notices = await pageScraper.scraper(browser);
    return notices;
  } catch (err) {
    console.log("could not resolve the browser instance!", err);
  }
};
app.get("/notices", async (req, res) => {
  let notices = await scrapeAll(browserInstance);
  return res.json(notices);
});
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
