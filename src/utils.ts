export const to8BitString = (word: string): string => {
  let binaryString = '';
  Array.from(word).forEach((c: string) => {
    binaryString += c.charCodeAt(0).toString(2).padStart(8, '0');
  });
  return binaryString;
};

export const appendSingle1 = (word: string): string => {
  return word + '1';
};

export const padWithZerosToDiv512 = (word: string): string => {
  return word.padEnd(512, '0');
};

export const preprocess = (message: string): string => {
    message = to8BitString(message);
    const messageLength = message.length;
    message = appendSingle1(message);
    const zerosToAdd = 512 - ((messageLength + 1 + 64) % 512);
    message += "0".repeat(zerosToAdd);
    message += messageLength.toString(2).padStart(64, '0');
    return message;
};