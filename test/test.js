/*jshint node:true, laxcomma:true */
/* global describe, it */
'use strict';
var assert = require('assert');
var JBJ = require('jbj');

var examples = require('./examples.json');

JBJ.use(require('../src/'));

describe('Filters', function () {
  for (const name in examples) {
    let example = examples[name];

    it(name, function (done) {
      var input      = example.input;
      var stylesheet = example.stylesheet;
      var expected   = example.expected;
      JBJ.render(stylesheet, input, function (err, output) {
        assert.deepEqual(output, expected);
        done(err);
      });
    });
  }

  it('Tokenize RegExp', function(done) {
     var stylesheet = {
       "set": "flea-dog.",
       "tokenize" : /\-/
     };
     JBJ.render(stylesheet, function (err, output) {
         assert.equal(output[0], 'flea');
         assert.equal(output[1], 'dog.');
         done(err);
     });
  });

  it('Count characters RegExp', function(done) {
     var stylesheet = {
       "set": "funny flea-dog.",
       "countCharacters" : /[a-z]/
     };
     JBJ.render(stylesheet, function (err, output) {
         assert.equal(output, 12);
         done(err);
     });
  });
});
