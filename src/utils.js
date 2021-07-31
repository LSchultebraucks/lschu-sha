'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.not =
  exports.and =
  exports.add =
  exports.xor =
  exports.hashRound =
  exports.createInitialWords =
  exports.createMessageSchedule =
  exports.chunkString =
  exports.rightShiftLogical =
  exports.rightRotate =
  exports.preprocess =
    void 0;
var toBitString = function (word, bitSize) {
  var binaryString = '';
  Array.from(word).forEach(function (c) {
    binaryString += c.charCodeAt(0).toString(2).padStart(bitSize, '0');
  });
  return binaryString;
};
var appendSingle1 = function (word) {
  return word + '1';
};
var preprocess = function (message) {
  message = toBitString(message, 8);
  var messageLength = message.length;
  message = appendSingle1(message);
  var zerosToAdd = 512 - ((messageLength + 1 + 64) % 512);
  message += '0'.repeat(zerosToAdd);
  message += messageLength.toString(2).padStart(64, '0');
  return message;
};
exports.preprocess = preprocess;
var leftRotate = function (word, d) {
  return word.substring(d, word.length) + word.substring(0, d);
};
var rightRotate = function (word, d) {
  return leftRotate(word, word.length - d);
};
exports.rightRotate = rightRotate;
var rightShiftLogical = function (word, d) {
  return '0'.repeat(d) + word.substring(0, word.length - d);
};
exports.rightShiftLogical = rightShiftLogical;
var chunkString = function (str, chunkSize) {
  var numChunks = Math.ceil(str.length / chunkSize);
  var chunks = new Array(numChunks);
  for (var i = 0, o = 0; i < numChunks; ++i, o += chunkSize) {
    chunks[i] = str.substr(o, chunkSize);
  }
  return chunks;
};
exports.chunkString = chunkString;
var createMessageSchedule = function (chunk) {
  var messageSchedule = exports.chunkString(chunk, 32);
  for (var i = 0; i < 48; i++) {
    messageSchedule.push('00000000000000000000000000000000');
  }
  return messageSchedule;
};
exports.createMessageSchedule = createMessageSchedule;
var createInitialWords = function (wArr, bitSize) {
  for (var i = 16; i < wArr.length; i++) {
    var s0 = exports.xor(
      exports.xor(exports.rightRotate(wArr[i - 15], 7), exports.rightRotate(wArr[i - 15], 18), bitSize),
      exports.rightShiftLogical(wArr[i - 15], 3),
      bitSize,
    );
    var s1 = exports.xor(
      exports.xor(exports.rightRotate(wArr[i - 2], 17), exports.rightRotate(wArr[i - 2], 19), bitSize),
      exports.rightShiftLogical(wArr[i - 2], 10),
      bitSize,
    );
    wArr[i] = exports.add(exports.add(exports.add(wArr[i - 16], s0, bitSize), wArr[i - 7], bitSize), s1, bitSize);
  }
  return wArr;
};
exports.createInitialWords = createInitialWords;
var hashRound = function (hashVariables, k, w, bitSize) {
  if (bitSize === void 0) {
    bitSize = 32;
  }
  var a = hashVariables[0];
  var b = hashVariables[1];
  var c = hashVariables[2];
  var d = hashVariables[3];
  var e = hashVariables[4];
  var f = hashVariables[5];
  var g = hashVariables[6];
  var h = hashVariables[7];
  var S1 = exports.xor(
    exports.xor(exports.rightRotate(e, 6), exports.rightRotate(e, 11), bitSize),
    exports.rightRotate(e, 25),
    bitSize,
  );
  var ch = exports.xor(exports.and(e, f, bitSize), exports.and(exports.not(e, bitSize), g, bitSize), bitSize);
  var temp1 = exports.add(exports.add(exports.add(exports.add(k, w, bitSize), ch, bitSize), S1, bitSize), h, bitSize);
  var S0 = exports.xor(
    exports.xor(exports.rightRotate(a, 2), exports.rightRotate(a, 13), bitSize),
    exports.rightRotate(a, 22),
    bitSize,
  );
  var maj = exports.xor(
    exports.xor(exports.and(a, b, bitSize), exports.and(a, c, bitSize), bitSize),
    exports.and(b, c, bitSize),
    bitSize,
  );
  var temp2 = exports.add(S0, maj, bitSize);
  h = g;
  g = f;
  f = e;
  e = exports.add(d, temp1, bitSize);
  d = c;
  c = b;
  b = a;
  a = exports.add(temp1, temp2, bitSize);
  return [a, b, c, d, e, f, g, h];
};
exports.hashRound = hashRound;
var xor = function (a, b, bitSize) {
  // tslint:disable-next-line: no-bitwise
  var resultDec = (parseInt(a, 2) ^ parseInt(b, 2)) >>> 0;
  return resultDec.toString(2).padStart(bitSize, '0');
};
exports.xor = xor;
var add = function (a, b, bitSize) {
  var resultDec = (parseInt(a, 2) + parseInt(b, 2)) % Math.pow(2, bitSize);
  return resultDec.toString(2).padStart(bitSize, '0');
};
exports.add = add;
var and = function (a, b, bitSize) {
  // tslint:disable-next-line: no-bitwise
  var resultDec = parseInt(a, 2) & (parseInt(b, 2) >>> 0);
  return resultDec.toString(2).padStart(bitSize, '0');
};
exports.and = and;
var not = function (a, bitSize) {
  // tslint:disable-next-line: no-bitwise
  var resultDec = replaceAll(replaceAll(replaceAll(replaceAll(a, '1', 'b'), '0', 'a'), 'a', '1'), 'b', '0');
  return resultDec.padStart(bitSize, '0');
};
exports.not = not;
var replaceAll = function (str, find, replace) {
  var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  return str.replace(new RegExp(escapedFind, 'g'), replace);
};
