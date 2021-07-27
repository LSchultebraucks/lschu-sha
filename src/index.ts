import {
  preprocess,
  chunkString,
  createMessageSchedule,
  createInitialWords,
  rightRotate,
  xor,
  add,
  and,
  not,
} from '../src/utils';

const INITIAL_H0 = 0x6a09e667;
const INITIAL_H1 = 0xbb67ae85;
const INITIAL_H2 = 0x3c6ef372;
const INITIAL_H3 = 0xa54ff53a;
const INITIAL_H4 = 0x510e527f;
const INITIAL_H5 = 0x9b05688c;
const INITIAL_H6 = 0x1f83d9ab;
const INITIAL_H7 = 0x5be0cd19;

const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98,
  0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
  0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8,
  0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819,
  0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
  0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7,
  0xc67178f2,
];

export const sha256 = (message: string): string => {
  const bitSize = 32;
  let h0 = INITIAL_H0.toString(2).padStart(bitSize, '0');
  let h1 = INITIAL_H1.toString(2).padStart(bitSize, '0');
  let h2 = INITIAL_H2.toString(2).padStart(bitSize, '0');
  let h3 = INITIAL_H3.toString(2).padStart(bitSize, '0');
  let h4 = INITIAL_H4.toString(2).padStart(bitSize, '0');
  let h5 = INITIAL_H5.toString(2).padStart(bitSize, '0');
  let h6 = INITIAL_H6.toString(2).padStart(bitSize, '0');
  let h7 = INITIAL_H7.toString(2).padStart(bitSize, '0');
  const preprocessedMessage = preprocess(message);
  const messageChunks = chunkString(preprocessedMessage, 512);
  messageChunks.forEach((chunk) => {
    let wArr = createMessageSchedule(chunk);
    wArr = createInitialWords(wArr, bitSize);
    let a = h0;
    let b = h1;
    let c = h2;
    let d = h3;
    let e = h4;
    let f = h5;
    let g = h6;
    let h = h7;
    for (let i = 0; i < K.length; i++) {
      const S1 = xor(xor(rightRotate(e, 6), rightRotate(e, 11), bitSize), rightRotate(e, 25), bitSize);
      const ch = xor(and(e, f, bitSize), and(not(e, bitSize), g, bitSize), bitSize);
      const temp1 = add(
        add(add(add(K[i].toString(2).padStart(bitSize, '0'), wArr[i], bitSize), ch, bitSize), S1, bitSize),
        h,
        bitSize,
      );
      const S0 = xor(xor(rightRotate(a, 2), rightRotate(a, 13), bitSize), rightRotate(a, 22), bitSize);
      const maj = xor(xor(and(a, b, bitSize), and(a, c, bitSize), bitSize), and(b, c, bitSize), bitSize);
      const temp2 = add(S0, maj, bitSize);

      h = g;
      g = f;
      f = e;
      e = add(d, temp1, bitSize);
      d = c;
      c = b;
      b = a;
      a = add(temp1, temp2, bitSize);
    }

    h0 = add(h0, a, bitSize);
    h1 = add(h1, b, bitSize);
    h2 = add(h2, c, bitSize);
    h3 = add(h3, d, bitSize);
    h4 = add(h4, e, bitSize);
    h5 = add(h5, f, bitSize);
    h6 = add(h6, g, bitSize);
    h7 = add(h7, h, bitSize);
  });
  const hash = h0.concat(h1).concat(h2).concat(h3).concat(h4).concat(h5).concat(h6).concat(h7);
  return hash;
};
