const { chromium } = require('playwright');


(async () => {
  const loginURL = process.env["LOGIN_URL"]
  const loginEmail = process.env["LOGIN_EMAIL"]
  const loginPassword = process.env['LOGIN_PASSWORD']

  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.goto(loginURL);

  await page.fill("#input-email", loginEmail);
  await page.fill("#input-password", loginPassword);
  await page.click("#login-button");

  await page.waitForTimeout(30 * 1000);

  await browser.close();
})();
