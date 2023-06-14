import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout
//jest.useFakeTimers('legacy');
//jest.useRealTimers();

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:8888';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false,
      // slowMo: 50,
      // devtools: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('Should valid card number', async () => {
    await page.goto(baseUrl);

    const form = await page.$('.form-card');
    const input = await form.$('.form-card__input');
    const button = await form.$('.form-card__btn');

    await input.type('4916838661195196');
    await button.click();

    await page.waitForSelector('.valid');
  });

  test('Should invalid card number', async () => {
    await page.goto(baseUrl);

    const form = await page.$('.form-card');
    const input = await form.$('.form-card__input');
    const button = await form.$('.form-card__btn');

    await input.type('49168386611951962');
    await button.click();

    await page.waitForSelector('.inValid');
  });
});
