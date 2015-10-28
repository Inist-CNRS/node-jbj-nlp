/*jshint node:true, laxcomma:true */
/* global describe, it */
'use strict';
var assert = require('assert')
  , JBJ = require('jbj');

JBJ.use(require('..'))

describe('asynchronous basic', function (done) {
    it('tokenize #1', function(done) {
        var stylesheet = {
          "set": "my dog hasn't any fleas.",
          "tokenize" : true
        };
        var output = JBJ.render(stylesheet, function (err, output) {
            assert.equal(output[0], 'my');
            assert.equal(output[1], 'dog');
            assert.equal(output[2], 'hasn');
            assert.equal(output[3], 't');
            assert.equal(output[4], 'any');
            assert.equal(output[5], 'fleas');
            done(err);
        });
    });
     it('tokenize #2', function(done) {
         var stylesheet = {
           "set": "flea-dog.",
           "tokenize" : /\-/
         };
         var output = JBJ.render(stylesheet, function (err, output) {
             assert.equal(output[0], 'flea');
             assert.equal(output[1], 'dog.');
             done(err);
         });
     });

     it('tokenize #3', function(done) {
         var stylesheet = {
           "set": "my dog hasn't any fleas.",
           "tokenize" : "Treebank"
         };
         var output = JBJ.render(stylesheet, function (err, output) {
             assert.equal(output[0], 'my');
             assert.equal(output[1], 'dog');
             assert.equal(output[2], 'has');
             assert.equal(output[3], 'n\'t');
             assert.equal(output[4], 'any');
             assert.equal(output[5], 'fleas');
             assert.equal(output[6], '.');
             done(err);
         });
     });

});
