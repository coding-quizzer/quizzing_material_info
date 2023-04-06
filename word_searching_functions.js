const getVerseWords = function (sentence) {
  const regex = /[a-z]/gi;
  return sentence.match(regex);
};

module.exports = { getVerseWords };
