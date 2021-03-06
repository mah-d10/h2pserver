const puppeteer = require("puppeteer");

exports.makePDF = (async () => {
  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto("https://varzesh3.com", {
      waitUntil: "networkidle2",
    });
    await page.pdf({
      path: "v3-a4-header.pdf",
      format: "a4",
      margin: { top: 20 },
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<span class="pageNumber"></span>',
    });
    // console.log("hello");
    await browser.close();
  } catch (e) {
    console.log(e);
  }
})();
