import puppeteer, { Browser, Page } from 'puppeteer';
require('dotenv').config();

describe('index.html', () => {
  const EXTENSION_PATH = process.env.E2E_EXTENSION_PATH;
  const EXTENSION_ID = process.env.E2E_EXTENSION_ID;
  
  let browser: Browser | undefined;
  let githubUrl = 'https://github.com/JStuve/git-kit/issues';

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    devtools: false, 
    args: [
      `--load-extension=${EXTENSION_PATH}`,
      `--disable-extensions-except=${EXTENSION_PATH}`, 
    ],
  });
});

afterEach(async () => {
  if (browser) {
    await browser.close();
    browser = undefined;
  }
});

test('popup contains the correct text for non-github pages', async () => {
  if (!browser) throw new Error('Browser not initialized');
  const page = await browser.newPage();
  await page.goto(`chrome-extension://${EXTENSION_ID}/index.html`);
  const h3InnerHTML = await page.$eval('h3', (h3) => h3.innerHTML);
  await expect(h3InnerHTML).toMatch('This Github tab currently has no features.');
  const buttonInnerHTML = await page.$eval('button', (button) => button.innerHTML);
  await expect(buttonInnerHTML).toMatch('Request feature');
});

test('removes an element from a page when visible-container is clicked.', async () => {
  if (!browser) throw new Error('Browser not initialized');
  const page = await browser.newPage();
  await page.goto(`${githubUrl}`, { waitUntil: 'networkidle2' });
  const divIds = await page.$$eval('div', (divs) => divs.map((div) => div.id));
  const filteredIds = divIds.filter((id) => id.startsWith('issue'));
  const issueId = filteredIds[0].replace('issue_', '');
  await page.hover(`#issue_${issueId}`);
  const svgElement = await page.$(`#visible-container-${issueId}`);
  await svgElement?.click();
  await expect(page.waitForSelector(`#issue_${issueId}`, { hidden: true })).resolves.not.toThrow();
});
})