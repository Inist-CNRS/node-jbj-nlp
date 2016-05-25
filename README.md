# Natural language processing for JBJ

Add filters to [JBJ](https://github.com/castorjs/node-jbj).

# Installation

With [npm](http://npmjs.org) do:

    $ npm install jbj-nlp

# Documentation

## Usage

```javascript
var JBJ = require('jbj');

JBJ.use(require('jbj-nlp'));
```

## Filters

<a id="anglicize"></a>
### anglicize: *true*
Anglicize a string

```javascript

var stylesheet = {
  "set": "ÂÇİĞÖŞÜÑ âçığöşüñ",
  "anglicize": true
};
JBJ.render(stylesheet, console.log);
// ACIGOSUN acigosun

```

<a id="countCharacters"></a>
### countCharacters: *true* | *slug* | */regex_expression/*
Count characters. Options:
  - `true`: all characters, including white spaces
  - `slug`: alphanumeric characters
  - `regex`: characters matching the regex

```javascript

var stylesheet = {
  "set": "L'arbre de Jean-Claude est tombé.",
  "countCharacters" : true
};
JBJ.render(stylesheet, console.log);
// 33

```

<a id="countWords"></a>
### countWords: see the *tokenized* filter for the arguments
Count tokenized words

```javascript

var stylesheet = {
  "set": "L'arbre de Jean-Claude est tombé.",
  "countWords" : true
};
JBJ.render(stylesheet, console.log);
// 6

```

<a id="tokenize"></a>
### tokenize: *true* | *slug* | */regex_expression/*
Tokenise a string.Options:
  - `true`: split on white spaces and ponctuation, keep dashes and quotes
  - `slug`: split on non-alphanumeric characters
  - `regex`: split with the given regex

```javascript

var stylesheet = {
  "set": "L'arbre de Jean-Claude est tombé.",
  "tokenize" : true
};
JBJ.render(stylesheet, console.log);
// ["L'","arbre","de","Jean-Claude","est","tombé"]

```

<a id="metaphone"></a>
### metaphone

Gives a phonetics approximate to the *input* string.

```javascript

var stylesheet = {
  "set": "Psychologue",
  "metaphone" : true
};
JBJ.render(stylesheet, console.log);
// PSXLK

```
