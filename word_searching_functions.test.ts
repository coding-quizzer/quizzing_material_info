import {getVerseWords} from "./word_searching_functions.js";
describe(getVerseWords, () => {
  it("outputs a list of the correct length for a sentence with distinct words", () => {
    expect(getVerseWords("This is a sentence.")).toHaveLength(4);
  });

  it("outputs a list of the correct length for a sentence where some words are repeated with the same capitalization", () => {
    expect(
      getVerseWords("This is a good test and a good sentence")
    ).toHaveLength(7);
  });
});
