nodeAnyBaseConverter
====================

##nodeAnyBaseConverter(original, [base], [string_table], [callback])

###函数说明

This function extend Number.toString() and parseInt(), you can define base number and convert string table yourself.

这个函数用于扩展Number.toString()和parseInt()方法．Javascript中内置的转换字符表为＂0123456789abcdefghijklmnopqrstuvwxyz＂，转换进制最大为36位．本函数默认转换字符表为＂0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ＂，但你可以自定义任何可见的转换字符表，甚至中文字符．转换进制也可为大于2的任何值，只需保证转换进制不超过字符表长度（即对于n进制，至少有n个唯一的字符表达出来）．

###参数说明

**      original :** String或Number类型，如果为Number（十进制数字）类型，则将其转换成字符串，参数base为自定的目标转换进制，string_table为自定的目标转换字符基数表；如果为String类型，则将其转换成十进制数字，参数base为original的转换进制，string_table为original的转换字符基数表；

**          base :** Number类型，可选参数，默认值为10，表示转换进制．base必须大于等于2，且小于string_table的字符数量．如果base小于36，且string_table为默认值，则自动调用Javascript内置的Number.toString()和parseInt()方法进行转换．

**  string_table :** String类型，可选参数，默认值为＂0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ＂，表示转换字符基数表．该字符串中的字符必须唯一且可见．

**      callback :** 回调函数，function(err, result)，可选参数．如果未设置，nodeAnyBaseConverter()直接返回转换结果．

###示例

**test.js**

    var anyBaseConverter = require('./nodeAnyBaseConverter');
    
    var result = anyBaseConverter(1234567890,16);  //相当于调用"var n =1234567890; n.toString(16);"，结果为499602d2
    
    result = anyBaseConverter('kf12oi',36); 　//相当与调用"parseInt('kf12oi', 36);"，结果为1234567890
    
    anyBaseConverter(911081363, 62, '', function(e, r) {
      console.log(r);
    });　　//ZENSH 
    
    anyBaseConverter('ZENSH', 62, null, function(e, r) {
      console.log(r);
    });  //911081363
    
    anyBaseConverter(9876543210, 10, ')!@#$%^&*(', function(e, r) {
      console.log(r);
    });  //(*&^%$#@!)
    
    anyBaseConverter(9876543210, 10, 'ABCDEFGHIJ', function(e, r) {
      console.log(r);
    });  //JIHGFEDCBA

**运行：node test.js**