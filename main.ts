import { fullWordList } from "./word_searching_functions";
const { addVerseListWordsToFullList, verseTextToList  } = require("./word_searching_functions");
const jsonData = require("./data/json/Luke_1_club150.json");
import * as fs from 'fs';

// console.log(jsonData);
const completeWordList: fullWordList = {};

fs.readFile('data/text/Luke/Luke_1.txt', 'utf8',  (error, data) => {
  if(error) {
    console.error("Error reading file contents")
    console.error(error);
    process.exit();
  }

  const verseList = verseTextToList(data);

  addVerseListWordsToFullList(verseList, completeWordList);

  const sortedValues = Object.values(completeWordList);
  sortedValues.sort((a, b) => a.references.length - b.references.length);

  console.log("Sorted Values");
  console.log(sortedValues);

  console.table(sortedValues);

})



// const sortedValues = Object.values(completeWordList);
// sortedValues.sort((a, b) => ("" + a.word).localeCompare(b.word));

// const filteredValues = Object.values(completeWordList).filter(
//   (wordObj) => wordObj.references.length === 1
// );

// console.table(sortedValues);

// filteredValues.sort((a, b) => (("" + a.word).localeCompare(b.word)))

// console.table(filteredValues);

