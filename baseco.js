// baseco v0.1.0
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
  //  anyBaseConverter(original, [base], [alphabet]);
  //
  //  This function extend Number.toString() and parseInt(), you can define base number and convert string table yourself.
  //
  //      original : String or Number, when String, character must be in alphabet, converter to a decimal number;
  //                 when Number converter to a string that used alphabet;
  //          base : Number, optional, default value is 10, must be an integer, 2 <= base <= alphabet.length; if base <=36
  //                 and alphabet use default value, anyBaseConverter() call native base conversion.
  //  alphabet : String, optional, default value is "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  //                 character must be unique.
  //
  var STRING = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    MSG = {
      alphabet1: '"alphabet" must be string, and alphabet.length >=2.',
      alphabet2: '"alphabet" err! It must be unique! : ',
      number1: 'Invalid "base" number! It must be an integer, and 2 <= base <= alphabet.length.',
      number2: 'Invalid "original" number! It must be an integer, and 0 <= number <= Number.MAX_VALUE.',
      original1: ' is invalid "original" string!',
      original2: '"original" must be number or string!'
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

  function baseco(original, base, alphabet) {
    var result, unique = {};
    // check out alphabet
    alphabet = alphabet || STRING;

    if (typeof alphabet !== 'string' && alphabet.length < 2) throw new Error(MSG.alphabet1);

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

    //check out original and execute
    switch (typeof original) {
      case 'number':
        original = Math.floor(original);
        if (!(original >= 0 && original <= Number.MAX_VALUE)) throw new Error(MSG.number2);
        return decToGeneric(original, base, alphabet);

      case 'string':
        return genericToDec(original, base, alphabet);
    }

    throw new Error(MSG.original2);
  }

  return baseco;
}));
