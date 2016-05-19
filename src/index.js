import anglicize from 'anglicize';

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
      if (arg === true) { return next(null, input.length); }
      if (arg === 'slug') { return next(null, input.replace(/-/g, '').length); }

      return next(null, Array.from(input).filter(c => c.match(arg)).length);
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
  switch (arg) {
  case true:
    arg = /[^a-z0-9äâàéèëêïîöôùüûœç'\-]+/i;
    break;
  case 'slug':
    arg = /[^a-z0-9]+/i;
    break;
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
