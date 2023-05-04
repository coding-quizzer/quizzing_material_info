import { fullWordList } from "./word_searching_functions";
const { addVerseListWordsToFullList } = require("./word_searching_functions");
const jsonData = require("./data/json/Luke_1_club150.json");

console.log(jsonData);

const completeWordList: fullWordList = {};

addVerseListWordsToFullList(jsonData, completeWordList);

const sortedValues = Object.values(completeWordList);
sortedValues.sort((a, b) => ("" + a.word).localeCompare(b.word));

const filteredValues = Object.values(completeWordList).filter(
  (wordObj) => wordObj.references.length === 1
);

console.table(sortedValues);

filteredValues.sort((a, b) => (("" + a.word).localeCompare(b.word)))

console.table(filteredValues);

