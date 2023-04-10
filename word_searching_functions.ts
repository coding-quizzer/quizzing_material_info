export const getVerseWords: (sentence: string) => string[] = function(sentence) {
  const wordObj = {};
  const regex = /[a-z]+/gi;
  const wordListWithReps = sentence.match(regex);
  if(!wordListWithReps) {
    throw new Error("No words found in input sentence");
  }
  return wordListWithReps;
};
