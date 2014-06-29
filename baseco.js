// baseco v0.2.0
//
// **Github:** https://github.com/zensh/baseco
//
// **License:** MIT

/* global module, define */
;(function (root, factory) {
  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else {
    root.thunks = factory();
  }
}(this, function () {
  'use strict';

  var STRING = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    MSG = {
      alphabet1: '"alphabet" must be string, and alphabet.length >=2.',
      alphabet2: '"alphabet" err! It must be unique! : ',
      number1: 'Invalid "base" number! It must be an integer, and 2 <= base <= alphabet.length.',
      number2: 'Invalid "original" number! It must be an integer, and 0 <= number <= Number.MAX_VALUE.',
      original1: ' is invalid "original" string!',
      original2: '"original" must be a string!',
      original3: '"original" must be a number!'
    };

  function decToGeneric(o, b, c) {
    var re = '', q = 0;

    if (b <= 36 && c === STRING) return o.toString(b);
    while (o) {
      q = o % b;
      re = c[q] + re;
      o = (o - q) / b;
    }
    return re;
  }

  function genericToDec(o, b, c) {
    var cache = {}, s = '', re = 0, pow = 1;

    if (b <= 36 && c === STRING) return parseInt(o, b);
    for (var i = o.length - 1; i >= 0; i--) {
      s = o[i];
      if (cache[s] == null) cache[s] = c.indexOf(s);
      if (cache[s] < 0 || cache[s] >= b) throw new Error(s + MSG.original1);
      re += pow * cache[s];
      pow *= b;
    }
    return re;
  }

  function Baseco(base, alphabet) {
    var unique = {};

    if (!(this instanceof Baseco)) return new Baseco(alphabet, base);
    // check out alphabet
    alphabet = alphabet || STRING;

    if (typeof alphabet !== 'string' || alphabet.length < 2) throw new Error(MSG.alphabet1);

    //if subset of STRING, set default value STRING
    if (alphabet !== STRING && alphabet === STRING.slice(0, alphabet.length)) alphabet = STRING;

    if (alphabet !== STRING) {
      for (var i = alphabet.length - 1; i >= 0; i--) { //check out for uniquely
        if (unique['__' + alphabet[i]]) throw new Error(MSG.alphabet2 + alphabet[i]);
        unique['__' + alphabet[i]] = 1;
      }
    }

    // check out base
    base = Math.floor(base) || 10;
    if (!(base >= 2 && base <= alphabet.length)) throw new Error(MSG.number1);

    this._alphabet = alphabet;
    this._base = base;
  }

  Baseco.prototype.gToD = function (value) {
    if (typeof value !== 'string') throw new Error(MSG.original2);
    return genericToDec(value, this._base, this._alphabet);
  };

  Baseco.prototype.dToG = function (value) {
    if (typeof value !== 'number') throw new Error(MSG.original3);
    value = Math.floor(value);
    if (!(value >= 0 && value <= Number.MAX_VALUE)) throw new Error(MSG.number2);
    return decToGeneric(value, this._base, this._alphabet);
  };

  return Baseco;
}));
