const { getVerseWords } = require("./word _searching_functions.js");

it("lists the words in a given sentence", () => {
  expect(getVerseWords("this is a sentence")).toEqual([
    "this",
    "is",
    "a",
    "sentence",
  ]);
});
