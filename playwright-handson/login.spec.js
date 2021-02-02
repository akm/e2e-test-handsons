const { chromium } = require('playwright');
const expect = require('expect');

let browser;
let page;

beforeAll(async () => {
  browser = await chromium.launch({ headless: false, slowMo: 50 });
});
afterAll(async () => {
  await browser.close();
});
beforeEach(async () => {
  page = await browser.newPage();
});
afterEach(async () => {
  await page.close();
});

it('can login', async () => {
  const loginURL = process.env["LOGIN_URL"]
  const loginEmail = process.env["LOGIN_EMAIL"]
  const loginPassword = process.env['LOGIN_PASSWORD']

  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.goto(loginURL);

  await page.fill("#input-email", loginEmail);
  await page.fill("#input-password", loginPassword);
  await page.click("#login-button");

  expect(await page.isVisible('.header__Items >> text="ダッシュボード"')).toBeTruthy()

  await page.waitForTimeout(10 * 1000);

  await browser.close();
});
