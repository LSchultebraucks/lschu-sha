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
  };
  return wArr;
};

export const hashRound = (hashVariables: string[], K: string[], wArr: string[]): string[] => {
  return [];
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
  const resultDec = parseInt(a, 2) & (parseInt(b, 2) >>> 0);
  return resultDec.toString(2).padStart(bitSize, '0');
};

export const not = (a: string, bitSize: number): string => {
  // tslint:disable-next-line: no-bitwise
  const resultDec = replaceAll(replaceAll(replaceAll(replaceAll(a, '1', 'b'), '0', 'a'), 'a', '1'), 'b', '0');
  return resultDec.padStart(bitSize, '0');
};

const replaceAll = (str: string, find: string, replace: string): string => {
  const escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  return str.replace(new RegExp(escapedFind, 'g'), replace);
};
