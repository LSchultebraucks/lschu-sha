"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xor = exports.createMessageSchedule = exports.chunkString = exports.rightShiftWithLeadingZeros = exports.rightRotate = exports.preprocess = void 0;
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
var rightShiftWithLeadingZeros = function (word, d) {
    return '0'.repeat(d) + word.substring(0, word.length - d);
};
exports.rightShiftWithLeadingZeros = rightShiftWithLeadingZeros;
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
var xor = function (a, b, bitSize) {
    // tslint:disable-next-line: no-bitwise
    var resultDec = (parseInt(a, 2) ^ parseInt(b, 2));
    return resultDec.toString(2).padStart(bitSize, '0');
};
exports.xor = xor;
