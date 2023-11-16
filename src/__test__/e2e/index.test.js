const puppeteer = require('puppeteer');

const EXTENSION_PATH = './build';
// will have to change this id before running your own.
const EXTENSION_ID = 'idijcefoknihpahlldefeedlmcnjeeoa';

let browser;
let githubUrl = "https://github.com/JStuve/git-kit/issues"

beforeEach(async () => {
    
    browser = await puppeteer.launch({
        headless: false,
        args: [
            `--disable-extensions-except=${EXTENSION_PATH}`,
            `--load-extension=${EXTENSION_PATH}`,
            
        ]
      });
});

afterEach(async () => {
    await browser.close();

    browser = undefined;
});

test('popup contains the correct text for non-github pages', async () => {
    const page = await browser.newPage();

    await page.goto(`chrome-extension://${EXTENSION_ID}/index.html`);

    const h3InnerHTML = await page.$eval('h3', (h3) => h3.innerHTML);

    await expect(h3InnerHTML).toMatch("This Github tab currently has no features.");


    const buttonInnerHTML = await page.$eval('button', (button) => button.innerHTML);

    await expect(buttonInnerHTML).toMatch("Request feature");

  });

// requires that the github url has at least 1 issue
  test("removes an element from a page when visible-container is clicked.", async () => {
    const page = await browser.newPage();

    await page.goto(`${githubUrl}`,{waitUntil: 'networkidle2'});

    const divIds = await page.$$eval('div', divs => divs.map(div => div.id));

    let filteredIds = await divIds.filter(id => id.startsWith('issue'));

    const issueId = await filteredIds[0].replace('issue_', '')
    
    await page.hover(`#issue_${issueId}`);

    const svgElement = await page.$(`#visible-container-${issueId}`);

    await svgElement.click();

    await expect(page.waitForSelector(`#issue_${issueId}`, { hidden: true })).resolves.not.toThrow();
});