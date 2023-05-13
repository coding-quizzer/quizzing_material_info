"use strict";
exports.__esModule = true;
var _a = require("./word_searching_functions"), addVerseListWordsToFullList = _a.addVerseListWordsToFullList, verseTextToList = _a.verseTextToList;
var jsonData = require("./data/json/Luke_1_club150.json");
var fs = require("fs");
// console.log(jsonData);
var completeWordList = {};
fs.readFile('data/text/Luke/Luke_1.txt', 'utf8', function (error, data) {
    if (error) {
        console.error("Error reading file contents");
        console.error(error);
        process.exit();
    }
    var verseList = verseTextToList(data);
    addVerseListWordsToFullList(verseList, completeWordList);
    var sortedValues = Object.values(completeWordList);
    sortedValues.sort(function (a, b) { return a.references.length - b.references.length; });
    console.log("Sorted Values");
    console.log(sortedValues);
    console.table(sortedValues);
});
// const sortedValues = Object.values(completeWordList);
// sortedValues.sort((a, b) => ("" + a.word).localeCompare(b.word));
// const filteredValues = Object.values(completeWordList).filter(
//   (wordObj) => wordObj.references.length === 1
// );
// console.table(sortedValues);
// filteredValues.sort((a, b) => (("" + a.word).localeCompare(b.word)))
// console.table(filteredValues);
