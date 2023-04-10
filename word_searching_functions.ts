export const getVerseWords: (sentence: string) => string[] = function(sentence) {
  const wordObj :{[word:string]: number} = {};
  const regex = /[a-z]+/gi;
  const wordListWithReps = sentence.match(regex);
  if(!wordListWithReps) {
    throw new Error("No words found in input sentence");
  }
  for(const word of wordListWithReps) {
    const lowercaseWord = word.toLowerCase();
    if(!wordObj[lowercaseWord]) {
      wordObj[lowercaseWord];
    }

    wordObj[lowercaseWord]++;
  }

  const wordListNoReps = Object.keys(wordObj);
  return wordListNoReps;
};
