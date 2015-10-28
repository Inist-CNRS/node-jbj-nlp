# Natural language processing for JBJ

Add filters to JBJ ... see [https://github.com/castorjs/node-jbj](https://github.com/castorjs/node-jbj)

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

<a id="tokenize"></a>
### tokenize: *word* | *treebank* | */regex_expression/*
tokenise a string

```javascript

	var stylesheet = {
           "set": "my dog hasn't any fleas.",
           "tokenize" : "Treebank"
    };
     JBJ.render(stylesheet, console.log);

```
