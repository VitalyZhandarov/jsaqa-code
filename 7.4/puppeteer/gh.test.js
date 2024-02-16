let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
    }, 10000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
    }, 10000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
    }, 10000);
});


describe("3 new tests Github page ", () => {
  beforeEach(async () => {
    await page.goto("https://github.com");
  });
  test("Check page docs", async () => {
    await page.goto("https://docs.github.com/ru");
    const title = await page.title();
    expect(title).toEqual("GitHub Docs")
    }, 10000);

  test("h2Span Text under h1", async () => {
    await page.goto("https://github.com/features/security");
    const h2Span = await "h2 span.color-fg-default";
    const h2SpanText = await page.$eval(h2Span, (el) => el.textContent);
    expect(h2SpanText).toEqual("Native application security testing");
    }, 10000);
  
  test("Check Pricing page", async () => {
    await page.goto("https://github.com/pricing");
    const title = await page.title();
    expect(title).toContain("Pricing · Plans for every developer · GitHub");
    }, 10000);
})
