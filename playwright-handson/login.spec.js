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
  const expectedURL = process.env["EXPECTED_URL"]

  const browser = await chromium.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  await page.goto(loginURL);

  await page.fill("#input-email", loginEmail);
  await page.fill("#input-password", loginPassword);
  await page.click("#login-button");

  expect(await page.isVisible('.header__Items >> text="ダッシュボード"')).toBeTruthy()

  await page.click('.header__Items > :nth-child(1) > .material-icons')
  await page.click('#global-menu-bigdata > .menu2__item > .menu2__item--text > .main')

  expect(await page.isVisible('.header__Items >> text="フローデザイナー"')).toBeTruthy()

  expect(await page.isVisible('.boardList2__name > a.linkTo')).toBeTruthy()
  const href = await page.$eval(".boardList2__name > a.linkTo", el => el.href)
  expect(href).toEqual(expectedURL)

  await page.waitForTimeout(10 * 1000);

  await browser.close();
});
