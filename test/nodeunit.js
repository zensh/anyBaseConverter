'use strict';
/*global module, exports*/

var baseco = require('../baseco.js');

exports.baseco = function (test) {

  test.strictEqual(baseco(1234567890, 16), '499602d2'); //相当于调用"var n =1234567890; n.toString(16);"
  test.strictEqual(baseco('kf12oi', 36), 1234567890); //相当与调用"parseInt('kf12oi', 36);"
  test.strictEqual(baseco(911081363, 62), 'ZENSH');
  test.strictEqual(baseco('ZENSH', 62), 911081363);
  test.strictEqual(baseco(9876543210, 10, '零一二三四五六七八九'), '九八七六五四三二一零');
  test.strictEqual(baseco(9876543210, 10, 'ABCDEFGHIJ'), 'JIHGFEDCBA');
  test.done();
};
