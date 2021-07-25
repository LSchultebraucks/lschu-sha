"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.padWithZerosToDiv512 = exports.appendSingle1 = exports.to8BitString = void 0;
var to8BitString = function (word) {
    var binaryString = '';
    Array.from(word).forEach(function (c) {
        binaryString += c.charCodeAt(0).toString(2).padStart(8, '0');
    });
    return binaryString;
};
exports.to8BitString = to8BitString;
var appendSingle1 = function (word) {
    return word + '1';
};
exports.appendSingle1 = appendSingle1;
var padWithZerosToDiv512 = function (word) {
    return word.padEnd(512, '0');
};
exports.padWithZerosToDiv512 = padWithZerosToDiv512;