"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rightShiftWithLeadingZeros = exports.rightRotate = exports.preprocess = void 0;
var to8BitString = function (word) {
    var binaryString = '';
    Array.from(word).forEach(function (c) {
        binaryString += c.charCodeAt(0).toString(2).padStart(8, '0');
    });
    return binaryString;
};
var appendSingle1 = function (word) {
    return word + '1';
};
var preprocess = function (message) {
    message = to8BitString(message);
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
