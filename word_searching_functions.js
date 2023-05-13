"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.verseTextToList = exports.addVerseListWordsToFullList = exports.addVerseWordsToFullList = exports.getVerseWords = exports.getStringWords = void 0;
var getStringWords = function (sentence) {
    var wordObj = {};
    var regex = /[a-z']+/gi;
    var wordListWithReps = sentence.match(regex);
    if (!wordListWithReps) {
        throw new Error("No words found in input sentence");
    }
    for (var _i = 0, wordListWithReps_1 = wordListWithReps; _i < wordListWithReps_1.length; _i++) {
        var word = wordListWithReps_1[_i];
        var lowercaseWord = word.toLowerCase();
        if (!wordObj[lowercaseWord]) {
            wordObj[lowercaseWord] = 0;
        }
        wordObj[lowercaseWord]++;
    }
    var wordListNoReps = Object.entries(wordObj);
    var wordObjectsList = wordListNoReps.map(function (_a, index) {
        var word = _a[0], count = _a[1];
        return ({
            // id: index,
            word: word,
            count: count
        });
    });
    return wordObjectsList;
};
exports.getStringWords = getStringWords;
var getVerseWords = function (verse) {
    var wordsInVerse = (0, exports.getStringWords)(verse.text);
    var verseWordList = wordsInVerse.map(function (wordObj) { return (__assign(__assign({}, wordObj), { reference: verse.reference })); });
    return verseWordList;
};
exports.getVerseWords = getVerseWords;
var addVerseWordsToFullList = function (verse, fullWordList) {
    var verseWords = (0, exports.getVerseWords)(verse);
    for (var _i = 0, verseWords_1 = verseWords; _i < verseWords_1.length; _i++) {
        var wordObj = verseWords_1[_i];
        var word = wordObj.word;
        var fullListWordObj = {};
        if (!fullWordList[word]) {
            fullListWordObj = { word: wordObj.word, count: wordObj.count };
            fullListWordObj.references = [wordObj.reference];
            fullWordList[word] = fullListWordObj;
            continue;
        }
        fullListWordObj = fullWordList[word];
        var completeFullWordList = fullListWordObj;
        completeFullWordList.count += wordObj.count;
        completeFullWordList.references.push(wordObj.reference);
        fullListWordObj = completeFullWordList;
    }
};
exports.addVerseWordsToFullList = addVerseWordsToFullList;
var addVerseListWordsToFullList = function (verseList, fullWordList) {
    for (var _i = 0, verseList_1 = verseList; _i < verseList_1.length; _i++) {
        var verse = verseList_1[_i];
        (0, exports.addVerseWordsToFullList)(verse, fullWordList);
    }
};
exports.addVerseListWordsToFullList = addVerseListWordsToFullList;
var verseTextToList = function (text) {
    var lineList = text.split('\n');
    var chapter = lineList[0];
    console.log(chapter);
    var verseNumberRegEx = /[0-9]/;
    var fullVerseNumberRegEx = /[0-9]+/;
    var verseObjectList = [];
    for (var _i = 0, lineList_1 = lineList; _i < lineList_1.length; _i++) {
        var line = lineList_1[_i];
        if (!line[0] || !line[0].match(verseNumberRegEx)) {
            continue;
        }
        var verseNumberRegExObject = line.match(fullVerseNumberRegEx);
        if (!verseNumberRegExObject) {
            throw new Error("Missing verse number should be weeded out already");
        }
        var verseNumber = verseNumberRegExObject[0];
        var verseText = line.slice(verseNumber.length + 1);
        var verseObject = {
            reference: "".concat(chapter, ":").concat(verseNumber),
            text: verseText
        };
        verseObjectList.push(verseObject);
    }
    return verseObjectList;
};
exports.verseTextToList = verseTextToList;
module.exports = { addVerseWordsToFullList: exports.addVerseWordsToFullList, addVerseListWordsToFullList: exports.addVerseListWordsToFullList, getStringWords: exports.getStringWords, getVerseWords: exports.getVerseWords, verseTextToList: exports.verseTextToList };
