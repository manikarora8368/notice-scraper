const scaperObject = {
  url: "http://www.ipu.ac.in/career_plcmnt.php",
  async scraper(browser) {
    let page = await browser.newPage();
    await page.goto(this.url);
    await page.waitForSelector("table");
    let textContents = await page.$$eval(
      "table tbody:last-of-type tr",
      (el) => {
        el = el.map((el) => el.querySelector("td > a")?.textContent);
        el = el.filter((el) => el != null).slice(0, 5);
        return el;
      }
    );
    let urls = await page.$$eval("table tbody:last-of-type tr", (el) => {
      el = el.map((el) => el.querySelector("td > a")?.href);
      el = el.filter((el) => el != null).slice(0, 5);
      return el;
    });
    await page.close();
    let notices = textContents.map((text, i) => {
      return { text, url: urls[i] };
    });
    return notices;
  },
};

module.exports = scaperObject;
