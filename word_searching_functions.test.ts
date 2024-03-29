import {addVerseListWordsToFullList, addVerseWordsToFullList, getStringWords, getVerseWords, verseTextToList} from "./word_searching_functions";
describe(getStringWords, () => {
  it("returns a list of the correct length for a sentence with distinct words", () => {
    expect(getStringWords("This is a sentence.")).toHaveLength(4);
  });

  it("returns a list of the correct length for a sentence where some words are repeated with the same capitalization", () => {
    expect(
      getStringWords("This is a good test and a good sentence")
    ).toHaveLength(7);
  });

  it("returns a list of the correct length for a sentence where some words are repeated with lowercase, then uppercase capitalization", () => {
    expect(
      getStringWords("This is a good test. Is that really true?")
    ).toHaveLength(8);
  });

  it("returns a list of the correct length for a sentence where some words are repeated with uppercase, then lowercase capitalization", () => {
    expect(
      getStringWords("Is this a good test? Or is it a bad one?")
    ).toHaveLength(9);
  });

  it("returns a list of objects with the word itself being the value of the word key", () => {
    expect(
      getStringWords("This is a good test. Is that really true?"
      )[1]).toEqual(
        {
          word: "is",
          count: 2,

        }
      );
      console.log(getStringWords("This is a good test. Is that really true?"))
  });


});

describe(getVerseWords, () => {
  it("returns a list of words in the given verse with references, given the verse as an object", () => {
    expect(
      getVerseWords({reference: "John 1:1", text: "In the beginning was the word, and the word was with God, and the word was God."})[1]).toEqual(
      {
        word: "the",
        count: 4,
        reference: "John 1:1",
      }
    )
  })
})

describe(addVerseWordsToFullList, () => {
  const firstVerseWords = {
    in: {
      word: "in",
      count: 1,
      references: ["John 1:1"],
    },
    the: {
      word: "the",
      count: 4,
      references: ["John 1:1"]
    },
    beginning: {
      word: "beginning",
      count: 1,
      references: ["John 1:1"]
    },
    was: {
      word: "was",
      count: 3,
      references: ["John 1:1"]
    },
    word: {
      word: "word",
      count: 3,
      references: ["John 1:1"]
    },
    and: {
      word: "and",
      count: 2,
      references: ["John 1:1"]
    },
    with: {
      word: "with",
      count: 1,
      references: ["John 1:1"]

    },

    god: {
      word: "god",
      count: 2,
      references: ["John 1:1"]
    }

  }
  it("Adds words from the verse to the full words list, if the full list is empty", () => {
    const fullWordList = {};

      const verseObj = {reference: "John 1:1", text: "In the beginning was the word, and the word was with God, and the word was God."};
      addVerseWordsToFullList(verseObj, fullWordList);
      expect(fullWordList).toEqual(firstVerseWords)
  })

  it("Adds new references to the old list when the word already has been recorded", () => {
    const fullWordList = firstVerseWords;

     const verseObj = {reference: "John 1:2", text: "He was in the beginning with God"}

     addVerseWordsToFullList(verseObj, fullWordList);
     expect(fullWordList).toEqual(
      {
        in: {
          word: "in",
          count: 2,
          references: ["John 1:1", "John 1:2"],
        },
        the: {
          word: "the",
          count: 5,
          references: ["John 1:1", "John 1:2"]
        },
        beginning: {
          word: "beginning",
          count: 2,
          references: ["John 1:1", "John 1:2"]
        },
        was: {
          word: "was",
          count: 4,
          references: ["John 1:1", "John 1:2"]
        },
        word: {
          word: "word",
          count: 3,
          references: ["John 1:1"]
        },
        and: {
          word: "and",
          count: 2,
          references: ["John 1:1"]
        },
        with: {
          word: "with",
          count: 2,
          references: ["John 1:1", "John 1:2"]
    
        },
    
        god: {
          word: "god",
          count: 3,
          references: ["John 1:1", "John 1:2"]
        },

        he: {
          word: "he",
          count: 1,
          references: ["John 1:2"]
        }
      }
     )
  })
})

describe(addVerseListWordsToFullList, () => {
  const fullWordList = {};
  const verseList = [

    {reference: "John 1:1", text: "In the beginning was the word, and the word was with God, and the word was God."},
    {reference: "John 1:2", text: "He was in the beginning with God"}
  ];

  addVerseListWordsToFullList(verseList, fullWordList);

  expect(fullWordList).toEqual(
    {
      in: {
        word: "in",
        count: 2,
        references: ["John 1:1", "John 1:2"],
      },
      the: {
        word: "the",
        count: 5,
        references: ["John 1:1", "John 1:2"]
      },
      beginning: {
        word: "beginning",
        count: 2,
        references: ["John 1:1", "John 1:2"]
      },
      was: {
        word: "was",
        count: 4,
        references: ["John 1:1", "John 1:2"]
      },
      word: {
        word: "word",
        count: 3,
        references: ["John 1:1"]
      },
      and: {
        word: "and",
        count: 2,
        references: ["John 1:1"]
      },
      with: {
        word: "with",
        count: 2,
        references: ["John 1:1", "John 1:2"]
  
      },
  
      god: {
        word: "god",
        count: 3,
        references: ["John 1:1", "John 1:2"]
      },

      he: {
        word: "he",
        count: 1,
        references: ["John 1:2"]
      }
    }
   )
})

describe(verseTextToList, () => {
  const exampleText = `John 1

1 In the beginning was the word, and the word was with God, and the word was God.
2 He was in the beginning with God.
  `;
  expect(verseTextToList(exampleText)).toEqual([

    {reference: "John 1:1", text: "In the beginning was the word, and the word was with God, and the word was God."},
    {reference: "John 1:2", text: "He was in the beginning with God."}
  ]);
})
