'use strict';
/*global module, exports*/

var Baseco = require('../baseco.js');

exports.baseco = function (test) {
  var baseco;

  baseco = new Baseco(16);
  test.strictEqual(baseco.dToG(1234567890), '499602d2'); //相当于调用"var n =1234567890; n.toString(16);"

  baseco = new Baseco(36);
  test.strictEqual(baseco.gToD('kf12oi'), 1234567890); //相当与调用"parseInt('kf12oi', 36);"

  baseco = new Baseco(62);
  test.strictEqual(baseco.dToG(911081363), 'ZENSH');
  test.strictEqual(baseco.gToD('ZENSH'), 911081363);

  baseco = new Baseco(10, '零一二三四五六七八九');
  test.strictEqual(baseco.dToG(9876543210), '九八七六五四三二一零');

  baseco = new Baseco(10, 'ABCDEFGHIJ');
  test.strictEqual(baseco.dToG(9876543210), 'JIHGFEDCBA');

  test.done();
};
