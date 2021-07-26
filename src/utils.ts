const to8BitString = (word: string): string => {
  let binaryString = '';
  Array.from(word).forEach((c: string) => {
    binaryString += c.charCodeAt(0).toString(2).padStart(8, '0');
  });
  return binaryString;
};

const appendSingle1 = (word: string): string => {
  return word + '1';
};

export const preprocess = (message: string): string => {
  message = to8BitString(message);
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

export const rightShiftWithLeadingZeros = (word: string, d: number): string => {
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
    messageSchedule.push('00000000000000000000000000000000')
  }
  return messageSchedule;
}
