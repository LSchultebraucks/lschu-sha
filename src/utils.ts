const toBitString = (word: string, bitSize: number): string => {
  let binaryString = '';
  Array.from(word).forEach((c: string) => {
    binaryString += c.charCodeAt(0).toString(2).padStart(bitSize, '0');
  });
  return binaryString;
};

const appendSingle1 = (word: string): string => {
  return word + '1';
};

export const preprocess = (message: string): string => {
  message = toBitString(message, 8);
  const messageLength = message.length;
  message = appendSingle1(message);
  const zerosToAdd = 512 - ((messageLength + 1 + 64) % 512);
  message += '0'.repeat(zerosToAdd);
  message += messageLength.toString(2).padStart(64, '0');
  return message;
};

const leftRotate = (word: string, d: number): string => {
  return word.substring(d, word.length) + word.substring(0, d);
};

export const rightRotate = (word: string, d: number): string => {
  return leftRotate(word, word.length - d);
};

export const rightShiftLogical = (word: string, d: number): string => {
  return '0'.repeat(d) + word.substring(0, word.length - d);
};

export const chunkString = (str: string, chunkSize: number) => {
  const numChunks = Math.ceil(str.length / chunkSize);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += chunkSize) {
    chunks[i] = str.substr(o, chunkSize);
  }

  return chunks;
};

export const createMessageSchedule = (chunk: string): string[] => {
  const messageSchedule = chunkString(chunk, 32);
  for (let i = 0; i < 48; i++) {
    messageSchedule.push('00000000000000000000000000000000');
  }
  return messageSchedule;
};

export const createInitialWords = (wArr: string[], bitSize: number): string[] => {
  for (let i = 16; i < wArr.length; i++) {
    const s0 = xor(
      xor(rightRotate(wArr[i - 15], 7), rightRotate(wArr[i - 15], 18), bitSize),
      rightShiftLogical(wArr[i - 15], 3),
      bitSize,
    );
    const s1 = xor(
      xor(rightRotate(wArr[i - 2], 17), rightRotate(wArr[i - 2], 19), bitSize),
      rightShiftLogical(wArr[i - 2], 10),
      bitSize,
    );
    wArr[i] = add(add(add(wArr[i - 16], s0, bitSize), wArr[i - 7], bitSize), s1, bitSize);
  }
  return wArr;
};

export const hashRound = (hashVariables: string[], k: string, w: string, bitSize = 32): string[] => {
  let a = hashVariables[0];
  let b = hashVariables[1];
  let c = hashVariables[2];
  let d = hashVariables[3];
  let e = hashVariables[4];
  let f = hashVariables[5];
  let g = hashVariables[6];
  let h = hashVariables[7];
  const S1 = xor(xor(rightRotate(e, 6), rightRotate(e, 11), bitSize), rightRotate(e, 25), bitSize);
  const ch = xor(and(e, f, bitSize), and(not(e, bitSize), g, bitSize), bitSize);
  const temp1 = add(add(add(add(k, w, bitSize), ch, bitSize), S1, bitSize), h, bitSize);
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
  return [a, b, c, d, e, f, g, h];
};

export const xor = (a: string, b: string, bitSize: number): string => {
  // tslint:disable-next-line: no-bitwise
  const resultDec = (parseInt(a, 2) ^ parseInt(b, 2)) >>> 0;
  return resultDec.toString(2).padStart(bitSize, '0');
};

export const add = (a: string, b: string, bitSize: number): string => {
  const resultDec = (parseInt(a, 2) + parseInt(b, 2)) % Math.pow(2, bitSize);
  return resultDec.toString(2).padStart(bitSize, '0');
};

export const and = (a: string, b: string, bitSize: number): string => {
  // tslint:disable-next-line: no-bitwise
  const resultDec = (parseInt(a, 2) & parseInt(b, 2)) >>> 0;
  return resultDec.toString(2).padStart(bitSize, '0');
};

export const not = (a: string, bitSize: number): string => {
  // tslint:disable-next-line: no-bitwise
  const resultDec = ~parseInt(a, 2) >>> 0;
  return resultDec.toString(2).padStart(bitSize, '0');
};

const replaceAll = (str: string, find: string, replace: string): string => {
  const escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  return str.replace(new RegExp(escapedFind, 'g'), replace);
};
