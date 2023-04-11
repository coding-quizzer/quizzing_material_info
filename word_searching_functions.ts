type wordData = {
  word: string
}
export const getVerseWords: (sentence: string) => wordData[] = function(sentence) {
  const wordObj :{[word:string]: number} = {};
  const regex = /[a-z]+/gi;
  const wordListWithReps = sentence.match(regex);
  if(!wordListWithReps) {
    throw new Error("No words found in input sentence");
  }
  for(const word of wordListWithReps) {
    const lowercaseWord = word.toLowerCase();
    if(!wordObj[lowercaseWord]) {
      wordObj[lowercaseWord] = 0;
    }

    wordObj[lowercaseWord]++;
  }

  const wordListNoReps = Object.entries(wordObj);

  const wordObjectsList = wordListNoReps.map(([word, count], index) => (
      {
        id: index,
        word: word,
        count: count,
      } as wordData
    )
  )
  return wordObjectsList;
};
