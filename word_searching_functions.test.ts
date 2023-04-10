import {getVerseWords} from "./word_searching_functions";
describe(getVerseWords, () => {
  it("outputs a list of the correct length for a sentence with distinct words", () => {
    expect(getVerseWords("This is a sentence.")).toHaveLength(4);
  });

  it("outputs a list of the correct length for a sentence where some words are repeated with the same capitalization", () => {
    expect(
      getVerseWords("This is a good test and a good sentence")
    ).toHaveLength(7);
  });

  it("outputs a list of the correct length for a sentence where some words are repeated with lowercase, then uppercase capitalization", () => {
    expect(
      getVerseWords("This is a good test. Is that really true?")
    ).toHaveLength(8);
  });

  it("outputs a list of the correct length for a sentence where some words are repeated with uppercase, then lowercase capitalization", () => {
    expect(
      getVerseWords("Is this a good test? Or is it a bad one?")
    ).toHaveLength(9);
  });


});
