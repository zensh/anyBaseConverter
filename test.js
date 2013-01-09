  var anyBaseConverter = require('./nodeAnyBaseConverter');

  var result = anyBaseConverter(1234567890,16);  //相当于调用"var n =1234567890; n.toString(16);"，结果为499602d2

  result = anyBaseConverter('kf12oi',36); 　//相当与调用"parseInt('kf12oi', 36);"，结果为1234567890

  anyBaseConverter(911081363, 62, '', function(e, r) {
    console.log(e ? e : r);
  });　　//ZENSH 

  anyBaseConverter('ZENSH', 62, null, function(e, r) {
    console.log(e ? e : r);
  });  //911081363

  anyBaseConverter(9876543210, 10, '零一二三四五六七八九', function(e, r) {
    console.log(e ? e : r);
  });  //九八七六五四三二一零

  anyBaseConverter(9876543210, 10, 'ABCDEFGHIJ', function(e, r) {
    console.log(e ? e : r);
  });  //JIHGFEDCBA

