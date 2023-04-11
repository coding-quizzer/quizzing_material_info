import {getVerseWords} from "./word_searching_functions";
describe(getVerseWords, () => {
  it("returns a list of the correct length for a sentence with distinct words", () => {
    expect(getVerseWords("This is a sentence.")).toHaveLength(4);
  });

  it("returns a list of the correct length for a sentence where some words are repeated with the same capitalization", () => {
    expect(
      getVerseWords("This is a good test and a good sentence")
    ).toHaveLength(7);
  });

  it("returns a list of the correct length for a sentence where some words are repeated with lowercase, then uppercase capitalization", () => {
    expect(
      getVerseWords("This is a good test. Is that really true?")
    ).toHaveLength(8);
  });

  it("returns a list of the correct length for a sentence where some words are repeated with uppercase, then lowercase capitalization", () => {
    expect(
      getVerseWords("Is this a good test? Or is it a bad one?")
    ).toHaveLength(9);
  });

  it("returns a list of objects with the word itself being the value of the word key", () => {
    expect(
      getVerseWords("This is a good test. Is that really true?"
      )[1]).toEqual(
        {
          id: 1,
          word: "is",
          count: 2,

        }
      );
      console.log(getVerseWords("This is a good test. Is that really true?"))
  });


});
