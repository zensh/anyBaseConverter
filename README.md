Baseco v0.2.0 [![Build Status](https://travis-ci.org/zensh/baseco.png?branch=master)](https://travis-ci.org/zensh/baseco)
====================
Any base converter.

## API

    var Baseco = require('baseco');

### Baseco([base], [alphabet])

`Baseco` 构造函数。

+ **base:** Number，可选，设置进制，默认为10。

    var baseco = new Baseco(16);

+ **alphabet:** String，可选，设置字符表，默认为＂0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ＂。

    var baseco = new Baseco(10, '零一二三四五六七八九');


### Baseco.prototype.dToG(value)

+ **value:** Number

    var baseco = new Baseco(16);
    baseco.dToG(1234567890); // '499602d2'

### Baseco.prototype.gToD(value)

+ **value:** String

    var baseco = new Baseco(10, '零一二三四五六七八九');
    baseco.dToG(9876543210); // '九八七六五四三二一零'
