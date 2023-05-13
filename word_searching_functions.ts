
type wordData = {
  // id: number,
  word: string
  count: number
}


type verseWordsData = wordData & {reference: string};

type multipleVerseWordsData = wordData & {references: string[]};

type verseObj = {
  reference: string,
  text: string
}

type verseObjList = verseObj[];

export type fullWordList = {
    [word:string]: multipleVerseWordsData;
}
export const getStringWords: (sentence: string) => wordData[] = function(sentence) {
  const wordObj :{[word:string]: number} = {};
  const regex = /[a-z']+/gi;
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
        // id: index,
        word: word,
        count: count,
      } as wordData
    )
  )
  return wordObjectsList;
};

export const getVerseWords: (
  verse: {
    reference: string,
    text: string, 
  }
  ) => verseWordsData[] = function(verse) {
  const wordsInVerse = getStringWords(verse.text);
  const verseWordList = wordsInVerse.map(wordObj => (
    {
    ...wordObj,
    reference: verse.reference
    })
  );
  return verseWordList;

}

export const addVerseWordsToFullList: (verse: verseObj, fullWordList: fullWordList) => void = function (verse, fullWordList) {

  const verseWords = getVerseWords(verse);
  for(const wordObj of verseWords) {
    const word = wordObj.word;
    let fullListWordObj :Partial<multipleVerseWordsData> = {};
    if(!fullWordList[word]) {
      fullListWordObj = {word: wordObj.word, count: wordObj.count};
      fullListWordObj.references = [wordObj.reference];
      fullWordList[word] = fullListWordObj as multipleVerseWordsData;
      continue;
    }

    fullListWordObj = fullWordList[word];

    const completeFullWordList = fullListWordObj as multipleVerseWordsData;
    completeFullWordList.count += wordObj.count;
    completeFullWordList.references.push(wordObj.reference);

    fullListWordObj = completeFullWordList
    
  }

}

export const addVerseListWordsToFullList: (verseList: verseObjList, fullWordList: fullWordList) => void = function (verseList, fullWordList) {
  for(const verse of verseList) {
    addVerseWordsToFullList(verse, fullWordList);
  }
}

export const verseTextToList: (text: string) => verseObjList = function(text){
  const lineList = text.split('\n');
  const chapter = lineList[0];
  console.log(chapter);
  const verseNumberRegEx = /[0-9]/;
  const fullVerseNumberRegEx = /[0-9]+/;
  const verseObjectList :verseObjList = [];
  for(let line of lineList) {
    if(!line[0] || !line[0].match(verseNumberRegEx)){
      continue;
    }
    const verseNumberRegExObject = line.match(fullVerseNumberRegEx);
    if (!verseNumberRegExObject) {
      throw new Error("Missing verse number should be weeded out already");
    }

    const verseNumber = verseNumberRegExObject[0];

    const verseText = line.slice(verseNumber.length + 1);

    const verseObject = {
      reference: `${chapter}:${verseNumber}`,
      text: verseText
    }


    verseObjectList.push(verseObject);
  }
  return verseObjectList;
};

module.exports = {addVerseWordsToFullList, addVerseListWordsToFullList, getStringWords, getVerseWords, verseTextToList}