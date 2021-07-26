"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha256 = void 0;
var utils_1 = require("../src/utils");
var INITIAL_H0 = 0x6a09e667;
var INITIAL_H1 = 0xbb67ae85;
var INITIAL_H2 = 0x3c6ef372;
var INITIAL_H3 = 0xa54ff53a;
var INITIAL_H4 = 0x510e527f;
var INITIAL_H5 = 0x9b05688c;
var INITIAL_H6 = 0x1f83d9ab;
var INITIAL_H7 = 0x5be0cd19;
var INITIAL_K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98,
    0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
    0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8,
    0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
    0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
    0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
    0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7,
    0xc67178f2,
];
var sha256 = function (message) {
    /*
    let h0 = INITIAL_H0.toString(16);
    let h1 = INITIAL_H1.toString(16);
    let h2 = INITIAL_H2.toString(16);
    let h3 = INITIAL_H3.toString(16);
    let h4 = INITIAL_H4.toString(16);
    let h5 = INITIAL_H5.toString(16);
    let h6 = INITIAL_H6.toString(16);
    let h7 = INITIAL_H7.toString(16);
    */
    var bitSize = 32;
    var preprocessedMessage = utils_1.preprocess(message);
    var messageChunks = utils_1.chunkString(preprocessedMessage, 512);
    messageChunks.forEach(function (chunk) {
        var wArr = utils_1.createMessageSchedule(chunk);
        for (var i = 16; i < 64; i++) {
            var s0 = utils_1.xor(utils_1.xor(utils_1.rightRotate(wArr[i - 15], 7), utils_1.rightRotate(wArr[i - 15], 18), bitSize), utils_1.rightShiftWithLeadingZeros(wArr[i - 15], 3), bitSize);
            var s1 = utils_1.xor(utils_1.xor(utils_1.rightRotate(wArr[i - 2], 17), utils_1.rightRotate(wArr[i - 2], 19), bitSize), utils_1.rightShiftWithLeadingZeros(wArr[i - 2], 10), bitSize);
            wArr[i] = utils_1.add(utils_1.add(utils_1.add(wArr[i - 16], s0, bitSize), wArr[i - 7], bitSize), s1, bitSize);
        }
        /*
        let a = h1;
        let b = h2;
        let c = h3;
        let d = h4;
        let e = h5;
        let f = h6;
        let g = h7;
        let h = h7;
        */
        for (var i = 0; i < 64; i++) {
            // const S1 = xor(xor(rightRotate(e, 6), rightRotate(e, 11), bitSize), rightRotate(e, 25), bitSize);
        }
    });
    return '';
};
exports.sha256 = sha256;
