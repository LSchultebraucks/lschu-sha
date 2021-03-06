'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.sha256 = void 0;
var utils_1 = require('../src/utils');
var INITIAL_H0 = 0x6a09e667;
var INITIAL_H1 = 0xbb67ae85;
var INITIAL_H2 = 0x3c6ef372;
var INITIAL_H3 = 0xa54ff53a;
var INITIAL_H4 = 0x510e527f;
var INITIAL_H5 = 0x9b05688c;
var INITIAL_H6 = 0x1f83d9ab;
var INITIAL_H7 = 0x5be0cd19;
var K = [
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
  var bitSize = 32;
  var h0 = INITIAL_H0.toString(2).padStart(bitSize, '0');
  var h1 = INITIAL_H1.toString(2).padStart(bitSize, '0');
  var h2 = INITIAL_H2.toString(2).padStart(bitSize, '0');
  var h3 = INITIAL_H3.toString(2).padStart(bitSize, '0');
  var h4 = INITIAL_H4.toString(2).padStart(bitSize, '0');
  var h5 = INITIAL_H5.toString(2).padStart(bitSize, '0');
  var h6 = INITIAL_H6.toString(2).padStart(bitSize, '0');
  var h7 = INITIAL_H7.toString(2).padStart(bitSize, '0');
  var preprocessedMessage = utils_1.preprocess(message);
  var messageChunks = utils_1.chunkString(preprocessedMessage, 512);
  messageChunks.forEach(function (chunk) {
    var wArr = utils_1.createMessageSchedule(chunk);
    wArr = utils_1.createInitialWords(wArr, bitSize);
    var a = h0;
    var b = h1;
    var c = h2;
    var d = h3;
    var e = h4;
    var f = h5;
    var g = h6;
    var h = h7;
    for (var i = 0; i < K.length; i++) {
      var newHashes = utils_1.hashRound(
        [a, b, c, d, e, f, g, h],
        K[i].toString(2).padStart(bitSize, '0'),
        wArr[i],
        bitSize,
      );
      a = newHashes[0];
      b = newHashes[1];
      c = newHashes[2];
      d = newHashes[3];
      e = newHashes[4];
      f = newHashes[5];
      g = newHashes[6];
      h = newHashes[7];
    }
    h0 = utils_1.add(h0, a, bitSize);
    h1 = utils_1.add(h1, b, bitSize);
    h2 = utils_1.add(h2, c, bitSize);
    h3 = utils_1.add(h3, d, bitSize);
    h4 = utils_1.add(h4, e, bitSize);
    h5 = utils_1.add(h5, f, bitSize);
    h6 = utils_1.add(h6, g, bitSize);
    h7 = utils_1.add(h7, h, bitSize);
  });
  var hash = h0.concat(h1).concat(h2).concat(h3).concat(h4).concat(h5).concat(h6).concat(h7);
  return hash;
};
exports.sha256 = sha256;
