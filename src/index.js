import anglicize from 'anglicize';

module.exports = function (exec, execmap) {
  const filters = {};

  filters.anglicize = function (input, args) {
    return exec(args, arg => anglicize(input), "anglicize");
  };

  filters.tokenize = function (input, args) {
    return exec(args, arg => { return tokenize(input, arg); }, "tokenize");
  };

  filters.countWords = function (input, args) {
    return exec(args, function (arg) {
      return tokenize(input, arg).length;
    }, "countWords");
  };

  filters.countCharacters = function (input, args) {
    return exec(args, function (arg) {
      if (arg === true) { return input.length; }
      if (arg === 'slug') { return input.replace(/-/g, '').length; }

      return Array.from(input).filter(c => c.match(arg)).length;
    }, "countWords");
  };

  return filters;
}

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
