const sorting = require("../../app");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    const input = [
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ];
    
    const result = sorting.sortByName(input);
    const expected = [
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ];
    expect(result).toEqual(expected);
  }); 
  
  it("No sorting", () => {
    const input = [
      "Старик и море",
      "Капитан Сорви голова",
      "Капитан Сорви голова",
      "Сказка странствий",
    ];
  
    const result = sorting.sortByName(input);
    const expected = [
    "Капитан Сорви голова",
    "Капитан Сорви голова",
    "Сказка странствий",
    "Старик и море",
  ];
  expect(result).toEqual(expected);
  });
});
