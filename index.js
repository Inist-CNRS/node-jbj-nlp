'use strict';
var natural = require('natural');
var tokenizers = {};
tokenizers.word = new natural.WordTokenizer();
tokenizers.treebank = new natural.TreebankWordTokenizer();

module.exports = function(exec, map) {
  var filters = {};

  /**
   * tokenize
   */
  filters.tokenize = function(obj, args) {
    return exec(args, function(arg) {
        if (typeof arg === 'string') {
          arg = arg.toLowerCase();
          if (tokenizers[arg] !== undefined) {
            return tokenizers[arg].tokenize(obj);
          }
          else  {
            return tokenizers.word.tokenize(obj);
          }
        }
        else if (arg instanceof RegExp) {
          var t = new natural.RegexpTokenizer({pattern: arg});
          return t.tokenize(obj);
        }
        else {
          return tokenizers.word.tokenize(obj);
        }

    }, "tokenize");

  };


  return filters;


}
