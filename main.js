
const puppeteer = require("puppeteer");
const fs = require('fs');
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36';
async function isPwned(email) {
  let browser;
  try {
    browser = await puppeteer.launch();
    const url = `https://haveibeenpwned.com/unifiedsearch/${email}`;
    const [page] = await browser.pages();
    await page.setUserAgent(userAgent);
    const response = await page.goto(url);
    console.log(await response.text());
    const { Breaches } = await response.json();
    console.log(Breaches)
    return Breaches;
  } catch(error) {
    console.log(error);
    return [];
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

inPwned(email);
