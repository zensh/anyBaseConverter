  var anyBaseConverter = require('./nodeAnyBaseConverter');

  console.log(anyBaseConverter(1234567890,16));  //相当于调用"var n =1234567890; n.toString(16);"，结果为499602d2

  console.log(anyBaseConverter('kf12oi',36)); 　//相当与调用"parseInt('kf12oi', 36);"，结果为1234567890

  console.log(anyBaseConverter(911081363, 62));　　//ZENSH 

  console.log(anyBaseConverter('ZENSH', 62));  //911081363

  console.log(anyBaseConverter(9876543210, 10, '零一二三四五六七八九'));  //九八七六五四三二一零

  console.log(anyBaseConverter(9876543210, 10, 'ABCDEFGHIJ'));  //JIHGFEDCBA

