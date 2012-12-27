module.exports = function anyBaseConverter(original, base, string_table, callback) {

  //  anyBaseConverter(original, [base], [string_table], [callback]);
  //
  //  This function extend Number.toString() and parseInt(), you can define base number and convert string table yourself.
  //
  //      original : String or Number, when String, character must be in string_table, converter to a decimal number;
  //                 when Number converter to a string that used string_table;
  //          base : Number, optional, default value is 10, must be an integer, 2 <= base <= string_table.length; if base <=36
  //                 and string_table use default value, anyBaseConverter() call native base conversion. 
  //  string_table : String, optional, default value is "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  //                 character must be unique and visible.
  //      callback : function(err, result), optional.
  //

  var STRING = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    result;

  var decToGeneric = function(o, b, c) {

      if(b <= 36 && c === STRING) {
        return o.toString(b); // Fallback to native base conversion
      }

      var result = '',
        q = 0;

      while(o != 0) {
        q = o % b;
        result = c[q] + result;
        o = (o - q) / b;
      }

      return result;
    }

  var genericToDec = function(o, b, c) {

      if(b <= 36 && c === STRING) {
        return parseInt(o, b); // Fallback to native base conversion
      }

      var cache = {},
        s = '',
        result = 0,
        pow = 1;

      for(var i = o.length - 1; i >= 0; i--) {
        s = o[i];
        if(typeof cache[s] == 'undefined') {
          cache[s] = c.indexOf(s);
        }
        result += pow * cache[s];
        pow *= b;
      }
      return result;
    }

  try {
    
    //Check out string_table
    string_table = string_table || STRING;  //if undefined, set default value STRING

    if(string_table !== STRING && string_table === STRING.slice(0, string_table.length)) {
      string_table = STRING;
    }  //if subset of STRING, set default value STRING

    if(typeof string_table === 'string' && string_table.length >= 2) {
      if(string_table !== STRING) {  //if STRING, need not check out
        for(var i = string_table.length - 1; i >= 0; i -= 1) {  //check out for uniquely
          for(var k = i - 1; k >= 0; k -= 1) {
            if(string_table[i] <= ' ' || string_table[i] === string_table[k]) {
              throw new Error('"string_table" err! It must be unique and visible! : "' + string_table[i] + '"');
            }
          };
        };
      }

    } else {
      throw new Error('"string_table" must be string, and string_table.length >=2.');
    }

    //check out base
    base = base || 10;  //if undefined, set default value 10

    if(typeof base !== 'number' || isNaN(base) || base !== Math.floor(base) || base < 2 || base > string_table.length) {
      throw new Error('Invalid "base" number! It must be an integer, and 2 <= base <= string_table.length.');
    }

    //check out original and execute
    if(typeof original === 'number') {
      if(original >= 0 && original <= Number.MAX_VALUE && original === Math.floor(original)) {
        result = decToGeneric(original, base, string_table);
      } else {
        throw new Error('Invalid "original" number! It must be an integer, and 0 <= number <= Number.MAX_VALUE.');
      }

    } else if(typeof original === 'string') {
      for(var i = original.length - 1; i >= 0; i -= 1) {
        if(string_table.indexOf(original[i]) === -1 || string_table.indexOf(original[i]) > base) {
          throw new Error('"' + original[i] + '" is invalid "original" string! Available character is "' + string_table + '".');
        }
      };
      result = genericToDec(original, base, string_table);

    } else {
      throw new Error('"original" must be number or string!');
    }

  } catch(err) {

    if(callback) {
      return callback(err, null);
    } else {
      console.log(err);
    }

  } finally {

    if(callback) {
      return callback(null,result);
    } else {
      return result;
    }

  } 

}
