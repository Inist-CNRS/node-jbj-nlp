import anglicize from 'anglicize';
import metaphone from 'metaphone';

module.exports = function (exec, execmap) {
  const filters = {};

  /**
   * Anglicize the input, ie. deletes the diacritics
   * @param  {String} input
   * @return {String} input without diacritics
   */
  filters.anglicize = function (input, args, next) {
    return exec(args, () => next(null, anglicize(input)), "anglicize");
  };

  /**
   * Metaphone the input, ie. deletes the diacritics
   * @param {String} input
   * @return {String} input without vowels and replace consonant by similar strong sound
   */
  filters.metaphone = function (input, args, next) {
    return exec(args, () => next(null, metaphone(input)), "metaphone");
  };

  /**
   * Tokenize the input
   * @param  {String} input
   * @param  {String|RegExp|Boolean} args  true: default tokenization
   *                                       string: predefined tokenization
   *                                       RegExp: tokenization with the given regexp
   * @return {Array} tokens
   */
  filters.tokenize = function (input, args, next) {
    return exec(args, arg => next(null, tokenize(input, arg)), "tokenize");
  };

  /**
   * Count tokenized words
   * @param  {String} input
   * @param  {String|RegExp|Boolean} args  true: default tokenization
   *                                       string: predefined tokenization
   *                                       RegExp: tokenization with the given regexp
   * @return {Integer} number of words
   */
  filters.countWords = function (input, args, next) {
    return exec(args, arg => next(null, tokenize(input, arg).length), "countWords");
  };

  /**
   * Count characters
   * @param  {String} input
   * @param  {String|RegExp|Boolean} args  true: count every characters
   *                                       string: count using a predefined setting
   *                                       RegExp: count characters that match the regexp
   * @return {Integer} number of characters
   */
  filters.countCharacters = function (input, args, next) {
    return exec(args, function (arg) {
      if (arg === 'slug') { return next(null, input.replace(/-/g, '').length); }
      if (arg instanceof RegExp) {
        return next(null, Array.from(input).filter(c => c.match(arg)).length);
      }

      return next(null, input.length);
    }, "countWords");
  };

  return filters;
}

/**
 * Tokenize the input
 * @param  {String} input
 * @param  {String|RegExp|Boolean} args  true: default tokenization
 *                                       string: predefined tokenization
 *                                       RegExp: tokenization with the given regexp
 * @return {Array} tokens
 */
function tokenize(input, arg) {
  if (arg === 'slug') {
    arg = /[^a-z0-9]+/i;
  }
  else if (!(arg instanceof RegExp)) {
    arg = /[^a-z0-9äâàéèëêïîöôùüûœç'\-]+/i;
  }

  let words = input.split(arg);

  // Split quotes in words
  for (let i = 0; i <= words.length - 1; i++) {
    if (!words[i].includes("'")) { continue; }

    let splitted = words[i].split("'");

    for (let j = 0; j < splitted.length - 1; j++) {
      splitted[j] += "'";
    }

    words.splice(i, 1, ...splitted);
  }

  return words.filter(word => word);
}
