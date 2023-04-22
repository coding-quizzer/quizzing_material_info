const { addVerseWordsToFullList } = require("./word_searching_functions");
const jsonData = require("./data/Luke_1_club150.json");

console.log(jsonData);

const fullWordList = {};

for(let verse of jsonData) {
  addVerseWordsToFullList(verse, fullWordList);
}

console.log(fullWordList);

