const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Сinema tests", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test("Бронь на Унесенные ветром на сегодня", async () => {
    await clickElement(page, "nav > a:nth-child(1)");
    await clickElement(page, "body > main > section:nth-child(3) > div.movie-seances__hall > ul > li:nth-child(1) > a");
    await page.waitForSelector("div.buying-scheme");
    const place = ".buying-scheme__wrapper > :nth-child(4) > :nth-child(6)";
    await clickElement(page, place);
    await clickElement(page, "button.acceptin-button");
    await page.waitForSelector("h2");
    let filmTitle = await getText(page, `body > main > section > div > p:nth-child(1)`);
    expect(filmTitle).toEqual("На фильм: Унесенные ветром.");    
    }, 60000);

  test("Бронь 3-х мест на Унесенные ветром на завтра", async () => {
    await clickElement(page, "nav > a:nth-child(2)");
    await clickElement(page, "body > main > section:nth-child(3) > div:nth-child(3) > ul > li > a");
    await page.waitForSelector("div.buying-scheme");
    const place1 = ".buying-scheme__wrapper > :nth-child(4) > :nth-child(4)";
    await clickElement(page, place1);
    const place2 = ".buying-scheme__wrapper > :nth-child(4) > :nth-child(5)";
    await clickElement(page, place2);
    const place3 = ".buying-scheme__wrapper > :nth-child(4) > :nth-child(6)";
    await clickElement(page, place3);
    await clickElement(page, "button.acceptin-button");
    await page.waitForSelector("h2");
    let filmTitle = await getText(page, `body > main > section > div > p:nth-child(1)`);
    expect(filmTitle).toEqual("На фильм: Унесенные ветром.");
    let placeNumber = await getText(page, `body > main > section > div > p:nth-child(2) > span`);
    expect(placeNumber).toEqual("4/4, 4/5, 4/6");
    }, 60000);

  test("Попытка купить занятые места на Микки маус на завтра", async () => {
    await clickElement(page, "nav > a:nth-child(2)");
    await clickElement(page, "body > main > section:nth-child(2) > div.movie-seances__hall > ul > li:nth-child(1) > a");
    await page.waitForSelector("div.buying-scheme");
    const place = ".buying-scheme__wrapper > :nth-child(5) > :nth-child(5)";
    await clickElement(page, place);
    await clickElement(page, "button.acceptin-button");
    const stateOfButton = await page.$eval('button', (button) => {
      return button.disabled;
    });
    expect(stateOfButton).toEqual(true);
  }, 60000);
});
