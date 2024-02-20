const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { getText, clickElement } = require("../../lib/commands.js");

let browser;
let page;
let place;
let place1;
let place2;
let place3;

Before(async function () {
  browser = await puppeteer.launch({ 
    headless: false, 
    defaultViewport: null, 
    args: ["--start-maximized"],
});
  page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("пользователь на странице {string}", async function (url) {
  try {
    await this.page.goto(url, { setTimeout: 50000 });
  } catch (error) {
    throw new Error(`Failed to navigate to ${url} with error: ${error}`);
  }
});

When("переходит на расписание на сегодня", async function () {
  return await clickElement(this.page, "nav > a:nth-child(1)");
});

When("выбирает время сеанса на Унесенные ветром. на 17-00", async function () {
  return await clickElement(this.page, "body > main > section:nth-child(3) > div.movie-seances__hall > ul > li:nth-child(1) > a");
});

When("выбирает место в зале кинотеатра 4 ряд 6 место", async function () {
  await this.page.waitForSelector("div.buying-scheme");
  place = ".buying-scheme__wrapper > :nth-child(4) > :nth-child(6)";
  await clickElement(this.page, place);
  await clickElement(this.page, "button.acceptin-button");
});

Then("получает результат брони", async function () {
  await this.page.waitForSelector("h2");
  let filmTitle = await getText(page, `body > main > section > div > p:nth-child(1)`);
  expect(filmTitle).toEqual("На фильм: Унесенные ветром.");
});

When("переходит на расписание на завтра", async function () {
  return await clickElement(this.page, "nav > a:nth-child(2)");
});

When("выбирает время сеанса на Унесенные ветром. на 14-00", async function () {
  return await clickElement(this.page, "body > main > section:nth-child(3) > div:nth-child(3) > ul > li > a");
});

When("выбирает места в зале кинотеатра 4 ряд 4, 5, 6 места", async function () {
  await this.page.waitForSelector("div.buying-scheme");
  place1 = ".buying-scheme__wrapper > :nth-child(4) > :nth-child(4)";
  await clickElement(this.page, place);
  place2 = ".buying-scheme__wrapper > :nth-child(4) > :nth-child(5)";
  await clickElement(page, place2);
  place3 = ".buying-scheme__wrapper > :nth-child(4) > :nth-child(6)";
  await clickElement(page, place3);
  await clickElement(this.page, "button.acceptin-button");
});

Then("получает результат брони", async function () {
  await this.page.waitForSelector("h2");
  let filmTitle = await getText(page, `body > main > section > div > p:nth-child(1)`);
  expect(filmTitle).toEqual("На фильм: Унесенные ветром.");
  let placeNumber = await getText(page, `body > main > section > div > p:nth-child(2) > span`);
  expect(placeNumber).toEqual("4/4, 4/5, 4/6");
});

When("переходит на расписание на послезавтра", async function () {
  return await clickElement(this.page, "nav > a:nth-child(3)");
});

When("выбирает время сеанса на Зверополис на 12-00", async function () {
  return await clickElement(this.page, "body > main > section:nth-child(1) > div.movie-seances__hall > ul > li:nth-child(2) > a");
});

When("выбирает место в зале кинотеатра 6 ряд 4 место", async function () {
  await this.page.waitForSelector("div.buying-scheme");
  place = ".buying-scheme__wrapper > :nth-child(6) > :nth-child(4)";
  await clickElement(this.page, place); 
  await clickElement(this.page, "button.acceptin-button");
});

Then("место занято", async function () {
  const stateOfButton = await page.$eval('button', (button) => {
    return button.disabled;
  });
  expect(stateOfButton).equal(true)
});